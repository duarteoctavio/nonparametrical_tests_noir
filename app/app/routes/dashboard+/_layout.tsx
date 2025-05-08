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
        {/* Top Navbar - now inside SidebarInset */}
        <nav className="glass shadow-sm mb-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                <h1 className="font-geist text-2xl font-bold text-primary">ReValidate</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-geist text-foreground">
                  Welcome!
                </span>
                <Button
                  variant="default"
                  onClick={() => {
                    if (logoutFormRef.current) submit(logoutFormRef.current);
                  }}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </nav>
        {!breadcrumb.disableHeader && (
          <header className="flex h-16 shrink-0 items-center border-b px-6 transition-[width,height] ease-linear justify-between">
            <span className="text-lg font-semibold md:text-xl">{breadcrumb.label}</span>
            {breadcrumb.label !== "Home" && breadcrumb.label !== "Dashboard" && (
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            )}
          </header>
        )}
        <main className="pt-0 px-6 pb-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
