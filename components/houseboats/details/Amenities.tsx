import { Check } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface AmenitiesProps {
  houseboat: Houseboat;
}

export default function Amenities({ houseboat }: AmenitiesProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Amenities
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Comfort Onboard
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {houseboat.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white">
                <Check size={18} strokeWidth={2.5} />
              </div>

              <span className="flex-1 text-lg leading-7 text-neutral-700">
                {amenity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}