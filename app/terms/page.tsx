import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import LegalHero from "@/components/legal/LegalHero";
import LegalSections from "@/components/legal/LegalSections";
import LegalCTA from "@/components/legal/LegalCTA";
import { LAST_UPDATED, SECTIONS, SUMMARY } from "@/data/terms";

export const metadata: Metadata = pageMeta({
  title:
    "Terms & Conditions | HORIZONS by Scenic Escapes",
  description:
    "How a booking is made, what it costs and when, what comes back if you cancel, and what we answer for. Plain conditions for a small company you are trusting with a journey.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="overflow-x-clip">
      <LegalHero
        label="Terms"
        title="What we promise, and what we ask."
        intro="You are dealing with one company and we answer for the whole journey. We are paid before you travel, because the hotels and the boats are paid before you travel. And if you tell us more than a month ahead that you cannot come, your money comes back."
        updated={LAST_UPDATED}
        facts={SUMMARY}
      />

      <LegalSections sections={SECTIONS} />

      <LegalCTA
        label="Before you book"
        title="Ask about the part that worries you."
        body="Nobody enjoys reading conditions, and the ones that matter are usually the ones about your own journey rather than journeys in general. Ask, and you will get an answer from a person who can change the terms if there is a good reason to."
        message="Hello HORIZONS, I have a question about your booking conditions."
        subject="A question about the booking conditions"
      />
    </main>
  );
}
