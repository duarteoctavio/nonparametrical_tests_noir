import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { Form, useSubmit } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ClientOnly } from "../components/client-only";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { createUserSession } from "~/.server/services/session";
import { findOrCreateUserByAddress } from "~/.server/dto/users";
import { redirect } from "@remix-run/node";

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

  useEffect(() => {
    if (isConnected && address && formRef.current) {
      console.log(`Wallet connected with address: ${address}. Submitting login form.`);
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    }
  }, [isConnected, address, submit]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
          <CardDescription>Connect your wallet to sign in.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Form method="post" ref={formRef}>
            <input type="hidden" name="address" value={address ?? ""} />
            <ClientOnly>
              <ConnectButton label="Connect Wallet" showBalance={false} accountStatus="address" />
            </ClientOnly>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
