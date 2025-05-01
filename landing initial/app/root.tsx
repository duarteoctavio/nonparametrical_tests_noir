import React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return [
    { title: "ReValidate - Strengthen Scientific Integrity" },
    {
      name: "description",
      content:
        "Our platform enables researchers to verify, replicate, and strengthen scientific studies with transparent methodologies.",
    },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
