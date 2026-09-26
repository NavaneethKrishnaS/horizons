import Reveal from "@/components/ui/Reveal";
import ExperienceCard from "./ExperienceCard";
import { experienceCategories } from "@/data/houseboats";

/*
  Curated experiences.

  The five used to be one banner and four entries: "For families" ran
  full width over a photograph, with its own type sizes and its own
  link in the far corner, and the other four were text. Whatever the
  banner gained in weight it lost in making one of five look like a
  different kind of thing. They are five of the same thing now.
*/
export default function HouseboatExplorer() {
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

        {/* Experiences */}
        <div className="mx-auto mt-14 max-w-5xl md:mt-20">
          <div className="grid grid-cols-2 gap-x-5 gap-y-11 md:gap-x-20 md:gap-y-20">
            {experienceCategories.map((experience, index) => (
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
