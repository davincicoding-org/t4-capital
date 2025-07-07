// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d616d1caa0a6ee6ffa71bcbb4b91ab8d@o4508201138388992.ingest.de.sentry.io/4508201139699792",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
});
