"use client";

import { useMemo, useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";

import GuestSelector from "./GuestSelector";
import DateSelector from "./DateSelector";
import InquiryModal from "./InquiryModal";

import { Houseboat } from "@/data/houseboat.types";

interface BookingCardProps {
  houseboat: Houseboat;
}

export default function BookingCard({
  houseboat,
}: BookingCardProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [selectedDates, setSelectedDates] = useState<
    DateRange | undefined
  >();

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    houseboat.defaultCategory.toLowerCase()
  );
  
  const selectedCategory =
    houseboat.categories.find(
      (category) => category.id === selectedCategoryId
    ) ?? houseboat.categories[0];

  const nights = useMemo(() => {
    if (!selectedDates?.from || !selectedDates?.to) {
      return 0;
    }

    return differenceInCalendarDays(
      selectedDates.to,
      selectedDates.from
    );
  }, [selectedDates]);

  return (
    <>
      <div
        id="booking-card"
        className="rounded-[36px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
          Starting From
        </p>

        <div className="mt-4 flex items-end gap-2">
          <h2 className="text-5xl font-light tracking-tight text-neutral-900">
            ₹{selectedCategory.price.toLocaleString()}
          </h2>

          <span className="mb-2 text-base text-neutral-500">
            / night
          </span>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm text-neutral-700">
          <ShieldCheck size={16} />
          Free cancellation up to 7 days
        </div>

        <div className="my-4 h-px bg-neutral-200" />

        <div className="space-y-4">
  <DateSelector
    selected={selectedDates}
    onSelect={setSelectedDates}
  />

<div className="rounded-[28px] border border-neutral-200 px-6 py-3">
    <label className="block text-sm text-neutral-500">
      Category
    </label>

    <select
  value={selectedCategoryId}
  onChange={(e) => setSelectedCategoryId(e.target.value)}
  className="mt-1 w-full bg-transparent text-base font-medium text-neutral-900 outline-none"
>
      {houseboat.categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name} — ₹{category.price.toLocaleString()}/night
        </option>
      ))}
    </select>
  </div>

  <GuestSelector
    adults={adults}
    children={children}
    infants={infants}
    maxGuests={houseboat.maxGuests}
    setAdults={setAdults}
    setChildren={setChildren}
    setInfants={setInfants}
  />
</div>
        <div className="mt-5 space-y-2">
          <button
            disabled={nights === 0}
            onClick={() => setIsInquiryOpen(true)}
            className={`w-full rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 ${
              nights > 0
                ? "bg-neutral-900 text-white hover:bg-black"
                : "cursor-not-allowed bg-neutral-200 text-neutral-500"
            }`}
          >
            Check Availability
          </button>

          <a
            href="tel:+919495050352"
            className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-medium text-neutral-600 transition-all hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Phone size={18} />
            Call +91 94950 50352
          </a>

          <div className="pt-2 text-center">
            <p className="text-sm text-neutral-500">
              Need a custom itinerary?
            </p>

            <a
              href="mailto:scenicescapesindia@gmail.com"
              className="mt-2 inline-block text-base font-medium text-neutral-900 transition-colors hover:text-neutral-600"
            >
              Email our concierge →
            </a>

            <p className="mt-1 text-sm text-neutral-500">
              scenicescapesindia@gmail.com
            </p>
          </div>
        </div>
      </div>

      {selectedDates?.from && selectedDates?.to && (
        <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        houseboatName={houseboat.name}
        checkIn={selectedDates.from}
        checkOut={selectedDates.to}
        adults={adults}
        children={children}
        infants={infants}
        nights={nights}
        selectedCategory={selectedCategory.name}
        totalPrice={selectedCategory.price * nights}
      />
      )}
    </>
  );
}