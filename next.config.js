import { withPayload } from "@payloadcms/next/withPayload";
// Injected content via Sentry wizard below
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

import { env } from "./src/env.js";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    dirs: ["src"],
  },
  images: {
    remotePatterns: [
      {
        hostname: new URL(env.SUPABASE_URL).hostname,
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/notifications",
      "@mantine/charts",
      "@mantine/hooks",
      "motion",
      "googleapis",
    ],
  },
};

const sentryConfig = withSentryConfig(config, {
  org: "davinci-coding-gmbh",
  project: "t4-capital",
  silent: !process.env.CI,
  // tunnelRoute: "/monitoring",
  disableLogger: true,
});

export default withPayload(withNextIntl(sentryConfig));
