import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as pgSchema from "./schema.pg";

const DATABASE_URL = process.env.DATABASE_URL ?? "./data/sidetrack.db";
const isPg = DATABASE_URL.startsWith("postgres");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

if (isPg) {
  const { drizzle } = require("drizzle-orm/node-postgres");
  const { Pool } = require("pg");
  const pool = new Pool({ connectionString: DATABASE_URL });
  _db = drizzle(pool, { schema: require("./schema.pg") });
} else {
  const { drizzle } = require("drizzle-orm/better-sqlite3");
  const Database = require("better-sqlite3");
  const sqlite = new Database(DATABASE_URL);
  _db = drizzle(sqlite, { schema: require("./schema.sqlite") });
}

// Typed as NodePgDatabase so TypeScript infers column types from the PG schema.
// The SQLite schema mirrors it exactly, so queries work correctly at runtime on both.
export const db = _db as NodePgDatabase<typeof pgSchema>;

// Export table objects that match the active driver so column defaults are correct.
// (e.g. PG uses defaultNow() but SQLite uses sql`(current_timestamp)`)
const activeSchema = isPg ? require("./schema.pg") : require("./schema.sqlite");
export const orders     = activeSchema.orders     as typeof pgSchema.orders;
export const orderItems = activeSchema.orderItems as typeof pgSchema.orderItems;
