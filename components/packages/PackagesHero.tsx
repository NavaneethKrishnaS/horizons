import Image from "next/image";

import Container from "@/components/ui/Container";
import { packages, spelled } from "@/data/packages";

/*
  No photograph here, on purpose.

  A picture of one place at the top of a page covering twenty of them
  argues for that place over the rest, and the plain type reads better
  than a compromise. But plain type alone is a flat opening, so the page
  is furnished instead with the engravings the Journal is built from —
  inverted to white and held at a few per cent, so they are furniture
  rather than illustration.

  They drift. Slowly enough that you do not catch them at it, and far
  enough from the text that nothing has to be read through them.
*/
const MARKS = [
  { src: "/images/journal/palm.webp", w: 532, h: 824, className: "left-[-4%] top-[18%] w-[26vw] max-w-[320px] md:left-[2%]", drift: "horizons-drift-a", opacity: 0.07 },
  { src: "/images/journal/dhow.webp", w: 961, h: 623, className: "right-[-8%] top-[24%] w-[42vw] max-w-[540px] md:right-[-2%]", drift: "horizons-drift-b", opacity: 0.06 },
  { src: "/images/journal/elephant.webp", w: 521, h: 760, className: "bottom-[6%] right-[14%] hidden w-[13vw] max-w-[150px] lg:block", drift: "horizons-drift-c", opacity: 0.06 },
  { src: "/images/journal/rosette.webp", w: 760, h: 759, className: "left-[22%] top-[6%] hidden w-[9vw] max-w-[110px] md:block", drift: "horizons-drift-c", opacity: 0.05 },
];

export default function PackagesHero() {
  const count = spelled(packages.length);

  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden border-b border-white/10 pb-16 pt-40 md:min-h-[80vh] md:pb-24">
      <style>{`
        @keyframes horizons-drift-a {
          0%,100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%     { transform: translate3d(0, -18px, 0) rotate(-1.2deg); }
        }
        @keyframes horizons-drift-b {
          0%,100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%     { transform: translate3d(-22px, 10px, 0) rotate(1deg); }
        }
        @keyframes horizons-drift-c {
          0%,100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%     { transform: translate3d(8px, -12px, 0) rotate(2deg); }
        }
        @keyframes horizons-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes horizons-ink {
          from { opacity: 0; }
        }
        .horizons-drift-a { animation: horizons-drift-a 26s ease-in-out infinite; }
        .horizons-drift-b { animation: horizons-drift-b 34s ease-in-out infinite; }
        .horizons-drift-c { animation: horizons-drift-c 30s ease-in-out infinite; }
        .horizons-mark { animation: horizons-ink 2600ms ease-out both; }
        .horizons-rise {
          animation: horizons-rise 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-drift-a,
          .horizons-drift-b,
          .horizons-drift-c,
          .horizons-mark,
          .horizons-rise { animation: none; }
        }
      `}</style>

      {MARKS.map((mark) => (
        <div
          key={mark.src + mark.className}
          aria-hidden
          className={`horizons-mark pointer-events-none absolute select-none ${mark.className}`}
          style={{ opacity: mark.opacity }}
        >
          <div className={mark.drift}>
            <Image
              src={mark.src}
              alt=""
              width={mark.w}
              height={mark.h}
              /* The plates are black ink on nothing; this is a dark page. */
              className="h-auto w-full invert"
            />
          </div>
        </div>
      ))}

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
