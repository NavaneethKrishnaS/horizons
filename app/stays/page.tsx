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
    <main className="overflow-x-hidden">
      <StaysHero />
      <StaysExplorer />
      <StaysCTA />
    </main>
  );
}
