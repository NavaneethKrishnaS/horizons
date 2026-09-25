import type { Metadata } from "next";

import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyBody from "@/components/privacy/PrivacyBody";
import PrivacyCTA from "@/components/privacy/PrivacyCTA";

export const metadata: Metadata = {
  title: "Privacy | HORIZONS by Scenic Escapes",
  description:
    "No cookies, no analytics, nothing collected by the website at all. What we hold is what you write to us, we use it to arrange your journey, and you can have it deleted by asking.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="overflow-x-clip">
      <PrivacyHero />
      <PrivacyBody />
      <PrivacyCTA />
    </main>
  );
}
