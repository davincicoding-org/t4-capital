import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import { fetchLegalPage } from "@/server/actions";
import RichText from "@/ui/components/RichText";
import { resolveMetadata } from "@/utils/resolveMetadata";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const data = await fetchLegalPage("imprint", locale);
  return {
    ...resolveMetadata(data?.meta),
    robots: {
      index: false,
    },
  };
};

export default async function ImprintPage() {
  const locale = await getLocale();
  const data = await fetchLegalPage("imprint", locale);
  if (!data) {
    notFound();
  }

  return (
    <main className="container flex-1 px-4 py-16">
      <h1 className="text-2xl font-medium">{data.title}</h1>
      <RichText data={data.content} />
    </main>
  );
}
