import Container from "@/components/ui/Container";
import WireGlobe from "./WireGlobe";
import { packages, spelled } from "@/data/packages";

/*
  No photograph here, on purpose.

  A picture of one place at the top of a page covering twenty of them
  argues for that place over the rest, and the plain type reads better
  than a compromise. But plain type alone is a flat opening, so there
  is a wireframe globe behind it instead — see WireGlobe for what it is
  and why it is not a rendered object.
*/
export default function PackagesHero() {
  const count = spelled(packages.length);

  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/10 pb-16 pt-40 md:min-h-[80vh] md:pb-24">
      <style>{`
        @keyframes horizons-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-rise {
          animation: horizons-rise 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-rise { animation: none; }
        }
      `}</style>

      <WireGlobe />

      <Container className="relative">
        <p
          className="horizons-rise text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Journeys
        </p>

        <h1
          className="horizons-rise mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          {count.charAt(0).toUpperCase() + count.slice(1)} ways across India.
        </h1>

        <p
          className="horizons-rise mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
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
