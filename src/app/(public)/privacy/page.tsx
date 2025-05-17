import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="prose container flex-1 px-4 py-8">
      <h1>{t("title")}</h1>
      <div dangerouslySetInnerHTML={{ __html: t.raw("content") as string }} />
    </main>
  );
}
