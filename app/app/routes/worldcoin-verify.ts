// Resource route to handle World ID proof verification
// Updated: Integrates with existing user/session system based on nullifier hash.
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node"; // Import redirect

// TODO: Import your actual DTO functions and session function
import {
  findUserByNullifierHash,
  createUserWithNullifier,
  type SelectUser, // Import SelectUser type
} from "~/.server/dto/users";
import { createUserSession } from "~/.server/services/session";

// Define the expected shape of the proof from the frontend
// Adjust based on the actual structure sent by IDKitWidget's handleVerify
interface WorldIdProof {
  merkle_root: string;
  nullifier_hash: string;
  proof: string;
  credential_type?: string; // Include credential_type as IDKit sends it
  verification_level?: "orb" | "device"; // Add verification_level received from frontend
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method Not Allowed" }, { status: 405 });
  }

  let proofData: WorldIdProof;
  try {
    proofData = await request.json();
  } catch (error) {
    return json({ error: "Invalid request body" }, { status: 400 });
  }

  // --- World ID Verification ---
  // 1. Get your World ID App ID and Action ID
  const appId = "app_d8c5804c8e9c81c610125012f6c866b7";
  const actionId = "login";
  // 2. Get your World ID Project Secret
  const projectSecret = "sk_87a73ddc2a26285e6a679388798f2e7d518ca97442aaf0a9";

  if (!appId || !actionId || !projectSecret) {
    console.error("World ID environment variables not set");
    return json({ error: "Server configuration error" }, { status: 500 });
  }

  console.log("Attempting to verify World ID proof:", {
    nullifier_hash: proofData.nullifier_hash,
    merkle_root: proofData.merkle_root,
    action: actionId,
    verification_level: proofData.verification_level, // Log the level being sent
    // signal: "" // Include signal if you used one
  });

  try {
    const verifyUrl = `https://developer.worldcoin.org/api/v2/verify/${appId}`;
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include User-Agent as recommended by World ID docs
        "User-Agent": `RemixApp/1.0 (World ID ${appId})`,
      },
      body: JSON.stringify({
        merkle_root: proofData.merkle_root,
        nullifier_hash: proofData.nullifier_hash,
        proof: proofData.proof,
        action: actionId,
        verification_level: proofData.verification_level, // Add verification_level to the request body
        // signal: "" // Include signal if you used one
      }),
    });

    const verificationResult = await response.json();

    if (response.ok && verificationResult?.nullifier_hash === proofData.nullifier_hash) {
      // --- World ID Verification Successful ---
      console.log("World ID Verification Successful for nullifier:", proofData.nullifier_hash);

      // --- User Session Management ---
      const { nullifier_hash } = proofData;

      // 1. Check if user exists with this nullifier hash
      let user: SelectUser | undefined = await findUserByNullifierHash(nullifier_hash);

      if (!user) {
        // 2. If not, create a new user with this nullifier hash
        console.log(`No user found for nullifier ${nullifier_hash}, creating new user.`);
        const newUser = await createUserWithNullifier(nullifier_hash);
        if (!newUser) {
          // Handle case where creation failed (returned null)
          console.error(`Failed to create user for nullifier: ${nullifier_hash}`);
          return json({ success: false, error: "Failed to create user account." }, { status: 500 });
        }
        // Assign the successfully created user
        user = newUser;
      }

      // 3. Create a user session using the existing session service
      // At this point, `user` is guaranteed to be a valid SelectUser object
      console.log(`Creating session for user ID: ${user.id}`);
      return createUserSession({
        request,
        userId: user.id,
        remember: true, // Or based on user preference if available
        redirectTo: "/dashboard", // Redirect to dashboard on successful login
      });
      // --- End User Session Management ---
    } else {
      // Verification Failed
      console.error("World ID Verification Failed:", verificationResult);
      return json(
        {
          success: false,
          error: "World ID verification failed",
          detail: verificationResult?.code || "Unknown verification error",
          attribute: verificationResult?.attribute || null,
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error calling World ID Verify API:", error);
    return json(
      { success: false, error: "Internal server error during verification" },
      { status: 500 },
    );
  }
  // --- End World ID Verification ---
}

// Optional: Add a loader function if this route needs to handle GET requests
// export async function loader({ request }: LoaderFunctionArgs) {
//   return json({ message: "Verification endpoint only accepts POST requests." });
// }
