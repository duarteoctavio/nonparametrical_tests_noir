import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady } from "@remix-run/node";
import express from "express";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

// and your app is "just a request handler"
app.all(
  "*",
  createRequestHandler({
    build,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);

  // in development, this will help the dev server know when the server is ready
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
});
