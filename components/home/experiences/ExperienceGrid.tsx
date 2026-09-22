import Reveal from "@/components/ui/Reveal";

import ExperienceCard from "./ExperienceCard";
import { experiences } from "./experienceData";

/*
  Two columns, the right one dropped half a card on desktop. The reveal is
  staggered down each column rather than across the pair, so the eye is led
  down the page instead of ping-ponging between the two.
*/
export default function ExperienceGrid() {
  const column = (offset: 0 | 1) =>
    experiences.filter((_, index) => index % 2 === offset);

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:gap-x-8 md:gap-y-10">
      {/* Left Column */}
      <div className="space-y-3 md:space-y-10">
        {column(0).map((experience, index) => (
          <Reveal key={experience.id} delay={index * 110}>
            <ExperienceCard
              title={experience.title}
              location={experience.location}
              description={experience.description}
              image={experience.image}
            />
          </Reveal>
        ))}
      </div>

      {/* Right Column */}
      <div className="space-y-3 md:space-y-10 md:pt-12">
        {column(1).map((experience, index) => (
          <Reveal key={experience.id} delay={index * 110 + 55}>
            <ExperienceCard
              title={experience.title}
              location={experience.location}
              description={experience.description}
              image={experience.image}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
