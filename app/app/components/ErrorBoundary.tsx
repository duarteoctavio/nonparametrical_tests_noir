import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FE] px-4 py-12">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <h1 className="mb-4 text-6xl font-bold text-[#6366F1]">{error.status}</h1>
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">{error.statusText}</h2>
            <p className="text-gray-600">{error.data}</p>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5]"
            >
              Go back home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FE] px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="mb-4 text-6xl font-bold text-[#6366F1]">Oops!</h1>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : "An unexpected error occurred"}
          </p>
        </div>
        <div>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5]"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}
