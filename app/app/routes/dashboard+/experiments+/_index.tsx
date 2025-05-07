import { $path } from "remix-routes";

import { Link, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { requireUserId } from "~/.server/services/session";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getAllExperiments } from "~/.server/dto/experiments";
import { Button } from "~/components/ui/button";
import NewExperimentModal from "~/components/new-experiment-modal";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  const experiments = getAllExperiments();
  return { experiments };
}

export default function Experiments() {
  const { experiments } = useLoaderData<typeof loader>();
  const [newExperimentModalOpen, setNewExperimentModalOpen] = useState(false);
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex space-x-4">
          <Button onClick={() => setNewExperimentModalOpen(true)}>Create New Experiment</Button>
          <Link
            to={$path("/dashboard/experiments/me")}
            className="font-geist inline-flex items-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            My Experiments
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment) => (
          <Card key={experiment.id}>
            <CardHeader>
              <CardTitle>{experiment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-geist mb-4 text-sm text-muted-foreground">
                {experiment.description}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="font-geist font-medium text-primary">${experiment.bounty}</span>
              <span className="font-geist text-sm text-muted-foreground">
                {new Date(experiment.createdAt).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      <NewExperimentModal open={newExperimentModalOpen} setOpen={setNewExperimentModalOpen} />
    </div>
  );
}
