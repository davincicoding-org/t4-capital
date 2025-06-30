import type { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionIcon } from "@mantine/core";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";

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
}

export async function About({
  teamImage,
  teamMembers,
  className,
  ...attrs
}: AboutProps & HTMLAttributes<HTMLElement>) {
  const t = await getTranslations("about");
  const image = ensureResolved(teamImage);

  return (
    <section className={cn("grid gap-20 md:gap-20", className)} {...attrs}>
      <div className={cn("grid gap-6 md:grid-cols-[auto_1fr] md:gap-32")}>
        <span className="text-xl font-medium max-sm:text-lg">{t("title")}</span>
        <div className={cn("grid gap-10 md:gap-16")}>
          <p className={cn("max-w-4xl text-3xl md:text-5xl")}>
            {t.rich("content", {
              Logo,
            })}
          </p>
          <p className={cn("text-gray-69 max-w-2xl text-2xl")}>
            {t("founders")}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "bg-noise mx-auto grid max-w-4xl overflow-clip rounded-2xl bg-black/5 shadow-sm",
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
    </section>
  );
}
