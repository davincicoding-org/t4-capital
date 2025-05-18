import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

export default function NoIndexLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
