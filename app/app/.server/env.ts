import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// eslint-disable-next-line n/no-process-env

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    SESSION_SECRET: z.string(),
  },
  // eslint-disable-next-line n/no-process-env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

export const clientEnv = {
  NODE_ENV: env.NODE_ENV,
};

export type ClientEnv = typeof clientEnv;

declare global {
  interface Window {
    ENV: typeof clientEnv;
  }
}
