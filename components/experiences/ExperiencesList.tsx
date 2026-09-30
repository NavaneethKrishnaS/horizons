import Container from "@/components/ui/Container";
import ExperienceEntry from "./ExperienceEntry";
import { experiences } from "@/data/experiences";

export default function ExperiencesList() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        {experiences.map((item, index) => (
          <ExperienceEntry key={item.id} item={item} index={index} />
        ))}
      </Container>
    </section>
  );
}
