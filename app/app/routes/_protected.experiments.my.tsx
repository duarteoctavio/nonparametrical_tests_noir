import { data } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getExperimentsByCreator } from "~/.server/dto/experiments";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const userExperiments = getExperimentsByCreator(user.id);
  return data({ experiments: userExperiments, user });
}

export default function MyExperiments() {
  const { user, experiments } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="glass shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="font-geist text-2xl font-bold text-primary">ReValidate</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-geist text-foreground">
                Welcome, {user?.name || "Researcher"}
              </span>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="font-geist rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-geist text-3xl font-bold text-foreground">My Experiments</h1>
            <Link
              to="/dashboard"
              className="font-geist inline-flex items-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="glass rounded-xl p-6 shadow-sm">
                <h3 className="font-geist mb-2 text-lg font-semibold text-foreground">
                  {experiment.title}
                </h3>
                <p className="font-geist mb-4 text-sm text-muted-foreground">
                  {experiment.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-geist font-medium text-primary">${experiment.bounty}</span>
                  <span className="font-geist text-sm text-muted-foreground">
                    {new Date(experiment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
