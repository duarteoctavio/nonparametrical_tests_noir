import { Outlet, Form, useSubmit } from "@remix-run/react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";

export default function Layout() {
  const { isConnected } = useAccount();
  const submit = useSubmit();
  const logoutFormRef = useRef<HTMLFormElement>(null);
  const [wasConnected, setWasConnected] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (wasConnected === undefined) {
      setWasConnected(isConnected);
      return;
    }

    if (wasConnected && !isConnected && logoutFormRef.current) {
      console.log("Wallet disconnected, submitting logout form.");
      submit(logoutFormRef.current);
    }

    setWasConnected(isConnected);
  }, [isConnected, wasConnected, submit]);

  return (
    <SidebarProvider>
      <Form ref={logoutFormRef} method="post" action="/logout" style={{ display: "none" }} />

      <AppSidebar />
      <main className="flex flex-1 flex-col bg-background">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
