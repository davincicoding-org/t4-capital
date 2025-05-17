import type { MessagesTree } from "@/i18n/types";

import { cachedRequest } from "./cache";
import { supabaseClient } from "./supabase";

export async function saveMessages(locale: string, messages: MessagesTree) {
  const { error } = await supabaseClient.storage
    .from("translations")
    .upload(`${locale}.json`, JSON.stringify(messages), {
      upsert: true,
    });
  if (error) throw error;
}

export async function fetchMessages(
  locale: string,
): Promise<MessagesTree | null> {
  const { data, error } = await supabaseClient.storage
    .from("translations")
    .download(`${locale}.json`);
  if (error) return null;
  const content = await data.text();
  return JSON.parse(content) as MessagesTree;
}

export const fetchCachedMessages = cachedRequest(fetchMessages, [
  "cms",
  "messages",
]);
