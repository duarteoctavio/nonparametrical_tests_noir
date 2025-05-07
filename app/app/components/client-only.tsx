// Client-only wrapper component
import { useEffect, useState, type ReactNode } from "react";

export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render null on the server and during the initial client render
  if (!mounted) {
    return null;
  }

  // Render children only after mounting on the client
  return <>{children}</>;
}
