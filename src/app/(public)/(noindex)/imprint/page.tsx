import { getTranslations } from "next-intl/server";

export default async function ImprintPage() {
  const t = await getTranslations("imprint");

  return (
    <main className="prose container flex-1 px-4 py-16">
      <h1>{t("title")}</h1>
      <div dangerouslySetInnerHTML={{ __html: t.raw("content") as string }} />
    </main>
  );
}
