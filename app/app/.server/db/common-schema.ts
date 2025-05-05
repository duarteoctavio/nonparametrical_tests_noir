import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

import { generatePublicId } from "~/.server/utils/public-id";

export const id = () => integer("id").primaryKey({ autoIncrement: true });

export const publicId = () =>
  text("public_id")
    .unique()
    .notNull()
    .$default(() => generatePublicId());

export const createdAt = () =>
  integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => sql`unixepoch()`);

export const updatedAt = () =>
  integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => sql`unixepoch()`)
    .$onUpdate(() => new Date());

export const timestamps = () => ({
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
