"use client";

import Link from "next/link";
import { Button } from "@mantine/core";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";

export function ButtonsBar() {
  const t = useTranslations("header");
  return (
    <m.div
      className="sticky top-0 right-0 left-0 z-20 -mb-20 flex justify-center p-2 md:justify-end"
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
        color="white"
        variant="subtle"
        radius="xl"
        size="md"
        component={Link}
        href="/prices"
        className="px-4 tracking-widest backdrop-blur-sm"
      >
        {t("login")}
      </Button>
    </m.div>
  );
}
