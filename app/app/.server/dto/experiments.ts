import { db } from "~/.server/db";
import { experimentsTable } from "~/.server/db/schema";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertExperiment = InferInsertModel<typeof experimentsTable>;
export type SelectExperiment = InferSelectModel<typeof experimentsTable>;

export function createExperiment(data: InsertExperiment) {
  const result = db.insert(experimentsTable).values(data).returning().get();
  return result;
}

export function getExperimentsByCreator(creatorId: number) {
  return db.select().from(experimentsTable).where(eq(experimentsTable.creatorId, creatorId)).all();
}

export function getAllExperiments() {
  return db.select().from(experimentsTable).orderBy(experimentsTable.createdAt).all();
}
