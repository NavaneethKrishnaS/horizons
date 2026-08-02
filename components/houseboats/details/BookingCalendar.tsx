"use client";

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
  return (
    <div className="flex justify-center">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        numberOfMonths={2}
        pagedNavigation
        showOutsideDays={false}
        disabled={{
          before: startOfDay(new Date()),
        }}
        modifiersClassNames={{
          today: "rdp-day-today",
        }}
        className="text-[15px]"
      />
    </div>
  );
}