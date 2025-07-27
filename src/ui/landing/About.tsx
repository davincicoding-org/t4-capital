import Image from "next/image";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import type { Media, TeamMember } from "@/types";
import { cn } from "@/ui/utils";

export interface AboutProps {
  teamImage: Media;
  teamMembers: TeamMember[];
  className?: string;
}

export function About({ teamImage, teamMembers, className }: AboutProps) {
  const t = useTranslations();

  return (
    <section className={cn("grid gap-12 md:gap-16", className)}>
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
          "bg-noise container-lg mx-auto grid overflow-clip rounded-2xl bg-black/5 shadow-lg",
        )}
      >
        <Image
          src={teamImage.url!}
          width={teamImage.width!}
          height={teamImage.height!}
          alt={teamImage.description ?? ""}
          layout="constrained"
          className={cn("h-auto w-full rounded-2xl shadow-md")}
        />
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
              <a
                className="btn btn-ghost btn-lg btn-circle hover:text-linkedin"
                aria-label={`Visit LinkedIn Profile`}
                href={member.linkedIn}
                target="_blank"
              >
                <IconBrandLinkedinFilled className="size-8" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="T4 Logo"
      width={260}
      height={130}
      className="inline h-6 w-auto align-baseline md:h-9"
    />
  );
}
