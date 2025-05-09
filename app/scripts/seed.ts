import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { readFileSync } from "fs";
import { seedExperiments } from "./experiments_seeding_data";

import * as schema from '../app/.server/db/schema'
import "dotenv/config"
import path from "path";


const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle(sqlite, { schema: schema });

const newUser = db
      .insert(schema.usersTable)
      .values({ address: "0x04" })
      .returning()
      .get();

for (const experiment of seedExperiments) {
    const buf = readFileSync(path.join("..", "outreach", "experiment_images", experiment.image));
    const newLocal = {
        title: experiment.title,
        description: experiment.description,
        bounty: experiment.bounty / 1000,
        creatorId: newUser.id,
        verifierAddress: "0x03",
        createdAt: new Date(),
        image: buf,
        txHash: "0x01",
        contractId: "0x02",
    };
    db.insert(schema.experimentsTable).values(newLocal).returning().get();
}

