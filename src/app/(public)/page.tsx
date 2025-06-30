import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { fetchLandingPage, fetchStrategies } from "@/server/actions";
import { cn } from "@/ui/utils";
import { About, Hero, Strategies } from "@/ui/views";
import { ButtonsBar } from "@/ui/views/ButtonsBar";
import { resolveMetadata } from "@/utils/resolveMetadata";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { meta } = await fetchLandingPage(locale);
  return resolveMetadata(meta);
};

export default async function Home() {
  const [strategies, pageData] = await Promise.all([
    fetchStrategies("en"),
    fetchLandingPage("en"),
  ]);

  return (
    <main className={cn("grid gap-32 pb-48 md:gap-48 md:pb-72")}>
      <header className="grid shadow-lg">
        <ButtonsBar />
        <Hero />
      </header>
      <Strategies className="container" strategies={strategies} />
      <About
        className="container"
        teamImage={pageData.teamImage}
        teamMembers={pageData.teamMembers}
      />
    </main>
  );
}
