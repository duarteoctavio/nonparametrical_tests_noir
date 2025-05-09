import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { requireUserId } from "~/.server/services/session";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  getAllExperiments,
  getExperimentsByCreator,
  SelectExperiment,
} from "~/.server/dto/experiments";
import { Button } from "~/components/ui/button";
import NewExperimentModal from "~/components/new-experiment-modal";
import { useState, useRef, useEffect } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUserId(request);

  let experiments: SelectExperiment[] = [];

  const url = new URL(request.url);
  if (url.searchParams.get("my-experiments-only")) {
    experiments = getExperimentsByCreator(user.id);
  } else {
    experiments = getAllExperiments();
  }

  return {
    experiments: experiments.map((e) => ({
      ...e,
      image: e.image.toString("base64"),
      isMine: e.creatorId === user.id,
    })),
  };
}

export default function Experiments() {
  const { experiments } = useLoaderData<typeof loader>();
  const [newExperimentModalOpen, setNewExperimentModalOpen] = useState(false);
  const createButtonRef = useRef<HTMLButtonElement>(null);
  const noExperimentsTextRef = useRef<HTMLParagraphElement>(null);
  const [arrowPath, setArrowPath] = useState("");
  const [arrowVisible, setArrowVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const myExperimentsOnly = searchParams.get("my-experiments-only") === "true";

  useEffect(() => {
    const calculateAndSetArrow = () => {
      if (createButtonRef.current && noExperimentsTextRef.current && experiments.length === 0) {
        const buttonRect = createButtonRef.current.getBoundingClientRect();
        const textRect = noExperimentsTextRef.current.getBoundingClientRect();
        const parentEl = noExperimentsTextRef.current.parentElement;
        if (!parentEl) return;
        const containerRect = parentEl.getBoundingClientRect();

        const startX = textRect.left - containerRect.left + textRect.width / 2;
        const startY = textRect.bottom - containerRect.top + 5;

        const endX = buttonRect.left - containerRect.left + buttonRect.width / 2;
        const endY = buttonRect.bottom - containerRect.top + 5;

        const dipAmount = 200;
        const controlX = startX + (endX - startX) / 2;
        const controlY = startY + dipAmount;

        setArrowPath(`M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`);
        setArrowVisible(true);
      } else {
        setArrowVisible(false);
      }
    };

    calculateAndSetArrow();

    const handleResize = () => {
      calculateAndSetArrow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [experiments.length]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center">
        <div className="flex flex-col gap-4 md:flex-row">
          <Button ref={createButtonRef} onClick={() => setNewExperimentModalOpen(true)}>
            Create New Experiment
          </Button>
          <div className="flex items-center gap-2">
            <Label htmlFor="my-experiments-only" className="text-muted-foreground">
              My Experiments Only
            </Label>
            <Switch
              id="my-experiments-only"
              checked={myExperimentsOnly}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSearchParams((prev) => {
                    prev.set("my-experiments-only", "true");
                    return prev;
                  });
                } else {
                  setSearchParams((prev) => {
                    prev.delete("my-experiments-only");
                    return prev;
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      {experiments.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {experiments.map((experiment) => (
            <Card key={experiment.id}>
              <CardHeader className="flex flex-col items-center justify-between lg:flex-row">
                <CardTitle className="text-xl">{experiment.title}</CardTitle>
                <div className="flex flex-row gap-2">
                  {experiment.isMine && (
                    <Badge className="bg-green-600 text-xs hover:bg-green-700">Mine</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">{experiment.description}</p>
                <div className="rounded border-2 border-dashed p-1">
                  <img
                    src={`data:image/webp;base64,${experiment.image}`}
                    alt={experiment.title}
                    className="rounded"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="font-bold text-primary" suppressHydrationWarning>
                  {new Intl.NumberFormat(navigator.language, {
                    style: "currency",
                    currency: navigator.language.startsWith("en") ? "USD" : undefined,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(experiment.bounty)}
                </span>
                <span className="text-muted-foreground" suppressHydrationWarning>
                  {new Date(experiment.createdAt).toLocaleDateString()}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="relative flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-lg text-muted-foreground">No experiments found</p>
          <p ref={noExperimentsTextRef} className="text-sm text-muted-foreground/80">
            Pssst... why don&apos;t you create one? 😉
          </p>
          {arrowVisible && experiments.length === 0 && (
            <svg
              className="pointer-events-none absolute left-0 top-0 h-full w-full"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="8"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 8 3.5, 0 7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </marker>
              </defs>
              <path
                d={arrowPath}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                className="text-muted-foreground/80"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          )}
        </div>
      )}

      <NewExperimentModal open={newExperimentModalOpen} setOpen={setNewExperimentModalOpen} />
    </div>
  );
}
