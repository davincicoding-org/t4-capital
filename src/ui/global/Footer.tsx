"use client";

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandLinkedinFilled, IconSpeakerphone } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

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
      className={cn(
        "bg-gradient border-t bg-cover bg-center p-4 sm:p-8",
        className,
      )}
      {...attrs}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="grid gap-3">
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

        <div className="flex flex-row-reverse items-end gap-x-3 sm:flex-col">
          <div className="flex flex-col sm:flex-row">
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
            <Tooltip
              label={t("footer.cta.newsletter")}
              position="bottom"
              transitionProps={{
                transition: "fade-down",
              }}
            >
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
            </Tooltip>
          </div>
          <div className="flex gap-x-4 text-right opacity-70 max-sm:flex-col">
            <Anchor
              size="lg"
              className="underline-offset-4"
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
                size="lg"
                className="underline-offset-4"
                c="black"
                href={`/${slug}`}
                target="_blank"
              >
                {label}
              </Anchor>
            ))}
          </div>
        </div>
      </div>
      <NewsletterForm
        open={isNewsletterOpen}
        onClose={newsletter.close}
        handler={newsletterHandler}
      />
    </footer>
  );
}
