import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { requireUserId } from '~/utils/session.server';
import { db } from '~/db';
import { experiments, users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return json({ user: user[0] });
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const bounty = parseInt(formData.get('bounty') as string);

  if (!title || !description || isNaN(bounty)) {
    return json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  await db.insert(experiments).values({
    title,
    description,
    bounty,
    creatorId: userId,
    createdAt: new Date(),
  });

  return redirect('/dashboard');
}

export default function NewExperiment() {
  const navigation = useNavigation();
  const { user } = useLoaderData<typeof loader>();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-background">
    {/* Navbar */}
    <nav className="glass shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary font-geist">ReValidate</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-foreground font-geist">Welcome, {user?.name || 'Researcher'}</span>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 font-geist"
            >
              Sign out
            </button>
          </Form>
        </div>
      </div>
    </div>
  </nav>
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-foreground mb-6 font-geist">Create New Experiment</h1>
          
          <Form method="post" className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground font-geist">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Enter experiment title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground font-geist">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Describe your experiment"
              />
            </div>

            <div>
              <label htmlFor="bounty" className="block text-sm font-medium text-foreground font-geist">
                Bounty ($)
              </label>
              <input
                type="number"
                id="bounty"
                name="bounty"
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 bg-card/50 border border-input rounded-lg shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground font-geist text-sm"
                placeholder="Enter bounty amount"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <a
                href="/dashboard"
                className="px-4 py-2 border border-border rounded-lg shadow-sm text-sm font-medium text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 font-geist"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-geist"
              >
                {isSubmitting ? 'Creating...' : 'Create Experiment'}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </div>
  );
}
