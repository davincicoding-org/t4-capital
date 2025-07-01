import { withPayload } from "@payloadcms/next/withPayload";
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

export default withPayload(withNextIntl(config));
