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

  const Counter = ({
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
  }) => (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p className="font-medium text-neutral-900">{label}</p>
        <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disableMinus}
          onClick={onDecrement}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center text-base font-semibold text-neutral-900">
          {value}
        </span>

        <button
          type="button"
          disabled={disablePlus}
          onClick={onIncrement}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-3xl border border-neutral-200 bg-white px-6 py-3 transition-all duration-300 hover:border-neutral-400"
      >
        <div className="flex items-center gap-3">
        <Users size={17} className="text-neutral-600" />

          <div className="text-left">
            <p className="text-sm text-neutral-500">Guests</p>

            <p className="font-medium text-neutral-900">
              {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
              {infants > 0 &&
                ` · ${infants} Infant${infants > 1 ? "s" : ""}`}
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
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-3xl border border-neutral-200 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
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

            <div className="mt-2 border-t border-neutral-200 pt-2">
              <p className="text-sm text-neutral-500">
                Maximum {maxGuests} guests (excluding infants)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}