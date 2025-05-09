import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, useFetcher } from "@remix-run/react";
import { Button } from "./ui/button";
import { $path } from "remix-routes";
import { useConfig, useWriteContract } from "wagmi";
import { useClientEnv } from "~/hooks/use-client-env";
import { appApi } from "~/utils/app_api";
import { Hash } from "viem";
import { convertToField } from "~/utils/merkle_tree";
import { waitForTransactionReceipt } from "wagmi/actions";

export default function ClaimBountyModal({
  open,
  setOpen,
  experimentId,
  experimentContractId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  experimentId: number;
  experimentContractId: string;
}) {
  const [csvData, setCsvData] = useState<number[]>([]);
  const [csvTitle, setCsvTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { writeContractAsync } = useWriteContract();
  const env = useClientEnv();
  const config = useConfig();
  const fetcher = useFetcher();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        const rows = text
          .split("\n")
          .map((row) => row.trim())
          .filter((row) => row.length > 0);

        if (rows.length !== 33) {
          setError("CSV must contain exactly 33 rows (1 title + 32 numbers)");
          setCsvData([]);
          setCsvTitle("");
          return;
        }

        const title = rows[0] || "";
        const numbers = rows.slice(1).map((n) => parseInt(n.trim()));

        if (numbers.some(isNaN)) {
          setError("All values must be valid integers");
          setCsvData([]);
          setCsvTitle("");
          return;
        }

        setCsvTitle(title);
        setCsvData(numbers);
        setError("");
      } catch (err) {
        setError("Invalid CSV format");
        setCsvData([]);
        setCsvTitle("");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const hash = await writeContractAsync({
        address: env.APP_ADDRESS,
        abi: appApi,
        functionName: "claimBounty",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args: [experimentContractId as Hash, csvData.map((n) => convertToField(BigInt(n))) as any],
      });
      await waitForTransactionReceipt(config, { hash });
      fetcher.submit(
        { id: experimentId },
        {
          action: $path("/dashboard/experiments/claim-bounty"),
          method: "POST",
        },
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Bounty</DialogTitle>
          <DialogDescription>
            Upload a CSV file containing 33 rows: first row is the title, followed by 32 numbers.
          </DialogDescription>
        </DialogHeader>

        <Form method="post" onSubmit={handleSubmit} className="space-y-6">
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="font-geist block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
          />
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>
          )}

          {csvData.length > 0 && (
            <div className="rounded-md bg-muted p-3">
              <h3 className="font-geist mb-2 text-sm font-medium text-foreground">Preview:</h3>
              <p className="font-geist mb-2 text-sm font-medium text-foreground">
                Title: {csvTitle}
              </p>
              <p className="font-geist text-sm text-muted-foreground">
                Numbers (32 values): {csvData.join(", ")}
              </p>
            </div>
          )}

          <Button type="submit" disabled={csvData.length !== 32}>
            Claim Bounty
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
