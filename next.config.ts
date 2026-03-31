import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep native modules out of the Next.js bundle — they are loaded at runtime.
  serverExternalPackages: ["better-sqlite3", "pg"],
};

export default nextConfig;
