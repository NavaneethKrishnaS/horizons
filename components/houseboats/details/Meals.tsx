import { UtensilsCrossed } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface MealsProps {
  houseboat: Houseboat;
}

export default function Meals({ houseboat }: MealsProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Dining
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Meals Included
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Freshly prepared Kerala cuisine served onboard throughout your
            journey.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {houseboat.meals.map((meal) => (
            <div
              key={meal}
              className="flex items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                <UtensilsCrossed size={20} strokeWidth={2} />
              </div>

              <span className="flex-1 text-lg leading-7 text-neutral-700">
                {meal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}