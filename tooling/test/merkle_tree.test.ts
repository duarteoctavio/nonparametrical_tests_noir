import { calculateMerkleRoot, convertToField, MerkleTree } from "../src/lib/merkle_tree";
import { poseidon2 } from "poseidon-lite";
import { describe, test, expect } from "@jest/globals";
// const MerkleTree = require("../src/lib/merkle_tree");

describe("The tree behaves as the noir version", () => {
    test("Test root of empty tree is hash of zeroes", () => {
        const merkle = new MerkleTree(1);
        merkle.addLeaf(0n);
        merkle.addLeaf(0n);
        const hashOfZeroes = poseidon2([
            0,
            0
        ]);
        expect(merkle.root()).toBe(hashOfZeroes);
    });

    test("Adding an element changes the root", () => {
        const root1 = calculateMerkleRoot(1, [0n, 0n]);
        const root2 = calculateMerkleRoot(1, [0n, 1n]);
        
        expect(root1).not.toEqual(root2);
    });

    test("Simple example, size 8", () => {
        const root = calculateMerkleRoot(
            3,
            [1n,2n,3n,4n,5n,6n,7n,8n],
        )
        
        const expectedRoot = poseidon2([
            poseidon2([
                poseidon2([1, 2]),
                poseidon2([3,4]),
            ]),
            poseidon2([
                poseidon2([5, 6]),
                poseidon2([7,8]),
            ]),
        ]);
        expect(root).toBe(expectedRoot);
    });

    test("Same value as Noir is generated for example", () => {
        let expectedHash = BigInt("0x10c5ecf6c58460eb00eba98b21ef57d36671753cc77d111bfedb8f3dbfb7f4ff");
        let dataset = [418, -430, -673, 1008, -1180, 1227, 1331, -1598, 1964, -2054, 2870, -3040, 3275, 3292, -4092, -4129, -4212, -4319, 4423, -4723, 4748, -4789, 5383, -5968, -6018, -6231, 6419, -6463, 6502, 6653, 6683, -6691]
            .map( num => BigInt(num))
            .map(convertToField);
        const root = calculateMerkleRoot(5, dataset);
        expect(root).toBe(expectedHash);
    });

    test("-100 is 0xff9c", () => {
        expect(convertToField(-100n)).toBe(0xff9cn)
    })
});
