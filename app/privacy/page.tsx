import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import LegalHero from "@/components/legal/LegalHero";
import LegalSections from "@/components/legal/LegalSections";
import LegalCTA from "@/components/legal/LegalCTA";
import { LAST_UPDATED, SECTIONS, SUMMARY } from "@/data/privacy";

export const metadata: Metadata = pageMeta({
  title: "Privacy | HORIZONS by Scenic Escapes",
  description:
    "No cookies, no tracking and no advertising. We count page views and we hold what you write to us, we use it to arrange your journey, and you can have it deleted by asking.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="overflow-x-clip">
      <LegalHero
        label="Privacy"
        title="What happens to what you tell us."
        intro="This website sets no cookies and follows nobody anywhere. It counts page views, without a cookie and without an identifier, so we know which journeys are being read about. Beyond that, the only personal information we hold is what you choose to write to us, and the only thing we do with it is arrange your journey. Everything below is the long version of those three sentences."
        updated={LAST_UPDATED}
        facts={SUMMARY}
      />

      <LegalSections sections={SECTIONS} />

      <LegalCTA
        label="Ask us"
        title="Delete it, correct it, or just ask what we have."
        body="There is no form for this and no reference number. Write to us and one of the people who answers the enquiries answers this too — the same day, in almost every case."
        message="Hello HORIZONS, I have a question about privacy — what you hold about me, or a request to delete it."
        subject="Privacy — a question about my details"
      />
    </main>
  );
}
