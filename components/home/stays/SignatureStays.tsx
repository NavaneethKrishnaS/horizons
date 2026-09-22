import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StayCard from "@/components/stays/StayCard";

import { stays } from "@/data/stays";

/*
  Three real ones, pulled from the catalogue rather than typed out here.

  This section used to hold three hand-written entries with prices on
  them — the only prices anywhere on the site — one of which (Kumarakom
  Lake Resort) also existed in data/stays.ts, written differently. Now
  it names three slugs and the rest comes from the same place the Stays
  page reads, so the homepage cannot drift away from it again.
*/
const FEATURED = ["philipkuttys-farm", "malabar-house", "marari-villas"];

export default function SignatureStays() {
  const featured = FEATURED.map((slug) =>
    stays.find((stay) => stay.slug === slug)
  ).filter((stay) => stay !== undefined);

  if (featured.length === 0) return null;

  return (
    <section className="bg-[#111111] py-20 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="SIGNATURE STAYS"
            title={`Handpicked retreats.\nCrafted for unforgettable escapes.`}
          />
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {featured.map((stay, index) => (
            <Reveal key={stay.slug} delay={index * 110}>
              <StayCard stay={stay} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 border-t border-white/10 pt-8">
            <Link
              href="/stays"
              className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-white/60 transition-colors duration-500 hover:text-white"
            >
              All {stays.length} stays
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
