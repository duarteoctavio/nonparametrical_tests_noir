import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { getExperimentById } from "~/.server/dto/experiments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { useWriteContract } from "wagmi";
import { appApi } from "~/utils/app_api";
import { useClientEnv } from "~/hooks/use-client-env";
import { Hash } from "viem";
import { $path } from "remix-routes";
import ClaimBountyModal from "~/components/claim-bounty-modal";
import { useState } from "react";

export function loader({ params }: LoaderFunctionArgs) {
  const experiment = getExperimentById(Number(params.id));
  if (!experiment) {
    throw new Response("Experiment not found", { status: 404 });
  }
  return { experiment: { ...experiment, image: experiment.image.toString("base64") } };
}

export default function Experiment() {
  const { experiment } = useLoaderData<typeof loader>();
  const { writeContractAsync } = useWriteContract();
  const env = useClientEnv();
  const fetcher = useFetcher();
  const [claimBountyModalOpen, setClaimBountyModalOpen] = useState(false);

  async function handleApproveRevalidation() {
    try {
      await writeContractAsync({
        address: env.APP_ADDRESS,
        abi: appApi,
        functionName: "approveRevalidation",
        args: [experiment.contractId as Hash],
      });
      fetcher.submit(
        { id: experiment.id },
        {
          action: $path("/dashboard/experiments/approve-revalidation"),
          method: "POST",
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <Card className="overflow-hidden">
        {/* Image at the top */}
        {experiment.image && (
          <div className="h-64 w-full overflow-hidden bg-gray-100">
            <img
              src={`data:image/webp;base64,${experiment.image}`}
              alt={experiment.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{experiment.title}</CardTitle>
              <CardDescription
                className="mt-1 text-sm text-muted-foreground"
                suppressHydrationWarning
              >
                Created on {new Date(experiment.createdAt).toLocaleString()}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-lg font-semibold">
              {experiment.bounty} ETH
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="text-gray-700">{experiment.description}</p>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-lg font-semibold">Transaction Details</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Transaction Hash:</span>
                  <span className="ml-2 break-all font-mono">{experiment.txHash || "Pending"}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Contract ID:</span>
                  <span className="ml-2 break-all font-mono">
                    {experiment.contractId || "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-lg font-semibold">Revalidation Details</h3>
            <div className="rounded-md bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Revalidated By:</span>
                  <span className="ml-2 break-all font-mono">
                    {experiment.revalidatedBy || "Pending"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Approved At:</span>
                  <span className="ml-2 break-all font-mono">
                    {experiment.revalidatedAt
                      ? new Date(experiment.revalidatedAt).toLocaleString()
                      : "Pending"}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Bounty Claimed At:</span>
                  <span className="ml-2 break-all font-mono">
                    {experiment.claimedAt
                      ? new Date(experiment.claimedAt).toLocaleString()
                      : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={handleApproveRevalidation} disabled={experiment.revalidatedAt !== null}>
          Approve Revalidation
        </Button>
        <Button onClick={() => setClaimBountyModalOpen(true)} variant="secondary">
          Claim Bounty
        </Button>
      </div>

      <ClaimBountyModal
        open={claimBountyModalOpen}
        setOpen={setClaimBountyModalOpen}
        experimentId={experiment.id}
        experimentContractId={experiment.contractId}
      />
    </div>
  );
}
