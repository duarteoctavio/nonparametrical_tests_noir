import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { anvil } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { ClientEnv } from "./.server/env";
import { ClientEnvContext } from "./hooks/use-client-env";

const queryClient = new QueryClient();

export function Providers({ children, env }: { children: React.ReactNode; env: ClientEnv }) {
  const config = useMemo(() => {
    return getDefaultConfig({
      appName: "ReValidate",
      projectId: env.WALLET_CONNECT_PROJECT_ID,
      chains: [anvil],
      ssr: true,
    });
  }, [env.WALLET_CONNECT_PROJECT_ID]);

  return (
    <ClientEnvContext.Provider value={env}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ClientEnvContext.Provider>
  );
}
