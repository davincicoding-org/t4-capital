"use client";

import type { HTMLAttributes } from "react";
import { useRef, useState } from "react";
import { Button, Collapse, Paper, ScrollArea } from "@mantine/core";
import { useTranslations } from "next-intl";

import type { LandingPage } from "@/payload-types";
import { cn } from "@/ui/utils";

export interface AdvisorsProps {
  advisors: LandingPage["advisors"];
}

export function Advisors({
  className,
  advisors,
  ...attrs
}: AdvisorsProps & HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const [activeAdvisorIndex, setActiveAdvisorIndex] = useState<string | null>();
  const advistorDescriptionRef = useRef<HTMLDivElement>(null);

  return (
    <section className={cn("grid gap-4", className)} {...attrs}>
      <div className="sm:text-center">
        <h3 className="mb-2 text-2xl font-medium">{t("advisors.title")}</h3>
        <p className="text-gray-69 text-xl">{t("advisors.description")}</p>
      </div>

      <div
        className="grid gap-2 max-md:-mx-8"
        onMouseLeave={() => setActiveAdvisorIndex(null)}
      >
        <ScrollArea className="w-full overscroll-x-contain" scrollbars="x">
          <div className="flex w-full pb-3">
            <div className="h-8 w-8 shrink-0 basis-8 md:hidden" />
            <div className="mx-auto flex grow flex-nowrap gap-2 py-1 sm:gap-4">
              {advisors.map((advisor) => (
                <Button
                  key={advisor.name}
                  className="shrink-0 cursor-pointer transition-colors first:ml-auto last:mr-auto max-sm:grow-1"
                  size="lg"
                  radius="md"
                  px="sm"
                  variant={
                    activeAdvisorIndex === advisor.id ? "outline" : "default"
                  }
                  onMouseEnter={() => {
                    setActiveAdvisorIndex(advisor.id);
                    setTimeout(() => {
                      advistorDescriptionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      });
                    }, 500);
                  }}
                >
                  {advisor.name}
                </Button>
              ))}
            </div>
            <div className="h-8 w-8 shrink-0 basis-8 md:hidden" />
          </div>
        </ScrollArea>
        <div
          ref={advistorDescriptionRef}
          className="mx-auto max-w-4xl scroll-mb-8"
        >
          {advisors.map((advisor) => (
            <Collapse
              key={advisor.name}
              in={activeAdvisorIndex === advisor.id}
              transitionDuration={500}
            >
              <Paper
                radius="lg"
                color="gray"
                p="md"
                bg="gray.0"
                withBorder
                className="text-lg text-pretty max-sm:!rounded-none"
              >
                {advisor.description}
              </Paper>
            </Collapse>
          ))}
        </div>
      </div>
    </section>
  );
}
