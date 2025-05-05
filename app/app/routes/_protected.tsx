import { Outlet } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  return null;
}

export default function ProtectedLayout() {
  return <Outlet />;
}
