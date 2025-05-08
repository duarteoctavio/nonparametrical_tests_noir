import { data, redirect } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
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
    throw new Error("missing id")
  }

  if (!hash) {
    throw new Error("missing hash")
  }

  await updateExperiment(Number(id), { txHash: hash.toString() })
  return redirect($path("/dashboard/experiments/wait/:hash", { hash: hash.toString() }))
}

export default function MyExperiments() {
  const { user, experiments, appAddress} = useLoaderData<typeof loader>();
  const { writeContractAsync } = useWriteContract();
  const fetcher = useFetcher();

  const handlePublish = async (experiment: Experiment) => {
    try {
      const decoder = new TextEncoder()
      const bytes = decoder.encode(experiment.description);
      
      const hash = await writeContractAsync({
        address: getAddress(appAddress!),
        abi: appApi,
        functionName: "proposeExperiment",
        args: [keccak256(bytes), getAddress(experiment.verifierAddress), BigInt(experiment.bounty)],
        value: BigInt(experiment.bounty),
      });

      fetcher.submit({hash, id: experiment.id}, { method: "POST" })
    } catch (error) {
      console.error('Failed to publish experiment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="glass shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="font-geist text-2xl font-bold text-primary">ReValidate</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-geist text-foreground">
                Welcome, {user?.name || "Researcher"}
              </span>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="font-geist rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-geist text-3xl font-bold text-foreground">My Experiments</h1>
            <Link
              to="/dashboard"
              className="font-geist inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="glass rounded-xl p-6 shadow-sm">
                <h3 className="font-geist mb-2 text-lg font-semibold text-foreground">
                  {experiment.title}
                </h3>
                <p className="font-geist mb-4 text-sm text-muted-foreground">
                  {experiment.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-geist font-medium text-primary">${experiment.bounty}</span>
                  <span className="font-geist text-sm text-muted-foreground">
                    {new Date(experiment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="space-y-2">
                  { !experiment.txHash &&
                    <button
                      onClick={() => handlePublish(experiment)}
                      className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      Publish
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
