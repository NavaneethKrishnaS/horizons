import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

import StayCard from "./StayCard";
import { stays } from "./stays";

export default function SignatureStays() {
  return (
    <section className="bg-[#F7F4EE] py-20 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="SIGNATURE STAYS"
            title={`Handpicked retreats.\nCrafted for unforgettable escapes.`}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-20 lg:grid-cols-3 lg:gap-8">
          {stays.map((stay, index) => (
            <Reveal key={stay.id} delay={index * 110}>
              <StayCard
                name={stay.name}
                location={stay.location}
                description={stay.description}
                image={stay.image}
                price={stay.price}
                rating={stay.rating}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}