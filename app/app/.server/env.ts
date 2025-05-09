import { createEnv } from "@t3-oss/env-core";
import { Hex } from "viem";
import { z } from "zod";

// eslint-disable-next-line n/no-process-env

const hexSchema = z
  .string()
  .regex(/^0x[0-9a-fA-F]*$/)
  .transform((str) => str as Hex);

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    SESSION_SECRET: z.string(),
    VERIFIER_ADDRESS: hexSchema,
    APP_ADDRESS: hexSchema,
    WALLET_CONNECT_PROJECT_ID: z.string(),
    WORLDCOIN_APP_ID: z.string(),
  },
  // eslint-disable-next-line n/no-process-env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
});

export const clientEnv = {
  NODE_ENV: env.NODE_ENV,
  WALLET_CONNECT_PROJECT_ID: env.WALLET_CONNECT_PROJECT_ID,
  APP_ADDRESS: env.APP_ADDRESS,
  WORLDCOIN_APP_ID: env.WORLDCOIN_APP_ID,
};

export type ClientEnv = typeof clientEnv;

declare global {
  interface Window {
    ENV: typeof clientEnv;
  }
}
