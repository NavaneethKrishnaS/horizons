import { UtensilsCrossed } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface MealsProps {
  houseboat: Houseboat;
}

export default function Meals({ houseboat }: MealsProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Dining
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Meals Included
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-neutral-600 md:mt-6 md:text-lg md:leading-8">
            Freshly prepared Kerala cuisine served onboard throughout your
            journey.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-12 md:gap-y-5 lg:grid-cols-3">
          {houseboat.meals.map((meal) => (
            <div key={meal} className="flex items-start gap-3">
              <UtensilsCrossed
                size={15}
                strokeWidth={1.75}
                className="mt-[3px] shrink-0 text-[#6B7341] md:mt-1 md:size-4"
              />

              <span className="text-[14px] leading-6 text-neutral-700 md:text-[16px] md:leading-7">
                {meal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}