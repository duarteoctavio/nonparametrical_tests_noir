// User Data Transfer Objects and Database Access Functions
// Removed createUser and getUserByEmail functions as they are unused in wallet-only auth.
import { InferInsertModel, InferSelectModel, eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";

export type SelectUser = InferSelectModel<typeof usersTable>;
export type InsertUser = InferInsertModel<typeof usersTable>;

export function getUserById(id: number) {
  return db.select().from(usersTable).where(eq(usersTable.id, id)).get();
}

export async function findOrCreateUserByAddress(address: string): Promise<SelectUser | null> {
  const normalizedAddress = address.toLowerCase();

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.address, normalizedAddress))
    .get();

  if (user) {
    return user;
  }

  try {
    const newUser = await db
      .insert(usersTable)
      .values({ address: normalizedAddress })
      .returning()
      .get();
    return newUser;
  } catch (error) {
    console.error(`Error creating user for address ${normalizedAddress}:`, error);
    return null; // Return null if creation fails
  }
}
