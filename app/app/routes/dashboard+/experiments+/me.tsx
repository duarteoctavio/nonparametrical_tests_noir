import { data } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigate } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getExperimentsByCreator } from "~/.server/dto/experiments";
import { useWaitForTransactionReceipt, useWriteContract, usePublicClient } from "wagmi";
import { appApi } from "~/utils/app_api";
import { getAddress, keccak256 } from "viem";
import { useState, useEffect } from "react";

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
  const appAddress = process.env.APP_ADDRESS;
  return data({ experiments: userExperiments, user, appAddress });
}

export default function MyExperiments() {
  const { user, experiments, appAddress} = useLoaderData<typeof loader>();
  const { writeContractAsync, error, status } = useWriteContract();
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined);
  const [publishingExperiments, setPublishingExperiments] = useState<Record<string, boolean>>({});
  const [experimentIds, setExperimentIds] = useState<Record<string, string>>({});
  const publicClient = usePublicClient();
  
  const { data, isError, isLoading, error: error2 } = useWaitForTransactionReceipt({
    hash: transactionHash,
    query: {
      enabled: !!transactionHash,
    },
  });

  // Debug logs
  console.log('Current state:', {
    transactionHash,
    isError,
    isLoading,
    error2,
    status
  });


  const handlePublish = async (experiment: Experiment) => {
    try {
      setPublishingExperiments(prev => ({
        ...prev,
        [experiment.id]: true
      }));
      
      const hash = await writeContractAsync({
        address: getAddress(appAddress!),
        abi: appApi,
        functionName: "proposeExperiment",
        args: [keccak256("0x0102"), getAddress(experiment.verifierAddress), BigInt(experiment.bounty)],
        value: BigInt(experiment.bounty),
      });
      setTransactionHash(hash);

      if (!publicClient) {
        throw new Error('Public client not initialized');
      }

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      
      // Find the ExperimentProposed event
      const eventSignature = `0x${Buffer.from('ExperimentProposed(bytes32)').toString('hex')}` as `0x${string}`;
      const event = receipt.logs.find(log => 
        log.topics[0] === keccak256(eventSignature)
      );

      if (event) {
        const experimentId = event.topics[1];
        setExperimentIds(prev => ({
          ...prev,
          [experiment.id]: experimentId
        }));
      }
    } catch (error) {
      console.error('Failed to publish experiment:', error);
      setPublishingExperiments(prev => ({
        ...prev,
        [experiment.id]: false
      }));
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
                  {publishingExperiments[experiment.id] ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      <span className="text-sm text-muted-foreground">Publishing...</span>
                    </div>
                  ) : experimentIds[experiment.id] ? (
                    <div className="text-sm text-green-500">
                      Published! ID: {experimentIds[experiment.id]}
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePublish(experiment)}
                      className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
