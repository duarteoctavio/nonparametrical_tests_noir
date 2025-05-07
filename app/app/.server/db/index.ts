import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { env } from "~/.server/env";

const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle(sqlite, { schema });
