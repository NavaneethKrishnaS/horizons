"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import GalleryLightbox from "./GalleryLightbox";

import { Houseboat } from "@/data/houseboat.types";

interface HouseboatGalleryProps {
  houseboat: Houseboat;
}

export default function HouseboatGallery({
  houseboat,
}: HouseboatGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const showPrevious = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === 0
        ? houseboat.gallery.length - 1
        : selectedImage - 1
    );
  };

  const showNext = () => {
    if (selectedImage === null) return;

    setSelectedImage(
      selectedImage === houseboat.gallery.length - 1
        ? 0
        : selectedImage + 1
    );
  };

  useEffect(() => {
    if (selectedImage === null) return;

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

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  if (houseboat.gallery.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="bg-white py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
            Gallery
          </p>

          <h2 className="mt-4 text-5xl font-light text-neutral-900">
            Experience the Backwaters
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          {/* Main Image */}
          <motion.button
            type="button"
            onClick={() => setSelectedImage(0)}
            className="relative aspect-[16/10] overflow-hidden rounded-[32px] text-left"
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
              className="object-cover transition duration-700 hover:scale-105"
            />
          </motion.button>

          {/* Right Column */}
          <div className="grid gap-5">
            {houseboat.gallery.slice(1, 3).map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index + 1)}
                className="relative aspect-[4/3] overflow-hidden rounded-[32px] text-left"
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
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        </div>

        {houseboat.gallery.length > 3 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {houseboat.gallery.slice(3).map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index + 3)}
                className="relative aspect-[16/10] overflow-hidden rounded-[32px] text-left"
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
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {selectedImage !== null && (
        <GalleryLightbox
          images={houseboat.gallery}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </motion.section>
  );
}