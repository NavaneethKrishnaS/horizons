import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { packages } from "@/data/packages";

/*
  Three journeys, and the arc they describe: a fortnight that never
  leaves Kerala, a fortnight of hill stations across three states, and
  three weeks from Delhi to the bottom of the country. Named by slug
  and read from data/packages.ts, so the titles, regions and lengths
  are whatever the catalogue says they are today.
*/
const FEATURED = ["kerala-unhurried", "misty-south-india", "north-to-south"];

export default function Journeys() {
  const shown = FEATURED.map((slug) =>
    packages.find((tour) => tour.slug === slug),
  ).filter((tour) => tour !== undefined);

  if (!shown.length) return null;

  return (
    <section className="bg-[#111111] py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Journeys
            </p>

            <Link
              href="/packages"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 transition-colors hover:text-white"
            >
              All {packages.length}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <h2 className="font-cormorant text-[30px] font-light leading-[1.1] text-white sm:text-[40px] md:col-span-7 md:text-[48px]">
              Routes we have run before, and would run differently for you.
            </h2>

            <p className="text-[15px] leading-8 text-white/45 md:col-span-4 md:col-start-9 md:self-end md:text-[16px]">
              Every one of these was built for somebody. Take the shape and
              change the rest — the nights, the houses, the pace, where it
              starts.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3 md:gap-x-10">
          {shown.map((tour, index) => (
            <Reveal key={tour.slug} delay={index * 90} className="h-full">
              <Link
                href={`/packages/${tour.slug}`}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#161616]">
                  <Image
                    src={tour.image}
                    alt={tour.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  />
                </div>

                <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[#8B9556]">
                  {tour.region}
                </p>

                <h3 className="mt-3 font-cormorant text-[25px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[28px]">
                  {tour.title}
                </h3>

                <p className="mt-3 max-w-sm flex-1 text-[14px] leading-7 text-white/45">
                  {tour.standfirst}
                </p>

                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/25 lining-nums">
                  {tour.duration}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
