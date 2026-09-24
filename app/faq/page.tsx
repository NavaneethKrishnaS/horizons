import type { Metadata } from "next";

import FaqHero from "@/components/faq/FaqHero";
import FaqList from "@/components/faq/FaqList";
import FaqCTA from "@/components/faq/FaqCTA";
import { allQuestions } from "@/data/faq";

export const metadata: Metadata = {
  title: "Questions | HORIZONS by Scenic Escapes",
  description:
    "Check-in times, meals, when the boats anchor, the best months to come, how a journey is planned and quoted — the things people ask us first, answered plainly.",
};

export default function FaqPage() {
  /*
    The same questions, said again in the form search engines read, so
    an answer can appear in the results rather than only on the page.
    Generated from data/faq.ts, so the two can never disagree — which
    is the usual failure of hand-written structured data.
  */
  const structured = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        /*
          JSON.stringify escapes nothing that matters here — the data is
          our own prose — but < is escaped anyway so a stray tag in a
          future answer can never close this script early.
        */
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />

      <FaqHero />
      <FaqList />
      <FaqCTA />
    </main>
  );
}
