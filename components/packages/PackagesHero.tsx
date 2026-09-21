import Container from "@/components/ui/Container";

export default function PackagesHero() {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/10 pb-16 pt-40 md:min-h-[80vh] md:pb-24">
      <Container>
        <p className="text-[11px] uppercase tracking-[0.45em] text-white/50">
          Journeys
        </p>

        <h1 className="mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]">
          Seventeen ways across India.
        </h1>

        <p className="mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9">
          These are the journeys we run on the ground — the Himalaya, the
          Ganges, Rajasthan, the temple country of the south. Each one is an
          itinerary rather than a departure: no fixed dates, no coach, no
          group you did not choose. Tell us which one and we will build it
          around you.
        </p>
      </Container>
    </section>
  );
}
