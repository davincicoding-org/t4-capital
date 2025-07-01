import "./globals.css";

import {
  Host_Grotesk as Font,
  Azeret_Mono as MonoFont,
} from "next/font/google";
import { createTheme, MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { fetchLegalPagesLinks } from "@/server/actions";
import { subscribeToNewsletter } from "@/services/newsletter";
import { Footer } from "@/ui/global";
import { MotionProvider } from "@/ui/motion";
import { cn } from "@/ui/utils";

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
  const legalPages = await fetchLegalPagesLinks("en");

  return (
    <html lang="en" className={cn(font.variable, monoFont.variable)}>
      <body className="flex min-h-dvh flex-col overscroll-y-none">
        <MantineProvider theme={theme}>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              {children}
              <Footer
                legalPages={legalPages}
                newsletterHandler={subscribeToNewsletter}
              />
            </MotionProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
      <Analytics />
    </html>
  );
}
