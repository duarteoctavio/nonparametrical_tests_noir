import { useRef } from "react";
import { useAccount } from "wagmi";
import { Form, useSubmit } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { createUserSession, getUserId } from "~/.server/services/session";
import { findOrCreateUserByAddress, getUserById } from "~/.server/dto/users";
import { redirect } from "@remix-run/node";
import WorldcoinLogin from "~/components/worldcoin-login";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

// Loader: Redirect logged-in users to dashboard
export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    const user = getUserById(userId);
    if (user !== undefined) {
      return redirect("/dashboard");
    }
  }
  // No user session, render the login page
  return {};
}

// Action: Handles wallet connect login
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const address = formData.get("address") as string;

  if (!address) {
    console.error("Login action called without address.");
    return redirect("/login");
  }

  const user = await findOrCreateUserByAddress(address);

  if (!user) {
    console.error(`Could not find or create user for address: ${address}`);
    return redirect("/login");
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: "/dashboard",
  });
}

export default function Login() {
  const { isConnected, address } = useAccount();
  const submit = useSubmit();
  const formRef = useRef<HTMLFormElement>(null);

  const handleWalletLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!address) {
      console.warn("Wallet not connected, cannot submit login.");
      return;
    }
    if (formRef.current) {
      console.log(`Submitting login form manually for address: ${address}.`);
      submit(formRef.current);
    }
  };

  return (
    <div className="font-geist flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <h1 className="font-geist text-3xl font-bold text-primary">ReValidate</h1>
          <CardTitle className="pt-4 text-2xl font-semibold tracking-tight">Welcome</CardTitle>
          <CardDescription>Sign in using your preferred method below.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 pb-8 pt-6">
          <div className="flex w-full flex-col items-center space-y-3">
            <p className="text-sm font-medium text-foreground">Connect & Sign In with Wallet</p>
            <div className="mb-3 flex justify-center">
              <ConnectButton
                label="1. Connect Wallet"
                showBalance={false}
                accountStatus="address"
              />
            </div>
            <Form
              method="post"
              ref={formRef}
              onSubmit={handleWalletLoginSubmit}
              className="flex justify-center"
            >
              <input type="hidden" name="address" value={address ?? ""} />
              <Button
                type="submit"
                disabled={!isConnected || !address}
                className="w-full max-w-[200px]"
              >
                2. Sign In
              </Button>
            </Form>
          </div>

          <div className="flex w-full items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-muted-foreground">Or</span>
            <Separator className="flex-1" />
          </div>

          <div className="flex w-full flex-col items-center space-y-3">
            <p className="text-sm font-medium text-foreground">Verify with World ID</p>
            <WorldcoinLogin className="w-full max-w-[200px]" />
            <a
              href="https://worldcoin.org/download-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline hover:text-primary"
            >
              Get the World App
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
