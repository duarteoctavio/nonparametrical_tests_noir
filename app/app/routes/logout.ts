// Route to handle user logout
import type { ActionFunctionArgs } from "@remix-run/node";
import { logout } from "~/.server/services/session";
import { redirect } from "@remix-run/node";

// Action function: Destroys the session on POST
export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}

// Loader function: Redirects to login if accessed via GET (optional)
export async function loader() {
  // Prevent GET access if desired, or handle differently
  return redirect("/login");
}
