import { json } from '@remix-run/node';
import { Form, useActionData, useNavigation, Link } from '@remix-run/react';
import { createUser, AuthError } from '~/utils/auth.server';
import { createUserSession } from '~/utils/session.server';
import type { ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const remember = formData.get('remember') === 'on';

  if (!email || !password || !name) {
    return json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    const user = await createUser(email, password, name);
    return createUserSession({
      request,
      userId: user.id,
      remember,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return json({ error: error.message }, { status: 400 });
    }
    return json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 font-geist">ReValidate</h1>
          <p className="text-sm text-muted-foreground font-geist">Science that stands the test of time</p>
        </div>
        <div className="glass rounded-xl shadow-sm p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground text-center font-geist">
              Create your account
            </h2>
          </div>
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground font-geist">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground font-geist">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground font-geist">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Create a password"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-foreground font-geist">
                Remember me
              </label>
            </div>

            {actionData?.error && (
              <div className="text-destructive text-sm text-center bg-destructive/10 rounded-lg p-3 font-geist">
                {actionData.error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-geist"
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground font-geist">Already have an account?</span>{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/90 font-geist"
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
