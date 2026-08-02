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
  
  const overviewItems = (houseboat: Houseboat) => [
    {
      icon: BedDouble,
      label: "Bedroom",
      value: houseboat.bedrooms,
    },
    {
      icon: Bath,
      label: "Bathroom",
      value: houseboat.bathrooms,
    },
    {
      icon: Users,
      label: "Guests",
      value: houseboat.maxGuests,
    },
    {
      icon: UserCog,
      label: "Crew",
      value: houseboat.crew,
    },
    {
      icon: UtensilsCrossed,
      label: "Meals",
      value: "Included",
    },
  ];
  
  export default function HouseboatOverview({
    houseboat,
  }: HouseboatOverviewProps) {
    return (
        <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
              Overview
            </p>
  
            <h2 className="mt-5 text-6xl font-light leading-tight tracking-tight text-neutral-900">
              Everything You Need to Know
            </h2>
  
            <p className="mt-8 text-lg leading-9 text-neutral-600">
              {houseboat.longDescription}
            </p>
          </div>
  
          <div className="mt-12 max-w-2xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-neutral-400">
              Key Specifications
            </p>
  
            <div className="border-t border-neutral-200/80">
              {overviewItems(houseboat).map((item, index) => {
                const Icon = item.icon;
  
                return (
                  <div key={item.label}>
                    <div className="group grid grid-cols-[56px_1fr_auto] items-center gap-5 py-7">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300 group-hover:bg-neutral-900">
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="text-neutral-600 transition-colors duration-300 group-hover:text-white"
                        />
                      </div>
  
                      <span className="text-lg text-neutral-700">
                        {item.label}
                      </span>
  
                      <span className="text-2xl font-light tracking-tight text-neutral-900 transition-all duration-300 group-hover:translate-x-1">
                        {item.value}
                      </span>
                    </div>
  
                    {index !== overviewItems(houseboat).length - 1 && (
                      <div className="h-px bg-gradient-to-r from-neutral-200 via-neutral-100 to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }