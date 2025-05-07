mod wilcoxon_test;


fn main(statistic_threshold: i16, dataset: [i16; 32], expected_root: Field) {
    let statistic = wilcoxon_test::get_wilcoxon_t_statistic(dataset);
    assert(expected_root as u128 != 0);
    assert( statistic < statistic_threshold );
}

#[test(should_fail)]
fn test_rejection_for_big_threshold() {
    main(
        15,
        [418,-430,-673,1008,-1180,1227,1331,-1598,1964,-2054,2870,-3040,3275,3292,-4092,-4129,-4212,-4319,4423,-4723,4748,-4789,5383,-5968,-6018,-6231,6419,-6463,6502,6653,6683,-6691],
        0x2815ae70918e2300380e522f1b58a0da640f2d0f748a42cd573d3747ce989e0b
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
        0x2815ae70918e2300380e522f1b58a0da640f2d0f748a42cd573d3747ce989e0b
    )
}

