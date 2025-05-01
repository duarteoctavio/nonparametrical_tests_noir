// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {HonkVerifier} from "../src/Verifier.sol";

contract VerifierTest is Test {
    HonkVerifier public verifier;
    function setUp() public {
        verifier = new HonkVerifier();
        bytes memory proof = vm.readFileBinary("./src/proof")
    }

    function test_readFile() public {
        bytes memory content = vm.readFileBinary("./some-file.txt");
        assertEq(content[0], 'h');
        assertEq(content[1], 'o');
        assertEq(content[2], 'l');
        assertEq(content[3], 'a');
    }
}
