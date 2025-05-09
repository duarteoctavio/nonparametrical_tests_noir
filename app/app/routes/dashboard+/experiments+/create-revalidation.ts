import { ActionFunctionArgs, data } from "@remix-run/node";
import { Hash } from "viem";
import { getExperimentById, updateExperiment } from "~/.server/dto/experiments";
import { env } from "~/.server/env";
import { rpcClient } from "~/.server/services/ethereum-rpc";
import { requireUserId } from "~/.server/services/session";
import { appApi } from "~/utils/app_api";

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

  const revalidation = await rpcClient.readContract({
    abi: appApi,
    functionName: "findRevalidation",
    args: [experiment.contractId as Hash],
    address: env.APP_ADDRESS,
  });

  updateExperiment(Number(id), {
    revalidatedBy: revalidation.revalidator,
  });

  return { ok: true };
}
