import { cn } from "@/ui/utils";

import { About, Hero, Strategies } from "@/ui/views";
import { ButtonsBar } from "@/ui/views/ButtonsBar";
import { SECTION_IDS } from "@/const";

export default function Home() {
  return (
    <main className={cn("grid gap-32 pb-48 md:gap-48 md:pb-72")}>
      <div className="grid">
        <ButtonsBar />
        <Hero id={SECTION_IDS.HERO} />
      </div>
      <Strategies id={SECTION_IDS.STRATEGY} className="container" />
      <About id={SECTION_IDS.ABOUT} className="container" />
    </main>
  );
}
