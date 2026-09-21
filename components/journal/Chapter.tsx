import Image from "next/image";

import Reveal from "./Reveal";

import { JournalChapter } from "@/data/journal";

interface ChapterProps {
  chapter: JournalChapter;
  index: number;
}

/*
  The photograph holds still while the writing moves past it.

  Done with position: sticky rather than a scroll handler, so it costs the
  browser nothing as you scroll — the compositor keeps the image in place on
  its own. On a phone the image sits above the text instead, because a pinned
  half-screen leaves no room to read.
*/
export default function Chapter({ chapter, index }: ChapterProps) {
  const imageFirst = index % 2 === 0;

  return (
    <section
      id={chapter.id}
      className="relative border-t border-white/5 bg-[#111111] py-16 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:gap-20">
        <div
          className={`lg:sticky lg:top-28 lg:self-start ${
            imageFirst ? "" : "lg:order-2"
          }`}
        >
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className={imageFirst ? "" : "lg:order-1"}>
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#6B7341]">
              {chapter.label}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-5 font-cormorant text-[32px] font-light leading-[1.1] text-white sm:text-5xl md:mt-7 md:text-[56px]">
              {chapter.heading}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-6 md:mt-12 md:space-y-8">
            {chapter.paragraphs.map((paragraph, position) => (
              <Reveal key={paragraph.slice(0, 24)} delay={80 * position}>
                <p className="text-[15px] leading-8 text-white/65 md:text-[17px] md:leading-9">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {chapter.quote && (
            <Reveal delay={120}>
              <blockquote className="mt-10 border-l border-[#6B7341] pl-6 md:mt-14 md:pl-8">
                <p className="font-cormorant text-[24px] font-light leading-[1.3] text-white md:text-[32px]">
                  {chapter.quote}
                </p>
              </blockquote>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
