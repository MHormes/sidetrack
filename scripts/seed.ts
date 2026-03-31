#!/usr/bin/env tsx
/**
 * Database seeder — equivalent of Clipper's CsvDataSeeder.php
 *
 * Reads CSV files from database/data/ and upserts them into the database.
 * Works on both SQLite (dev) and PostgreSQL (local/production).
 *
 * Usage:
 *   pnpm db:seed              — smart: skips tables that already have data
 *   pnpm db:seed -- --force   — force: upserts regardless of existing data (restore mode)
 *
 * Driven by DATABASE_URL:
 *   SQLite  → loaded from .env.local via dotenv-cli in the npm script
 *   PG      → DATABASE_URL set in the environment (production/local Docker)
 */

import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { sql, getTableColumns } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL ?? "./data/sidetrack.db";
const isPg = DATABASE_URL.startsWith("postgres");
const isForce = process.argv.includes("--force");

// ── CSV parser ──────────────────────────────────────────────────────────────
// Handles quoted fields and double-quote escaping ("" → ").

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function parseCsv(filePath: string): Record<string, string | null>[] {
  const lines = readFileSync(filePath, "utf-8")
    .split("\n")
    .filter((l) => l.trim() !== "");

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(
      headers.map((header, i) => [
        header,
        values[i] === "" || values[i] === undefined ? null : values[i],
      ])
    );
  });
}

// ── Value coercion (mirrors Clipper's PHP seeder logic) ─────────────────────

function coerce(value: string | null): unknown {
  if (value === null) return null;
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

// ── Generic table importer ──────────────────────────────────────────────────
// Builds the SQL↔JS column name mapping from the Drizzle table definition,
// so backup CSVs (which use SQL/snake_case names) map correctly to Drizzle's
// camelCase JavaScript keys. All columns present in the CSV are preserved,
// including created_at from backup exports.

async function importTable(
  db: any,
  tableObj: any,
  csvPath: string,
  tableName: string
) {
  // Build sql_name → js_name mapping from the table's column definitions
  const cols = getTableColumns(tableObj);
  const sqlToJs: Record<string, string> = {};
  for (const [jsName, col] of Object.entries(cols) as [string, any][]) {
    sqlToJs[col.name] = jsName;
  }

  // Smart-skip: skip this table if it already has data (unless --force)
  if (!isForce) {
    const existing = await db.select().from(tableObj).limit(1);
    if (existing.length > 0) {
      console.log(`   ⏭️  ${tableName}: al gevuld. Gebruik --force om te overschrijven.`);
      return;
    }
  }

  const rawRows = parseCsv(csvPath);
  console.log(`   -> ${tableName}: ${rawRows.length} rijen importeren...`);

  // Map CSV rows: { price_cents: "2500" } → { priceCents: 2500 }
  const rows = rawRows.map((raw) =>
    Object.fromEntries(
      Object.entries(raw).map(([sqlCol, val]) => [
        sqlToJs[sqlCol] ?? sqlCol,
        coerce(val),
      ])
    )
  );

  // Build the upsert SET clause using Drizzle's sql helper with excluded references.
  // Every column except id is updated on conflict.
  const updateSet: Record<string, any> = {};
  for (const [jsName, col] of Object.entries(cols) as [string, any][]) {
    if (jsName === "id") continue;
    updateSet[jsName] = sql.raw(`excluded.${col.name}`);
  }

  // Chunked upsert — 250 rows at a time (same as Clipper's PHP seeder)
  const CHUNK_SIZE = 250;
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    await db
      .insert(tableObj)
      .values(chunk)
      .onConflictDoUpdate({ target: tableObj.id, set: updateSet });
  }

  console.log(`   ✅ ${tableName}: ${rows.length} rijen ingevoegd/bijgewerkt.`);
}

// ── Table registry ──────────────────────────────────────────────────────────
// Add tables here in dependency order (parent tables before child tables).

async function runSeed(db: any, pgMode: boolean) {
  const schemaPath = pgMode
    ? "../src/db/schema.pg.js"
    : "../src/db/schema.sqlite.js";

  const { products, preorders } = await import(schemaPath);

  const tables: { name: string; table: any; file: string }[] = [
    { name: "products",  table: products,  file: "products.csv"  },
    { name: "preorders", table: preorders, file: "preorders.csv" },
  ];

  const dataDir = join(process.cwd(), "database/data");

  for (const { name, table, file } of tables) {
    const csvPath = join(dataDir, file);
    if (!existsSync(csvPath)) {
      console.log(`   ⏭️  ${name}: geen CSV gevonden (${file}). Overgeslagen.`);
      continue;
    }
    await importTable(db, table, csvPath, name);
  }
}

// ── Entry point ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Sidetrack database seeden...");
  console.log(`   Driver : ${isPg ? "PostgreSQL" : "SQLite"}`);
  console.log(`   Modus  : ${isForce ? "force (restore)" : "smart (eerste run)"}\n`);

  if (isPg) {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: DATABASE_URL });
    const db = drizzle(pool);
    await runSeed(db, true);
    await pool.end();
  } else {
    const { drizzle } = await import("drizzle-orm/better-sqlite3");
    const Database = (await import("better-sqlite3")).default;
    const sqlite = new Database(DATABASE_URL);
    const db = drizzle(sqlite);
    await runSeed(db, false);
    sqlite.close();
  }

  console.log("\n✅ Seeden voltooid.");
}

seed().catch((err) => {
  console.error("❌ Seeden mislukt:", err);
  process.exit(1);
});
