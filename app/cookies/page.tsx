import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import LegalHero from "@/components/legal/LegalHero";
import LegalSections from "@/components/legal/LegalSections";
import LegalCTA from "@/components/legal/LegalCTA";
import { LAST_UPDATED, SECTIONS, SUMMARY } from "@/data/cookies";

export const metadata: Metadata = pageMeta({
  title: "Cookies | HORIZONS by Scenic Escapes",
  description:
    "This website sets no cookies at all, which is why you have not been asked to accept any. What we do instead, and the one thing your browser is asked to keep.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <main className="overflow-x-clip">
      <LegalHero
        label="Cookies"
        title="There is no banner because there are no cookies."
        intro="Most websites open with a box asking you to accept something. This one does not, and the reason is simple rather than clever: there is nothing here to accept. No cookie is set on any page, by us or by anybody else, and the only thing your browser is asked to keep is a note that the opening animation has already played."
        updated={LAST_UPDATED}
        facts={SUMMARY}
      />

      <LegalSections sections={SECTIONS} />

      <LegalCTA
        label="Ask us"
        title="If any of this does not match what you see, tell us."
        body="This page is a claim about how the site behaves, and a claim like that is only worth anything if it can be checked. If you find something here that contradicts it, we would rather hear about it than not."
        message="Hello HORIZONS, I have a question about the cookies page."
        subject="Cookies — a question about the website"
      />
    </main>
  );
}
