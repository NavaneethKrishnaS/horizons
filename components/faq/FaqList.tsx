"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { faq } from "@/data/faq";
import GettingHerePanel from "./GettingHerePanel";

/*
  One open at a time, and none open to begin with.

  A long page of questions that arrives with every answer showing is a
  wall of prose nobody reads; the questions themselves are the content,
  and closing them all is what makes the page scannable. Only one opens
  at once so the thing you just clicked does not slide off the screen
  as something above it grows.

  The height animates on grid-template-rows rather than max-height,
  which means no guessed pixel value and no jump at the end when the
  guess was wrong. It is the same mechanism the houseboat FAQ uses, so
  the two behave identically.
*/
export default function FaqList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-16">
      <Container>
        {/*
          The guide goes at the top, ahead of the first question. It is
          the one thing on this page that is not an answer but a door,
          and somebody who has scrolled as far as the airports has
          usually already decided to ask us instead of reading on.
        */}
        <div className="mb-16 md:mb-24">
          <GettingHerePanel />
        </div>

        {faq.map((group, groupIndex) => (
          <div
            key={group.id}
            id={group.id}
            /*
              Scroll margin, so a jump from the contents line lands the
              heading below the fixed navbar instead of behind it.
            */
            style={{ scrollMarginTop: "calc(var(--horizons-nav, 72px) + 32px)" }}
            className={groupIndex === 0 ? "" : "mt-20 md:mt-28"}
          >
            <Reveal>
              <h2 className="border-b border-white/10 pb-5 font-cormorant text-[26px] font-light text-white md:text-[32px]">
                {group.label}
              </h2>
            </Reveal>

            <div>
              {group.questions.map((item, index) => {
                const id = `${group.id}-${index}`;
                const isOpen = open === id;

                return (
                  <Reveal key={item.q} delay={Math.min(index, 4) * 70}>
                    <div className="border-b border-white/10">
                      <h3>
                        <button
                          type="button"
                          id={`${id}-question`}
                          onClick={() => setOpen(isOpen ? null : id)}
                          aria-expanded={isOpen}
                          aria-controls={`${id}-answer`}
                          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span
                            className={`text-[16px] leading-7 transition-colors duration-300 md:text-[18px] ${
                              isOpen
                                ? "text-white"
                                : "text-white/75 group-hover:text-white"
                            }`}
                          >
                            {item.q}
                          </span>

                          {/*
                            A plus that becomes a minus. Two rules and a
                            rotation — no icon font, and it reads at any
                            size.
                          */}
                          <span
                            aria-hidden
                            className="relative mt-3 block h-px w-3.5 shrink-0 bg-[#8B9556]"
                          >
                            <span
                              className={`absolute inset-0 block h-px w-3.5 bg-[#8B9556] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isOpen ? "rotate-0" : "rotate-90"
                              }`}
                            />
                          </span>
                        </button>
                      </h3>

                      {/*
                        inert while it is shut, or a screen reader reads
                        all twenty-five answers straight through as if
                        nothing were collapsed; and named by its question,
                        so the region announces what it belongs to.
                      */}
                      <div
                        id={`${id}-answer`}
                        role="region"
                        aria-labelledby={`${id}-question`}
                        inert={!isOpen}
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`max-w-2xl pb-7 pr-6 text-[15px] leading-8 text-white/55 transition-opacity duration-500 md:text-[16px] md:leading-9 ${
                              isOpen ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
