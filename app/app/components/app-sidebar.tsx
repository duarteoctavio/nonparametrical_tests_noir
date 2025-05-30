import { NavLink } from "@remix-run/react";
import { HomeIcon, LogOutIcon, RocketIcon, UserCircle } from "lucide-react";
import { $path } from "remix-routes";
import {
  Sidebar,
  SidebarContent,
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
  // { label: "My Validations", path: $path("/dashboard"), icon: SearchCheckIcon, inactive: true },
  // { label: "History", path: $path("/dashboard"), icon: HistoryIcon, inactive: true },
];

interface AppSidebarProps {
  userIdentifier: string;
  onLogout: () => void;
}

export function AppSidebar({ userIdentifier, onLogout }: AppSidebarProps) {
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
      <SidebarContent className="flex flex-col justify-between">
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
                      <SidebarMenuButton tooltip={item.label} isActive={isActive}>
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
        <SidebarGroup className="mt-auto pb-4 group-data-[collapsed=true]:pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={userIdentifier}
                  className="cursor-default hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent"
                >
                  <UserCircle strokeWidth={2} />
                  <span>{userIdentifier}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Logout"
                  onClick={onLogout}
                  className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  <LogOutIcon strokeWidth={2} />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
