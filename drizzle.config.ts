import type { Config } from "drizzle-kit";
export default {
  schema: './src/db/schema/index.ts',
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: "postgressql://docker:docker@localhost:5432/pizzashop"
  }
} satisfies Config;