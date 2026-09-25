import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { KERALA } from "@/data/destinations";

/*
  The index. Fourteen districts as fourteen photographs, south to north,
  and nothing else — the writing lives on each district's own page now,
  because fourteen long entries on one page was twenty thousand pixels
  of scrolling and nobody reads the last four.

  Three districts have no photograph yet. They get a plain panel with
  their name in it rather than somebody else's landscape, which is the
  honest way for a card to say "we have not been here with a camera".
*/
export default function DistrictGrid() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Kerala
          </p>

          <h2 className="mt-7 max-w-2xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
            Fourteen districts, south to north.
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            Six hundred kilometres of coast with mountains behind it, and every
            part of it different from the last. Open one.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 md:gap-x-10 lg:grid-cols-3">
          {KERALA.map((place, index) => (
            <Reveal
              key={place.id}
              delay={Math.min(index, 5) * 60}
              className="h-full"
            >
              <Link
                href={`/destinations/${place.id}`}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161616]">
                  {place.image ? (
                    <Image
                      src={place.image.src}
                      alt={place.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center border border-white/10">
                      <span className="font-cormorant text-[34px] font-light text-white/20">
                        {place.district}
                      </span>
                    </div>
                  )}

                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                  />
                </div>

                <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-[#8B9556]">
                  {place.district}
                </p>

                <h3 className="mt-3 font-cormorant text-[24px] font-light leading-tight text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[27px]">
                  {place.name}
                </h3>

                <p className="mt-3 max-w-sm flex-1 text-[14px] leading-7 text-white/45">
                  {place.standfirst}
                </p>

                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-white/25 lining-nums">
                  {place.stayLength}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
