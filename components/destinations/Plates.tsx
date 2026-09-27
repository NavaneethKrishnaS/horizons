import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The plate section.

  A district page had one photograph, at the top, and then two
  thousand words with nothing to look at. This is the picture section
  a printed guide would set in the middle of a chapter: plates of
  different sizes laid out so the eye moves rather than scans, which
  is the opposite of the six-equal-squares grid every other site uses.

  The shape of each plate comes from its position, not from the
  photograph, so a district with five looks composed and so does one
  with eight. Below md they stack at one width and one shape, because
  a phone has no room for composition and a column of plates reads
  perfectly well.
*/

/* Column span and shape by position, repeating after eight. */
const SHAPES = [
  "md:col-span-7 md:aspect-[4/3]",
  "md:col-span-5 md:aspect-[3/4]",
  "md:col-span-4 md:aspect-square",
  "md:col-span-4 md:aspect-square",
  "md:col-span-4 md:aspect-square",
  "md:col-span-6 md:aspect-[4/3]",
  "md:col-span-6 md:aspect-[4/3]",
  "md:col-span-12 md:aspect-[21/9]",
];

/* What each plate is asked to render at, so nothing is over-fetched. */
const WIDTHS = [
  "(max-width: 767px) 100vw, 55vw",
  "(max-width: 767px) 100vw, 40vw",
  "(max-width: 767px) 100vw, 30vw",
  "(max-width: 767px) 100vw, 30vw",
  "(max-width: 767px) 100vw, 30vw",
  "(max-width: 767px) 100vw, 46vw",
  "(max-width: 767px) 100vw, 46vw",
  "100vw",
];

export default function Plates({
  place,
  photographs,
}: {
  place: string;
  photographs: { src: string; alt: string }[];
}) {
  if (!photographs.length) return null;

  return (
    <section className="border-t border-white/[0.06] bg-[#0E0E0E] py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            {place}, in photographs
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-12 md:gap-5">
          {photographs.map((photograph, index) => (
            <Reveal
              key={photograph.src}
              delay={Math.min(index, 4) * 70}
              className={`${SHAPES[index % SHAPES.length]} aspect-[4/3]`}
            >
              <div className="group relative h-full w-full overflow-hidden bg-[#141414]">
                <Image
                  src={photograph.src}
                  alt={photograph.alt}
                  fill
                  sizes={WIDTHS[index % WIDTHS.length]}
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
