import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/whatsapp";

import ExperienceCard from "./ExperienceCard";
import { experienceCategories } from "@/data/houseboats";

export default function HouseboatExplorer() {
  const featured = experienceCategories.find((item) => item.id === "families");

  const remaining = experienceCategories.filter(
    (item) => item.id !== "families",
  );

  return (
    <section className="border-t border-white/[0.06] bg-[#111111] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <Reveal className="max-w-3xl">
          <p className="text-[13px] font-medium uppercase tracking-[0.35em] text-[#8B9556]">
            Curated Experiences
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] leading-[1.1] text-white sm:text-4xl md:mt-4 md:text-5xl">
            Curated For Every Journey
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-white/50 sm:mt-6 sm:text-lg sm:leading-8">
            Whether you’re celebrating a honeymoon, travelling with family, or
            planning a getaway with friends, discover houseboats carefully
            selected to match every occasion.
          </p>
        </Reveal>

        {/* Featured Banner */}
        {featured && (
          <Reveal
            delay={120}
            className="group relative mt-10 block aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:mt-16 md:aspect-[2/1]"
          >
            {/*
              Not featured.image. That one was an AI composite — a
              boat and an interior that do not exist in the same
              place, or anywhere — on a page whose whole argument is
              that these are our boats. This is the open upper deck of
              the four-bedroom, table laid, as photographed.
            */}
            <Image
              src="/images/houseboats/4-bedroom/gallery-6.jpg"
              alt="The open upper deck of the four-bedroom houseboat, table laid, backwaters ahead"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/*
              Two gradients, not one. The photograph is bright on the
              left where the words go, so the darkness has to come in
              from the side as well as the bottom.
            */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-transparent"
            />

            {/*
              One stack, bottom left — label, title, line, and the way
              in. The link used to sit alone in the opposite corner,
              aligned to nothing.
            */}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10 md:p-14">
              <div className="max-w-2xl">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                  {featured.title}
                </p>

                <h3 className="mt-5 font-cormorant text-[30px] font-light leading-[1.08] tracking-[-0.01em] sm:text-[40px] md:text-[48px]">
                  {featured.subtitle}
                </h3>

                <p className="mt-5 hidden max-w-lg text-[15px] leading-8 text-white/65 sm:block md:text-[16px]">
                  {featured.description}
                </p>

                <a
                  href={whatsappLink(
                    `Hello HORIZONS, I would like to enquire about houseboats \u2014 ${featured.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/button mt-7 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:text-white md:mt-9"
                >
                  <span>Explore Now</span>

                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover/button:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        )}

        {/* Experiences */}
        <div className="mx-auto mt-14 max-w-5xl md:mt-20">
          <div className="grid grid-cols-2 gap-x-5 gap-y-11 md:gap-x-20 md:gap-y-20">
            {remaining.map((experience, index) => (
              <Reveal key={experience.id} delay={(index % 2) * 110}>
                <ExperienceCard
                  title={experience.title}
                  subtitle={experience.subtitle}
                  description={experience.description}
                  highlights={experience.highlights}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
