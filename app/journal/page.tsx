import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import JournalHero from "@/components/journal/JournalHero";
import Scene from "@/components/journal/Scene";
import Founder from "@/components/journal/Founder";
import SceneStyles from "@/components/journal/SceneStyles";
import SceneFit from "@/components/journal/SceneFit";

import { journalChapters } from "@/data/journal";
import { sceneObjects } from "@/components/journal/sceneLayouts";

export const metadata: Metadata = pageMeta({
  title:
    "The Journal | HORIZONS by Scenic Escapes",
  description:
    "The story of Kerala's water — the spice coast, kathakali, the snake boats of Onam, and the kettuvallam that became our houseboats.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <main className="bg-[#F4F2ED]">
      <SceneStyles />
      <SceneFit />

      <JournalHero />

      {journalChapters.map((chapter) => (
        <Scene
          key={chapter.id}
          label={chapter.label}
          heading={chapter.heading}
          objects={sceneObjects[chapter.id] ?? []}
          body={chapter.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        />
      ))}

      <Founder />
    </main>
  );
}
