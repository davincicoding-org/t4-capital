import { google } from "googleapis";

import { env } from "@/env";

export const getGoogleClient = () =>
  google.auth.getClient({
    credentials: {
      type: "service_account",
      project_id: env.GOOGLE_CLOUD_PROJECT_ID,
      private_key_id: env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
      private_key: env.GOOGLE_CLOUD_PRIVATE_KEY,
      client_email: env.GOOGLE_CLOUD_CLIENT_EMAIL,
      client_id: env.GOOGLE_CLOUD_CLIENT_ID,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
