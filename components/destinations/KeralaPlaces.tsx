import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { KERALA } from "@/data/destinations";
import { stays } from "@/data/stays";
import { packages } from "@/data/packages";

/*
  One place, one long block: the name and the practicalities held in the
  left column while the prose runs down the right, which is the setting
  the company page and the legal pages use. The houses and journeys at
  the foot of each block are looked up by slug at render, so the names
  here are always the names in the catalogue.
*/
export default function KeralaPlaces() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Kerala
          </p>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
            Six places, and what each one is for.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-20">
          {KERALA.map((place, index) => {
            const houses = place.stays
              .map((slug) => stays.find((stay) => stay.slug === slug))
              .filter((stay) => stay !== undefined);

            const journeys = place.journeys
              .map((slug) => packages.find((tour) => tour.slug === slug))
              .filter((tour) => tour !== undefined);

            return (
              <Reveal key={place.id} delay={Math.min(index, 3) * 70}>
                <div
                  id={place.id}
                  style={{ scrollMarginTop: "calc(var(--horizons-nav, 72px) + 32px)" }}
                  className={`grid gap-8 border-t border-white/10 py-12 md:grid-cols-[300px_1fr] md:gap-16 md:py-16 ${
                    index === KERALA.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-cormorant text-[30px] font-light leading-[1.1] text-white md:text-[38px]">
                      {place.name}
                    </h3>

                    <p className="mt-4 text-[14px] leading-7 text-white/45">
                      {place.standfirst}
                    </p>

                    <dl className="mt-8 border-t border-white/10">
                      {[
                        { term: "When", value: place.season },
                        { term: "How long", value: place.nights },
                        { term: "Getting there", value: place.arrive },
                      ].map((row) => (
                        <div key={row.term} className="border-b border-white/10 py-4">
                          <dt className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                            {row.term}
                          </dt>

                          <dd className="mt-2 text-[13.5px] leading-7 text-white/55 lining-nums">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div>
                    {place.body.map((paragraph, line) => (
                      <p
                        key={`${place.id}-p${line}`}
                        className={`max-w-2xl text-[15px] leading-8 text-white/60 md:text-[16px] md:leading-9 ${
                          line === 0 ? "" : "mt-6"
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/*
                      The backwaters are the one place on this page where
                      the boat is ours rather than somebody's we booked, and
                      leaving that out would be the strangest omission on
                      the site.
                    */}
                    {place.boats ? (
                      <Link
                        href="/houseboats"
                        className="group mt-10 flex items-baseline justify-between gap-6 border-y border-[#6B7341]/35 py-5 transition-colors duration-500 hover:border-[#6B7341]"
                      >
                        <span>
                          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
                            Our own boats
                          </span>

                          <span className="mt-2 block font-cormorant text-[22px] font-light text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[26px]">
                            One, two and three bedroom kettuvallam
                          </span>
                        </span>

                        <span
                          aria-hidden
                          className="shrink-0 text-white/50 transition-transform duration-500 group-hover:translate-x-1.5"
                        >
                          →
                        </span>
                      </Link>
                    ) : null}

                    {houses.length > 0 ? (
                      <div className="mt-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                          Where we would put you
                        </p>

                        <ul className="mt-4 border-t border-white/10">
                          {houses.map((stay) => (
                            <li key={stay.slug} className="border-b border-white/10">
                              <Link
                                href={`/stays/${stay.slug}`}
                                className="group flex items-baseline justify-between gap-6 py-3.5"
                              >
                                <span className="text-[15px] leading-7 text-white/70 transition-colors duration-300 group-hover:text-[#A8B473]">
                                  {stay.name}
                                </span>

                                <span className="shrink-0 text-[12px] leading-7 text-white/30">
                                  {stay.place}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/stays?region=${place.collection}`}
                          className="group mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-[#A8B473]"
                        >
                          Every house in this group
                          <span
                            aria-hidden
                            className="transition-transform duration-500 group-hover:translate-x-1.5"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    ) : null}

                    {journeys.length > 0 ? (
                      <div className="mt-10">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                          Journeys that go there
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                          {journeys.map((tour) => (
                            <Link
                              key={tour.slug}
                              href={`/packages/${tour.slug}`}
                              className="text-[14px] leading-7 text-white/55 underline decoration-white/15 underline-offset-[6px] transition-colors duration-300 hover:text-[#A8B473] hover:decoration-[#6B7341]"
                            >
                              {tour.title}
                              <span className="ml-2 text-[12px] text-white/25 lining-nums">
                                {tour.duration}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
