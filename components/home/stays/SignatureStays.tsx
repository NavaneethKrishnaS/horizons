import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

import StayCard from "./StayCard";
import { stays } from "./stays";

export default function SignatureStays() {
  return (
    <section className="bg-[#F7F4EE] py-32">
      <Container>
        <SectionHeading
          eyebrow="SIGNATURE STAYS"
          title={`Handpicked retreats.\nCrafted for unforgettable escapes.`}
        />

        <div className="mt-20 grid grid-cols-3 gap-8">
          {stays.map((stay) => (
            <StayCard
              key={stay.id}
              name={stay.name}
              location={stay.location}
              description={stay.description}
              image={stay.image}
              price={stay.price}
              rating={stay.rating}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}