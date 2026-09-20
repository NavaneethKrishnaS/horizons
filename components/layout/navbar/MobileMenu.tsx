"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

// Mirrors the desktop navigation. Items whose pages do not exist yet
// point at "#", exactly as they do on desktop.
const items = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#" },
  { label: "Houseboats", href: "/houseboats" },
  { label: "Stays", href: "#" },
  { label: "Packages", href: "#" },
  { label: "Journal", href: "#" },
  { label: "About", href: "/about" },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  // Lock page scrolling while the overlay is open. The scrolling element
  // is <html>, so the lock goes there rather than on <body>.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  // Close if the viewport grows past the mobile breakpoint. Without this
  // the overlay is hidden by `md:hidden` while its scroll lock stays on,
  // which leaves the desktop page unable to scroll.
  useEffect(() => {
    if (!open) return;

    const query = window.matchMedia("(min-width: 768px)");

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
          className="fixed inset-0 z-40 overflow-y-auto bg-[#111111] md:hidden"
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
