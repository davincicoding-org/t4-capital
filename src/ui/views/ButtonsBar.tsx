"use client";
import Link from "next/link";

import { Button } from "@mantine/core";
import * as m from "motion/react-m"
import { useTranslations } from "next-intl";

export function ButtonsBar() {
  const t = useTranslations();
  return (
    <m.div
      className="sticky left-0 right-0 top-0 z-20 -mb-16 flex justify-center gap-3 p-3 md:justify-end"
      initial={{
        y: "-100%",
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 4,
      }}
    >
      <Button
        color="accent"
        variant="default"
        radius="xl"
        component={Link}
        href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7084918813661560833"
        target="_blank"
      >
        {t("HEADER-NEWSLETTER_CTA")}
      </Button>

      <Button
        color="accent"
        variant="default"
        radius="xl"
        component={Link}
        href="/prices"
      >
        {t("HEADER-CTA")}
      </Button>
    </m.div>
  );
}
