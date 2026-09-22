"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { DateRange } from "react-day-picker";
import {
  differenceInCalendarDays,
  format,
} from "date-fns";

import BookingCalendar from "./BookingCalendar";
import Modal from "@/components/ui/Modal";

interface DateSelectorProps {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
}

export default function DateSelector({
  selected,
  onSelect,
}: DateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      openedRef.current = true;
    }
  }, [isOpen]);

  /*
    Only a real range gets a label. Clicking one day twice leaves from and
    to on the same date, and the old version happily printed "0 Night"
    before the second date had been chosen.
  */
  const nights =
    selected?.from && selected?.to
      ? differenceInCalendarDays(selected.to, selected.from)
      : 0;

  const label =
    selected?.from && selected?.to && nights > 0
      ? `${format(selected.from, "dd MMM")} – ${format(
          selected.to,
          "dd MMM"
        )} • ${nights} Night${nights > 1 ? "s" : ""}`
      : "Select your dates";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between border border-neutral-200 bg-white px-5 py-3.5 transition-colors duration-300 hover:border-neutral-400"
      >
        <div className="flex items-center gap-3">
          <CalendarDays
            size={18}
            className="text-neutral-600"
          />

          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Dates
            </p>

            <p className="mt-1 text-[15px] text-neutral-900 lining-nums">
              {label}
            </p>
          </div>
        </div>

        <motion.div whileTap={{ scale: 0.9 }}>
          <ChevronDown
            size={18}
            className="text-neutral-600"
          />
        </motion.div>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose your dates"
        maxWidth="lg"
      >
        <BookingCalendar
          selected={selected}
          onSelect={(range) => {
            onSelect(range);

            if (
              range?.from &&
              range?.to &&
              range.from.getTime() !==
                range.to.getTime()
            ) {
              setTimeout(() => {
                setIsOpen(false);
              }, 150);
            }
          }}
        />
      </Modal>
    </>
  );
}