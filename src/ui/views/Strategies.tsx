import { forwardRef, type HTMLAttributes } from "react";

import { getTranslations } from "next-intl/server";

import { cn } from "@/ui/utils";

import { PRODUCTS } from "@/const";

import { StrategyTile } from "./StrategyTile";

export const Strategies = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  async function Strategies({ className, ...attrs }, ref) {
    const t = await getTranslations();
    return (
      <section
        ref={ref}
        className={cn("md:gap-16", "grid content-start gap-10", className)}
        {...attrs}
      >
        <div className="grid content-start gap-4 text-center">
          <span className={cn("md:text-5xl", "text-4xl font-medium")}>
            {t("STRATEGIES-TITLE")}
          </span>
          <span className={cn("md:text-2xl", "text-sm text-gray-69")}>
            {t("STRATEGIES-HEADLINE")}
          </span>
        </div>
        <div
          className={cn(
            "grid auto-rows-fr gap-6 md:gap-8 lg:grid-cols-[repeat(auto-fit,minmax(300px,400px))] lg:justify-center",
          )}
        >
          <StrategyTile
            title={t("STRATEGIES-ALT-TITLE")}
            subtitle={t("STRATEGIES-ALT-DESCRIPTION")}
            launchDate={PRODUCTS.ALT.launchDate}
            badge={t("STRATEGIES-DIGITAL-BADGE")}
            image={PRODUCTS.ALT.gradient}
            presentationUrl={PRODUCTS.ALT.docs.presentation}
          />
          <StrategyTile
            title={t("STRATEGIES-ENT-TITLE")}
            subtitle={t("STRATEGIES-ENT-DESCRIPTION")}
            badge={t("STRATEGIES-DIGITAL-BADGE")}
            launchDate={PRODUCTS.ENT.launchDate}
            image={PRODUCTS.ENT.gradient}
            video={PRODUCTS.ENT.video}
            presentationUrl={PRODUCTS.ENT.docs.presentation}
          />
          {/*<StrategyTile*/}
          {/*  title={t("STRATEGIES-TECH-TITLE")}*/}
          {/*  subtitle={t("STRATEGIES-TECH-DESCRIPTION")}*/}
          {/*  badge={t("STRATEGIES-TRADITIONAL-BADGE")}*/}
          {/*  image={PRODUCTS.EQ.gradient}*/}
          {/*  presentationUrl={PRODUCTS.EQ.docs.presentation}*/}
          {/*/>*/}
        </div>
      </section>
    );
  },
);
