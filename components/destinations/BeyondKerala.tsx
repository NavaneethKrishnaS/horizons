import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { BEYOND } from "@/data/destinations";
import { collections, stays } from "@/data/stays";

/*
  The rest of the country, shorter on purpose. Each group counts its own
  houses, so the numbers are the catalogue's rather than a claim.
*/
export default function BeyondKerala() {
  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            The rest of India
          </p>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
            And everywhere the journeys go.
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            We work across the country and keep houses in all of it. These are
            not written at the length Kerala is, and that is honest rather
            than careless: down there we can tell you which room to ask for.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-12 md:mt-16 md:grid-cols-2">
          {BEYOND.map((entry, index) => {
            const group = collections.find((item) => item.id === entry.collection);
            if (!group) return null;

            const count = stays.filter((stay) => stay.collection === entry.collection).length;

            return (
              <Reveal key={entry.collection} delay={Math.min(index, 3) * 90}>
                <Link href={`/stays?region=${entry.collection}`} className="group block">
                  <div className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-4">
                    <h3 className="font-cormorant text-[26px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[30px]">
                      {group.label}
                    </h3>

                    <span className="shrink-0 text-[11px] uppercase tracking-[0.3em] text-white/30 lining-nums">
                      {count} {count === 1 ? "house" : "houses"}
                    </span>
                  </div>

                  <p className="mt-5 max-w-md text-[14.5px] leading-7 text-white/50">
                    {entry.note}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 group-hover:text-white">
                    See them
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
