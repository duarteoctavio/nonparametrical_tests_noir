import { db } from '~/db';
import { experiments } from '~/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from '~/types/user';

export type NewExperiment = {
  title: string;
  description: string;
  bounty: number;
  creatorId: number;
};

export type Experiment = {
  id: number;
  title: string;
  description: string;
  bounty: number;
  creatorId: number;
  createdAt: Date;
  creator?: User;
};

export async function createExperiment(data: NewExperiment): Promise<Experiment> {
  const result = await db.insert(experiments).values(data).returning();
  return result[0];
}

export async function getExperimentsByCreator(creatorId: number): Promise<Experiment[]> {
  return db.select().from(experiments).where(eq(experiments.creatorId, creatorId));
}

export async function getAllExperiments(): Promise<Experiment[]> {
  return db.select().from(experiments).orderBy(experiments.createdAt);
} 