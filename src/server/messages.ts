import type { MessagesFetcher, MessagesTree } from "payload-polyglot";

import { cachedRequest } from "./cache";
import { getPayloadClient } from "./payload";

export const fetchMessages: MessagesFetcher = async (locale) => {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "polyglot_messages",
    where: {
      locale: {
        equals: locale,
      },
    },
    limit: 1,
  });

  const [doc] = docs;

  if (!doc) throw new Error(`No messages found for locale ${locale}`);
  return doc.content as MessagesTree;
};

export const fetchCachedMessages = cachedRequest(fetchMessages, [
  "cms",
  "messages",
]);
