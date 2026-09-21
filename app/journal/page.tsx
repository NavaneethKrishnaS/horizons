import type { Metadata } from "next";

import JournalHero from "@/components/journal/JournalHero";
import Chapter from "@/components/journal/Chapter";
import Founder from "@/components/journal/Founder";

import { journalChapters } from "@/data/journal";

export const metadata: Metadata = {
  title: "The Journal | HORIZONS by Scenic Escapes",
  description:
    "The story of Kerala's water — the spice coast, kathakali, the snake boats of Onam, and the kettuvallam that became our houseboats.",
};

export default function JournalPage() {
  return (
    <main className="bg-[#111111]">
      <JournalHero />

      {journalChapters.map((chapter, index) => (
        <Chapter key={chapter.id} chapter={chapter} index={index} />
      ))}

      <Founder />
    </main>
  );
}
