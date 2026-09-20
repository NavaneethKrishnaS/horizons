"use client";

import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { startOfDay } from "date-fns";

import "react-day-picker/dist/style.css";
import "@/app/daypicker.css";

interface BookingCalendarProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

export default function BookingCalendar({
  selected,
  onSelect,
}: BookingCalendarProps) {
  // Two months side by side does not fit a phone. Start at one and step up
  // once we know the viewport — the calendar only ever renders after a tap,
  // so there is no server/client mismatch to worry about.
  const [months, setMonths] = useState(1);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");

    const update = () => setMonths(query.matches ? 2 : 1);

    update();

    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="flex justify-center">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        numberOfMonths={months}
        pagedNavigation
        showOutsideDays={false}
        disabled={{
          before: startOfDay(new Date()),
        }}
        modifiersClassNames={{
          today: "rdp-day-today",
        }}
      />
    </div>
  );
}
