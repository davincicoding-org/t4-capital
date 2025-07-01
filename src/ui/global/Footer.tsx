"use client";

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionIcon, Anchor, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandLinkedinFilled,
  IconMailOpened,
  IconMailOpenedFilled,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Action } from "payload";

import type { NewsletterHandler } from "@/services/newsletter";
import { cn } from "@/ui/utils";

import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  legalPages: {
    label: string;
    slug: string;
  }[];
  newsletterHandler: NewsletterHandler;
}

export function Footer({
  legalPages,
  newsletterHandler,
  className,
  ...attrs
}: FooterProps & HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const [isNewsletterOpen, newsletter] = useDisclosure();

  return (
    <footer
      className={cn("bg-gradient border-t bg-cover p-4 sm:p-8", className)}
      {...attrs}
    >
      <div className="flex flex-wrap items-center gap-6 sm:basis-[180px]">
        <div className="mr-auto grid gap-3">
          <Link href="/">
            <Image
              width={80}
              height={40}
              alt="T4 Logo"
              src="/images/logo.svg"
            />
          </Link>
          <span className={cn("opacity-70")}>{t("footer.copyright")}</span>
        </div>

        <div className="flex gap-x-4 text-right opacity-70 max-sm:flex-col">
          <Anchor
            component={Link}
            fz={{ base: 16, sm: 20 }}
            c="black"
            href={`mailto:info@t4-capital.ch`}
            target="_blank"
          >
            Contact
          </Anchor>

          {legalPages.map(({ label, slug }) => (
            <Anchor
              key={slug}
              component={Link}
              fz={{ base: 16, sm: 20 }}
              c="black"
              href={`/${slug}`}
              target="_blank"
            >
              {label}
            </Anchor>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap gap-2 max-sm:basis-full max-sm:justify-evenly sm:basis-[180px] sm:justify-end">
          <ActionIcon
            component="a"
            variant="subtle"
            color="black"
            size="xl"
            radius="lg"
            href="https://www.linkedin.com/company/t4-capital"
            aria-label={t("footer.cta.follow")}
          >
            <IconBrandLinkedinFilled size={32} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="black"
            size="xl"
            radius="lg"
            onClick={newsletter.open}
            aria-label={t("footer.cta.newsletter")}
          >
            <IconSpeakerphone stroke={1.5} size={32} />
          </ActionIcon>
        </div>
      </div>
    </footer>
  );
}
