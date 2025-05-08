import { useSearchParams, Link } from "@remix-run/react";
import { useWaitForTransactionReceipt } from "wagmi";

export default function WaitingForTransaction() {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  const experimentId = searchParams.get("experimentId");

  const {
    data: receipt,
    isError,
    isLoading,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="glass w-full max-w-md rounded-xl p-8 shadow-sm">
        <h1 className="font-geist mb-6 text-2xl font-bold text-foreground">
          Processing Transaction
        </h1>

        {isLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
            <p className="text-center text-muted-foreground">
              Waiting for transaction confirmation...
            </p>
          </div>
        )}

        {isError && (
          <div className="space-y-4">
            <div className="text-center text-red-500">
              <p className="font-medium">Transaction Failed</p>
              <p className="mt-2 text-sm">Something went wrong with the transaction.</p>
            </div>
            <Link
              to="/dashboard/experiments/me"
              className="font-geist block rounded-md border border-transparent bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Experiments
            </Link>
          </div>
        )}

        {receipt && (
          <div className="space-y-4">
            <div className="text-center text-green-500">
              <p className="font-medium">Transaction Successful!</p>
              <p className="mt-2 text-sm">Your experiment has been published.</p>
              {experimentId && <p className="mt-2 text-sm">Experiment ID: {experimentId}</p>}
            </div>
            <Link
              to="/dashboard/experiments/me"
              className="font-geist block rounded-md border border-transparent bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Back to Experiments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
