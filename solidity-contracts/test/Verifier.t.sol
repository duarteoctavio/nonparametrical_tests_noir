// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {HonkVerifier} from "../src/Verifier.sol";


contract VerifierTest is Test {
    HonkVerifier public verifier;
    bytes public proof;
    bytes public pInputs;
    bytes32[] public inputs;

    function setUp() public {
        verifier = new HonkVerifier();
        proof = vm.readFileBinary("./src/clean_proof");
        pInputs = vm.readFileBinary("./src/clean_public_inputs");
    }

    function bytesToBytes32Array(bytes memory data)
        public
        pure
        returns (bytes32[] memory)
    {
        // Find 32 bytes segments nb
        uint256 dataNb = data.length / 32;
        // Create an array of dataNb elements
        bytes32[] memory dataList = new bytes32[](dataNb);
        // Start array index at 0
        uint256 index = 0;
        // Loop all 32 bytes segments
        for (uint256 i = 32; i <= data.length; i = i + 32) {
            bytes32 temp;
            // Get 32 bytes from data
            assembly {
            temp := mload(add(data, i))
                    }
            // Add extracted 32 bytes to list
            dataList[index] = temp;
            index++;
        }
        // Return data list
        return (dataList);
    }

    function test_readFile() public {
        bytes memory content = vm.readFileBinary("./some-file.txt");
        assertEq(content[0], 'h');
        assertEq(content[1], 'o');
        assertEq(content[2], 'l');
        assertEq(content[3], 'a');
    }

    function test_verifier() public {
        inputs = bytesToBytes32Array(pInputs);
        verifier.verify(proof, inputs);
    }
}
