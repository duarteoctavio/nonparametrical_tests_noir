import { Outlet, Form, useSubmit, useLoaderData, useNavigate } from "@remix-run/react";
import { AppSidebar } from "~/components/app-sidebar";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";
import useDashboardTopbar from "~/hooks/use-dashboard-topbar";
import { SelectUser } from "~/.server/dto/users";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  return { user };
}

function getUserDisplayIdentifier(user: SelectUser | null | undefined): string {
  if (!user) return "Guest";
  if (user.address) {
    return `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 4)}`;
  }
  if (user.worldIdNullifierHash) {
    return "World ID Verified";
  }
  return `User ${user.id}`;
}

export default function Layout() {
  const { isConnected } = useAccount();
  const submit = useSubmit();
  const logoutFormRef = useRef<HTMLFormElement>(null);
  const [wasConnected, setWasConnected] = useState<boolean | undefined>(undefined);
  const breadcrumb = useDashboardTopbar();
  const navigate = useNavigate();

  const { user } = useLoaderData<typeof loader>();
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
      <Form ref={logoutFormRef} method="post" action="/logout" style={{ display: "none" }} />

      <AppSidebar
        userIdentifier={userIdentifier}
        onLogout={() => {
          if (logoutFormRef.current) submit(logoutFormRef.current);
        }}
      />
      <SidebarInset>
        {!breadcrumb.disableHeader && (
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-[width,height] ease-linear">
            <span className="text-lg font-semibold md:text-xl">{breadcrumb.label}</span>
            {breadcrumb.label !== "Home" && breadcrumb.label !== "Dashboard" && (
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            )}
          </header>
        )}
        <div className="flex flex-1 p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
