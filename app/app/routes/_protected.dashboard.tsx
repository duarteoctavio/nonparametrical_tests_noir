import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, Link } from '@remix-run/react';
import { getUser } from '~/utils/session.server';
import { createExperiment } from '~/services/experiments.server';
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { db } from '~/db';
import { experiments } from '~/db/schema';

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  if (!user) return redirect('/login');
  
  const allExperiments = await db.select().from(experiments).all();
  return json({ user, experiments: allExperiments });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await getUser(request);
  if (!user) return redirect('/login');

  const formData = await request.formData();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const bounty = Number(formData.get('bounty'));

  if (!title || !description || !bounty) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  await createExperiment({
    title,
    description,
    bounty,
    creatorId: user.id,
  });

  return redirect('/dashboard');
}


export default function Dashboard() {
  const { user, experiments } = useLoaderData<typeof loader>();

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

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground font-geist">Dashboard</h1>
            <div className="flex space-x-4">
              <Link
                to="/experiments/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 font-geist"
              >
                Create New Experiment
              </Link>
              <Link
                to="/experiments/my"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 font-geist"
              >
                My Experiments
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                className="glass rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 font-geist">
                  {experiment.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 font-geist">
                  {experiment.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium font-geist">
                    ${experiment.bounty}
                  </span>
                  <span className="text-sm text-muted-foreground font-geist">
                    {new Date(experiment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
