import type { TypedLocale } from "payload";

import type { MESSAGES } from "./messages";

declare module "next-intl" {
  interface AppConfig {
    Locale: TypedLocale;
    Messages: typeof MESSAGES;
  }
}
