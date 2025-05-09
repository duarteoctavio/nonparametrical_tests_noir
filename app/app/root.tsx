import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import "./globals.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import { Providers } from "./providers";
import { clientEnv } from "./.server/env";

export function loader() {
  return { env: clientEnv };
}

export default function App() {
  const { env } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-geist h-full bg-background antialiased">
        <Providers env={env}>
          <Outlet />
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
