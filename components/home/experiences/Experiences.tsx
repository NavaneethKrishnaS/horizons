import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

import ExperienceGrid from "./ExperienceGrid";

export default function Experiences() {
  return (
    <section className="bg-[#F7F4EE] py-20 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="CURATED EXPERIENCES"
            title={`Every destination has a story.
We're here to help you live it.`}
          />
        </Reveal>

        <div className="mt-12 md:mt-20">
          <ExperienceGrid />
        </div>
      </Container>
    </section>
  );
}