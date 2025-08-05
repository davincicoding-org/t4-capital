import { getRequestConfig } from "next-intl/server";

import { fetchCachedMessages } from "@/server/messages";

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: await fetchCachedMessages(locale),
  };
});
