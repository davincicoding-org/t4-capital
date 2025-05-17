import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import { getTranslations } from "next-intl/server";

import { CORE_TEAM } from "@/const";
import { cn } from "@/ui/utils";

function Logo() {
  return (
    <Image
      src="/images/logo-inline.svg"
      alt="T4 Logo"
      className={cn("inline h-8 w-8 md:h-14 md:w-14")}
      width={56}
      height={112}
    />
  );
}

export const About = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  async function About({ className, ...attrs }, ref) {
    const t = await getTranslations("about");
    return (
      <section
        ref={ref}
        className={cn("grid gap-20 md:gap-20", className)}
        {...attrs}
      >
        <div className={cn("grid gap-6 md:grid-cols-[auto_1fr] md:gap-32")}>
          <span className="text-xl font-medium max-sm:text-lg">
            {t("title")}
          </span>
          <div className={cn("grid gap-10 md:gap-16")}>
            <p className={cn("max-w-4xl text-3xl md:text-5xl")}>
              {t.rich("content", {
                Logo,
              })}
            </p>
            <p className={cn("max-w-2xl text-2xl text-gray-69")}>
              {t("founders")}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <span className="text-xl font-medium uppercase max-sm:text-lg">
            {t("team")}
          </span>
          <div
            className={cn(
              "grid overflow-clip rounded-2xl bg-black/5 bg-noise shadow",
            )}
            style={{
              backgroundSize: "750px, cover",
            }}
          >
            <Image
              width="4032"
              height="2688"
              className={cn("h-auto w-full rounded-2xl shadow-lg")}
              src="/images/team.webp"
              alt="Team Photo"
            />
            <div
              className={cn(
                "flex justify-evenly gap-3 overflow-x-auto overscroll-x-contain px-3 pb-1 pt-3 md:p-6 md:pb-3",
              )}
            >
              {CORE_TEAM.map((member) => (
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
                    color="accent"
                    className={cn("aspect-square justify-center px-0")}
                    component={Link}
                    href={member.linkedIn}
                    target="_blank"
                  >
                    <Image
                      src="/images/linkedin-logo.svg"
                      alt="LinkedIn logo"
                      width={24}
                      height={24}
                    />
                  </ActionIcon>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
);
