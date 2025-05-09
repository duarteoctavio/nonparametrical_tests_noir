import { createPublicClient, http } from "viem";
import { anvil } from "viem/chains";

export const rpcClient = createPublicClient({
  transport: http(),
  chain: anvil,
});
