import { Command, Option } from "clipanion";
import { Noir } from "@noir-lang/noir_js";
import toml from 'toml';
import { UltraHonkBackend } from '@aztec/bb.js';
import { readFileSync } from 'fs';


export class ProofCmd extends Command {
    circuitPath = Option.String();
    inputsPath = Option.String();
    outputPath = Option.String();
    

    async execute() {
        const circuitFile = readFileSync(this.circuitPath);
        const inputsFile = readFileSync(this.inputsPath);

        const circuitJson = JSON.parse(await circuitFile.toString());
        const inputMap = toml.parse(await inputsFile.toString());
        const noir = new Noir(circuitJson);
        const { witness } = await noir.execute(inputMap);
        const backend = new UltraHonkBackend(circuitJson.bytecode);
        const proof = await backend.generateProof(witness);
        console.log(proof);
        backend.destroy();
    }
}
