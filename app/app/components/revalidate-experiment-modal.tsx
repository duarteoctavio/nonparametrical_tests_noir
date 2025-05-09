import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, useFetcher } from "@remix-run/react";
import { useState, FormEvent } from "react";
import { $path } from "remix-routes";
import { Button } from "./ui/button";
import { SelectExperiment } from "~/.server/dto/experiments";
import { bytesToHex, getAddress, Hex } from "viem";
import { useConfig, useWriteContract } from "wagmi";
import { useClientEnv } from "~/hooks/use-client-env";
import { appApi } from "~/utils/app_api";
import { waitForTransactionReceipt } from "@wagmi/core";
import { convertToField, calculateMerkleRoot } from "~/utils/merkle_tree";
import { generateProof } from "~/utils/prove";
import { CompiledCircuit } from "@noir-lang/types";
import { circuit } from "~/utils/circuit";

export default function RevalidateExperimentModal({
  open,
  setOpen,
  experiment,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  experiment: Omit<SelectExperiment, "image">;
}) {
  const { writeContractAsync } = useWriteContract();
  const env = useClientEnv();
  const fetcher = useFetcher();
  const config = useConfig();
  const [csvData, setCsvData] = useState<number[]>([]);
  const [csvTitle, setCsvTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(true);

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

  const handleRevalidate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setButtonEnabled(false);
    if (csvData.length !== 32) {
      setError("Please upload a valid CSV file with 33 rows (1 title + 32 numbers)");
      return;
    }

    const merkleRoot = calculateMerkleRoot(5, csvData.map((n) => BigInt(n)).map(convertToField));
    console.log("Merkle root:", merkleRoot.toString(16));

    const proof = await generateProof(circuit as CompiledCircuit, {
      statistic_threshold: 400 as unknown as string,
      dataset: csvData.map((n) => n.toString()),
      expected_root: merkleRoot.toString(),
    });

    console.log("Proof:", proof);
    console.log("Experiment ID:", experiment.id);

    console.log("Contract ID:", experiment.contractId);
    const hash = await writeContractAsync({
      address: getAddress(env.APP_ADDRESS),
      abi: appApi,
      functionName: "publishRevalidation",
      args: [experiment.contractId as Hex, bytesToHex(proof.proof), merkleRoot],
    });
    await waitForTransactionReceipt(config, { hash });

    console.log("Hash:", hash);

    fetcher.submit(
      { id: experiment.id },
      {
        action: $path("/dashboard/experiments/create-revalidation"),
        method: "POST",
      },
    );

    setButtonEnabled(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revalidate Experiment</DialogTitle>
          <DialogDescription>Submit a revalidation for this experiment.</DialogDescription>
        </DialogHeader>

        <Form className="space-y-6" onSubmit={handleRevalidate}>
          <div className="space-y-4">
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="font-geist block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />
            <p className="text-sm text-muted-foreground">
              Upload a CSV file containing 33 rows: first row is the title, followed by 32 numbers
            </p>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
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
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!buttonEnabled}>
              Submit Revalidation
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
