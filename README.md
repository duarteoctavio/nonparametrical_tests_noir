# ReValidate: Science that needs no trust—proof by design, not by promise.

## About the project

This project provides a protocol which allows researchers to design testing procedures which require 0 trust about procedural integrity. By committing to a truth criteria before the research starts and by receiving the data from a third party revalidator who ignores this criteria, a theory proponent is effectively impossibilitated to manipulate results in any way and therefore this same proponent can affirm their procedure is clean.

We created adequate circuits, contracts and a platform to allow this kind of research interaction.


## Development Circumstances

* This project was fully created by the ReValidate team during Noirhack, april/may 2025.
* ZK circuits were fully coded using noir. In this project, they ensure the data generates the commited merkle root three, used to prove the dataset that will be published at the very end of the process hasn't been tampered with.
* The ZK circuits also encode a truth criteria (typically, a statistical test), this allows a researcher to prove they haven't indulged into criteria manipualtion of p value hacking.

# How to run the project

* A Dockerized version is comming soon!

## System dependencies

1- Forge.
2- Bun.
3- Metamask or equivalent wallet in your browser. You need to add anvil as a custom network and add one of anvil's test accounts to it.

## Start the devnet

* We are using a basic anvil run. If you are using a current version of `forge`, just calling `anvil` should be enough.

## Publish the associated smart contracts

* Navigate into the `solidity-contracts` folder.
* `forge script ./script/Verifier.s.sol:Deployer --rpc-url=http://localhost:8545 --broadcast --private-key="0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d" --optimize`

This will publish the contracts into the devnet as required. If you use these constants, the example .env file we are attaching should just work for you.

## Start the frontend

* Navigate into the `app` folder.
* Install dependencies with the `bun i` command.
* Initialize the database with the `bun db:push` command.
* Launch the site with `bun dev`.

## Using the platform.

* Once metamask is configured, you can use your wallet to log in.
* Follow instructions in our [walkthrough video](https://www.youtube.com/watch?v=qvAI-hRZBBc&ab_channel=OctavioDuarte).
