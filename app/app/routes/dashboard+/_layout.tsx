import { Outlet, useNavigate } from "@remix-run/react";
import { ArrowLeftIcon } from "lucide-react";
import { AppSidebar } from "~/components/app-sidebar";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import useDashboardTopbar from "~/hooks/use-dashboard-topbar";

export default function Layout() {
  const breadcrumb = useDashboardTopbar();
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <AppSidebar />
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
