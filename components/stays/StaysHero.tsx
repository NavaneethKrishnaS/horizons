import Container from "@/components/ui/Container";
import { collections, stays } from "@/data/stays";

/*
  Not the journeys hero with different words in it.

  That page opens on movement — a turning globe, a headline counting
  routes. This one is about the opposite: staying put. So it opens as an
  index instead. A short statement, and under it every place we can put
  somebody, set out as a gazetteer and drawn from the data, so the band
  cannot go stale when a property is added or dropped.
*/
export default function StaysHero() {
  /* Distinct localities, in the order the catalogue is sorted — Kerala out. */
  const places = Array.from(new Set(stays.map((stay) => stay.place)));

  const kerala = stays.filter((stay) => stay.from === 0).length;

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-stays-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-stays-in {
          animation: horizons-stays-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /*
          The horizon. One rule across the page, drawn from the left over
          two and a half seconds — the whole brand in a single line, and
          the only thing moving on an otherwise still opening.
        */
        @keyframes horizons-rule-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .horizons-rule {
          transform-origin: left center;
          animation: horizons-rule-draw 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-stays-in { animation: none; }
          .horizons-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-stays-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Places to stay
        </p>

        <h1
          className="horizons-stays-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          Where we would put you.
        </h1>

        <p
          className="horizons-stays-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          Small hotels, family houses, houseboats and camps — {kerala} of
          them in Kerala, where we live, and the rest in places we have been
          sent enough times to have opinions about. None of them is a chain.
          We have stood in most of them.
        </p>
      </Container>

      {/* The index. Everywhere we can put somebody, said plainly. */}
      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:gap-16 md:py-12">
            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-32 md:pt-1">
              {places.length} localities
            </p>

            {/*
              All fifty-five on a laptop, where the band is four lines and
              reads as an index. On a phone the same list runs to
              twenty-five lines, so it is clamped to six — the point is
              made by then, and nobody should scroll a screenful of place
              names before reaching a single place.
            */}
            <p
              className="horizons-stays-in line-clamp-6 max-w-5xl text-[13px] leading-[2.1] tracking-[0.06em] text-white/45 md:line-clamp-none md:text-[14px]"
              style={{ animationDelay: "520ms" }}
            >
              {places.map((place, index) => (
                <span key={place}>
                  {place}
                  {index < places.length - 1 ? (
                    <span aria-hidden className="px-2.5 text-[#6B7341]">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </p>

            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-24 md:pt-1 md:text-right">
              {collections.length} regions
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
