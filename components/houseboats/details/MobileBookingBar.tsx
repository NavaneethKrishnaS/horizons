"use client";

import { useEffect, useState } from "react";

import { throttle } from "@/lib/throttle";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import BookingCard from "./BookingCard";

import { Houseboat } from "@/data/houseboat.types";

import { useScrollLock } from "@/lib/scrollLock";

interface MobileBookingBarProps {
  houseboat: Houseboat;
}

export default function MobileBookingBar({
  houseboat,
}: MobileBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  /*
    The bar stays out of the way until the hero has scrolled past, and stands
    down near the foot of the page so it never covers the footer.

    Both checks used to run straight out of the scroll event, and the footer
    one reads scrollHeight — which forces the browser to lay the page out
    there and then. Scroll events fire several times per frame, so on a long
    page of large photographs that was several full layouts per frame, which
    is what made scrolling stutter on a phone.

    Now it runs at most ten times a second, and the page height is measured
    only when it can actually have changed.
  */
  useEffect(() => {
    let pageHeight = document.documentElement.scrollHeight;

    const evaluate = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;
      const atFooter = window.scrollY + window.innerHeight > pageHeight - 260;

      setIsVisible(pastHero && !atFooter);
    };

    /*
      Throttled on the clock rather than on an animation frame: a
      background tab runs no animation frames at all, and a handler that
      silently stops working there is the kind of thing that leaves an
      overlay stranded. With a trailing call, so the last event of a
      gesture is never the one dropped.
    */
    const scroll = throttle(evaluate, 100);

    const onScroll = scroll.run;

    const onResize = () => {
      pageHeight = document.documentElement.scrollHeight;
      scroll.reset();
      onScroll();
    };

    evaluate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Images finishing their download change the page height; without this
    // the footer cut-off would be measured against the height at load.
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            pageHeight = document.documentElement.scrollHeight;

            // Re-decide against the new height. Without this the bar can sit
            // hidden because it was judged against the page as it stood
            // before the photographs loaded.
            scroll.reset();
            onScroll();
          });

    observer?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      scroll.cancel();
    };
  }, []);

  useScrollLock(isSheetOpen);

  useEffect(() => {
    if (!isSheetOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSheetOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
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
