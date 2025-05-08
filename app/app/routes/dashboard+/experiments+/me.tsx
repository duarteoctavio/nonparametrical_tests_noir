import { data, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getExperimentsByCreator, updateExperiment } from "~/.server/dto/experiments";
import { useWriteContract } from "wagmi";
import { appApi } from "~/utils/app_api";
import { getAddress, keccak256 } from "viem";
import { env } from "~/.server/env";
import { $path } from "remix-routes";

interface Experiment {
  id: number;
  title: string;
  description: string;
  bounty: number;
  createdAt: Date;
  creatorId: number;
  verifierAddress: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const userExperiments = getExperimentsByCreator(user.id);
  const appAddress = env.APP_ADDRESS;

  return data({ experiments: userExperiments, user, appAddress });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id");
  const hash = formData.get("hash");

  if (!id) {
    throw new Error("missing id");
  }

  if (!hash) {
    throw new Error("missing hash");
  }

  await updateExperiment(Number(id), { txHash: hash.toString() });
  return redirect($path("/dashboard/experiments/wait/:hash", { hash: hash.toString() }));
}

export default function MyExperiments() {
  const { user, experiments, appAddress } = useLoaderData<typeof loader>();
  const { writeContractAsync } = useWriteContract();
  const fetcher = useFetcher();

  const handlePublish = async (experiment: Experiment) => {
    try {
      const decoder = new TextEncoder();
      const bytes = decoder.encode(experiment.description);

      const hash = await writeContractAsync({
        address: getAddress(appAddress!),
        abi: appApi,
        functionName: "proposeExperiment",
        args: [keccak256(bytes), getAddress(experiment.verifierAddress), BigInt(experiment.bounty)],
        value: BigInt(experiment.bounty),
      });

      fetcher.submit({ hash, id: experiment.id }, { method: "POST" });
    } catch (error) {
      console.error("Failed to publish experiment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between"></div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="glass cursor-pointer rounded-xl p-6 shadow-md transition duration-200 hover:scale-[1.03] hover:shadow-xl"
              >
                <h3 className="font-geist mb-2 truncate text-lg font-bold text-foreground">
                  {experiment.title}
                </h3>
                <div className="mb-4 space-y-2">
                  <div>
                    <span className="font-semibold text-foreground">Description:</span>
                    <p className="font-geist mb-0 line-clamp-3 text-sm text-muted-foreground">
                      {experiment.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Bounty:</span>
                    <span className="font-geist font-medium text-primary">
                      ${experiment.bounty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Created:</span>
                    <span className="font-geist text-sm text-muted-foreground">
                      {new Date(experiment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {!experiment.txHash && (
                    <button
                      onClick={() => handlePublish(experiment)}
                      className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                    >
                      Publish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
