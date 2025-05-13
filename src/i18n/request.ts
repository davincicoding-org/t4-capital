import { unstable_cache } from "next/cache";

import { getRequestConfig } from "next-intl/server";

import { fetchMessages } from "./fetch";

const fetchCachedMessages = unstable_cache(fetchMessages, [], {
  tags: ["i18n"],
});

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "en";

  return {
    locale,
    messages: await fetchCachedMessages(locale),
  };
});
