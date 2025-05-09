import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(sqlite, { logger: true });

migrate(db, { migrationsFolder: "./drizzle" });

sqlite.close();
