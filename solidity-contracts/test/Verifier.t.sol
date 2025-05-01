// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {HonkVerifier} from "../src/Verifier.sol";

contract VerifierTest is Test {
    HonkVerifier public verifier;
    bytes public proof;

    function setUp() public {
        verifier = new HonkVerifier();
        proof = vm.readFileBinary("./src/proof");
    }

    function test_readFile() public {
        bytes memory content = vm.readFileBinary("./some-file.txt");
        assertEq(content[0], 'h');
        assertEq(content[1], 'o');
        assertEq(content[2], 'l');
        assertEq(content[3], 'a');
    }

    function test_verifier() public {
        bytes32[] memory pInputs;
        // pInputs.push(1);
        verifier.verify(proof, pInputs);
    }
}
