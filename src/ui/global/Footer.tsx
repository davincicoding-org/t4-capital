"use client";

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <footer
      className={cn(
        "bg-gradient border-base-200 border-t bg-cover bg-center p-4 sm:p-8",
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
            <a
              className="btn btn-ghost btn-circle hover:text-linkedin"
              href="https://www.linkedin.com/company/t4-capital"
              aria-label={t("footer.cta.follow")}
            >
              <IconBrandLinkedinFilled size={32} />
            </a>

            <div className="tooltip" data-tip={t("footer.cta.newsletter")}>
              <label
                htmlFor="newsletter-modal"
                className="btn btn-ghost btn-circle"
                aria-label={t("footer.cta.newsletter")}
              >
                <IconSpeakerphone stroke={1.5} size={32} />
              </label>
            </div>

            <input
              type="checkbox"
              id="newsletter-modal"
              className="modal-toggle"
            />
            <div className="modal" role="dialog">
              <div className="modal-box max-w-md">
                <h3 className="mb-3 text-center text-xl font-medium">
                  {t("newsletter.title")}
                </h3>
                <NewsletterForm handler={newsletterHandler} />
              </div>
              <label className="modal-backdrop" htmlFor="newsletter-modal">
                Close
              </label>
            </div>
          </div>

          <div className="flex gap-x-4 text-right opacity-70 max-sm:flex-col">
            <a
              className="underline-offset-4 hover:underline"
              href={`mailto:info@t4-capital.ch`}
              target="_blank"
            >
              Contact
            </a>

            {legalPages.map(({ label, slug }) => (
              <a
                key={slug}
                className="underline-offset-4 hover:underline"
                href={`/${slug}`}
                target="_blank"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
