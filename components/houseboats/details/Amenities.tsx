import { Check } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface AmenitiesProps {
  houseboat: Houseboat;
}

export default function Amenities({ houseboat }: AmenitiesProps) {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Amenities
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Comfort Onboard
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 md:mt-12 md:gap-y-5 lg:grid-cols-3">
          {houseboat.amenities.map((amenity) => (
            <div key={amenity} className="flex items-start gap-3">
              <Check
                size={15}
                strokeWidth={2}
                className="mt-[3px] shrink-0 text-[#6B7341] md:mt-1 md:size-4"
              />

              <span className="text-[14px] leading-6 text-neutral-700 md:text-[16px] md:leading-7">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}