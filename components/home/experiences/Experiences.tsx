import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import ExperienceGrid from "./ExperienceGrid";

export default function Experiences() {
  return (
    <section className="bg-[#F7F4EE] py-32">
      <Container>
        <SectionHeading
          eyebrow="CURATED EXPERIENCES"
          title={`Every destination has a story.
We're here to help you live it.`}
        />

        <div className="mt-20">
          <ExperienceGrid />
        </div>
      </Container>
    </section>
  );
}