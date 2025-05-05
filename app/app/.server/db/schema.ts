// Defines database schema using Drizzle ORM
// Updated usersTable: Added worldIdNullifierHash for World ID integration.
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "./common-schema";

export const usersTable = sqliteTable(
  "users",
  {
    id: id(),
    address: text("address").unique(), // Wallet address, optional if logged in via World ID first
    name: text("name"),
    worldIdNullifierHash: text("world_id_nullifier_hash").unique(), // World ID nullifier hash, optional
    createdAt: createdAt(),
  },
  // Optional: Add index for faster lookups if needed
  // (t) => ({
  //   worldIdIdx: index("users_world_id_idx").on(t.worldIdNullifierHash),
  // })
);

export const experimentsTable = sqliteTable(
  "experiments",
  {
    id: id(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    bounty: integer("bounty").notNull(),
    creatorId: integer("creator_id")
      .notNull()
      .references(() => usersTable.id),
    createdAt: createdAt(),
  },
  (t) => [index("experiments_creator_id_idx").on(t.creatorId)],
);
