import { data, redirect } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createExperiment } from "~/.server/dto/experiments";
import { $path } from "remix-routes";

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = parseInt(formData.get("bounty") as string);

  if (!title || !description || isNaN(bounty)) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
  });

  return redirect($path("/dashboard/experiments"));
}
