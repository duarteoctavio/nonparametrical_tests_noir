import { NavLink } from "@remix-run/react";
import { HistoryIcon, HomeIcon, RocketIcon, SearchCheckIcon } from "lucide-react";
import { $path } from "remix-routes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
  SidebarGroupContent,
} from "~/components/ui/sidebar";

const ITEMS = [
  { label: "Home", path: $path("/dashboard"), icon: HomeIcon, end: true },
  { label: "Experiments", path: $path("/dashboard/experiments"), icon: RocketIcon },
  { label: "My Validations", path: $path("/dashboard"), icon: SearchCheckIcon, inactive: true },
  { label: "History", path: $path("/dashboard"), icon: HistoryIcon, inactive: true },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex h-[72px] w-full flex-row items-center justify-between">
        <div className="ml-2 select-none text-3xl font-bold text-gray-900 group-data-[collapsible=icon]:hidden">
          ReValidate
        </div>
        <SidebarMenuButton className="w-fit" variant={null} asChild>
          <SidebarTrigger variant="outline" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <NavLink
                    to={item.path}
                    prefetch="intent"
                    end={item.end}
                    onClick={() => setOpenMobile(false)}
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton tooltip={item.label} isActive={isActive && !item.inactive}>
                        {item.icon && <item.icon strokeWidth={2} />}
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
