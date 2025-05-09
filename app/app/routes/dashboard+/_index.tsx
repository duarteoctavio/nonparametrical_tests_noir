import { data } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import { getAllExperiments } from "~/.server/dto/experiments";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { $path } from "remix-routes";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import NewExperimentModal from "~/components/new-experiment-modal";
import Screensaver from "~/components/screensaver";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  const experiments = getAllExperiments();
  return data({
    user,
    experiments: experiments.map((e) => ({
      ...e,
      image: e.image.toString("base64"),
    })),
  });
}

export default function Dashboard() {
  const { experiments } = useLoaderData<typeof loader>();
  const [newExperimentModalOpen, setNewExperimentModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mt-16 flex-1 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-lg p-4">
        <img src="/logo.png" alt="ReValidate" className="h-20 w-20" />
        <h1 className="mb-4 mt-2 text-center text-6xl font-semibold tracking-tight">ReValidate</h1>
        <p className="mb-6 mt-0 max-w-2xl text-center text-xl font-medium">
          Find and verify the latest experiments.
          <br />
          Making science fairer one validation at a time.
        </p>
        <div className="mb-20 flex flex-col gap-4 md:flex-row">
          <Button size="lg" onClick={() => setNewExperimentModalOpen(true)}>
            Create New Experiment
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to={$path("/dashboard/experiments")}>View Experiments</Link>
          </Button>
        </div>
      </div>

      {experiments.map((experiment, index) => (
        <Screensaver
          key={experiment.id}
          speed={2}
          startPosition={{ x: index * 20, y: index * 20 }}
          startAngle={40}
          containerRef={containerRef}
        >
          <div className="h-16 w-16 overflow-hidden rounded-lg border shadow md:h-48 md:w-48">
            <img
              src={`data:image/webp;base64,${experiment.image}`}
              alt={experiment.title}
              className="h-full w-full rounded-lg object-cover opacity-60"
            />
          </div>
        </Screensaver>
      ))}
      <Screensaver
        speed={2}
        startPosition={{ x: experiments.length * 20, y: experiments.length * 20 }}
        startAngle={40}
        containerRef={containerRef}
      >
        <div className="h-16 w-16 overflow-hidden rounded-lg border shadow md:h-48 md:w-48">
          <img
            src="/meme.jpg"
            alt="meme"
            className="h-full w-full rounded-lg object-cover opacity-60"
          />
        </div>
      </Screensaver>

      <NewExperimentModal open={newExperimentModalOpen} setOpen={setNewExperimentModalOpen} />
    </div>
  );
}
