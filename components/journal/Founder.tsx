import Image from "next/image";

import Reveal from "./Reveal";
import Tailpiece from "./Tailpiece";

import { journalClosing, journalFounder } from "@/data/journal";

export default function Founder() {
  return (
    <>
      <section className="border-t border-black/10 bg-[#F4F2ED] py-16 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal>
            {/*
              No crop box and no frame: the plate is drawn on the same
              paper the page is printed on, and its lower edge is faded
              into it, so a border would only put it back in a box.
            */}
            <div className="mx-auto w-[74%] max-w-[360px] lg:w-full lg:max-w-none">
              <Image
                src={journalFounder.image.src}
                alt={journalFounder.image.alt}
                width={1086}
                height={1317}
                sizes="(max-width: 1024px) 74vw, 40vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#6B7341]">
                {journalFounder.label}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-5 font-cormorant text-[32px] font-light leading-[1.1] text-[#111111] sm:text-5xl md:mt-7 md:text-[56px]">
                {journalFounder.heading}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6 md:mt-12 md:space-y-8">
              {journalFounder.paragraphs.map((paragraph, position) => (
                <Reveal key={paragraph.slice(0, 24)} delay={80 * position}>
                  <p className="text-[15px] leading-8 text-black/60 md:text-[17px] md:leading-9">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <blockquote className="mt-10 border-l border-[#111111]/30 pl-6 md:mt-14 md:pl-8">
                <p className="font-cormorant text-[24px] font-light leading-[1.3] text-[#111111] md:text-[32px]">
                  {journalFounder.quote}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 border-t border-black/15 pt-6 md:mt-14">
                <p className="text-[16px] text-[#111111]">{journalFounder.name}</p>

                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-black/45">
                  {journalFounder.role}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#F4F2ED] py-24 md:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-cormorant text-[32px] font-light leading-[1.1] text-[#111111] sm:text-5xl md:text-[60px]">
              {journalClosing.heading}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 text-[15px] leading-8 text-black/55 md:text-lg">
              {journalClosing.body}
            </p>
          </Reveal>

          {/*
            The tailpiece. The page has been Kerala's story; it signs off
            with the mark, the way a printer closes a book.
          */}
          <Reveal delay={260}>
            <Tailpiece />
          </Reveal>
        </div>
      </section>
    </>
  );
}
