import { unstable_cache } from "next/cache";

import type { MessagesTree } from "@/i18n/types";

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

export const fetchCachedMessages = unstable_cache(fetchMessages, [], {
  tags: ["cms", "messages"],
});

// TODO this should be a server action and should be secured
// export const revalidateMessages = () => revalidateTag("messages");
