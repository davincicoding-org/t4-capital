import "./globals.css";
import { cn } from "@/ui/utils";
import { Footer } from "@/ui/views";
import { Analytics } from "@vercel/analytics/react";

import { createTheme, MantineProvider } from "@mantine/core";
import { LazyMotion, domAnimation } from "motion/react";

import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import {
  Azeret_Mono as MonoFont,
  Host_Grotesk as Font,
} from "next/font/google";

// MARK: Metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    metadataBase: new URL("https://t4-capital.ch"),
    title: t("META-TITLE"),
    description: t("META-DESCRIPTION"),
  };
};

// MARK: Theme

const font = Font({
  subsets: ["latin"],
});

const monoFont = MonoFont({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

const theme = createTheme({
  black: "#08202D",
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
    <html lang="en" className={cn(font.className, monoFont.variable)}>
      <body className="overscroll-y-none">
        <MantineProvider theme={theme}>
          <LazyMotion features={domAnimation}>
            <NextIntlClientProvider messages={messages}>
              <>
                {children}
                <Footer />
              </>
            </NextIntlClientProvider>
          </LazyMotion>
        </MantineProvider>
      </body>
      <Analytics />
    </html>
  );
}
