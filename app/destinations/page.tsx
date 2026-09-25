import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";
import DestinationsHero from "@/components/destinations/DestinationsHero";
import KeralaPlaces from "@/components/destinations/KeralaPlaces";
import BeyondKerala from "@/components/destinations/BeyondKerala";
import EnquiryActions from "@/components/ui/EnquiryActions";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = pageMeta({
  title:
    "Destinations in Kerala and across India | HORIZONS by Scenic Escapes",
  description:
    "All fourteen districts of Kerala — the backwaters, Fort Kochi, Munnar, Munroe Thuruthu, Wayanad, Theyyam country and the rest — what each is, when to come, how long to give it and where we would put you. Then the rest of India.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const message =
    "Hello HORIZONS, I am trying to work out where to go in Kerala and would be glad of your advice.";

  return (
    <main className="overflow-x-clip">
      <DestinationsHero />
      <KeralaPlaces />
      <BeyondKerala />

      <section className="border-t border-white/10 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                Not sure yet
              </p>

              <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
                Tell us how long you have.
              </h2>
            </Reveal>

            <Reveal delay={140} className="lg:pt-16">
              <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
                Two weeks and a first visit is a different route from ten days
                and a second one, and neither is on this page. Tell us the
                dates and who is coming, and we will tell you which of these
                places are worth your time and which are not.
              </p>

              <EnquiryActions
                message={message}
                subject="Where to go in Kerala"
                className="mt-10"
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
