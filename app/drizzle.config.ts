import type { Config } from "drizzle-kit";
import { env } from "~/.server/env";

export default {
  schema: "./app/.server/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
