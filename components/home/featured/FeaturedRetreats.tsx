import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationViewer from "./DestinationViewer";

export default function FeaturedRetreats() {
  return (
    <section className="bg-[#F7F4EE] py-20 md:py-28">
      <Container>
        {/* Heading */}
        <Reveal className="mb-10 md:mb-16">
          <SectionHeading
            eyebrow="DESTINATIONS"
            title={`Three destinations.
One unforgettable journey.`}
          />
        </Reveal>

        {/* Destination Viewer */}
        <Reveal delay={140}>
          <DestinationViewer />
        </Reveal>
      </Container>
    </section>
  );
}