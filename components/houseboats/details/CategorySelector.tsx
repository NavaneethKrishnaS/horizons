"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Gem } from "lucide-react";

import { HouseboatCategoryOption } from "@/data/houseboat.types";

interface CategorySelectorProps {
  categories: HouseboatCategoryOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CategorySelector({
  categories,
  selectedId,
  onSelect,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selected =
    categories.find((category) => category.id === selectedId) ?? categories[0];

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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between border border-neutral-200 bg-white px-5 py-3.5 transition-colors duration-300 hover:border-neutral-400"
      >
        <span className="flex items-center gap-3">
          <Gem size={17} strokeWidth={1.75} className="text-neutral-600" />

          <span className="text-left">
            <span className="block text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              Category
            </span>

            <span className="mt-1 block text-[15px] text-neutral-900 lining-nums">
              {selected.name} · ₹{selected.price.toLocaleString()}
            </span>
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <ChevronDown size={18} strokeWidth={1.5} className="text-neutral-600" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            {categories.map((category) => {
              const isSelected = category.id === selected.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    onSelect(category.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors duration-200 ${
                    isSelected ? "bg-[#F2F4EC]" : "hover:bg-neutral-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Check
                      size={14}
                      strokeWidth={2}
                      aria-hidden
                      className={`text-[#6B7341] ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <span className="text-[15px] text-neutral-900">
                      {category.name}
                    </span>
                  </span>

                  <span className="text-[14px] text-neutral-600 lining-nums tabular-nums">
                    ₹{category.price.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
