import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    POSTGRES_URL: z.string(),
    PAYLOAD_SECRET: z.string(),
    SUPABASE_URL: z.string(),
    S3_BUCKET: z.string(),
    S3_ACCESS_KEY_ID: z.string(),
    S3_SECRET_ACCESS_KEY: z.string(),
    S3_REGION: z.string(),
    S3_ENDPOINT: z.string(),
    RESEND_API_KEY: z.string(),
    MAILCHIMP_APIKEY: z.string(),
    NEWSLETTER_AUDIENCE_ID: z.string(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // UGLY FIX
    POSTGRES_URL: process.env.POSTGRES_URL?.replace("sslmode=require&", ""),
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAILCHIMP_APIKEY: process.env.MAILCHIMP_APIKEY,
    NEWSLETTER_AUDIENCE_ID: process.env.NEWSLETTER_AUDIENCE_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
