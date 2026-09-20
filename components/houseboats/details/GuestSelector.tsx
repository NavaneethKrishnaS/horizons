"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";

interface GuestSelectorProps {
  adults: number;
  children: number;
  infants: number;
  maxGuests: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setInfants: React.Dispatch<React.SetStateAction<number>>;
}

// Defined at module scope: re-creating it on every render remounted the
// rows and threw away focus.
function Counter({
  label,
  subtitle,
  value,
  onIncrement,
  onDecrement,
  disableMinus,
  disablePlus,
}: {
  label: string;
  subtitle: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disableMinus: boolean;
  disablePlus: boolean;
}) {
  // Bare glyphs rather than bordered buttons. The negative margin gives them a
  // finger-sized hit area without drawing anything extra on screen.
  const control =
    "-m-2 p-2 text-neutral-400 transition-colors duration-200 hover:text-[#6B7341] disabled:cursor-not-allowed disabled:text-neutral-200 disabled:hover:text-neutral-200";

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-[15px] leading-none text-neutral-900">{label}</p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={disableMinus}
          onClick={onDecrement}
          className={control}
        >
          <Minus size={16} strokeWidth={1.5} />
        </button>

        <span className="w-4 text-center text-[16px] font-light text-neutral-900 lining-nums tabular-nums">
          {value}
        </span>

        <button
          type="button"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={disablePlus}
          onClick={onIncrement}
          className={control}
        >
          <Plus size={16} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export default function GuestSelector({
  adults,
  children,
  infants,
  maxGuests,
  setAdults,
  setChildren,
  setInfants,
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + children;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    setTimeout(() => {
      const rect = containerRef.current!.getBoundingClientRect();

      const bottomOverflow = rect.bottom + 330 - window.innerHeight;

      if (bottomOverflow > 0) {
        window.scrollBy({
          top: bottomOverflow + 24,
          behavior: "smooth",
        });
      }
    }, 150);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border border-neutral-200 bg-white px-5 py-3.5 transition-colors duration-300 hover:border-neutral-400"
      >
        <div className="flex items-center gap-3">
          <Users size={17} className="text-neutral-600" />

          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Guests
            </p>

            <p className="mt-1 text-[15px] text-neutral-900 lining-nums">
              {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
              {infants > 0 && ` · ${infants} Infant${infants > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-neutral-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 border border-neutral-200 bg-white px-5 shadow-[0_24px_70px_rgba(0,0,0,0.10)]"
          >
            <div className="divide-y divide-neutral-100">
              <Counter
                label="Adults"
                subtitle="Ages 13+"
                value={adults}
                disableMinus={adults <= 1}
                disablePlus={totalGuests >= maxGuests}
                onIncrement={() => setAdults((v) => v + 1)}
                onDecrement={() => setAdults((v) => Math.max(1, v - 1))}
              />

              <Counter
                label="Children"
                subtitle="Ages 2–12"
                value={children}
                disableMinus={children <= 0}
                disablePlus={totalGuests >= maxGuests}
                onIncrement={() => setChildren((v) => v + 1)}
                onDecrement={() => setChildren((v) => Math.max(0, v - 1))}
              />

              <Counter
                label="Infants"
                subtitle="Under 2"
                value={infants}
                disableMinus={infants <= 0}
                disablePlus={false}
                onIncrement={() => setInfants((v) => v + 1)}
                onDecrement={() => setInfants((v) => Math.max(0, v - 1))}
              />
            </div>

            <p className="border-t border-neutral-100 py-3.5 text-[11px] text-neutral-400">
              Maximum {maxGuests} guests, infants not counted
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
