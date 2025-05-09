// Combined experiment creation page with form and action handler
import { data } from "@remix-run/node";
import { requireUserId } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";
import { createExperiment } from "~/.server/dto/experiments";
import { env } from "~/.server/env";
import sharp from "sharp";
import { Address, encodeAbiParameters, keccak256 } from "viem";

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUserId(request);
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bounty = parseInt(formData.get("bounty") as string);
  const image = formData.get("image") as File;
  const transactionHash = formData.get("transactionHash") as string;

  if (!title || !description || isNaN(bounty) || !image || !transactionHash) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  let webpImage: Buffer | undefined = undefined;
  const buffer = await image.arrayBuffer();
  webpImage = await sharp(buffer).webp().toBuffer();

  const decoder = new TextEncoder();
  const bytes = decoder.encode(description);

  const contractId = keccak256(
    encodeAbiParameters(
      [{ type: "address" }, { type: "bytes32" }],
      [user.address as Address, keccak256(bytes)],
    ),
  );

  createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
    image: webpImage,
    verifierAddress: env.VERIFIER_ADDRESS,
    contractId,
  });

  return { ok: true };
}
