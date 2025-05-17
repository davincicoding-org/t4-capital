import { useEffect, useState } from "react";
import { useNotify } from "react-admin";

import type { MessagesSchema, MessagesTree, Translations } from "@/i18n/types";

import { MessagesForm } from "./MessagesForm";

export interface TranslationsRouteProps {
  locales: [string, ...string[]];
  schema: MessagesSchema;
  fetchMessages: (locale: string) => Promise<MessagesTree | null>;
  saveMessages: (locale: string, messages: MessagesTree) => Promise<void>;
}

export function TranslationsRoute({
  locales,
  schema,
  fetchMessages,
  saveMessages,
}: TranslationsRouteProps) {
  const notify = useNotify();

  const [data, setData] = useState<Translations>({});
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData(locales: string[]) {
      setIsFetching(true);
      for (const locale of locales) {
        const messages = await fetchMessages(locale);
        setData((prev) => ({ ...prev, [locale]: messages ?? {} }));
      }
      setIsFetching(false);
    }
    void fetchData(locales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (updatedTranslations: Translations) => {
    setIsSaving(true);
    for (const [locale, messages] of Object.entries(updatedTranslations)) {
      await saveMessages(locale, messages);
    }
    setData(data);
    notify("Translations saved", { type: "success" });
    setIsSaving(false);
  };

  return (
    <MessagesForm
      data={data}
      locales={locales}
      schema={schema}
      processing={isFetching || isSaving}
      onSubmit={handleSubmit}
    />
  );
}
