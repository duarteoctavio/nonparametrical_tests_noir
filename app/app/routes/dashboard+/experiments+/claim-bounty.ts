import { ActionFunctionArgs, data, redirect } from "@remix-run/node";
import { $path } from "remix-routes";
import { getExperimentById, updateExperiment } from "~/.server/dto/experiments";
import { requireUserId } from "~/.server/services/session";

export async function action({ request }: ActionFunctionArgs) {
  await requireUserId(request);

  const formData = await request.formData();
  const id = formData.get("id");

  if (typeof id !== "string") {
    return data({ error: "Invalid id" }, { status: 400 });
  }

  const experiment = getExperimentById(Number(id));
  if (!experiment) {
    return data({ error: "Experiment not found" }, { status: 404 });
  }

  updateExperiment(Number(id), {
    claimedAt: new Date(),
  });

  return redirect($path("/dashboard/experiments/:id", { id }));
}
