import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";

export type SelectUser = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;

export function createUser(data: InsertUser) {
  return db.insert(usersTable).values(data).returning().get();
}

export function getUserById(id: number) {
  return db.select().from(usersTable).where(eq(usersTable.id, id)).get();
}

export function getUserByEmail(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email)).get();
}
