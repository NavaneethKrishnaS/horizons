import Image from "next/image";

import { whatsappLink } from "@/lib/whatsapp";

import ExperienceCard from "./ExperienceCard";
import { experienceCategories } from "@/data/houseboats";

export default function HouseboatExplorer() {
  const featured = experienceCategories.find(
    (item) => item.id === "families"
  );

  const remaining = experienceCategories.filter(
    (item) => item.id !== "families"
  );

  return (
    <section className="bg-white py-20 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <p className="text-[13px] font-medium uppercase tracking-[0.35em] text-[#7A8250]">
            Curated Experiences
          </p>

          <h2 className="mt-4 font-cormorant text-4xl text-neutral-900 md:text-5xl">
            Curated For Every Journey
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Whether you're celebrating a honeymoon, travelling with family, or
            planning a getaway with friends, discover houseboats carefully
            selected to match every occasion.
          </p>
        </div>

        {/* Featured Banner */}
        {featured && (
          <div className="group relative mt-14 aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:mt-20 md:aspect-[21/9]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-20 left-6 right-6 max-w-[640px] text-white md:bottom-14 md:left-14 md:right-auto">
              <p className="text-xs uppercase tracking-[0.4em]">
                {featured.title}
              </p>

              <h3 className="mt-4 max-w-[580px] font-cormorant text-[30px] leading-[1.08] tracking-[-0.02em] sm:text-[42px] md:text-[64px] md:leading-[1.05] md:tracking-[-0.03em]">
                {featured.subtitle}
              </h3>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
                {featured.description}
              </p>
            </div>

            {/* CTA */}
            <a
  href={whatsappLink(
    `Hello HORIZONS, I would like to enquire about houseboats \u2014 ${featured.title}.`
  )}
  target="_blank"
  rel="noopener noreferrer"
  className="group/button absolute bottom-6 right-6 inline-flex md:bottom-14 md:right-14 items-center gap-3 text-[13px] font-medium uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 hover:text-white"
>
  <span>Explore Now</span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover/button:translate-x-1.5"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
</a>
          </div>
        )}

        {/* Experiences */}
        <div className="mx-auto mt-14 max-w-5xl md:mt-20">
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-20 md:gap-y-20">
            {remaining.map((experience) => (
              <ExperienceCard
                key={experience.id}
                title={experience.title}
                subtitle={experience.subtitle}
                description={experience.description}
                highlights={experience.highlights}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}