mod merkle;
mod wilcoxon_test;


fn main(statistic_threshold: i16, dataset: [i16; 32], expected_root: Field) {
    let mut merkle = merkle::merkle_three!(5);

    for elem in dataset {
        merkle.add_leaf(elem as Field);
    }
    let root = merkle.root();
    let statistic = wilcoxon_test::get_wilcoxon_t_statistic(dataset);
    assert(root == expected_root);
    assert( statistic < statistic_threshold );
}

#[test(should_fail)]
fn test_rejection_for_big_threshold() {
    main(
        15,
        [418,-430,-673,1008,-1180,1227,1331,-1598,1964,-2054,2870,-3040,3275,3292,-4092,-4129,-4212,-4319,4423,-4723,4748,-4789,5383,-5968,-6018,-6231,6419,-6463,6502,6653,6683,-6691],
        0x10c5ecf6c58460eb00eba98b21ef57d36671753cc77d111bfedb8f3dbfb7f4ff
    )
}

#[test(should_fail)]
fn test_rejection_wrong_root() {
    main(
        15,
        [418,-430,-673,1008,-1180,1227,1331,-1598,1964,-2054,2870,-3040,3275,3292,-4092,-4129,-4212,-4319,4423,-4723,4748,-4789,5383,-5968,-6018,-6231,6419,-6463,6502,6653,6683,-6691],
        0xff
    )
}

#[test]
fn test_verification() {
    main(
        4227,
        [418,-430,-673,1008,-1180,1227,1331,-1598,1964,-2054,2870,-3040,3275,3292,-4092,-4129,-4212,-4319,4423,-4723,4748,-4789,5383,-5968,-6018,-6231,6419,-6463,6502,6653,6683,-6691],
        0x10c5ecf6c58460eb00eba98b21ef57d36671753cc77d111bfedb8f3dbfb7f4ff
    )
}

