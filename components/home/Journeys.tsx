import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { packages } from "@/data/packages";

/*
  Three journeys, set as a contents page rather than as three cards.

  A card grid is what the catalogue itself does, and doing it again
  here made the home page the fourth page in a row with the same row
  of three. A list with a rule between the entries, the length set
  out on the right like a page number, and a small plate of the place
  at the left, reads like the front of a book — which is what a home
  page is.

  Named by slug and read from data/packages.ts, so the titles,
  regions and lengths are whatever the catalogue says today.
*/
const FEATURED = ["kerala-unhurried", "misty-south-india", "north-to-south"];

export default function Journeys() {
  const shown = FEATURED.map((slug) =>
    packages.find((tour) => tour.slug === slug),
  ).filter((tour) => tour !== undefined);

  if (!shown.length) return null;

  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
                Journeys
              </p>

              <h2 className="mt-7 font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[48px]">
                Routes we have run before, and would run differently for you.
              </h2>
            </div>

            <p className="text-[15px] leading-8 text-white/45 md:col-span-4 md:col-start-9 md:self-end md:text-[16px]">
              Every one of these was built for somebody. Take the shape and
              change the rest — the nights, the houses, the pace, where it
              starts.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 md:mt-20">
          {shown.map((tour, index) => (
            <Reveal key={tour.slug} delay={index * 80}>
              <li className="border-t border-white/[0.09] last:border-b">
                <Link
                  href={`/packages/${tour.slug}`}
                  className="group flex items-center gap-5 py-7 sm:gap-8 md:py-9"
                >
                  <div className="relative h-[70px] w-[70px] shrink-0 overflow-hidden bg-[#161616] sm:h-[92px] sm:w-[124px] md:h-[104px] md:w-[152px]">
                    <Image
                      src={tour.image}
                      alt={tour.imageAlt}
                      fill
                      sizes="152px"
                      className="object-cover opacity-85 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:opacity-100"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#8B9556]">
                      {tour.region}
                    </p>

                    <h3 className="mt-2.5 font-cormorant text-[24px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473] sm:text-[30px] md:text-[36px]">
                      {tour.title}
                    </h3>

                    <p className="mt-2.5 hidden max-w-xl text-[14px] leading-7 text-white/40 sm:block">
                      {tour.standfirst}
                    </p>
                  </div>

                  {/* Set out on the right like a page number. */}
                  <div className="flex shrink-0 items-center gap-5 md:gap-8">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-white/30 lining-nums">
                      {tour.duration}
                    </span>

                    <span className="hidden text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:block">
                      →
                    </span>
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link
            href="/packages"
            className="group mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white"
          >
            All {packages.length} journeys
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
