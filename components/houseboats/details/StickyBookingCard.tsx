import { ReactNode } from "react";

interface StickyBookingCardProps {
  children: ReactNode;
}

export default function StickyBookingCard({
  children,
}: StickyBookingCardProps) {
  return <div className="sticky top-24">{children}</div>;
}
