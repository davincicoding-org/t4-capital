import type { ResolvedMessagesSchema } from "ra-messages";

import type { MESSAGES_SCHEMA, SUPPORTED_LOCALES } from "./config";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof SUPPORTED_LOCALES)[number];
    Messages: ResolvedMessagesSchema<typeof MESSAGES_SCHEMA>;
  }
}
