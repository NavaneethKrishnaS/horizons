import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Doors from "@/components/home/Doors";
import WhereWeGo from "@/components/home/WhereWeGo";
import HomeClosing from "@/components/home/HomeClosing";

export const metadata: Metadata = pageMeta({
  title: "HORIZONS by Scenic Escapes | Luxury travel in Kerala and India",
  description:
    "Kettuvallam houseboats on the Alleppey backwaters, small hotels and family houses across India, and journeys arranged by the people who run them. Find your next horizon.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Doors />
      <WhereWeGo />
      <HomeClosing />
    </>
  );
}
