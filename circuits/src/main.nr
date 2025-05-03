mod merkle;
mod wilcoxon_test;


fn main(statistic_threshold: i16, dataset: [i16; 128], expected_root: pub Field) {
    let statistic = wilcoxon_test::get_wilcoxon_t_statistic(dataset);
    let mut merkle = merkle::MerkleThree::<128, 7>::new();

    for elem in dataset {
        merkle.add_leaf(elem as Field);
    }
    let root = merkle.root();
    assert(root == expected_root);
    assert( statistic < statistic_threshold );
}

// #[test(should_fail)]
// fn test_rejection_for_big_threshold() {
//     main(15, [ 5, 5, -7, -9, -10, -12, 15, 17], 0x217e1ba626143e05dce6486d9f7d9ec1857c8d98a2f3e35efe157753c9138d1e)
// }

// #[test(should_fail)]
// fn test_rejection_wrong_root() {
//     main(15, [ 1, -2, 3, -4, 5, -6, -7 , -8], 0xff)
// }

// #[test]
// fn test_verification() {
//     main(15, [ 1, -2, 3, -4, 5, -6, -7 , -8], 0x012cbc2a96babd4a5f1d50b4401b5e6a7056f939a0ff06782e30a8bd7dd6ef70)
// }
