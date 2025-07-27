import { getTranslations } from "next-intl/server";

import type { Strategy } from "@/types";
import { cn } from "@/ui/utils";

import { StrategyTile } from "./StrategyTile";

export interface StrategiesProps {
  strategies: Strategy[];
  className?: string;
}

export async function Strategies({ strategies, className }: StrategiesProps) {
  const t = await getTranslations("strategies");
  return (
    <section className={cn("grid content-start gap-10 md:gap-16", className)}>
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
            subtitle={strategy.description}
            launchDate={strategy.launchDate}
            image={`/gradients/${strategy.color}.webp`}
            presentationUrl={strategy.presentationUrl}
            video={strategy.video}
          />
        ))}
      </div>
    </section>
  );
}
