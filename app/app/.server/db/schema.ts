import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "./common-schema";

export const usersTable = sqliteTable("users", {
  id: id(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  createdAt: createdAt(),
});

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
