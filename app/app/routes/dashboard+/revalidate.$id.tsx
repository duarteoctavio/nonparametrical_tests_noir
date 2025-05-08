import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useWriteContract } from "wagmi";
import { bytesToHex, getAddress, Hex } from "viem";
import { appApi } from "~/utils/app_api";
import { getAllExperiments } from "~/.server/dto/experiments";
import { useState } from "react";
import { calculateMerkleRoot, convertToField } from "~/utils/merkle_tree";
import { generateProof } from "~/utils/prove";
import { circuit } from "~/utils/circuit";
import { env } from "~/.server/env";

export async function loader({ params }: LoaderFunctionArgs) {
  const experimentId = params.id;
  const appAddress = env.APP_ADDRESS;

  if (!experimentId) {
    throw new Response("Experiment ID not found", { status: 404 });
  }

  const experiments = getAllExperiments();
  const experiment = experiments.find((e) => e.id === Number(experimentId));

  if (!experiment) {
    throw new Response("Experiment not found", { status: 404 });
  }

  return { experimentId, appAddress: appAddress!, experiment };
}

export default function RevalidateExperiment() {
  const { experimentId, appAddress, experiment } = useLoaderData<typeof loader>();
  const { writeContractAsync } = useWriteContract();
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

  const handleRevalidate = async () => {
    setButtonEnabled(false);
    if (csvData.length !== 32) {
      setError("Please upload a valid CSV file with 33 rows (1 title + 32 numbers)");
      return;
    }

    const merkleRoot = calculateMerkleRoot(5, csvData.map((n) => BigInt(n)).map(convertToField));
    console.log("Merkle root:", merkleRoot.toString(16));

    const proof = await generateProof(circuit, {
      statistic_threshold: 400,
      dataset: csvData.map((n) => n.toString()),
      expected_root: merkleRoot.toString(),
    });

    console.log("Proof:", proof);
    console.log("Experiment ID:", experimentId);

    console.log("Contract ID:", experiment.contractId);
    const hash = await writeContractAsync({
      address: getAddress(appAddress!),
      abi: appApi,
      functionName: "publishRevalidation",
      args: [experiment.contractId as Hex, bytesToHex(proof.proof), merkleRoot],
    });

    console.log("Hash:", hash);

    setButtonEnabled(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-geist text-3xl font-bold text-foreground">Revalidate Experiment</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Experiment Details */}
          <div className="glass rounded-xl p-6 shadow-sm">
            <h2 className="font-geist mb-4 text-xl font-semibold text-foreground">
              Experiment Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-geist text-sm font-medium text-muted-foreground">Title</h3>
                <p className="font-geist text-foreground">{experiment.title}</p>
              </div>
              <div>
                <h3 className="font-geist text-sm font-medium text-muted-foreground">
                  Description
                </h3>
                <p className="font-geist text-foreground">{experiment.description}</p>
              </div>
              <div>
                <h3 className="font-geist text-sm font-medium text-muted-foreground">Bounty</h3>
                <p className="font-geist text-foreground">${experiment.bounty}</p>
              </div>
              <div>
                <h3 className="font-geist text-sm font-medium text-muted-foreground">Created</h3>
                <p className="font-geist text-foreground">
                  {new Date(experiment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Revalidation Form */}
          <div className="glass rounded-xl p-6 shadow-sm">
            <h2 className="font-geist mb-4 text-xl font-semibold text-foreground">
              Submit Revalidation
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="csv-upload"
                  className="font-geist mb-2 block text-sm font-medium text-foreground"
                >
                  Upload CSV with 33 rows (1 title + 32 numbers)
                </label>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="font-geist block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  Upload a CSV file containing 33 rows: first row is the title, followed by 32
                  numbers
                </p>
              </div>

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

              <button
                onClick={handleRevalidate}
                disabled={!buttonEnabled}
                className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Revalidation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
