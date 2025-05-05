import { data, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import { createExperiment, getAllExperiments } from "~/.server/dto/experiments";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { $path } from "remix-routes";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);

  const allExperiments = getAllExperiments();
  return data({ user, experiments: allExperiments });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = Number(formData.get("bounty"));

  if (!title || !description || !bounty) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
  });

  return redirect($path("/dashboard"));
}

export default function Dashboard() {
  const { user, experiments } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Welcome, {user.name || "Researcher"}!</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        Find and verify the latest experiments below. Making science fairer one validation at a
        time.
      </p>
      {/* <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <Link
              to={$path("/dashboard/experiments/new")}
              className="font-geist inline-flex items-center rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Create New Experiment
            </Link>
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
      </div> */}
    </div>
  );
}
