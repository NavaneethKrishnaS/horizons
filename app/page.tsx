import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import FeaturedRetreats from "@/components/home/featured/FeaturedRetreats";
import Experiences from "@/components/home/experiences/Experiences";
import SignatureStays from "@/components/home/stays/SignatureStays";

export const metadata: Metadata = {
  title: "HORIZONS by Scenic Escapes | Luxury travel in Kerala and India",
  description:
    "Kettuvallam houseboats on the Alleppey backwaters, small hotels and family houses across India, and journeys arranged by the people who run them. Find your next horizon.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedRetreats />
      <Experiences />
      <SignatureStays />
    </>
  );
}