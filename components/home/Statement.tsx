import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The first thing after the film.

  One paragraph, and it has to earn the scroll: who this is, where it
  is from, and why that is different from a booking site. Everything
  here is stated on the About page too — this is the short version,
  not a new claim.

  It was two paragraphs in two columns, which made the reader choose
  an order and said the same thing twice. One is stronger. It runs to
  the width of the heading above it rather than to half of it, so the
  section is a block of writing rather than a column with an empty
  half beside it, and the leading is opened up to carry the longer
  line.
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
          <p className="mt-10 text-[17px] leading-9 text-white/55 md:mt-14 md:text-[19px] md:leading-[2.1]">
            HORIZONS is Scenic Escapes India, a small company in Alumkadavu —
            the village where the kettuvallam was reinvented, and where our
            founder still lives. He began his career alongside Mr Babu Varghese
            of Tourindia, the man who put the first bed in an old rice barge.
            The boats on this site are ours; most of the houses we send people
            to are ones we have known for years rather than found on a screen;
            and beyond Kerala we travel where we have already been ourselves —
            Tamil Nadu, Karnataka, Goa, and further north. Whatever you ask for,
            the person who reads your letter is the one who arranges the
            journey.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
