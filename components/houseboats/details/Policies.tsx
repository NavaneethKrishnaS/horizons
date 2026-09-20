import { ShieldCheck } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface PoliciesProps {
  houseboat: Houseboat;
}

export default function Policies({ houseboat }: PoliciesProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Policies
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Important Information
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-neutral-600 md:mt-6 md:text-lg md:leading-8">
            Please review the following policies before your journey.
          </p>
        </div>

        <div className="mt-8 max-w-3xl border-t border-neutral-200 md:mt-12">
          {houseboat.policies.map((policy) => (
            <div
              key={policy}
              className="flex items-start gap-3 border-b border-neutral-200 py-4 md:gap-4 md:py-5"
            >
              <ShieldCheck
                size={16}
                strokeWidth={1.75}
                className="mt-[3px] shrink-0 text-[#6B7341] md:mt-1 md:size-[18px]"
              />

              <p className="flex-1 text-[14px] leading-6 text-neutral-700 md:text-[16px] md:leading-7">
                {policy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}