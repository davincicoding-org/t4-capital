import type { HTMLAttributes } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { Media } from "@/payload-types";
import { cn, ensureResolved } from "@/ui/utils";

export interface PressProps {
  articles: {
    url: string;
    logo: Media;
  }[];
}

export async function Press({
  articles,
  className,
  ...attrs
}: PressProps & HTMLAttributes<HTMLElement>) {
  const t = await getTranslations("press");

  return (
    <section className={cn(className)} {...attrs}>
      <p className="mb-3 text-center text-2xl font-medium">{t("title")}</p>
      <div className="flex justify-center gap-4 md:gap-12">
        {articles.map((article) => (
          <a href={article.url} key={article.url}>
            <Image
              src={article.logo.url ?? ""}
              alt={article.logo.description ?? ""}
              width={article.logo.width ?? 0}
              height={article.logo.height ?? 0}
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
