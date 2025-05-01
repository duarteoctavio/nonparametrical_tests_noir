// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {App} from "../src/App.sol";
import {IVerifier} from '../src/Verifier.sol';

contract TestVerifier is IVerifier {
    bool public nextResult;
    constructor() {
        nextResult = true;
    }

    function verify(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool) {
        return nextResult;
    }

    function setNextResult(bool _nextResult) external {
        nextResult = _nextResult;
    }
}

contract VerifierTest is Test {
    App public app;
    

    function setUp() public {
        app = new App();
    }

    function test_proposeExperiment() public {
        TestVerifier verifier = new TestVerifier();
        bytes32 processHash = keccak256("easy to repeat process");
        bytes32 experimentId = app.proposeExperiment{value: 1 ether}(processHash, verifier, 1 ether);

        assertEq(app.findExperiment(experimentId).author, address(this));
        assertEq(app.findExperiment(experimentId).processHash, processHash);
        assertEq(app.findExperiment(experimentId).bounty, 1 ether);
        assertEq(address(app.findExperiment(experimentId).verifier), address(verifier));
        assertEq(address(app).balance, 1 ether);
    }

    function test_proposeExperimentRevertsWhenNotEnoughEth() public {
        TestVerifier verifier = new TestVerifier();
        bytes32 processHash = keccak256("easy to repeat process");

        vm.expectRevert("Not exact amount of bounty");
        app.proposeExperiment{value: 0.9 ether}(processHash, verifier, 1 ether);
    }

    function test_proposeExperimentRevertsWhenTooMuchBounty() public {
        TestVerifier verifier = new TestVerifier();
        bytes32 processHash = keccak256("easy to repeat process");

        vm.expectRevert("Not exact amount of bounty");
        app.proposeExperiment{value: 1.1 ether}(processHash, verifier, 1 ether);
    }

    function test_publishRevalidation() public {
        TestVerifier verifier = new TestVerifier();
        bytes32 processHash = keccak256("easy to repeat process");
        bytes32 experimentId = app.proposeExperiment{value: 1 ether}(processHash, verifier, 1 ether);

        address revalidator = address(0x123);
        bytes32 merkleRoot = keccak256("merkle root");
        vm.prank(revalidator);
        app.publishRevalidation(experimentId, bytes("proof"), merkleRoot);

        App.Revalidation memory revalidation = app.findRevalidation(experimentId);
        assertEq(revalidation.proof, bytes("proof"));
        assertEq(revalidation.dataSetMerkleRoot, merkleRoot);
        assertEq(revalidation.experimentId, experimentId);
        assertEq(revalidation.revalidator, revalidator);
        assertEq(revalidation.approved, false);
    }

    function test_publishRevalidationRevertsWhenValidatorDoesNotSucceed() public {
        TestVerifier verifier = new TestVerifier();
        bytes32 processHash = keccak256("easy to repeat process");
        bytes32 experimentId = app.proposeExperiment{value: 1 ether}(processHash, verifier, 1 ether);

        bytes32 merkleRoot = keccak256("merkle root");
        verifier.setNextResult(false);
        vm.expectRevert("Invalid proof");
        app.publishRevalidation(experimentId, bytes("proof"), merkleRoot);
    }

    function test_approveRevalidation() public {
        address author = address(0x123);
        address revalidator = address(0x456);
        payable(author).transfer(2 ether);
        payable(revalidator).transfer(2 ether);
        TestVerifier verifier = new TestVerifier();

        bytes32 processHash = keccak256("easy to repeat process");
        vm.prank(author);
        bytes32 experimentId = app.proposeExperiment{value: 1 ether}(processHash, verifier, 1 ether);

        bytes32 merkleRoot = keccak256("merkle root");
        vm.prank(revalidator);
        app.publishRevalidation(experimentId, bytes("proof"), merkleRoot);

        vm.prank(author);
        uint256 balanceBefore = revalidator.balance;
        app.approveRevalidation(experimentId);
        assertEq(revalidator.balance, balanceBefore + 1 ether);

        assertEq(address(app).balance, 0 ether);
        
        App.Revalidation memory revalidation = app.findRevalidation(experimentId);
        assertEq(revalidation.approved, true);
    }
}
