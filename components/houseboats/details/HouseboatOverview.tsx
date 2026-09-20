import {
  BedDouble,
  Bath,
  Users,
  UserCog,
  UtensilsCrossed,
} from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface HouseboatOverviewProps {
  houseboat: Houseboat;
}

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

const overviewItems = (houseboat: Houseboat) => [
  { icon: BedDouble, text: plural(houseboat.bedrooms, "Bedroom") },
  { icon: Bath, text: plural(houseboat.bathrooms, "Bathroom") },
  { icon: Users, text: plural(houseboat.maxGuests, "Guest") },
  // "Crew" is collective — two crew, not two crews
  { icon: UserCog, text: `${houseboat.crew} Crew` },
  { icon: UtensilsCrossed, text: "All Meals Included" },
];

export default function HouseboatOverview({
  houseboat,
}: HouseboatOverviewProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Overview
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Everything You Need to Know
          </h2>

          <p className="mt-5 text-[15px] leading-7 text-neutral-600 md:mt-8 md:text-lg md:leading-9">
            {houseboat.longDescription}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-12 md:gap-y-5 lg:grid-cols-3">
          {overviewItems(houseboat).map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.text} className="flex items-start gap-3">
                <Icon
                  size={15}
                  strokeWidth={1.75}
                  className="mt-[3px] shrink-0 text-[#6B7341] md:mt-1 md:size-4"
                />

                <span className="text-[14px] leading-6 text-neutral-700 md:text-[16px] md:leading-7">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
