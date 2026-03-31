import type { Config } from "drizzle-kit";

// Production config — PostgreSQL.
// DATABASE_URL must be set in the environment (e.g. exported by scripts/setup.sh).
export default {
  schema: "./src/db/schema.pg.ts",
  out: "./drizzle/pg",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
} satisfies Config;
