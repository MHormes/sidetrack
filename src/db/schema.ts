// Re-export the PostgreSQL schema as the canonical source for TypeScript types.
// At runtime the correct driver (SQLite or PostgreSQL) is chosen in src/db/index.ts
// based on DATABASE_URL, but app code always imports from here.
export * from "./schema.pg";
