// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {App} from "../src/App.sol";
import {IVerifier} from '../src/Verifier.sol';
import {PoseidonT3} from '../src/Poseidon2.sol';

contract TestVerifier is IVerifier {
    bool public nextResult;
    constructor() {
        nextResult = true;
    }

    function verify(bytes calldata, bytes32[] calldata) external view returns (bool) {        
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

        App.Experiment memory experiment = app.findExperiment(experimentId);
        assertEq(experiment.author, address(this));
        assertEq(experiment.processHash, processHash);
        assertEq(experiment.bounty, 1 ether);
        assertEq(experiment.revalidated, false);
        assertEq(experiment.claimed, false);
        assertEq(address(experiment.verifier), address(verifier));
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
        uint256 merkleRoot = 0xabc;
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

        uint256 merkleRoot = 0xabc;
        verifier.setNextResult(false);
        vm.expectRevert("Invalid proof");
        app.publishRevalidation(experimentId, bytes("proof"), merkleRoot);
    }

    function test_claimBounty() public {
        address author = address(0x123);
        address revalidator = address(0x456);
        payable(author).transfer(2 ether);
        payable(revalidator).transfer(2 ether);
        TestVerifier verifier = new TestVerifier();

        bytes32 processHash = keccak256("easy to repeat process");
        vm.prank(author);
        bytes32 experimentId = app.proposeExperiment{value: 1 ether}(processHash, verifier, 1 ether);

        uint256[32] memory samples;
        for (uint256 i = 0; i < 32; ++i) {
            samples[i] = 10;
        }
        
        uint256 merkleRoot = app.recalculateMerkleRoot(samples);
        vm.prank(revalidator);
        app.publishRevalidation(experimentId, bytes("proof"), merkleRoot);

        vm.prank(author);
        uint256 balanceBefore = revalidator.balance;
        app.approveRevalidation(experimentId);
        
        vm.prank(revalidator);
        app.claimBounty(experimentId, samples);
        
        assertEq(revalidator.balance, balanceBefore + 1 ether);

        assertEq(address(app).balance, 0 ether);
        
        App.Revalidation memory revalidation = app.findRevalidation(experimentId);
        App.Experiment memory experiment = app.findExperiment(experimentId);

        assertEq(revalidation.approved, true);
        assertEq(experiment.revalidated, true);
        assertEq(revalidation.approved, true);
        assertEq(revalidation.revalidator, revalidator);
        assertEq(experiment.claimed, true);

    }

    function test_merkleRoot() public view {
        int16[32] memory samples;
        samples[0]=418;
        samples[1]=-430;
        samples[2]=-673;
        samples[3]=1008;
        samples[4]=-1180;
        samples[5]=1227;
        samples[6]=1331;
        samples[7]=-1598;
        samples[8]=1964;
        samples[9]=-2054;
        samples[10]=2870;
        samples[11]=-3040;
        samples[12]=3275;
        samples[13]=3292;
        samples[14]=-4092;
        samples[15]=-4129;
        samples[16]=-4212;
        samples[17]=-4319;
        samples[18]=4423;
        samples[19]=-4723;
        samples[20]=4748;
        samples[21]=-4789;
        samples[22]=5383;
        samples[23]=-5968;
        samples[24]=-6018;
        samples[25]=-6231;
        samples[26]=6419;
        samples[27]=-6463;
        samples[28]=6502;
        samples[29]=6653;
        samples[30]=6683;
        samples[31]=-6691;

        uint256[32] memory formatedSamples;

        for (uint256 i = 0; i < 32; i++) {
            int16 num = samples[i];
            formatedSamples[i] = num > 0 ? uint256(abs(num)) : (1 << 16) - abs(num);
        }

        uint256 root = app.recalculateMerkleRoot(formatedSamples);

        assertEq(root, 0x10c5ecf6c58460eb00eba98b21ef57d36671753cc77d111bfedb8f3dbfb7f4ff);
    }

    function test_poseidon() public pure {
        uint256[2] memory array;
        array[0] = 1;
        array[1] = 1;
        assertEq(PoseidonT3.hash(array), 217234377348884654691879377518794323857294947151490278790710809376325639809);
    }

    function abs(int16 x) private pure returns (uint256) {
        return x >= 0 ? uint256(uint16(x)) : uint256(uint16(-x));
    }
}
