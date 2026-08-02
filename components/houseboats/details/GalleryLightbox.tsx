"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  selectedImage: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  images,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close */}
        <motion.button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={22} />
        </motion.button>

        {/* Previous */}
        <motion.button
          type="button"
          onClick={onPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={30} />
        </motion.button>

        {/* Next */}
        <motion.button
          type="button"
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={30} />
        </motion.button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            className="relative h-[85vh] w-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              priority
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <motion.div
          className="absolute bottom-8 rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
        >
          {selectedImage + 1} / {images.length}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}