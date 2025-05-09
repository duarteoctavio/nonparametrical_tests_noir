import { useLocation, useMatches } from "@remix-run/react";
import { type Routes } from "remix-routes";
import { loader as experimentsIdLoader } from "~/routes/dashboard+/experiments+/$id";

type DashboardRoutes = {
  [K in keyof Routes]: K extends `/dashboard${string}` ? K : never;
}[keyof Routes];

type BreadCrumbRoutes = Record<
  DashboardRoutes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => string)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => { label: string; backButton: boolean; disableHeader?: boolean })
  | null
>;

const BreadcrumbRoutes: BreadCrumbRoutes = {
  // Action Routes
  "/dashboard/experiments/approve-revalidation": () => "Approve Revalidation",
  "/dashboard/experiments/claim-bounty": () => "Claim Bounty",
  "/dashboard/experiments/create-revalidation": () => "Create Revalidation",

  "/dashboard": () => ({ label: "Home", backButton: false, disableHeader: true }),
  "/dashboard/experiments": () => "Experiments",
  "/dashboard/experiments/new": () => "New Experiment",
  "/dashboard/experiments/:id": (data: Awaited<ReturnType<typeof experimentsIdLoader>>) =>
    `Experiment #${data.experiment?.id}`,
  "/dashboard/revalidate/:id": () => "Revalidate Experiment",
};

const DynamicBreadcrumbRoutes = Object.entries(BreadcrumbRoutes).filter(
  ([route, label]) => route.includes(":") && label !== null,
);

type Breadcrumb = {
  label: string;
  pathname: string;
  backButton?: boolean;
  disableHeader?: boolean;
};

export default function useDashboardTopbar(): Breadcrumb {
  const location = useLocation();
  const matches = useMatches();
  const matchesData = matches.find((m) => m.pathname === location.pathname);
  const currentPath = location.pathname as DashboardRoutes;

  // Try exact match first
  const exactMatchPath = currentPath;
  const exactMatch = BreadcrumbRoutes[exactMatchPath];
  if (exactMatch) {
    const route = exactMatch(matchesData?.data);
    return {
      label: typeof route === "string" ? route : route.label,
      pathname: currentPath,
      backButton: typeof route === "object" ? route.backButton : undefined,
      disableHeader: typeof route === "object" ? route.disableHeader : undefined,
    };
  }

  // Try matching dynamic route
  for (const [route, label] of DynamicBreadcrumbRoutes) {
    const routeSegments = route.split("/").filter(Boolean);
    const currentSegments = currentPath.split("/").filter(Boolean);

    if (routeSegments.length === currentSegments.length) {
      const matches = routeSegments.every(
        (segment, index) => segment.startsWith(":") || segment === currentSegments[index],
      );

      if (matches && label) {
        const route = label(matchesData?.data);
        return {
          label: typeof route === "string" ? route : route.label,
          pathname: currentPath,
          backButton: typeof route === "object" ? route.backButton : undefined,
          disableHeader: typeof route === "object" ? route.disableHeader : undefined,
        };
      }
    }
  }

  // If no match is found, return a default breadcrumb
  return {
    label: "",
    pathname: currentPath,
  };
}
