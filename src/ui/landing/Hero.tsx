import { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { BackgroundGradientAnimation } from "../components/BackgroundGradientAnimation";
import { ScrambleText } from "../components/ScrambleText";
import { cn } from "../utils";

export function Hero({ className }: { className?: string }) {
  const t = useTranslations();
  const headline = useMemo(() => t("headline").split("\n"), [t]);

  return (
    <header className="bg-gradient relative h-screen">
      <div className="sticky top-0 z-20 flex h-16 items-center justify-center px-4 md:justify-end">
        <a
          href="/prices"
          className="btn btn-outline rounded-lg tracking-widest backdrop-blur-sm"
        >
          {t("header.login")}
        </a>
      </div>
      <BackgroundGradientAnimation containerClassName="-mt-16">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 grid grid-rows-2",
            className,
          )}
        >
          <div className="relative flex items-end justify-center">
            <div className="absolute inset-x-0 bottom-0 flex justify-center">
              <Image
                priority
                src="/images/logo-placeholder.png"
                alt="T4 Logo"
                width={260}
                height={130}
              />
            </div>
            <svg
              className="animate-logo relative z-10 translate-x-[-50vw]"
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
            </svg>
            <svg
              className="animate-logo absolute bottom-0 left-1/2 z-10 translate-y-[-50vh]"
              width="130"
              height="130"
              viewBox="0 0 150 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" width="46" height="46" fill="#08202D" />
            </svg>
            <svg
              className="animate-logo relative z-10 translate-x-[50vw]"
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
            </svg>
          </div>

          <div
            className={cn(
              "my-auto min-w-0 px-8 text-center font-mono text-3xl font-light text-balance md:text-4xl",
            )}
          >
            {headline.map((content) => (
              <ScrambleText
                key={content}
                content={content}
                className="mx-2 my-1 inline-block"
              />
            ))}
          </div>
        </div>
      </BackgroundGradientAnimation>
    </header>
  );
}
