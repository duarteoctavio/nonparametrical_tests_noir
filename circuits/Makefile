compile:
	nargo compile

keys:
	bb write_vk -b ./target/nonparametrical_tests.json -o ./target

contract: compile keys
	bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

proof:
	nargo execute
	bb prove -b ./target/nonparametrical_tests.json -w ./target/nonparametrical_tests.gz -o ./target

verify: proof
	bb verify -k ./target/vk -p ./target/proof
