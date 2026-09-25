import Container from "@/components/ui/Container";
import { KERALA } from "@/data/destinations";
import { stays } from "@/data/stays";
import { packages } from "@/data/packages";

/*
  The same opening as the rest of the site. The three facts under the
  rule are counted rather than typed, so the page cannot claim more
  houses than the catalogue holds.
*/
export default function DestinationsHero() {
  const facts = [
    { label: "Places in Kerala", value: `${KERALA.length}` },
    { label: "Houses on the books", value: `${stays.length}` },
    { label: "Journeys across India", value: `${packages.length}` },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-dest-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-dest-in {
          animation: horizons-dest-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-dest-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-dest-rule {
          transform-origin: left center;
          animation: horizons-dest-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-dest-in { animation: none; }
          .horizons-dest-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-dest-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Destinations
        </p>

        <h1
          className="horizons-dest-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          Where we would take you.
        </h1>

        <p
          className="horizons-dest-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          Kerala first and at length, because it is where we are from and
          where we can tell you which side of the lake to sleep on. Then the
          rest of the country, arranged the way we work in it.
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-dest-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-dest-in grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12"
            style={{ animationDelay: "520ms" }}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {fact.label}
                </p>

                <p className="mt-3 font-cormorant text-[26px] font-light leading-none text-[#A8B473] lining-nums md:text-[30px]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
