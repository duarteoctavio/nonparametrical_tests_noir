import { data, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { createExperiment } from "~/.server/dto/experiments";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  return data({ user });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = parseInt(formData.get("bounty") as string);

  if (!title || !description || isNaN(bounty)) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
  });

  return redirect("/dashboard");
}

export default function NewExperiment() {
  const navigation = useNavigation();
  const { user } = useLoaderData<typeof loader>();
  const isSubmitting = navigation.state === "submitting";

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
        <div className="mx-auto max-w-2xl">
          <div className="glass rounded-xl p-8 shadow-sm">
            <h1 className="font-geist mb-6 text-2xl font-bold text-foreground">
              Create New Experiment
            </h1>

            <Form method="post" className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="font-geist block text-sm font-medium text-foreground"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter experiment title"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="font-geist block text-sm font-medium text-foreground"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your experiment"
                />
              </div>

              <div>
                <label
                  htmlFor="bounty"
                  className="font-geist block text-sm font-medium text-foreground"
                >
                  Bounty ($)
                </label>
                <input
                  type="number"
                  id="bounty"
                  name="bounty"
                  required
                  min="0"
                  className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter bounty amount"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <a
                  href="/dashboard"
                  className="font-geist rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-geist rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Creating..." : "Create Experiment"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
