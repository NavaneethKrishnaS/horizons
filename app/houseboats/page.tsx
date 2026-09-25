import type { Metadata } from "next";

import HouseboatHero from "@/components/houseboats/HouseboatHero";
import FeaturedHouseboats from "@/components/houseboats/FeaturedHouseboats";
import HouseboatExplorer from "@/components/houseboats/HouseboatExplorer";
import WhyChooseHorizons from "@/components/houseboats/WhyChooseHorizons";
import GuestStory from "@/components/houseboats/GuestStory";
import BookingCTA from "@/components/houseboats/BookingCTA";

export const metadata: Metadata = {
  title: "Kerala houseboats | HORIZONS by Scenic Escapes",
  description:
    "One, two and three bedroom kettuvallam houseboats cruising the Alleppey backwaters — air-conditioned bedrooms, a crew who cook on board, and an overnight mooring away from the traffic of boats.",
  alternates: { canonical: "/houseboats" },
};

export default function HouseboatsPage() {
  return (
    <main className="overflow-x-hidden">
      <HouseboatHero />
      <FeaturedHouseboats />
      <HouseboatExplorer />
      <WhyChooseHorizons />
      <GuestStory />
      <BookingCTA />
    </main>
  );
}