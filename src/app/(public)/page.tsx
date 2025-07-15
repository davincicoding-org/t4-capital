import type { Media } from "@/payload-types";
import { fetchLandingPage, fetchStrategies } from "@/server/actions";
import { About, ButtonsBar, Hero, Press, Strategies } from "@/ui/landing";
import { cn, ensureResolved } from "@/ui/utils";

export default async function Home() {
  const [strategies, pageData] = await Promise.all([
    fetchStrategies("en"),
    fetchLandingPage("en"),
  ]);

  const articles = (pageData.articles ?? []).filter(
    (article): article is { url: string; logo: Media } =>
      ensureResolved(article.logo) !== undefined,
  );

  return (
    <main className={cn("pb-48 md:pb-72")}>
      <header className="grid shadow-lg">
        <ButtonsBar />
        <Hero />
      </header>
      {articles.length > 0 && (
        <Press className="container mb-32 py-16 md:mb-48" articles={articles} />
      )}

      <Strategies
        className="container mb-32 md:mb-48"
        strategies={strategies}
      />
      <About
        className="container"
        teamImage={pageData.teamImage}
        teamMembers={pageData.teamMembers}
        advisors={pageData.advisors}
      />
    </main>
  );
}
