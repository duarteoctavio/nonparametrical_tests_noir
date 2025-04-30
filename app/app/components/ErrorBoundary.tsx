import { useRouteError, isRouteErrorResponse } from '@remix-run/react';

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FE] px-4 py-12">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-6xl font-bold text-[#6366F1] mb-4">{error.status}</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{error.statusText}</h2>
            <p className="text-gray-600">{error.data}</p>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6366F1] hover:bg-[#4F46E5]"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FE] px-4 py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-[#6366F1] mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
        </div>
        <div>
          <a
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#6366F1] hover:bg-[#4F46E5]"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
} 