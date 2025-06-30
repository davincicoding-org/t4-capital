"use client";

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandLinkedinFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import type { NewsletterHandler } from "@/services/newsletter";
import { cn } from "@/ui/utils";

import { NewsletterForm } from "./NewsletterForm";

interface IFooterProps {
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
}: IFooterProps & HTMLAttributes<HTMLElement>) {
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
          <Button
            classNames={{
              root: cn("pl-2"),
            }}
            color="black"
            variant="outline"
            radius="xl"
            component={Link}
            href="https://www.linkedin.com/company/t4-capital"
            target="_blank"
            leftSection={<IconBrandLinkedinFilled size={24} />}
          >
            {t("footer.cta.follow")}
          </Button>
          <Button
            color="black"
            variant="outline"
            radius="xl"
            onClick={newsletter.open}
          >
            {t("footer.cta.newsletter")}
          </Button>

          <NewsletterForm
            handler={newsletterHandler}
            open={isNewsletterOpen}
            onClose={newsletter.close}
          />
        </div>
      </div>
    </footer>
  );
}
