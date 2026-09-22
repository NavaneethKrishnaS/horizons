import type { Metadata } from "next";

import StaysHero from "@/components/stays/StaysHero";
import StaysExplorer from "@/components/stays/StaysExplorer";
import StaysCTA from "@/components/stays/StaysCTA";

export const metadata: Metadata = {
  title: "Where to stay in India | HORIZONS by Scenic Escapes",
  description:
    "Sixty-five small hotels, family houses, houseboats and camps across India — eighteen of them in Kerala, alongside Goa and the Konkan, Rajasthan, the cities, Kashmir, Darjeeling and the Andamans.",
};

export default function StaysPage() {
  return (
    /*
      clip rather than hidden. overflow-x: hidden makes this a scrolling
      box, and a scrolling box is what a sticky descendant sticks inside —
      so the index column scrolled away with the page instead of standing
      still beside it. clip contains the same overflow without creating
      the scroll container.
    */
    <main className="overflow-x-clip">
      <StaysHero />
      <StaysExplorer />
      <StaysCTA />
    </main>
  );
}
