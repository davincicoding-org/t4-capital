import type { MESSAGES_SCHEMA, SUPPORTED_LOCALES } from "./config";
import type { ResolvedMessagesSchema } from "./types";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof SUPPORTED_LOCALES)[number];
    Messages: ResolvedMessagesSchema<typeof MESSAGES_SCHEMA>;
  }
}
