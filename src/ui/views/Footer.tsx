"use client";

import { type HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";

import { SECTION_IDS } from "@/const";
import { cn } from "@/ui/utils";

import { NewsletterForm } from "./NewsletterForm";

export function Footer({ className, ...attrs }: HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const [isNewsletterOpen, newsletter] = useDisclosure();
  return (
    <footer
      className={cn(
        "relative bg-image-gradient bg-fixed text-black",
        "grid grid-cols-[1fr_auto] gap-6 px-4 pb-12 pt-8",
        "md:grid-cols-[120px_auto_1fr] md:gap-y-[120px] md:px-8 md:pb-16 md:pt-20",
        "md:px-16 md:pb-16 lg:grid-cols-[220px_auto_1fr]",
        "xl:grid-cols-[300px_auto_1fr]",
        className,
      )}
      style={{
        backgroundSize: "750px, cover",
      }}
      {...attrs}
    >
      <Link href={`#${SECTION_IDS.HERO}`} className={cn("md:order-1")}>
        <Image
          width={60}
          height={30}
          alt="T4 Logo"
          src="/images/logo-inline.svg"
        />
      </Link>

      <div
        className={cn("grid content-start gap-2 justify-self-end md:order-3")}
      >
        <Button
          classNames={{ inner: "justify-start" }}
          color="black"
          variant="outline"
          radius="xl"
          component={Link}
          href="https://www.linkedin.com/company/t4-capital"
          target="_blank"
          leftSection={
            <Image
              height={24}
              width={24}
              alt="LinkedIn Logo"
              src="/images/linkedin-logo.svg"
            />
          }
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

        <NewsletterForm open={isNewsletterOpen} onClose={newsletter.close} />
      </div>

      <div
        className={cn(
          "col-span-2 grid grid-cols-2 gap-10",
          "md:order-2 md:col-span-1 md:w-full md:max-w-[1224px]",
          "lg:gap-20",
          "xl:gap-44",
        )}
      >
        <div className={cn("grid h-fit gap-y-4")}>
          <span className="text-gray-69">{t("footer.contact")}</span>
          <div className={cn("grid gap-y-2")}>
            <p>
              T4 Capital AG
              <br />
              Stutzstrasse 7<br />
              8834 Schindellegi
            </p>
            <Anchor
              component={Link}
              c="black"
              href={`mailto:info@t4-capital.ch`}
              target="_blank"
            >
              info@t4-capital.ch
            </Anchor>
          </div>
        </div>
        <div className={cn("grid h-fit gap-y-4")}>
          <span className="text-gray-69" translate="no">
            T4 Capital
          </span>
          <div className={cn("grid")}>
            <Anchor c="black" component={Link} href="/imprint" target="_blank">
              {t("imprint.title")}
            </Anchor>
            <Anchor c="black" component={Link} href="/privacy" target="_blank">
              {t("privacy.title")}
            </Anchor>
          </div>
        </div>
      </div>

      <span className={cn("col-span-2 text-gray-69 md:order-4 md:col-span-3")}>
        {t("footer.copyright")}
      </span>
    </footer>
  );
}
