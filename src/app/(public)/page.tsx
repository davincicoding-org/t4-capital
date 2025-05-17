import { SECTION_IDS } from "@/const";
import { fetchStrategies, fetchTeamMembers } from "@/server/actions";
import { cn } from "@/ui/utils";
import { About, Hero, Strategies } from "@/ui/views";
import { ButtonsBar } from "@/ui/views/ButtonsBar";

export default async function Home() {
  const [strategies, teamMembers] = await Promise.all([
    fetchStrategies(),
    fetchTeamMembers(),
  ]);
  return (
    <main className={cn("grid gap-32 pb-48 md:gap-48 md:pb-72")}>
      <header className="grid">
        <ButtonsBar />
        <Hero id={SECTION_IDS.HERO} />
      </header>
      <Strategies
        id={SECTION_IDS.STRATEGY}
        className="container"
        strategies={strategies}
      />
      <About
        id={SECTION_IDS.ABOUT}
        className="container"
        teamMembers={teamMembers}
      />
    </main>
  );
}
