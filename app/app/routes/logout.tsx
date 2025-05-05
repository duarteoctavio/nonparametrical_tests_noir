import { logout } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}
