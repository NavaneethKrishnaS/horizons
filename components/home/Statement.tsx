import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The first thing after the film.

  One paragraph, and it has to earn the scroll. It is about Kerala
  and nothing else — not what we do, not how we are different, not a
  word about the company. This is the first writing anybody reads on
  the site, and what it has to do is make somebody want to come. The
  rest of the page can say who we are; a visitor has to want the
  place before they care who arranges it.

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
            Kerala is nearly six hundred kilometres of coast with a wall of
            mountains behind it, and almost everything between the two is water.
            The rain comes twice a year here, once more than the rest of India
            gets, and the whole state answers it: the paddy floods, the pepper
            climbs, and the rivers come down out of the hills to lose themselves
            in a net of lagoons and canals where the water was the road long
            before there were roads. You wake to mist lying on it. A canoe goes
            past with the morning&rsquo;s fish. Somebody will tell you this is
            God&rsquo;s own country, and after a week you will have stopped
            arguing.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
