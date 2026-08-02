import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationViewer from "./DestinationViewer";

export default function FeaturedRetreats() {
  return (
    <section className="bg-[#F7F4EE] py-28">
      <Container>
        {/* Heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="DESTINATIONS"
            title={`Three destinations.
One unforgettable journey.`}
          />
        </div>

        {/* Destination Viewer */}
        <DestinationViewer />
      </Container>
    </section>
  );
}