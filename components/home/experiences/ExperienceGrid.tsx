import ExperienceCard from "./ExperienceCard";
import { experiences } from "./experienceData";

export default function ExperienceGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:gap-x-8 md:gap-y-10">
      {/* Left Column */}
      <div className="space-y-3 md:space-y-10">
        {experiences
          .filter((_, index) => index % 2 === 0)
          .map((experience) => (
            <ExperienceCard
              key={experience.id}
              title={experience.title}
              location={experience.location}
              description={experience.description}
              image={experience.image}
            />
          ))}
      </div>

      {/* Right Column */}
      <div className="space-y-3 md:space-y-10 md:pt-12">
        {experiences
          .filter((_, index) => index % 2 === 1)
          .map((experience) => (
            <ExperienceCard
              key={experience.id}
              title={experience.title}
              location={experience.location}
              description={experience.description}
              image={experience.image}
            />
          ))}
      </div>
    </div>
  );
}