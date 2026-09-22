"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import GalleryLightbox from "./GalleryLightbox";

import { Houseboat } from "@/data/houseboat.types";

import { useScrollLock } from "@/lib/scrollLock";

interface HouseboatGalleryProps {
  houseboat: Houseboat;
}

export default function HouseboatGallery({
  houseboat,
}: HouseboatGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const total = houseboat.gallery.length;

  /*
    Both steps move from whatever is current at the moment of the press
    rather than from what was current when the handler was made. That
    keeps the arrow keys bound once while the lightbox is open, instead
    of being torn down and re-bound on every photograph.
  */
  const showPrevious = useCallback(() => {
    setSelectedImage((current) =>
      current === null ? current : current === 0 ? total - 1 : current - 1
    );
  }, [total]);

  const showNext = useCallback(() => {
    setSelectedImage((current) =>
      current === null ? current : current === total - 1 ? 0 : current + 1
    );
  }, [total]);

  const isOpen = selectedImage !== null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setSelectedImage(null);
          break;

        case "ArrowLeft":
          showPrevious();
          break;

        case "ArrowRight":
          showNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showNext, showPrevious]);

  useScrollLock(selectedImage !== null);

  if (houseboat.gallery.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="bg-white py-14 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 md:text-sm md:tracking-[0.35em]">
            Gallery
          </p>

          <h2 className="mt-3 font-cormorant text-[30px] font-light leading-[1.1] text-neutral-900 sm:text-4xl md:mt-4 md:text-5xl">
            Experience the Backwaters
          </h2>
        </div>

        <div className="grid gap-3 md:gap-5 lg:grid-cols-[2fr_1fr]">
          {/* Main Image */}
          <motion.button
            type="button"
            onClick={() => setSelectedImage(0)}
            className="relative aspect-[16/10] overflow-hidden text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
          >
            <Image
              src={houseboat.gallery[0].src}
              alt={houseboat.gallery[0].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition duration-700 hover:scale-105"
            />
          </motion.button>

          {/* Right Column */}
          <div className="grid gap-3 md:gap-5">
            {houseboat.gallery.slice(1, 3).map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index + 1)}
                className="relative aspect-[4/3] overflow-hidden text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: (index + 1) * 0.08,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {houseboat.gallery.length > 3 && (
          <>
            {/*
              Desktop shows every photo in the grid.
              Mobile hides them and offers the button below, which opens the
              lightbox instead of adding four more full-width images to scroll past.
            */}
            <div className="hidden md:mt-5 md:grid md:grid-cols-2 md:gap-5">
              {houseboat.gallery.slice(3).map((image, index) => (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(index + 3)}
                  className="relative aspect-[16/10] overflow-hidden text-left"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: (index + 3) * 0.08,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedImage(0)}
              className="group mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-neutral-900 transition-colors duration-300 hover:text-[#6B7341] md:hidden"
            >
              View all {houseboat.gallery.length} photos
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </>
        )}
      </div>

      {/*
        Portalled to <body>. This section animates in, and a transformed
        ancestor becomes its own stacking context — which left the lightbox
        trapped underneath the fixed mobile booking bar.
      */}
      {selectedImage !== null &&
        createPortal(
          <GalleryLightbox
            images={houseboat.gallery}
            selectedImage={selectedImage}
            onClose={() => setSelectedImage(null)}
            onPrevious={showPrevious}
            onNext={showNext}
          />,
          document.body
        )}
    </motion.section>
  );
}