import { useFetcher, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/server-runtime";
import { useEffect } from "react";
import { $path } from "remix-routes";
import { Hex } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { getExperimentByHash, updateExperiment } from "~/.server/dto/experiments";

export async function loader({ params }: LoaderFunctionArgs) {
  return { hash: params.hash as Hex };
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("aaaaaaaaaaaaaaaaa");
  const formData = await request.formData();
  const hash = formData.get("hash");
  const contractId = formData.get("contractId");

  if (!hash) {
    throw new Error("Missing hash");
  }

  if (!contractId) {
    throw new Error("Missing id");
  }

  const experiment = await getExperimentByHash(hash.toString());
  await updateExperiment(experiment.id, { contractId: contractId.toString() });
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
  return redirect($path("/dashboard/experiments/me"));
}

export default function LoadForTx() {
  const { hash } = useLoaderData<typeof loader>();
  const { data } = useWaitForTransactionReceipt({ hash });
  const fetcher = useFetcher();

  useEffect(() => {
    if (data) {
      const contractId = data.logs[0]?.topics[1];
      if (!contractId) {
        throw new Error("Missing contractId");
      }
      fetcher.submit({ hash, contractId }, { method: "POST" });
    }
  }, [data, fetcher, hash]);

  return <div>Waiting for transaction to confirm...</div>;
}
