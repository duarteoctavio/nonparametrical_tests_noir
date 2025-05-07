// Updated providers setup for Wagmi v2 / RainbowKit v1
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"; // Need QueryClient for RainbowKit v1+
import { ClientOnly } from "./components/client-only";

const config = getDefaultConfig({
  appName: "ReValidate",
  projectId: "d15c85f3708f1fec67a241a18774984f", // this should be in the .env but I am lazy :)
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://eth.llamarpc.com"),
  },
  ssr: true, // Important for Remix
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ClientOnly>
  );
}
