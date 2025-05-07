import { type CompiledCircuit } from '@noir-lang/types';
import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from '@aztec/bb.js';
import { z } from 'zod';

const numericString = z.string().regex(/^-?\d+/);

const inputMapSchema = z.object({
    statistic_threshold: numericString,
    dataset: z.array(numericString),
    expected_root: numericString
})

export type InputMap = z.infer<typeof inputMapSchema>

export async function generateProof(circuit: CompiledCircuit, inputs: InputMap) {
    const noir = new Noir(circuit);
    const { witness } = await noir.execute(inputs);
    const backend = new UltraHonkBackend(circuit.bytecode);
    const proof = await backend.generateProof(witness, { keccak: true });
    backend.destroy();
    return proof;
}