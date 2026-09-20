"use client";

import { useState } from "react";

import { destinations } from "./destinations";
import DestinationImages from "./DestinationImages";
import DestinationContent from "./DestinationContent";
import ProgressBar from "./ProgressBar";

export default function DestinationViewer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = destinations[activeIndex];

  return (
    <div className="mt-12 md:mt-20">
      <div className="mb-8 flex justify-end md:mb-12">
        <ProgressBar
          current={activeIndex}
          total={destinations.length}
        />
      </div>

      <DestinationImages
        destinations={destinations}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />

      <DestinationContent
        label={current.label}
        title={current.title}
        description={current.description}
      />
    </div>
  );
}