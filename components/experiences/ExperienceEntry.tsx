import Image from "next/image";

import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";
import type { Experience } from "@/data/experiences";

/*
  One entry. Four of these, alternating sides.

  The alternation is done with grid column starts rather than by
  reversing the DOM, so the reading order on a phone is always
  photograph, then name, then the words — the same every time, whichever
  side the picture sits on at desk width. A flex-row-reverse would have
  put two of the four the other way round on a narrow screen, which is
  the kind of asymmetry you only notice as a feeling that the page is
  untidy.

  Every entry is built from the same three blocks at the same sizes.
  Nothing here is sized per item.
*/
export default function ExperienceEntry({
  item,
  index,
}: {
  item: Experience;
  index: number;
}) {
  const imageRight = index % 2 === 1;

  return (
    /*
      The id is what the navbar panel links to. scroll-mt keeps the
      heading clear of the fixed bar, which is measured and published as
      --horizons-nav once the page has scrolled; the fallback covers the
      first jump, before that variable exists.
    */
    <article
      id={item.id}
      className="scroll-mt-[calc(var(--horizons-nav,80px)+2rem)] border-t border-white/[0.08] py-16 first:border-t-0 first:pt-0 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        {/* Photograph */}
        <Reveal
          className={`md:col-span-6 ${imageRight ? "md:order-2 md:col-start-7" : ""}`}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-white/[0.04]">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Words */}
        <Reveal
          delay={120}
          className={`md:col-span-6 ${imageRight ? "md:order-1 md:row-start-1" : ""}`}
        >
          <h2 className="font-cormorant text-[32px] font-light leading-[1.05] text-white sm:text-[40px] md:text-[46px]">
            {item.title}
          </h2>

          <p className="mt-5 max-w-lg text-[15px] leading-8 text-[#A8B473] md:text-[16px]">
            {item.standfirst}
          </p>

          <div className="mt-7 space-y-5">
            {item.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[16px] md:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* The practical column, in two by two. */}
          <dl className="mt-9 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-white/[0.08] pt-8">
            {item.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {fact.label}
                </dt>

                <dd className="mt-2.5 text-[14px] leading-6 text-white/70">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <EnquiryActions
            message={item.enquiry}
            subject={`${item.title} — enquiry`}
            className="mt-10 max-w-lg"
          />
        </Reveal>
      </div>
    </article>
  );
}
