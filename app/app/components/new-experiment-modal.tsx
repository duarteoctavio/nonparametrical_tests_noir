import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { $path } from "remix-routes";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function NewExperimentModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [selectedImagePreview, setSelectedImagePreview] = useState<string>();

  useEffect(() => {
    if (open) {
      setSelectedImagePreview(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (navigation.state === "idle") {
      setOpen(false);
    }
  }, [navigation.state, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Experiment</DialogTitle>
          <DialogDescription>Create a new experiment to validate.</DialogDescription>
        </DialogHeader>

        <Form method="post" className="space-y-6" action={$path("/dashboard/experiments/new")}>
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
            <Label htmlFor="bounty">Bounty ($)</Label>
            <Input
              type="number"
              id="bounty"
              name="bounty"
              required
              min="0"
              placeholder="Enter bounty amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bounty">Bounty ($)</Label>
            <Input
              type="number"
              id="bounty"
              name="bounty"
              required
              min="0"
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
                <img src={selectedImagePreview} alt="Logo" className="h-auto max-w-[200px]" />
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
