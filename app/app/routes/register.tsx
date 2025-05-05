import { data } from "@remix-run/node";
import { Form, useActionData, useNavigation, Link } from "@remix-run/react";
import { createUser, AuthError } from "~/.server/services/auth";
import { createUserSession } from "~/.server/services/session";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const remember = formData.get("remember") === "on";

  if (!email || !password || !name) {
    return data({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const user = await createUser(email, password, name);
    return createUserSession({
      request,
      userId: user.id,
      remember,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return data({ error: error.message }, { status: 400 });
    }
    return data({ error: "An error occurred during registration" }, { status: 500 });
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-geist mb-2 text-4xl font-bold text-primary">ReValidate</h1>
          <p className="font-geist text-sm text-muted-foreground">
            Science that stands the test of time
          </p>
        </div>
        <div className="glass space-y-6 rounded-xl p-8 shadow-sm">
          <div>
            <h2 className="font-geist text-center text-2xl font-semibold text-foreground">
              Create your account
            </h2>
          </div>
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="font-geist block text-sm font-medium text-foreground"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-geist block text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-geist block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="font-geist mt-1 block w-full rounded-lg border border-input bg-card/50 px-3 py-2 text-sm text-foreground placeholder-muted-foreground shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <label htmlFor="remember" className="font-geist ml-2 block text-sm text-foreground">
                Remember me
              </label>
            </div>

            {actionData?.error && (
              <div className="font-geist rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                {actionData.error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-geist flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="font-geist text-muted-foreground">Already have an account?</span>{" "}
              <Link
                to="/login"
                className="font-geist font-medium text-primary hover:text-primary/90"
              >
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
