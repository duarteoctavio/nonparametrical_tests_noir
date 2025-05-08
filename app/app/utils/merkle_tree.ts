import { poseidon2 } from "poseidon-lite";

export function convertToField(n: bigint): bigint {
    if (n > 0) {
        return n
    } else {
        return (1n << 16n) + n
    }
}

export function calculateMerkleRoot(depth: number, numbers: bigint[]): bigint {
    const merkle = new MerkleTree(depth);
    for (const number of numbers) {
        merkle.addLeaf(number);
    }
    return merkle.root()
}

export class MerkleTree {
    maxSize: number;
    depth: number;
    leafs: bigint[];

    constructor(depth: number) {
        const size = 2 ** depth;
        this.maxSize = size;
        this.depth = depth;
        this.leafs = [];
    };

    addLeaf(leaf: bigint): void {
        if (this.leafs.length >= this.maxSize) {
            throw new Error("Tree is full");
        };
        this.leafs.push(leaf);
    }

    root(): bigint {
        if (this.leafs.length != this.maxSize) {
            throw new Error("Tree is not full");
        };

        const buf = [...this.leafs];

        // let len = buf.length;

        for (let level = 0; level < this.depth; level++) {
            const limit = this.maxSize / (2**level + 1);
            console.log("limit", limit);
            for (let index = 0; index < limit; index++) {
                buf[index] = poseidon2([
                    buf[2*index],
                    buf[(2*index) + 1]
                ]);
            }
        }
        return buf[0]!;
    };
}
