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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            FAQs
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Everything you need to know before your backwater journey.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {houseboat.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between p-7 text-left transition hover:bg-neutral-50"
                >
                  <span className="text-xl font-medium text-neutral-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
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
                    <p className="px-7 pb-7 leading-8 text-neutral-600">
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