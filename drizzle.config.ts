import type { Config } from "drizzle-kit";

// Local dev config — SQLite.
// DATABASE_URL is loaded from .env.local by the db:* scripts via dotenv-cli.
const url = process.env.DATABASE_URL ?? "./data/sidetrack.db";

export default {
  schema: "./src/db/schema.sqlite.ts",
  out: "./drizzle/sqlite",
  dialect: "sqlite",
  dbCredentials: { url },
} satisfies Config;
