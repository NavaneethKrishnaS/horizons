"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { navigation } from "./navigation";
import { menuContent } from "./menuContent";

type MenuKey = keyof typeof menuContent;

type Props = {
  menu: MenuKey;
};

export default function MegaMenu({ menu }: Props) {
  const content = menuContent[menu];

  const section = navigation.find((item) => item.label === menu);

  if (!section) return null;

  const featuredItems = section.items.slice(0, 5);

  const [activeItem, setActiveItem] = useState(featuredItems[0]);

  return (
    <div className="w-[88vw] max-w-[940px] overflow-hidden rounded-md bg-[#FCFBF8] shadow-[0_24px_80px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-[340px_1fr]">

        {/* LEFT */}
        <div className="flex flex-col justify-between p-8">

          <div>

            <h2 className="font-cormorant text-[38px] leading-none text-neutral-900">
              {content.title}
            </h2>

            <p className="mt-3 max-w-[260px] text-[14px] leading-6 text-neutral-600">
              {content.description}
            </p>

            <div className="mt-8">

              {featuredItems.map((item) => (
                <button
                  key={item.href}
                  onMouseEnter={() => setActiveItem(item)}
                  className="group flex w-full items-center justify-between border-b border-neutral-100 py-4 text-left transition-colors"
                >
                  <span className="text-[20px] font-medium text-neutral-900 transition-transform duration-300 group-hover:translate-x-1">
                    {item.label}
                  </span>

                  <span className="text-neutral-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-900">
                    →
                  </span>
                </button>
              ))}

            </div>

          </div>

          <button className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] text-neutral-900 transition-all hover:gap-3">
            Explore all destinations
            <span>→</span>
          </button>

        </div>

        {/* RIGHT */}
        <div className="relative h-[430px] overflow-hidden">

          <AnimatePresence mode="wait">

            <motion.div
              key={activeItem.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.label}
                fill
                priority
                sizes="600px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </motion.div>

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}