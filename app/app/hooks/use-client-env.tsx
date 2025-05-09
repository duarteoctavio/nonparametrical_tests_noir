import { createContext, useContext } from "react";
import { ClientEnv } from "../.server/env"; // Assuming ClientEnv is exported from here

export const ClientEnvContext = createContext<ClientEnv | undefined>(undefined);

export function useClientEnv() {
  const context = useContext(ClientEnvContext);
  if (context === undefined) {
    throw new Error("useClientEnv must be used within a ClientEnvProvider");
  }
  return context;
}
