import { Link } from "@remix-run/react";
import { requireUserId } from "~/.server/services/session";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { $path } from "remix-routes";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import NewExperimentModal from "~/components/new-experiment-modal";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);
  return {
    user,
  };
}

export default function Dashboard() {
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

      <NewExperimentModal open={newExperimentModalOpen} setOpen={setNewExperimentModalOpen} />
    </div>
  );
}
