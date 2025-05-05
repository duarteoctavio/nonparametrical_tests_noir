import { logout } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// Action function: Handles POST requests to log the user out
export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

// Loader function: Redirects GET requests to the login page
export async function loader() {
  // If someone navigates here directly via GET, just send them to login
  return redirect("/login");
}
