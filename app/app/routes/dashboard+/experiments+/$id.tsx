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
import { ArrowDownIcon, ArrowRightIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { requireUserId } from "~/.server/services/session";
import RevalidateExperimentModal from "~/components/revalidate-experiment-modal";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const experiment = getExperimentById(Number(params.id));
  if (!experiment) {
    throw new Response("Experiment not found", { status: 404 });
  }

  return {
    experiment: {
      ...experiment,
      image: experiment.image.toString("base64"),
      isMine: experiment.creatorId === user.id,
    },
  };
}

export default function Experiment() {
  const { experiment } = useLoaderData<typeof loader>();
  const { writeContractAsync } = useWriteContract();
  const env = useClientEnv();
  const fetcher = useFetcher();
  const [claimBountyModalOpen, setClaimBountyModalOpen] = useState(false);
  const [revalidateExperimentModalOpen, setRevalidateExperimentModalOpen] = useState(false);

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
    <div className="container mx-auto space-y-6">
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
            <div className="flex gap-2">
              {experiment.isMine && (
                <Badge variant="success" className="text-base font-semibold">
                  My Experiment
                </Badge>
              )}

              <Badge variant="outline" className="text-lg font-semibold">
                {experiment.bounty} ETH
              </Badge>
            </div>
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
            <div className="rounded-md p-4">
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
            <h3 className="mb-2 text-lg font-semibold">Revalidation</h3>
            <div className="rounded-md p-4">
              <div className="flex flex-col justify-center gap-8 md:flex-row md:items-center md:gap-12">
                {/* Step 1: Revalidation */}
                <div className="flex flex-col items-center gap-2">
                  {experiment.revalidatedBy ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <ClockIcon className="h-6 w-6 text-gray-500" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">
                      {experiment.revalidatedAt ? "Revalidated" : "Revalidation"}
                    </p>
                    {experiment.revalidatedBy ? (
                      <div className="text-xs text-green-600">
                        <p className="max-w-44 truncate font-mono">{experiment.revalidatedBy}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-amber-600">Pending</p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden text-gray-400 md:block">
                  <ArrowRightIcon className="h-6 w-6" />
                </div>
                <div className="self-center text-gray-400 md:hidden">
                  <ArrowDownIcon className="h-6 w-6" />
                </div>

                {/* Step 2: Approval */}
                <div className="flex flex-col items-center gap-2">
                  {experiment.revalidatedAt ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <ClockIcon className="h-6 w-6 text-gray-500" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">
                      {experiment.revalidatedAt ? "Approved" : "Approval"}
                    </p>
                    {experiment.revalidatedAt ? (
                      <p className="text-xs text-green-600" suppressHydrationWarning>
                        {new Date(experiment.revalidatedAt).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-xs text-amber-600">Pending</p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden text-gray-400 md:block">
                  <ArrowRightIcon className="h-6 w-6" />
                </div>
                <div className="self-center text-gray-400 md:hidden">
                  <ArrowDownIcon className="h-6 w-6" />
                </div>

                {/* Step 3: Bounty Claimed */}
                <div className="flex flex-col items-center gap-2">
                  {experiment.claimedAt ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  ) : (
                    <ClockIcon className="h-6 w-6 text-gray-500" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">
                      {experiment.claimedAt ? "Bounty Claimed" : "Bounty Claim"}
                    </p>
                    {experiment.claimedAt ? (
                      <p className="text-xs text-green-600" suppressHydrationWarning>
                        {new Date(experiment.claimedAt).toLocaleString()}
                      </p>
                    ) : (
                      <p className="text-xs text-amber-600">Pending</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        {experiment.isMine &&
          experiment.revalidatedBy !== null &&
          experiment.revalidatedAt === null && (
            <Button onClick={handleApproveRevalidation} size="lg">
              Approve Revalidation
            </Button>
          )}

        {!experiment.isMine && experiment.revalidatedBy === null && (
          <Button onClick={() => setRevalidateExperimentModalOpen(true)} size="lg">
            Revalidate Experiment
          </Button>
        )}
        {!experiment.isMine &&
          experiment.revalidatedBy !== null &&
          experiment.revalidatedAt !== null &&
          experiment.claimedAt === null && (
            <Button onClick={() => setClaimBountyModalOpen(true)} size="lg">
              Claim Bounty
            </Button>
          )}
      </div>

      <ClaimBountyModal
        open={claimBountyModalOpen}
        setOpen={setClaimBountyModalOpen}
        experimentId={experiment.id}
        experimentContractId={experiment.contractId}
      />
      <RevalidateExperimentModal
        open={revalidateExperimentModalOpen}
        setOpen={setRevalidateExperimentModalOpen}
        experiment={experiment}
      />
    </div>
  );
}
