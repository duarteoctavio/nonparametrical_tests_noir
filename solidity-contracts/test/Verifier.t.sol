// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {HonkVerifier} from "../src/Verifier.sol";


contract VerifierTest is Test {
    HonkVerifier public verifier;
    bytes public fullProof;
    bytes32[] public inputs;
    uint256 constant public PUBLIC_INPUTS_LENGTH = 1;

    function setUp() public {
        verifier = new HonkVerifier();
        fullProof = vm.readFileBinary("./test/proof");
    }

    function test_verifier() public view {
        (bytes memory proof, bytes32[] memory pubInputs) = splitProof(fullProof);
        
        verifier.verify(proof, pubInputs);
    }

    function splitProof(bytes memory fullProofBytes) private pure returns (bytes memory proof, bytes32[] memory pubInputs) {
        // First remove the first 4 bytes with the length
        bytes memory proofSlice = new bytes(fullProofBytes.length - 4);
        for(uint i = 4; i < fullProofBytes.length; i++) {
            proofSlice[i - 4] = fullProofBytes[i];
        }

        // Then convert the bytes to bytes32[]
        bytes32[] memory fullProofWords = bytesToBytes32Array(proofSlice);
        
        // Then extract the public inputs
        pubInputs = new bytes32[](PUBLIC_INPUTS_LENGTH);
        for(uint i = 0; i < PUBLIC_INPUTS_LENGTH; i++) {
            pubInputs[i] = fullProofWords[i];
        }

        // Lastly recovert the proof to bytes
        bytes32[] memory proofWords = new bytes32[](fullProofWords.length - 1);
        for(uint i = 1; i < fullProofWords.length; i++) {
            proofWords[i - 1] = fullProofWords[i];
        }
        proof = bytes32ArrayToBytes(proofWords);
    }

    function bytesToBytes32Array(bytes memory data)
        private
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

    function bytes32ArrayToBytes(bytes32[] memory data)
        private
        pure
        returns (bytes memory)
    {
        bytes memory result = new bytes(data.length * 32);
        for(uint i = 0; i < data.length; i++) {
            assembly {
                mstore(add(result, add(32, mul(i, 32))), mload(add(data, add(32, mul(i, 32)))))
            }
        }
        return result;
    }
}
