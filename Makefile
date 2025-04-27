compile:
	nargo compile

keys:
	bb write_vk -b target/nonparametrical_tests.json -o target --oracle_hash keccak

contract:
	bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

build_everything: compile keys contract
	echo "Done"
