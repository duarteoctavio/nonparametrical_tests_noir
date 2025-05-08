import { useSearchParams } from "@remix-run/react";
import { useWaitForTransactionReceipt } from "wagmi";
import { Link } from "@remix-run/react";

export default function WaitingForTransaction() {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  const experimentId = searchParams.get("experimentId");

  const { data: receipt, isError, isLoading } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="glass rounded-xl p-8 shadow-sm max-w-md w-full">
        <h1 className="font-geist text-2xl font-bold text-foreground mb-6">
          Processing Transaction
        </h1>

        {isLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="text-center text-muted-foreground">
              Waiting for transaction confirmation...
            </p>
          </div>
        )}

        {isError && (
          <div className="space-y-4">
            <div className="text-red-500 text-center">
              <p className="font-medium">Transaction Failed</p>
              <p className="text-sm mt-2">Something went wrong with the transaction.</p>
            </div>
            <Link
              to="/dashboard/experiments/me"
              className="block text-center font-geist rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Experiments
            </Link>
          </div>
        )}

        {receipt && (
          <div className="space-y-4">
            <div className="text-green-500 text-center">
              <p className="font-medium">Transaction Successful!</p>
              <p className="text-sm mt-2">Your experiment has been published.</p>
              {experimentId && (
                <p className="text-sm mt-2">Experiment ID: {experimentId}</p>
              )}
            </div>
            <Link
              to="/dashboard/experiments/me"
              className="block text-center font-geist rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Experiments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 