import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { KERALA } from "@/data/destinations";

/*
  The fourteen districts, as names rather than as fourteen more
  photographs. The index page is one click away and is nothing but
  photographs; repeating it here would make the home page a second
  version of a page we already have, and twice as long.
*/
export default function WhereWeGo() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0E0E0E] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Where we go
            </p>

            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
            >
              Every district
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-2xl font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:text-[46px]">
            Six hundred kilometres of coast, and mountains behind all of it.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <ul className="mt-12 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
            {KERALA.map((place) => (
              <li key={place.id} className="border-b border-white/[0.07]">
                <Link
                  href={`/destinations/${place.id}`}
                  className="group flex items-baseline justify-between gap-3 py-4"
                >
                  <span className="font-cormorant text-[20px] font-light text-white/80 transition-colors duration-300 group-hover:text-[#A8B473] md:text-[22px]">
                    {place.district}
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 lining-nums">
                    {place.stayLength}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
