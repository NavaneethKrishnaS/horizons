"use client";

import { useState } from "react";

import { destinations } from "./destinations";
import DestinationImages from "./DestinationImages";
import DestinationContent from "./DestinationContent";
import ProgressBar from "./ProgressBar";

export default function DestinationViewer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = destinations[activeIndex];
  const next = destinations[(activeIndex + 1) % destinations.length];

  function handleNext() {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  }

  return (
    <div className="mt-20">
      <div className="mb-12 flex justify-end">
        <ProgressBar
          current={activeIndex}
          total={destinations.length}
        />
      </div>

      <DestinationImages
        current={current}
        next={next}
        onNext={handleNext}
      />

      <DestinationContent
        label={current.label}
        title={current.title}
        description={current.description}
      />
    </div>
  );
}