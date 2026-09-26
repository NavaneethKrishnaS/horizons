import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The first thing after the film.

  One paragraph, and it has to earn the scroll: who this is, where it
  is from, and why that is different from a booking site. Everything
  here is stated on the About page too — this is the short version,
  not a new claim.

  It was two paragraphs in two columns, which made the reader choose
  an order and said the same thing twice. One is stronger.
*/
export default function Statement() {
  return (
    <section className="bg-[#111111] pb-32 pt-24 md:pb-44 md:pt-40">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Kerala, and the rest of India
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-4xl font-cormorant text-[34px] font-light leading-[1.1] text-white sm:text-5xl md:text-[58px]">
            Kerala is not a destination to us. It is the address.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 max-w-2xl text-[17px] leading-9 text-white/55 md:mt-14 md:text-[19px] md:leading-[2]">
            HORIZONS is Scenic Escapes India, a small company in Alumkadavu —
            the village where the kettuvallam was reinvented, and where our
            founder still lives. We run the boats ourselves, we have known most
            of the houses for years, and the person who reads your letter is the
            one who arranges the journey.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
