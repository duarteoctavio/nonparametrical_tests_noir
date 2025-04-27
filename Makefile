
compile:
	nargo compile

contract:
	bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

keys:
	bb write_vk -b target/nonparametrical_tests.json -o target --oracle_hash keccak

build_everything:
	nargo compile
	bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
	bb write_vk -b target/nonparametrical_tests.json -o target --oracle_hash keccak
