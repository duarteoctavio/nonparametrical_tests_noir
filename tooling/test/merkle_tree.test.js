import { MerkleTree } from "../src/lib/merkle_tree";
import { poseidon2 } from "poseidon-lite";
// const MerkleTree = require("../src/lib/merkle_tree");

describe("The tree behaves as the noir version", () => {
    test("Test root of empty tree is hash of zeroes", () => {
        let merkle = new MerkleTree({ depth: 1 });
        let hashOfZeroes = poseidon2([
            0,
            0
        ]);
        expect(merkle.root()).toBe(hashOfZeroes);
    });
    test("Adding an element changes the root", () => {
        let merkle = new MerkleTree({ depth: 1 });
        console.log(merkle);
        let old_root = structuredClone(merkle.root());
        merkle.add_leaf(1);
        console.log(merkle);
        expect(old_root != merkle.root()).toBe(true);
    });

    test("Simple example, size 8", () => {
        let merkle = new MerkleTree({ depth:3 });
        merkle.add_leaf(1);
        merkle.add_leaf(2);
        merkle.add_leaf(3);
        merkle.add_leaf(4);
        merkle.add_leaf(5);
        merkle.add_leaf(6);
        merkle.add_leaf(7);
        merkle.add_leaf(8);
        let expectedRoot = poseidon2([
            poseidon2([
                poseidon2([1, 2]),
                poseidon2([3,4]),
            ]),
            poseidon2([
                poseidon2([5, 6]),
                poseidon2([7,8]),
            ]),
        ]);
        expect(expectedRoot).toBe(merkle.root());
    });
});
