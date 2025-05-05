import { Outlet, Form, useSubmit, useLoaderData } from "@remix-run/react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";

// Add a loader function for the layout
export async function loader({ request }: LoaderFunctionArgs) {
  // This ensures the user is logged in for all dashboard routes
  // requireUserId returns the user object or throws a redirect
  const user = await requireUserId(request);
  return json({ user }); // Return the user data
}

// Helper function to display user identifier
function getUserDisplayIdentifier(
  user:
    | { id: number; walletAddress?: string | null; worldIdNullifierHash?: string | null }
    | null
    | undefined,
): string {
  if (!user) return "Guest";
  if (user.walletAddress) {
    // Shorten address for display
    return `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`;
  }
  if (user.worldIdNullifierHash) {
    return "World ID Verified";
  }
  return `User ${user.id}`; // Fallback
}

export default function Layout() {
  const { isConnected } = useAccount();
  const submit = useSubmit();
  const logoutFormRef = useRef<HTMLFormElement>(null);
  const [wasConnected, setWasConnected] = useState<boolean | undefined>(undefined);

  // --- Get user data from THIS layout's loader ---
  const { user } = useLoaderData<typeof loader>(); // Use the loader defined above
  const userIdentifier = getUserDisplayIdentifier(user);

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
      {/* Hidden form for programmatic logout (e.g., on wallet disconnect) */}
      <Form ref={logoutFormRef} method="post" action="/logout" style={{ display: "none" }} />

      {/* Pass user info to sidebar for display */}
      <AppSidebar
        userIdentifier={userIdentifier}
        onLogout={() => {
          if (logoutFormRef.current) submit(logoutFormRef.current);
        }}
      />
      <main className="flex flex-1 flex-col bg-background">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
