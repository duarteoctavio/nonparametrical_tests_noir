import { data, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import { createExperiment, getAllExperiments } from "~/.server/dto/experiments";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { $path } from "remix-routes";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getUsersByIds } from "~/.server/dto/users";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const experiments = getAllExperiments();
  const creatorIds = Array.from(new Set(experiments.map(e => e.creatorId)));
  const userMap = await getUsersByIds(creatorIds);
  return data({ user, experiments, userMap });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = Number(formData.get("bounty"));
  const image = formData.get("image") as string;
  if (!title || !description || !bounty) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  createExperiment({
    title,
    description,
    bounty,
    image: Buffer.from(image, "base64"),
    creatorId: user.id,
    verifierAddress: "0x00"
  });

  return redirect($path("/dashboard"));
}

function shorten(str: string) {
  if (!str) return "";
  return str.length <= 7 ? str : `${str.slice(0, 3)}...${str.slice(-3)}`;
}

function Copyable({ value, display }: { value: string; display: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span
      className="cursor-pointer hover:underline truncate inline-block max-w-[120px] align-middle"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
      title={value}
    >
      {display}
      {copied && <span className="ml-1 text-green-500">✓</span>}
    </span>
  );
}

export default function Dashboard() {
  const { experiments, userMap } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center min-h-screen bg-background py-12">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-2">Welcome!</h1>
        <p className="mt-0 mb-6 text-lg text-muted-foreground text-center max-w-2xl">
          Find and verify the latest experiments below. Making science fairer one validation at a time.
        </p>
        <div className="flex flex-row gap-4 mb-10">
          <Link
            to={$path("/dashboard/experiments/new")}
            className="font-geist inline-flex items-center rounded-lg border border-transparent bg-primary px-6 py-2 text-base font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create New Experiment
          </Link>
          <Link
            to={$path("/dashboard/experiments/me")}
            className="font-geist inline-flex items-center rounded-lg border border-border bg-background px-6 py-2 text-base font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            My Experiments
          </Link>
        </div>
        <div className="w-full">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-foreground text-center mb-4 mt-2">
            Check out the latest experiments you can be a part of
          </h2>
          {/* Cards Section with much wider background */}
          <div className="w-full max-w-7xl mx-auto bg-secondary rounded-2xl p-10 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {experiments.map((experiment) => (
                <Card
                  key={experiment.id}
                  className="w-full shadow-md hover:shadow-xl hover:scale-[1.03] transition duration-200 cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="truncate text-lg font-bold mb-2">{experiment.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-foreground">Description:</span>
                        <p className="font-geist text-sm text-muted-foreground line-clamp-3 mb-0">
                          {experiment.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Bounty:</span>
                        <span className="font-geist font-medium text-primary">${experiment.bounty}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Created:</span>
                        <span className="font-geist text-sm text-muted-foreground">
                          {new Date(experiment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Creator:</span>
                        <span className="font-geist text-sm text-muted-foreground flex items-center gap-1 max-w-[160px] truncate">
                          {(() => {
                            const user = userMap[experiment.creatorId];
                            if (user?.worldIdNullifierHash) return <><span>World ID:</span> <Copyable value={user.worldIdNullifierHash} display={shorten(user.worldIdNullifierHash)} /></>;
                            if (user?.address) return <><span>Wallet:</span> <Copyable value={user.address} display={shorten(user.address)} /></>;
                            return `User ${experiment.creatorId}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      to={$path("/dashboard/revalidate/:id", { id: experiment.id })}
                      className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      Revalidate Experiment
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {experiments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No experiments available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
