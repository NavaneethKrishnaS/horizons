"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const maxWidthClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  /*
    Portalled to <body>. The booking card sits inside a `sticky` wrapper, and
    position: sticky creates a stacking context — which trapped this modal
    below the fixed navbar no matter how high its z-index went.
  */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${maxWidthClasses[maxWidth]} overflow-hidden border border-neutral-200 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.15)]`}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 md:px-8 md:py-5">
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
                {title}
              </h2>

              <button
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 flex h-10 w-10 items-center justify-center text-neutral-900 transition-colors duration-300 hover:text-[#6B7341]"
              >
                <X size={19} strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-6 md:px-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
