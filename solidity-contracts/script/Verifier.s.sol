// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {HonkVerifier} from "../src/Verifier.sol";
import {App} from "../src/App.sol";

contract Deployer is Script {
    HonkVerifier public verifier;
    App public app;
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        verifier = new HonkVerifier();
        console.log("Verifier deployed");
        console.logAddress(address(verifier));

        app = new App();
        console.log("App deployed");
        console.logAddress(address(app));

        vm.stopBroadcast();
    }
}