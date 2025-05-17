import type { HTMLAttributes } from "react";
import { getTranslations } from "next-intl/server";

import type { Strategy } from "@/database/types";
import { cn } from "@/ui/utils";

import { StrategyTile } from "./StrategyTile";

export interface StrategiesProps {
  strategies: Strategy[];
}

export async function Strategies({
  strategies,
  className,
  ...attrs
}: StrategiesProps & HTMLAttributes<HTMLElement>) {
  const t = await getTranslations("strategies");
  return (
    <section
      className={cn("md:gap-16", "grid content-start gap-10", className)}
      {...attrs}
    >
      <div className="grid content-start gap-4 text-center">
        <span className={cn("md:text-5xl", "text-4xl font-medium")}>
          {t("title")}
        </span>
        <span className={cn("md:text-2xl", "text-gray-69 text-sm")}>
          {t("headline")}
        </span>
      </div>
      <div
        className={cn(
          "grid auto-rows-fr gap-6 md:gap-8 lg:grid-cols-[repeat(auto-fit,minmax(300px,400px))] lg:justify-center",
        )}
      >
        {strategies.map((strategy) => (
          <StrategyTile
            key={strategy.id}
            title={strategy.title}
            subtitle={strategy.description.en}
            launchDate={strategy.launchDate}
            image={`/gradients/${strategy.color}.webp`}
            presentationUrl={strategy.deck}
            video={strategy.video}
          />
        ))}
      </div>
    </section>
  );
}
