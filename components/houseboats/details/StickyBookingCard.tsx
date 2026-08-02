"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface StickyBookingCardProps {
  children: ReactNode;
}

export default function StickyBookingCard({
  children,
}: StickyBookingCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [maxHeight, setMaxHeight] = useState<number>();

  useEffect(() => {
    const update = () => {
      setMaxHeight(window.innerHeight - 96);
    };

    update();

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="sticky top-24"
    >
      {children}
    </div>
  );
}