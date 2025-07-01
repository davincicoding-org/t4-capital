"use client";

import type { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";

export default function Maintence({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();

  const access = searchParams.get("access") === "true";

  if (access) return <>{children}</>;

  if (access) {
    return <div>{children}</div>;
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">We are running some Updates</h1>
      <p className="text-lg">We will be back in a few minutes.</p>
    </main>
  );
}
