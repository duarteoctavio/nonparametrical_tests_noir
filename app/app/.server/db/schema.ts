import { sqliteTable, text, integer, index, blob, real } from "drizzle-orm/sqlite-core";
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
    bounty: real("bounty").notNull(),
    creatorId: integer("creator_id")
      .notNull()
      .references(() => usersTable.id),
    createdAt: createdAt(),
    verifierAddress: text("verifier_address").notNull(),
    image: blob("image", { mode: "buffer" }).notNull(),
    txHash: text("tx_hash").notNull(),
    contractId: text("contract_id").notNull(),
    revalidatedAt: integer("revalidated_at", { mode: "timestamp" }),
    revalidatedBy: text("revalidated_by"),
    claimedAt: integer("claimed_at", { mode: "timestamp" }),
  },
  (t) => [index("experiments_creator_id_idx").on(t.creatorId)],
);
