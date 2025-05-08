// Combined experiment creation page with form and action handler
import { data, redirect } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createExperiment } from "~/.server/dto/experiments";
import { $path } from "remix-routes";
import { Form, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { appApi } from "~/utils/app_api";
import { useWriteContract } from "wagmi";

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = parseInt(formData.get("bounty") as string);
  const image = formData.get("image") as string;

  if (!title || !description || isNaN(bounty)) {
    return data({ error: "All fields are required" }, { status: 400 });
  }



  if (!process.env.VERIFIER_ADDRESS) {
    return data({ error: "VERIFIER_ADDRESS is not set" }, { status: 500 });
  }

  createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
    image: Buffer.from([]),
    verifierAddress: process.env.VERIFIER_ADDRESS as string,
  });

  return redirect($path("/dashboard/experiments/me"));
}

export default function NewExperiment() {
  const actionData = useActionData<{ error?: string }>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Create New Experiment</h1>
        <p className="text-muted-foreground">Fill in the details for your new experiment.</p>
      </div>

      <Form method="post" className="space-y-6" encType="multipart/form-data">
        {actionData?.error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {actionData.error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter experiment title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your experiment"
            required
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bounty">Bounty (in wei)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            placeholder="Enter bounty amount"
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Experiment Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit" className="w-full sm:w-auto">
            Create Experiment
          </Button>
        </div>
      </Form>
    </div>
  );
} 