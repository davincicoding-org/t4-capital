import { getLandingPageData } from "@/server/requests/landing";
import { About, Hero, MediaCoverage, Strategies } from "@/ui/landing";
import { Advisors } from "@/ui/landing/Advisors";

export default async function Home() {
  const data = await getLandingPageData("en");

  return (
    <>
      <Hero />
      <main className="pb-48 md:pb-72">
        <MediaCoverage
          articles={data.articles}
          className="mb-32 pt-16 md:mb-48"
        />
        <Strategies
          strategies={data.strategies}
          className="container mb-32 pt-16 md:mb-48"
        />
        <About
          teamImage={data.teamImage}
          teamMembers={data.teamMembers}
          className="container"
        />
        <Advisors
          advisors={data.advisors}
          className="container mt-16 md:mt-24"
        />
      </main>
    </>
  );
}
