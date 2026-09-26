import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import HouseboatHero from "@/components/houseboats/HouseboatHero";
import WhatItIs from "@/components/houseboats/WhatItIs";
import FeaturedHouseboats from "@/components/houseboats/FeaturedHouseboats";
import DayAboard from "@/components/houseboats/DayAboard";
import HouseboatExplorer from "@/components/houseboats/HouseboatExplorer";
import Included from "@/components/houseboats/Included";
import WhyChooseHorizons from "@/components/houseboats/WhyChooseHorizons";
import GuestStory from "@/components/houseboats/GuestStory";
import BookingCTA from "@/components/houseboats/BookingCTA";

export const metadata: Metadata = pageMeta({
  title: "Kerala houseboats | HORIZONS by Scenic Escapes",
  description:
    "Six kettuvallam of our own on the Alleppey backwaters, one bedroom to six — air-conditioned bedrooms, a crew who cook on board, and an overnight mooring away from the traffic of boats.",
  path: "/houseboats",
});

export default function HouseboatsPage() {
  return (
    <main className="overflow-x-hidden">
      <HouseboatHero />
      <WhatItIs />
      <FeaturedHouseboats />
      <DayAboard />
      <HouseboatExplorer />
      <Included />
      <WhyChooseHorizons />
      <GuestStory />
      <BookingCTA />
    </main>
  );
}
