import { Outlet } from '@remix-run/react';
import { requireUserId } from '~/utils/session.server';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);
  return null;
}

export default function ProtectedLayout() {
  return <Outlet />;
} 