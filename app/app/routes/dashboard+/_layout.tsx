// Combined version of dashboard layout with authentication and neobrutalist UI
import { Outlet, Form, useSubmit, useLoaderData, useNavigate } from "@remix-run/react";
import { ArrowLeftIcon } from "lucide-react";
import { AppSidebar } from "~/components/app-sidebar";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";
import useDashboardTopbar from "~/hooks/use-dashboard-topbar";

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
  const breadcrumb = useDashboardTopbar();
  const navigate = useNavigate();

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
      <SidebarInset>
        {!breadcrumb.disableHeader && (
          <header className="flex h-16 shrink-0 items-center border-b px-6 transition-[width,height] ease-linear">
            {breadcrumb.backButton && (
              <Button
                variant="ghost"
                className="mr-2 hidden md:flex"
                size="icon"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeftIcon />
              </Button>
            )}
            <span className="text-lg font-semibold md:text-xl">{breadcrumb.label}</span>
          </header>
        )}
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
