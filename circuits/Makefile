compile:
	nargo compile

keys:
	bb write_vk -b target/nonparametrical_tests.json -o target --oracle_hash keccak
	# bb write_vk -b ./target/nonparametrical_tests.json -o ./target

contract: compile keys
	bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol

proof:
	nargo execute
	bb prove -b ./target/nonparametrical_tests.json -w ./target/nonparametrical_tests.gz -o ./target  --oracle_hash keccak --output_format bytes_and_fields

verify: proof
	bb verify -k ./target/vk -p ./target/proof  --oracle_hash keccak

clean_proof:
	PROOF_HEX=$(cat ./target/proof | od -An -v -t x1 | tr -d $' \n' | sed 's/^.\{8\}//')

	NUM_PUBLIC_INPUTS=0  # Replace this with the number of public inputs in your circuit
	HEX_PUBLIC_INPUTS=${PROOF_HEX:0:$((32 * $NUM_PUBLIC_INPUTS * 2))}
	SPLIT_HEX_PUBLIC_INPUTS=$(sed -e 's/.\{64\}/"0x&",/g' <<<$HEX_PUBLIC_INPUTS)

	PROOF_WITHOUT_PUBLIC_INPUTS="${PROOF_HEX:$((NUM_PUBLIC_INPUTS * 32 * 2))}"

	echo 0x$PROOF_WITHOUT_PUBLIC_INPUTS
	echo "[${SPLIT_HEX_PUBLIC_INPUTS}]"
