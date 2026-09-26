"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useScrollLock } from "@/lib/scrollLock";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

// Mirrors the desktop navigation.
const items = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Houseboats", href: "/houseboats" },
  { label: "Stays", href: "/stays" },
  { label: "Packages", href: "/packages" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  // Shared, counted lock — see lib/scrollLock.
  useScrollLock(open);

  // Close if the viewport grows past the breakpoint where the bar shows
  // its own links. Without this the overlay is hidden by `lg:hidden`
  // while its scroll lock stays on, which leaves the desktop page unable
  // to scroll. The number here has to match that breakpoint.
  useEffect(() => {
    if (!open) return;

    const query = window.matchMedia("(min-width: 1024px)");

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) onClose();
    }

    if (query.matches) onClose();
    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, [open, onClose]);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-0 z-40 overflow-y-auto bg-[#111111] lg:hidden"
        >
          <div className="min-h-full px-6 pb-12 pt-32">
            <ul>
              {items.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: reduceMotion ? 0 : 0.06 + index * 0.045,
                    ease: "easeOut",
                  }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 font-cormorant text-3xl text-white/85 transition-colors hover:text-white sm:text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: reduceMotion ? 0 : 0.34,
                ease: "easeOut",
              }}
              className="mt-12"
            >
              <Link
                href="/houseboats"
                onClick={onClose}
                className="flex items-center justify-between text-[13px] uppercase tracking-[0.25em] text-white"
              >
                <span>Check Availability</span>
                <span aria-hidden>&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
