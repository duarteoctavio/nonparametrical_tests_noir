import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { User } from "~/types/user";
import { env } from "~/.server/env";
import { getUserById } from "../dto/users";

// Export this to use in your root.tsx
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__revalidate_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [env.SESSION_SECRET],
    secure: env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: number;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);

  try {
    // Log before committing
    console.log(`Committing session for user ID: ${userId}, redirectTo: ${redirectTo}`);

    const cookie = await sessionStorage.commitSession(session, {
      maxAge: remember
        ? 60 * 60 * 24 * 7 // 7 days
        : undefined,
    });

    // Log after successful commit
    console.log(`Session committed successfully for user ID: ${userId}`);

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error) {
    // Log any error during session commit
    console.error("!!! Error during createUserSession commit/redirect !!!", error);
    // Re-throw the error so Remix still handles it (likely showing an error page),
    // but now we have specific server logs.
    throw error;
  }
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getUserId(request: Request): Promise<number | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  const user = getUserById(userId);
  if (!user) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }

  return user;
}

// Get user session information or null if not logged in
// Updated: Also includes worldIdNullifierHash in the returned User object.
export async function getUser(request: Request): Promise<User | null> {
  const userId = await getUserId(request);
  if (!userId) return null;

  const session = await getSession(request);
  const userSessionKey = session.get(USER_SESSION_KEY);

  // Ensure the user ID from the session key matches the one fetched
  if (userSessionKey !== userId) {
    console.error(`Session validation failed: User ID mismatch in getUser`);
    await sessionStorage.destroySession(session);
    // Don't redirect here, just return null as user is not authenticated
    return null;
  }

  // Fetch full user details from the database
  const dbUser = await getUserById(userId);

  if (!dbUser) {
    console.error(`getUser failed: User not found for ID ${userId}`);
    await sessionStorage.destroySession(session);
    return null; // User associated with session doesn't exist
  }

  // Map dbUser to the User interface
  const user: User = {
    id: dbUser.id,
    walletAddress: dbUser.address ?? "", // Default to empty string if null
    worldIdNullifierHash: dbUser.worldIdNullifierHash, // Include the nullifier hash
    createdAt: dbUser.createdAt,
  };

  return user;
}
