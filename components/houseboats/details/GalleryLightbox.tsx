"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

// How far (px) or how fast (px/s) a drag has to go before it counts as a swipe.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

export default function GalleryLightbox({
  images,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-6 md:top-6"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* Arrows — desktop only. On a phone the image is swiped instead. */}
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous photo"
        className="absolute left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:flex"
      >
        <ChevronLeft size={26} strokeWidth={1.5} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="absolute right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:flex"
      >
        <ChevronRight size={26} strokeWidth={1.5} />
      </button>

      {/*
        key={selectedImage} remounts this on every change, so each photo fades
        in on its own. No AnimatePresence: an interrupted exit animation is what
        left the destinations carousel stuck on the previous slide.
      */}
      <motion.div
        key={selectedImage}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragMomentum={false}
        onDragEnd={(_event, info) => {
          const wentLeft =
            info.offset.x < -SWIPE_DISTANCE ||
            info.velocity.x < -SWIPE_VELOCITY;

          const wentRight =
            info.offset.x > SWIPE_DISTANCE ||
            info.velocity.x > SWIPE_VELOCITY;

          if (wentLeft) {
            onNext();
          } else if (wentRight) {
            onPrevious();
          }
        }}
        className="relative h-[75vh] w-full max-w-6xl cursor-grab active:cursor-grabbing md:h-[85vh] md:cursor-default"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          fill
          priority
          draggable={false}
          sizes="100vw"
          className="select-none object-contain"
        />
      </motion.div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-[12px] tracking-[0.15em] text-white backdrop-blur md:bottom-8">
        {selectedImage + 1} / {images.length}
      </div>
    </motion.div>
  );
}
