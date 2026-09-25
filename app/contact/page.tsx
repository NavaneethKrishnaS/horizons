import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";

export const metadata: Metadata = pageMeta({
  title:
    "Contact | HORIZONS by Scenic Escapes",
  description:
    "Tell us where you want to go. Write, call or send a WhatsApp to the people who plan the journeys — we answer within a day, usually the same one.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="overflow-x-clip">
      <ContactHero />
      <ContactForm />
      <ContactDetails />
    </main>
  );
}
