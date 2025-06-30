import "./globals.css";

import { type Metadata } from "next";
import {
  Host_Grotesk as Font,
  Azeret_Mono as MonoFont,
} from "next/font/google";
import { createTheme, MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import { domAnimation, LazyMotion } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { subscribeToNewsletter } from "@/services/newsletter";
import { cn } from "@/ui/utils";
import { Footer } from "@/ui/views";

import Maintence from "./Maintence";
import { QueryClientProvider } from "./query-client";

// MARK: Metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    metadataBase: new URL("https://t4-capital.ch"),
    title: t("meta.title"),
    description: t("meta.description"),
  };
};

// MARK: Theme

const font = Font({
  subsets: ["latin"],
  variable: "--font-sans",
});

const monoFont = MonoFont({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

const theme = createTheme({
  black: "#08202D",
  fontFamily: font.style.fontFamily,
  fontFamilyMonospace: monoFont.style.fontFamily,
  colors: {
    accent: [
      "#e8f8ff",
      "#d8ebf7",
      "#b0d6ec",
      "#85bee0",
      "#63abd7",
      "#4d9fd2",
      "#409ad0",
      "#3085b9",
      "#2376a6",
      "#036794",
    ],
  },
});

// MARK: Layout

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  return (
    <html lang="en" className={cn(font.variable, monoFont.variable)}>
      <body className="flex min-h-dvh flex-col overscroll-y-none">
        <Maintence>
          <MantineProvider theme={theme}>
            <LazyMotion features={domAnimation}>
              <NextIntlClientProvider messages={messages}>
                <QueryClientProvider>
                  {children}
                  <Footer newsletterHandler={subscribeToNewsletter} />
                </QueryClientProvider>
              </NextIntlClientProvider>
            </LazyMotion>
          </MantineProvider>
        </Maintence>
      </body>
      <Analytics />
    </html>
  );
}
