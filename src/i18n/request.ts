import { getRequestConfig } from "next-intl/server";

import { fetchCachedMessages } from "@/server/messages";

import { SUPPORTED_LOCALES } from "./config";

export default getRequestConfig(async () => {
  const locale = SUPPORTED_LOCALES[0];

  return {
    locale,
    messages: await fetchCachedMessages(locale),
  };
});
