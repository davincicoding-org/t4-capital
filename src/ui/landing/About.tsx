"use client";

import type { HTMLAttributes } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionIcon, Button, Collapse, Paper, ScrollArea } from "@mantine/core";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import type { LandingPage } from "@/payload-types";
import { cn, ensureResolved } from "@/ui/utils";

function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="T4 Logo"
      className={cn("inline h-8 w-8 md:h-14 md:w-14")}
      width={56}
      height={112}
    />
  );
}

export interface AboutProps {
  teamImage: LandingPage["teamImage"];
  teamMembers: LandingPage["teamMembers"];
  advisors: LandingPage["advisors"];
}

export function About({
  teamImage,
  teamMembers,
  className,
  advisors,
  ...attrs
}: AboutProps & HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const image = ensureResolved(teamImage);
  const [activeAdvisorIndex, setActiveAdvisorIndex] = useState<string | null>();
  const advistorDescriptionRef = useRef<HTMLDivElement>(null);

  return (
    <section className={cn("grid gap-20 md:gap-20", className)} {...attrs}>
      <div className={cn("grid gap-6 md:grid-cols-[auto_1fr] md:gap-32")}>
        <span className="text-xl font-medium max-sm:text-lg">
          {t("about.title")}
        </span>
        <div className={cn("grid gap-10 md:gap-16")}>
          <p className={cn("max-w-4xl text-3xl md:text-5xl")}>
            {t.rich("about.content", {
              Logo,
            })}
          </p>
          <p className={cn("text-gray-69 max-w-2xl text-2xl")}>
            {t("about.founders")}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "bg-noise mx-auto grid w-full max-w-4xl overflow-clip rounded-2xl bg-black/5 shadow-sm",
        )}
      >
        {image?.url && (
          <Image
            src={image.url}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            alt={image.description ?? ""}
            className={cn("h-auto w-full rounded-2xl shadow-sm")}
          />
        )}
        <div
          className={cn(
            "flex justify-evenly gap-3 overflow-x-auto overscroll-x-contain px-3 pt-3 pb-1 md:p-6 md:pb-3",
          )}
        >
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={cn("grid justify-items-center text-center")}
            >
              <span className={cn("text-lg max-sm:hidden md:text-2xl")}>
                {member.name}
              </span>
              <ActionIcon
                variant="subtle"
                radius="xl"
                size="xl"
                color="gray"
                className={cn("group")}
                component={Link}
                aria-label={`${member.name} LinkedIn`}
                href={member.linkedIn}
                target="_blank"
              >
                <IconBrandLinkedinFilled
                  size={32}
                  className="transition-colors group-hover:fill-[#0072b1]"
                />
              </ActionIcon>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid gap-4">
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
          <div ref={advistorDescriptionRef} className="scroll-mb-8">
            {advisors.map((advisor) => (
              <Collapse
                key={advisor.name}
                in={activeAdvisorIndex === advisor.id}
                transitionDuration={500}
              >
                <Paper
                  radius="md"
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
      </div>
    </section>
  );
}
