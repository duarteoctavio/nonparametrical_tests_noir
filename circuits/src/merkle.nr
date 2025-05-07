use std::hash::poseidon;

pub struct MerkleThree<let SIZE: u32, let DEPTH: u32> {
    leafs: [Field; SIZE],
    current: u32,
}

comptime fn merkle_three_test(power_of_two: Field) -> Quoted {
    let depth: u32 = power_of_two as u32;
    let base: Field = 2;
    let n: u32 = base.pow_32(power_of_two) as u32;
    quote {
        MerkleThree::<$n, $depth>::new()
    }
}
pub comptime fn merkle_three(power_of_two: Field) -> Quoted {
    let depth: u32 = power_of_two as u32;
    let base: Field = 2;
    let n: u32 = base.pow_32(power_of_two) as u32;
    quote {
        merkle::MerkleThree::<$n, $depth>::new()
    }
}


impl<let N: u32, let DEPTH: u32> MerkleThree<N, DEPTH> {
    pub fn new() -> Self {
        Self { leafs: [0; N], current: 0 }
    }

    pub fn add_leaf(&mut self, leaf: Field) {
        assert(self.current < N, "Tree is full");
        self.leafs[self.current] = leaf;
        self.current += 1;
    }

    pub fn root(self) -> Field {
        assert(2.pow_32(DEPTH as Field) == N as Field, "Tree is not full");
        let mut buf: [Field; N] = [0; N];

        for i in 0..self.leafs.len() {
            buf[i] = self.leafs[i];
        }

        for current in 0..DEPTH {
            let limit = N / 2.pow_32((current + 1) as Field) as u32;
            for i in 0..N {
                if (i < limit) {
                    buf[i] = poseidon::bn254::hash_2([buf[2*i], buf[(2*i) + 1]]);
                }
            }
        }

        buf[0]
    }
}

#[test]
fn test_root_of_empty_tree_is_hash_of_zeroes() {
    let merkle = MerkleThree::<2, 1>::new();

    assert_eq(merkle.root(), poseidon::bn254::hash_2([0, 0]));
}

#[test]
fn test_add_element_change_root() {
    let mut merkle = MerkleThree::<2, 1>::new();
    let old_root = merkle.root();
    merkle.add_leaf(1);

    assert(old_root != merkle.root());
}

#[test]
fn test_add_element_change_root2() {
    let mut merkle = MerkleThree::<2, 1>::new();
    let root_0 = merkle.root();
    merkle.add_leaf(1);
    let root_1 = merkle.root();
    merkle.add_leaf(2);
    let root_2 = merkle.root();

    assert(root_0 != root_1);
    assert(root_1 != root_2);
    assert(root_0 != root_2);
}

#[test]
fn test_add_element_change_root3() {
    let mut merkle = MerkleThree::<4, 2>::new();
    let root_0 = merkle.root();
    merkle.add_leaf(1);
    let root_1 = merkle.root();
    merkle.add_leaf(2);
    let root_2 = merkle.root();
    merkle.add_leaf(3);
    let root_3 = merkle.root();

    assert(root_0 != root_1);
    assert(root_1 != root_2);
    assert(root_0 != root_2);
    assert(root_0 != root_3);
    assert(root_1 != root_3);
    assert(root_2 != root_3);
}

#[test]
fn test_one_simple_example() {
    let mut merkle = MerkleThree::<4, 2>::new();
    merkle.add_leaf(1);
    merkle.add_leaf(2);
    merkle.add_leaf(3);
    merkle.add_leaf(4);

    let root = poseidon::bn254::hash_2([
        poseidon::bn254::hash_2([1, 2]),
        poseidon::bn254::hash_2([3, 4])
    ]);

    assert_eq(merkle.root(), root);
}

#[test]
fn test_one_simple_example_size_8() {
    let mut merkle = MerkleThree::<8, 3>::new();
    merkle.add_leaf(1);
    merkle.add_leaf(2);
    merkle.add_leaf(3);
    merkle.add_leaf(4);
    merkle.add_leaf(5);
    merkle.add_leaf(6);
    merkle.add_leaf(7);
    merkle.add_leaf(8);

    let root = poseidon::bn254::hash_2([
        poseidon::bn254::hash_2([
            poseidon::bn254::hash_2([1, 2]),
            poseidon::bn254::hash_2([3, 4])
        ]),
        poseidon::bn254::hash_2([
            poseidon::bn254::hash_2([5, 6]),
            poseidon::bn254::hash_2([7, 8])
        ])
    ]);

    assert_eq(merkle.root(), root);
}

#[test]
fn test_macro_one_simple_example_size_8() {
    let mut merkle = merkle_three_test!(3);
    merkle.add_leaf(1);
    merkle.add_leaf(2);
    merkle.add_leaf(3);
    merkle.add_leaf(4);
    merkle.add_leaf(5);
    merkle.add_leaf(6);
    merkle.add_leaf(7);
    merkle.add_leaf(8);

    let root = poseidon::bn254::hash_2([
        poseidon::bn254::hash_2([
            poseidon::bn254::hash_2([1, 2]),
            poseidon::bn254::hash_2([3, 4])
        ]),
        poseidon::bn254::hash_2([
            poseidon::bn254::hash_2([5, 6]),
            poseidon::bn254::hash_2([7, 8])
        ])
    ]);

    assert_eq(merkle.root(), root);
}

#[test(should_fail_with = "Tree is full")]
fn test_add_element_after_tree_is_full_reverts() {
    let mut merkle = MerkleThree::<2, 1>::new();
    merkle.add_leaf(1);
    merkle.add_leaf(2);
    merkle.add_leaf(3); // fails
}
