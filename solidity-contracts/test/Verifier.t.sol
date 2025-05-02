// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {HonkVerifier} from "../src/Verifier.sol";

contract VerifierTest is Test {
    HonkVerifier public verifier;
    bytes public proof;
    bytes32[] public pInputs;

    function setUp() public {
        verifier = new HonkVerifier();
        proof = vm.readFileBinary("./src/clean_proof");
        pInputs = vm.readFile("./src/clean_public_inputs");
    }

    function test_readFile() public {
        bytes memory content = vm.readFileBinary("./some-file.txt");
        assertEq(content[0], 'h');
        assertEq(content[1], 'o');
        assertEq(content[2], 'l');
        assertEq(content[3], 'a');
    }

    function test_verifier() public {
        verifier.verify(proof, pInputs);
    }
}
