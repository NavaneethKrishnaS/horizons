import type { Metadata } from "next";

import PackagesHero from "@/components/packages/PackagesHero";
import PackageExplorer from "@/components/packages/PackageExplorer";
import PackagesCTA from "@/components/packages/PackagesCTA";

export const metadata: Metadata = {
  title: "Journeys across India | HORIZONS by Scenic Escapes",
  description:
    "Seventeen itineraries we run on the ground — Ladakh and Zanskar, the Ganges, Rajasthan, Sikkim, the temple country of the south, and a fortnight of Ayurveda in Kerala.",
};

export default function PackagesPage() {
  return (
    <main className="overflow-x-hidden">
      <PackagesHero />
      <PackageExplorer />
      <PackagesCTA />
    </main>
  );
}
