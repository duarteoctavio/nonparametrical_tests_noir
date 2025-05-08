// User Data Transfer Objects and Database Access Functions
// Removed createUser and getUserByEmail functions as they are unused in wallet-only auth.
import { InferInsertModel, InferSelectModel, eq, inArray } from "drizzle-orm";
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

export function findUserByNullifierHash(nullifierHash: string) {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.worldIdNullifierHash, nullifierHash))
    .get(); // Use .get() for SQLite to return one or undefined
}

export async function createUserWithNullifier(nullifierHash: string): Promise<SelectUser | null> {
  // Ensure the nullifier hash is unique before attempting to insert,
  // although the database constraint should also handle this.
  const existingUser = findUserByNullifierHash(nullifierHash);
  if (existingUser) {
    console.warn(`User with nullifier hash ${nullifierHash} already exists.`);
    return existingUser; // Or handle as an error depending on desired logic
  }

  try {
    const newUser = await db
      .insert(usersTable)
      .values({ worldIdNullifierHash: nullifierHash })
      // Address is omitted, will be null (or its default if defined)
      // createdAt should be handled by the schema default
      .returning()
      .get(); // Use .get() for SQLite
    return newUser;
  } catch (error) {
    console.error(`Error creating user for nullifier hash ${nullifierHash}:`, error);
    return null; // Return null if creation fails
  }
}

export async function getUsersByIds(ids: number[]): Promise<Record<number, SelectUser>> {
  if (!ids.length) return {};
  const users = await db.select().from(usersTable).where(inArray(usersTable.id, ids)).all();
  return Object.fromEntries(users.map((u) => [u.id, u]));
}
