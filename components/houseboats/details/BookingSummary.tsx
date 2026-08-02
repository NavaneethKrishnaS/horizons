import { format } from "date-fns";

interface BookingSummaryProps {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  infants: number;
  nights: number;
}

export default function BookingSummary({
  checkIn,
  checkOut,
  adults,
  children,
  infants,
  nights,
}: BookingSummaryProps) {
  const totalGuests = adults + children;

  return (
    <div>
     

     <div className="py-1">
        <p className="text-base font-medium text-neutral-900">
          {format(checkIn, "dd MMM")} – {format(checkOut, "dd MMM")}
        </p>

        <p className="text-sm text-neutral-500">
          {totalGuests} Guest{totalGuests > 1 ? "s" : ""}
          {infants > 0 &&
            ` + ${infants} Infant${infants > 1 ? "s" : ""}`}{" "}
          • {nights} Night{nights > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}