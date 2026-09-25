import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import PackagesHero from "@/components/packages/PackagesHero";
import PackageExplorer from "@/components/packages/PackageExplorer";
import PackagesCTA from "@/components/packages/PackagesCTA";

export const metadata: Metadata = pageMeta({
  title:
    "Journeys across India | HORIZONS by Scenic Escapes",
  description:
    "Itineraries we run on the ground — Ladakh and Zanskar, the Ganges, Rajasthan, Sikkim and the temple country of the south, alongside shorter escapes into the Kerala high range, the backwaters and the coffee country of Kodagu.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <main className="overflow-x-hidden">
      <PackagesHero />
      <PackageExplorer />
      <PackagesCTA />
    </main>
  );
}
