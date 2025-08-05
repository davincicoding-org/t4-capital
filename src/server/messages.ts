import type { TypedLocale } from "payload";
import { fetchMessages } from "payload-intl";

import { cachedRequest } from "./cache";
import { getPayloadClient } from "./payload";

export const fetchCachedMessages = cachedRequest(
  async (locale: TypedLocale) => {
    const payload = await getPayloadClient();

    return await fetchMessages(payload, locale);
  },
  ["cms", "messages"],
);
