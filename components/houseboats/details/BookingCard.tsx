"use client";

import { useMemo, useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";

import CategorySelector from "./CategorySelector";
import GuestSelector from "./GuestSelector";
import DateSelector from "./DateSelector";
import InquiryModal from "./InquiryModal";

import { Houseboat } from "@/data/houseboat.types";

interface BookingCardProps {
  houseboat: Houseboat;
  // Inside the mobile sheet the panel already has its own frame, so the card
  // drops its border and padding rather than drawing a box inside a box.
  bare?: boolean;
}

export default function BookingCard({
  houseboat,
  bare = false,
}: BookingCardProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>();

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

    return differenceInCalendarDays(selectedDates.to, selectedDates.from);
  }, [selectedDates]);

  return (
    <>
      <div
        id="booking-card"
        className={bare ? "" : "border border-neutral-200 bg-white p-7 md:p-8"}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          Starting From
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[38px] font-light leading-none tracking-tight text-neutral-900 lining-nums tabular-nums">
            ₹{selectedCategory.price.toLocaleString()}
          </span>

          <span className="text-[13px] text-neutral-500">/ night</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[13px] text-neutral-600">
          <ShieldCheck
            size={14}
            strokeWidth={1.75}
            className="shrink-0 text-[#6B7341]"
          />
          Free cancellation up to 7 days
        </div>

        <div className="mt-7 space-y-3">
          <DateSelector selected={selectedDates} onSelect={setSelectedDates} />

          <CategorySelector
            categories={houseboat.categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />

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

        {/* Only appears once there are dates, so the card stays quiet until then. */}
        {nights > 0 && (
          <div className="mt-7 border-t border-neutral-200 pt-6">
            <div className="flex items-baseline justify-between text-[14px] text-neutral-600">
              <span className="lining-nums">
                ₹{selectedCategory.price.toLocaleString()} × {nights} Night
                {nights === 1 ? "" : "s"}
              </span>

              <span className="lining-nums tabular-nums text-neutral-900">
                ₹{(selectedCategory.price * nights).toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between text-[14px] text-neutral-600">
              <span>Taxes &amp; fees</span>
              <span className="text-neutral-900">Included</span>
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-5">
              <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Total
              </span>

              <span className="text-[24px] font-light leading-none text-neutral-900 lining-nums tabular-nums">
                ₹{(selectedCategory.price * nights).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={nights === 0}
          onClick={() => setIsInquiryOpen(true)}
          className={`mt-7 w-full px-6 py-4 text-[12px] uppercase tracking-[0.25em] transition-colors duration-300 ${
            nights > 0
              ? "bg-neutral-900 text-white hover:bg-black"
              : "cursor-not-allowed bg-neutral-100 text-neutral-400"
          }`}
        >
          Check Availability
        </button>

        {nights === 0 && (
          <p className="mt-3 text-center text-[12px] text-neutral-500">
            Select your dates to continue
          </p>
        )}

        <div className="mt-7 border-t border-neutral-200 pt-6 text-center">
          <a
            href="tel:+919495050352"
            className="inline-flex items-center gap-2 text-[14px] text-neutral-700 transition-colors duration-300 hover:text-[#6B7341]"
          >
            <Phone size={15} strokeWidth={1.75} />
            <span className="lining-nums">+91 94950 50352</span>
          </a>

          <p className="mt-4 text-[13px] leading-6 text-neutral-500">
            Need a custom itinerary?{" "}
            <a
              href="mailto:scenicescapesindia@gmail.com"
              className="border-b border-neutral-300 pb-0.5 text-neutral-900 transition-colors duration-300 hover:border-[#6B7341] hover:text-[#6B7341]"
            >
              Email our concierge
            </a>
          </p>
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
