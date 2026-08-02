import { Clock } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface ItineraryProps {
  houseboat: Houseboat;
}

export default function Itinerary({ houseboat }: ItineraryProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Journey
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Itinerary
          </h2>

          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Experience a carefully curated backwater journey from check-in to
            check-out.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {houseboat.itinerary.map((item) => (
            <div
              key={`${item.day}-${item.time}`}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-3 text-neutral-500">
                <Clock size={18} />

                <span className="text-sm uppercase tracking-[0.2em]">
                  Day {item.day} • {item.time}
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-light text-neutral-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-neutral-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}