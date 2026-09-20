"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface FAQProps {
  houseboat: Houseboat;
}

export default function FAQ({ houseboat }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            FAQs
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Everything you need to know before your backwater journey.
          </p>
        </div>

        <div className="mt-8 max-w-3xl border-t border-neutral-200 md:mt-16">
          {houseboat.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-b border-neutral-200"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:text-[#6B7341] md:py-6"
                >
                  <span className="text-[15px] font-medium text-neutral-900 md:text-lg">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-neutral-400 transition-transform duration-300 md:size-5 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-[14px] leading-6 text-neutral-600 md:pb-6 md:text-base md:leading-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}