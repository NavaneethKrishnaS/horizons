import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import ExperiencesHero from "@/components/experiences/ExperiencesHero";
import ExperiencesList from "@/components/experiences/ExperiencesList";
import ExperiencesCTA from "@/components/experiences/ExperiencesCTA";

export const metadata: Metadata = pageMeta({
  title: "On the water in Kerala | HORIZONS by Scenic Escapes",
  description:
    "Shikara rides, village canoe trips at first light, kayaking on the Punnamada canals and the state ferries — the Kerala backwaters beyond the houseboat, arranged by people who live on them.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <main className="overflow-x-clip">
      <ExperiencesHero />
      <ExperiencesList />
      <ExperiencesCTA />
    </main>
  );
}
