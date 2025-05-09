import { type CompiledCircuit } from "@noir-lang/types";
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import { z } from "zod";

const numericString = z.string().regex(/^-?\d+/);

const inputMapSchema = z.object({
  statistic_threshold: z.number(),
  dataset: z.array(numericString),
  expected_root: numericString,
});

export type InputMap = z.infer<typeof inputMapSchema>;

export async function generateProof(circuit: CompiledCircuit, inputs: InputMap) {
  console.log("generateProof 1");
  const noir = new Noir(circuit);
  console.log("generateProof 2");
  const { witness } = await noir.execute(inputs);
  console.log("generateProof 3");
  const backend = new UltraHonkBackend(circuit.bytecode);
  console.log("generateProof 4");
  const proof = await backend.generateProof(witness, { keccak: true });
  console.log("generateProof 5");
  backend.destroy();
  console.log("generateProof 6");
  return proof;
}
