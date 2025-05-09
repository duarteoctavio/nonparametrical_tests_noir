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

        address verifier = address(new HonkVerifier());
        console.log("Verifier deployed");
        console.logAddress(verifier);

        address app = address(new App());
        console.log("App deployed");
        console.logAddress(app);

        vm.stopBroadcast();
    }
}