import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getExperimentById } from "~/.server/dto/experiments";

export function loader({ params }: LoaderFunctionArgs) {
  const experiment = getExperimentById(Number(params.id));
  return { experiment };
}

export default function Experiment() {
  const { experiment } = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(experiment)}</pre>;
}
