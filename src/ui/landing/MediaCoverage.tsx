import Image from "next/image";
import { getTranslations } from "next-intl/server";

import type { PressArticle } from "@/types";
import { cn } from "@/ui/utils";

export interface PressProps {
  articles: PressArticle[];
  className?: string;
}

export async function MediaCoverage({ articles, className }: PressProps) {
  const t = await getTranslations("press");

  if (articles.length === 0) return null;

  return (
    <section className={cn("container", className)}>
      <p className="text-gray-69 mb-4 text-center text-xl font-medium md:mb-8">
        {t("title")}
      </p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-12">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener"
            className="shrink-0"
          >
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
