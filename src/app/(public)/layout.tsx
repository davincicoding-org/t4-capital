import "./globals.css";

import type { Metadata } from "next";
import {
  Host_Grotesk as Font,
  Azeret_Mono as MonoFont,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { fetchGlobalMetadata } from "@/server/requests/landing";
import { fetchLegalPagesLinks } from "@/server/requests/legal-pages";
import { subscribeToNewsletter } from "@/services/newsletter";
import { Footer } from "@/ui/global";
import { cn } from "@/ui/utils";
import { resolveMetadata } from "@/utils/resolveMetadata";

// MARK: Theme

const font = Font({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = MonoFont({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  preload: true, // Enable preloading
  display: "swap",
});

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const meta = await fetchGlobalMetadata(locale);
  return resolveMetadata(meta);
};

// MARK: Layout

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const legalPages = await fetchLegalPagesLinks("en");

  return (
    <html lang="en" className={cn(font.variable, monoFont.variable)}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer
            legalPages={legalPages}
            newsletterHandler={subscribeToNewsletter}
          />
        </NextIntlClientProvider>
      </body>
      <Analytics />
    </html>
  );
}
