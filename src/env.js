import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    POSTGRES_URL: z.string(),
    GOOGLE_CLOUD_PROJECT_ID: z.string(),
    GOOGLE_CLOUD_PRIVATE_KEY_ID: z.string(),
    GOOGLE_CLOUD_PRIVATE_KEY: z.string(),
    GOOGLE_CLOUD_CLIENT_EMAIL: z.string(),
    GOOGLE_CLOUD_CLIENT_ID: z.string(),
    MAILCHIMP_APIKEY: z.string(),
    NEWSLETTER_AUDIENCE_ID: z.string(),
    I18N_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_URL: process.env.POSTGRES_URL,
    GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
    GOOGLE_CLOUD_PRIVATE_KEY_ID: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
    GOOGLE_CLOUD_PRIVATE_KEY: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
    GOOGLE_CLOUD_CLIENT_EMAIL: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    GOOGLE_CLOUD_CLIENT_ID: process.env.GOOGLE_CLOUD_CLIENT_ID,
    MAILCHIMP_APIKEY: process.env.MAILCHIMP_APIKEY,
    NEWSLETTER_AUDIENCE_ID: process.env.NEWSLETTER_AUDIENCE_ID,
    I18N_SECRET: process.env.I18N_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
