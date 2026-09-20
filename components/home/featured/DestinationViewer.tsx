"use client";

import { useState } from "react";

import { destinations } from "./destinations";
import DestinationImages from "./DestinationImages";
import DestinationContent from "./DestinationContent";

export default function DestinationViewer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = destinations[activeIndex];

  return (
    <div className="mt-12 md:mt-20">
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