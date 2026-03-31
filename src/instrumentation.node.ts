import { join } from "path";
import { db } from "./db";

const DATABASE_URL = process.env.DATABASE_URL ?? "./data/sidetrack.db";
const isPg = DATABASE_URL.startsWith("postgres");

async function runMigrations() {
  if (isPg) {
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    await migrate(db as Parameters<typeof migrate>[0], {
      migrationsFolder: join(process.cwd(), "drizzle/pg"),
    });
  } else {
    const { migrate } = await import("drizzle-orm/better-sqlite3/migrator");
    migrate(db as unknown as Parameters<typeof migrate>[0], {
      migrationsFolder: join(process.cwd(), "drizzle/sqlite"),
    });
  }
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
