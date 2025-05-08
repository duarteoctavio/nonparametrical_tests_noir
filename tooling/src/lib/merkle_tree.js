import {poseidon2} from "poseidon-lite";
// const poseidon2 = require("poseidon-lite");

export class MerkleTree {
    constructor({
        depth,
    }) {
        let emptyArray = Array(2**depth).fill(0);
        this.size = 2**depth;
        this.depth = depth;
        this.leafs = emptyArray;
        this.current = 0;
    };

    add_leaf(leaf) {
        if (this.current >= self.size) {
            throw new Error("Tree is full");
        };
        this.leafs[this.current] = leaf;
        this.current++;
    };

    root() {
        if (this.leafs.length != this.size) {
            throw new Error("Tree is not full");
        };

        let buf = structuredClone(this.leafs);
        for (let level = 0; level < this.depth; level++) {
            let limit = this.size / (2**level + 1);
            for (let index = 0; index < limit; index++) {
                buf[index] = poseidon2([
                    buf[2*index],
                    buf[(2*index) + 1]
                ]);
            }
        }
        return buf[0];
    };
}


