import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, useFetcher, useNavigation } from "@remix-run/react";
import { useEffect, useState, FormEvent } from "react";
import { $path } from "remix-routes";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SelectExperiment } from "~/.server/dto/experiments";
import { getAddress, keccak256, parseEther } from "viem";
import { useConfig, useWriteContract } from "wagmi";
import { useClientEnv } from "~/hooks/use-client-env";
import { appApi } from "~/utils/app_api";
import { waitForTransactionReceipt } from "@wagmi/core";

export default function NewExperimentModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string>();
  const { writeContractAsync } = useWriteContract();
  const env = useClientEnv();
  const fetcher = useFetcher();
  const config = useConfig();

  useEffect(() => {
    if (open) {
      setSelectedImagePreview(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (navigation.state === "idle" && fetcher.state === "idle" && fetcher.data == null) {
      setOpen(false);
    }
  }, [navigation.state, fetcher.state, fetcher.data, setOpen]);

  const handlePublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const experimentData = Object.fromEntries(formData.entries()) as unknown as SelectExperiment;

    if (typeof experimentData.bounty === "string") {
      experimentData.bounty = parseFloat(experimentData.bounty);
    }

    try {
      setIsSubmitting(true);
      const decoder = new TextEncoder();
      const bytes = decoder.encode(experimentData.description);

      const hash = await writeContractAsync({
        address: getAddress(env.APP_ADDRESS),
        abi: appApi,
        functionName: "proposeExperiment",
        args: [
          keccak256(bytes),
          getAddress(env.VERIFIER_ADDRESS),
          parseEther(experimentData.bounty.toString()),
        ],
        value: parseEther(experimentData.bounty.toString()),
      });
      await waitForTransactionReceipt(config, { hash });
      formData.append("transactionHash", hash);
      console.log("formData", Object.fromEntries(formData.entries()));
      fetcher.submit(formData, {
        action: $path("/dashboard/experiments/new"),
        method: "POST",
        encType: "multipart/form-data",
      });
    } catch (error) {
      console.error("Failed to publish experiment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
          <DialogDescription>Create a new experiment to validate.</DialogDescription>
        </DialogHeader>

        <Form
          className="space-y-6"
          method="post" // Ensure method is post as per fetcher
          encType="multipart/form-data"
          onSubmit={handlePublish}
          action={$path("/dashboard/experiments/new")} // Action can be defined here or in fetcher.submit
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter experiment title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Describe your experiment"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bounty">Bounty (ETH)</Label>
            <Input
              type="number"
              id="bounty"
              name="bounty"
              required
              min="0"
              step="any"
              placeholder="Enter bounty amount"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              required
              placeholder="Upload image"
              onChange={(event) => {
                const file = event.target.files?.[0];

                // Create preview URL for the selected image
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setSelectedImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setSelectedImagePreview(undefined);
                }
              }}
              accept="image/*"
            />

            {/* Show selected image preview or existing logo */}
            {selectedImagePreview && (
              <div className="mx-auto mt-2 w-fit overflow-hidden rounded border-2 border-dashed bg-muted p-1">
                <img
                  src={selectedImagePreview}
                  alt="Logo"
                  className="h-auto max-w-[200px] rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Experiment"}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
