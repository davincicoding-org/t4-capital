"use client";

import { useMemo } from "react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";

import { cn } from "@/ui/utils";

import { BackgroundGradientAnimation } from "../components/BackgroundGradientAnimation";
import { ScrambleText } from "../components/ScrambleText";

export function Hero({ className }: { className?: string }) {
  const t = useTranslations();
  const headline = useMemo(() => t("headline").split("\n"), [t]);

  return (
    <BackgroundGradientAnimation
      fifthColor="72,155,199"
      fourthColor="163,121,223"
      secondColor="73,155,197"
      pointerColor="189,241,252"
      size="300%"
    >
      <div
        className={cn(
          "bg-noise pointer-events-none absolute inset-0 z-10 grid min-h-screen grid-rows-2 overflow-x-hidden",
          className,
        )}
      >
        <div className="relative flex items-end justify-center">
          <m.svg
            initial={{
              x: "-50vw",
            }}
            animate={{
              x: 0,
            }}
            transition={{ duration: 0.5 }}
            width="130"
            height="130"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 150L100 50H150V0H0V50H50L50 150H100Z"
              fill="#08202D"
            />
          </m.svg>
          <m.svg
            className="absolute bottom-0 left-1/2"
            initial={{
              y: "-50vh",
            }}
            animate={{
              y: 0,
            }}
            transition={{ duration: 0.5 }}
            width="130"
            height="130"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" width="46" height="46" fill="#08202D" />
          </m.svg>
          <m.svg
            initial={{
              x: "50vw",
            }}
            animate={{
              x: 0,
            }}
            transition={{ duration: 0.5 }}
            width="130"
            height="130"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M150 2.18557e-06V150H100L100 0L150 2.18557e-06Z"
              fill="#08202D"
            />
            <path d="M0 50H150V100H0V50Z" fill="#08202D" />
          </m.svg>
        </div>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={cn(
            "text-brand container my-auto grid gap-1 font-mono text-3xl font-light max-sm:justify-center max-sm:justify-items-start",
            "sm:flex sm:flex-wrap sm:justify-center sm:gap-4",
            "text-center md:gap-6 md:text-left md:text-4xl",
          )}
        >
          {headline.map((content) => (
            <ScrambleText key={content} delay={500} content={content} />
          ))}
        </m.div>
      </div>
    </BackgroundGradientAnimation>
  );
}
