import { db } from "~/.server/db";
import { experimentsTable } from "~/.server/db/schema";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertExperiment = InferInsertModel<typeof experimentsTable>;
export type SelectExperiment = InferSelectModel<typeof experimentsTable>;

export function createExperiment(data: InsertExperiment) {
  const result = db.insert(experimentsTable).values(data).returning().get();
  return result;
}

export async function getExperimentByHash(hash: string): Promise<SelectExperiment> {
  const [ experiment ] = await db.select().from(experimentsTable).where(eq(experimentsTable.txHash, hash)).limit(1);
  if (!experiment) {
    throw new Error("Experiment not found for hash " + hash);
  }
  return experiment;
}

export async function updateExperiment(id: SelectExperiment["id"], data: Partial<InsertExperiment>) {
  await db.update(experimentsTable).set(data).where(eq(experimentsTable.id, id))
}

export function getExperimentsByCreator(creatorId: number) {
  return db.select().from(experimentsTable).where(eq(experimentsTable.creatorId, creatorId)).all();
}

export function getAllExperiments() {
  return db.select().from(experimentsTable).orderBy(experimentsTable.createdAt).all();
}
