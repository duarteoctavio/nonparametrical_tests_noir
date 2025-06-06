// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {IVerifier} from './Verifier.sol';
import {PoseidonT3} from './Poseidon2.sol';


contract App {
    struct Experiment {
        bytes32 processHash;
        address author;
        IVerifier verifier;
        uint256 bounty;
        bool revalidated;
        bool claimed;
    }

    struct Revalidation {
        bytes32 experimentId;
        bytes proof;
        uint256 dataSetMerkleRoot;
        address revalidator;
        bool approved;
        uint256[] samples;
    }

    event ExperimentProposed(bytes32 indexed experimentId);

    mapping(bytes32 => Experiment) internal proposals;
    mapping(bytes32 => Revalidation) internal revalidations;

    uint256 public constant SAMPLE_LENGTH = 32;


    constructor() {}

    function proposeExperiment(bytes32 processHash, IVerifier verifier, uint256 bounty) payable external returns (bytes32) {
        address author = msg.sender;
        bytes32 experimentId = calculateExperimentId(author, processHash);
        require(msg.value == bounty, "Not exact amount of bounty");
        Experiment memory proposal = Experiment({
            processHash: processHash,
            author: author,
            verifier: verifier,
            bounty: bounty,
            revalidated: false,
            claimed: false
        });
        proposals[experimentId] = proposal;
        emit ExperimentProposed(experimentId);
        return experimentId;
    }

    function publishRevalidation(bytes32 experimentId, bytes calldata proof, uint256 dataSetMerkleRoot) external {
        Experiment memory experiment = proposals[experimentId];

        bool isValid = experiment.verifier.verify(proof, arrayOfOneElement(bytes32(dataSetMerkleRoot)));
        require(isValid, "Invalid proof");
        require(!experiment.revalidated, "Experiment already revalidated");
        revalidations[experimentId] = Revalidation({
            proof: proof,
            dataSetMerkleRoot: dataSetMerkleRoot,
            experimentId: experimentId,
            revalidator: msg.sender,
            approved: false,
            samples: new uint256[](SAMPLE_LENGTH)
        });
    }

    function approveRevalidation(bytes32 experimentId) external {
        Experiment storage experiment = proposals[experimentId];
        require(experiment.author == msg.sender, "Not authorized");
        Revalidation storage revalidation = revalidations[experimentId];

        revalidation.approved = true;
        experiment.revalidated = true;
    }

    function claimBounty(bytes32 experimentId, uint256[SAMPLE_LENGTH] calldata samples) external {
        Experiment storage experiment = proposals[experimentId];
        Revalidation memory revalidation = revalidations[experimentId];
        require(experiment.revalidated, "Experiment not revalidated");
        require(revalidation.revalidator == msg.sender, "Not authorized");
        require(!experiment.claimed, "Bounty already claimed");
        require(samples.length == SAMPLE_LENGTH, "Invalid number of samples");
        uint256 recalculated = recalculateMerkleRoot(samples);
        require(recalculated == revalidation.dataSetMerkleRoot, "Merkle root does not match");

        payable(revalidation.revalidator).transfer(experiment.bounty);
        experiment.claimed = true;
    }

    /// Read methods

    function findExperiment(bytes32 experimentId) public view returns (Experiment memory) {
        return proposals[experimentId];
    }

    function findRevalidation(bytes32 experimentId) public view returns (Revalidation memory) {
        return revalidations[experimentId];
    }


    /// Private methods

    function calculateExperimentId(address author, bytes32 processHash) public pure returns (bytes32) {
        return keccak256(abi.encode(author, processHash));
    }

    function arrayOfOneElement(bytes32 element) public pure returns (bytes32[] memory) {
        bytes32[] memory array = new bytes32[](1);
        array[0] = element;
        return array;
    }

    function arrayOfTwoElements(uint256 element1, uint256 element2) public pure returns (uint256[2] memory) {
        uint256[2] memory array;
        array[0] = element1;
        array[1] = element2;
        return array;
    }

    function recalculateMerkleRoot(uint256[SAMPLE_LENGTH] calldata samples) public pure returns (uint256) {
        uint256[] memory hashes = new uint256[](samples.length);
        uint256 depth = 5;
        for (uint256 i = 0; i < samples.length; i++) {
            hashes[i] = samples[i];
        }

        for (uint256 level = 0; level < depth; level++) {
            uint256 limit = SAMPLE_LENGTH / (1 << (level + 1));
            for (uint256 index = 0; index < limit; index++) {
                hashes[index] = PoseidonT3.hash(arrayOfTwoElements(hashes[2 * index], hashes[2 * index + 1]));
            }
        }

        return hashes[0];
    }
}
