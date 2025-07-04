import { fetchLandingPage, fetchStrategies } from "@/server/actions";
import { About, ButtonsBar, Hero, Strategies } from "@/ui/landing";
import { cn } from "@/ui/utils";

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
        advisors={pageData.advisors}
      />
    </main>
  );
}
