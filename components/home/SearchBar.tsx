"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";

import SearchField from "./SearchField";
import SearchButton from "./SearchButton";

const fields = [
  {
    icon: MapPin,
    value: "Kerala",
  },
  {
    icon: CalendarDays,
    value: "15 Jul – 18 Jul",
  },
  {
    icon: Users,
    value: "2 Adults",
  },
];

export default function SearchBar() {
  const [active, setActive] = useState(0);

  return (
    <div className="absolute bottom-10 left-1/2 z-20 w-[70%] max-w-3xl -translate-x-1/2">
      <div
        className="
          flex items-center
          rounded-[12px]
          bg-[#F7F4EE]
          px-2
          py-1.5
          shadow-[0_8px_24px_rgba(0,0,0,.06)]
        "
      >
        {fields.map((field, index) => (
          <div
            key={field.value}
            className="flex flex-1 items-center"
          >
            <div className="flex-1">
              <SearchField
                icon={field.icon}
                value={field.value}
                active={active === index}
                onHover={() => setActive(index)}
              />
            </div>

            {index !== fields.length - 1 && (
              <div className="h-6 w-px bg-[#E5DFD4]" />
            )}
          </div>
        ))}

        <div className="ml-2 pr-2">
          <SearchButton />
        </div>
      </div>
    </div>
  );
}