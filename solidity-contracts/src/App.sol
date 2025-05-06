// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {IVerifier} from './Verifier.sol';

contract App {
    struct Experiment {
        bytes32 processHash;
        address author;
        IVerifier verifier;
        uint256 bounty;
    }

    struct Revalidation {
        bytes32 experimentId;
        bytes proof;
        bytes32 dataSetMerkleRoot;
        address revalidator;
        bool approved;
    }

    mapping(bytes32 => Experiment) internal proposals;
    mapping(bytes32 => Revalidation) internal revalidations;


    constructor() {}

    function proposeExperiment(bytes32 processHash, IVerifier verifier, uint256 bounty) payable external returns (bytes32) {
        address author = msg.sender;
        bytes32 experimentId = calculateExperimentId(author, processHash);
        require(msg.value == bounty, "Not exact amount of bounty");
        Experiment memory proposal = Experiment({
            processHash: processHash,
            author: author,
            verifier: verifier,
            bounty: bounty
        });
        proposals[experimentId] = proposal;
        return experimentId;
    }

    function publishRevalidation(bytes32 experimentId, bytes calldata proof, bytes32 dataSetMerkleRoot) external {
        Experiment memory experiment = proposals[experimentId];

        bool isValid = experiment.verifier.verify(proof, arrayOfOneElement(dataSetMerkleRoot));
        require(isValid, "Invalid proof");

        revalidations[experimentId] = Revalidation({
            proof: proof,
            dataSetMerkleRoot: dataSetMerkleRoot,
            experimentId: experimentId,
            revalidator: msg.sender,
            approved: false
        });
    }

    function approveRevalidation(bytes32 experimentId) external {
        Experiment memory experiment = proposals[experimentId];
        require(experiment.author == msg.sender, "Not authorized");
        Revalidation memory revalidation = revalidations[experimentId];
        revalidation.approved = true;
        payable(revalidation.revalidator).transfer(experiment.bounty);
        revalidation.approved = true;
        revalidations[experimentId] = revalidation;
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
}
