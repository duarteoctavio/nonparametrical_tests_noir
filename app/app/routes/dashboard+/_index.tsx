import { data } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import { getAllExperiments } from "~/.server/dto/experiments";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { $path } from "remix-routes";
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getUsersByIds } from "~/.server/dto/users";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import NewExperimentModal from "~/components/new-experiment-modal";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const experiments = getAllExperiments();
  const creatorIds = Array.from(new Set(experiments.map((e) => e.creatorId)));
  const userMap = await getUsersByIds(creatorIds);
  return data({ user, experiments, userMap });
}

function shorten(str: string) {
  if (!str) return "";
  return str.length <= 7 ? str : `${str.slice(0, 3)}...${str.slice(-3)}`;
}

function Copyable({ value, display }: { value: string; display: string }) {
  const [copied, setCopied] = useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      className="inline-block max-w-[120px] cursor-pointer truncate align-middle hover:underline"
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
  const [newExperimentModalOpen, setNewExperimentModalOpen] = useState(false);
  return (
    <div className="mt-16 flex flex-1 flex-col items-center">
      <div className="flex w-full max-w-4xl flex-col items-center">
        <h1 className="mb-2 text-center text-4xl font-bold tracking-tight">Welcome!</h1>
        <p className="mb-6 mt-0 max-w-2xl text-center text-lg text-muted-foreground">
          Find and verify the latest experiments below. Making science fairer one validation at a
          time.
        </p>
        <div className="mb-20 flex flex-row gap-4">
          <Button size="lg" onClick={() => setNewExperimentModalOpen(true)}>
            Create New Experiment
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to={$path("/dashboard/experiments")}>View Experiments</Link>
          </Button>
        </div>
        <div className="w-full">
          <h2 className="mb-4 mt-2 text-center text-2xl font-semibold text-foreground">
            Check out the latest experiments you can be a part of
          </h2>
          <div className="mx-auto w-full max-w-7xl rounded-2xl bg-secondary p-10 shadow-inner">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {experiments.map((experiment) => (
                <Card
                  key={experiment.id}
                  className="w-full cursor-pointer shadow-md transition duration-200 hover:scale-[1.03] hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="mb-2 truncate text-lg font-bold">
                      {experiment.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-foreground">Description:</span>
                        <p className="font-geist mb-0 line-clamp-3 text-sm text-muted-foreground">
                          {experiment.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Bounty:</span>
                        <span className="font-geist font-medium text-primary">
                          ${experiment.bounty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Created:</span>
                        <span className="font-geist text-sm text-muted-foreground">
                          {new Date(experiment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Creator:</span>
                        <span className="font-geist flex max-w-[160px] items-center gap-1 truncate text-sm text-muted-foreground">
                          {(() => {
                            const user = userMap[experiment.creatorId];
                            if (user?.worldIdNullifierHash)
                              return (
                                <>
                                  <span>World ID:</span>{" "}
                                  <Copyable
                                    value={user.worldIdNullifierHash}
                                    display={shorten(user.worldIdNullifierHash)}
                                  />
                                </>
                              );
                            if (user?.address)
                              return (
                                <>
                                  <span>Wallet:</span>{" "}
                                  <Copyable value={user.address} display={shorten(user.address)} />
                                </>
                              );
                            return `User ${experiment.creatorId}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      to={$path("/dashboard/revalidate/:id", { id: experiment.id })}
                      className="font-geist w-full rounded-md border border-transparent bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
                    >
                      Revalidate Experiment
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {experiments.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No experiments available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <NewExperimentModal open={newExperimentModalOpen} setOpen={setNewExperimentModalOpen} />
    </div>
  );
}
