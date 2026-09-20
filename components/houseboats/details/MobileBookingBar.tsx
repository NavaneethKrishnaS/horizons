"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import BookingCard from "./BookingCard";

import { Houseboat } from "@/data/houseboat.types";

interface MobileBookingBarProps {
  houseboat: Houseboat;
}

export default function MobileBookingBar({
  houseboat,
}: MobileBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // The bar stays out of the way until the hero has scrolled past, so the
  // first thing a visitor sees is still the photograph.
  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;

      // Stand down near the foot of the page so the bar never covers the
      // footer.
      const atFooter =
        window.scrollY + window.innerHeight >
        document.documentElement.scrollHeight - 260;

      setIsVisible(pastHero && !atFooter);
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!isSheetOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSheetOpen(false);
      }
    };

    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSheetOpen]);

  // Close the sheet if the viewport grows past lg, where the sticky card takes
  // over — otherwise the scroll lock would be left on with nothing visible.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSheetOpen(false);
      }
    };

    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, []);

  const startingPrice =
    houseboat.categories.find(
      (category) => category.name === houseboat.defaultCategory
    )?.price ?? houseboat.categories[0].price;

  return (
    <>
      <AnimatePresence>
        {isVisible && !isSheetOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
          >
            <div className="flex items-center justify-between gap-4 px-6 py-3.5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  From
                </p>

                <p className="mt-1 text-[20px] font-light leading-none text-neutral-900 lining-nums tabular-nums">
                  ₹{startingPrice.toLocaleString()}
                  <span className="ml-1.5 text-[12px] text-neutral-500">
                    / night
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSheetOpen(true)}
                className="shrink-0 bg-neutral-900 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white transition-colors duration-300 active:bg-black"
              >
                Check Availability
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 z-[900] bg-black/50 lg:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[901] max-h-[90vh] overflow-y-auto overscroll-contain bg-white lg:hidden"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                  Reserve
                </p>

                <button
                  type="button"
                  onClick={() => setIsSheetOpen(false)}
                  aria-label="Close"
                  className="-mr-2 flex h-10 w-10 items-center justify-center text-neutral-900"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6">
                <BookingCard houseboat={houseboat} bare />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
