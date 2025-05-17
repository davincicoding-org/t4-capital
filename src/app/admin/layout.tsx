import type { Metadata } from "next";

import "./globals.css";

import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
