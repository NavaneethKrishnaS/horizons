interface PriceBreakdownProps {
    nightlyRate: number;
    nights: number;
  }
  
  export default function PriceBreakdown({
    nightlyRate,
    nights,
  }: PriceBreakdownProps) {
    const subtotal = nightlyRate * nights;
  
    return (
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-500">
          Price Summary
        </p>
  
        <div className="mt-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-neutral-600">
              ₹{nightlyRate.toLocaleString()} × {nights}{" "}
              Night{nights > 1 ? "s" : ""}
            </span>
  
            <span className="text-[15px] font-medium text-neutral-900">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>
  
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-neutral-600">
              Taxes & Fees
            </span>
  
            <span className="text-[15px] text-neutral-900">
              Included
            </span>
          </div>
        </div>
  
        <div className="my-6 h-px bg-neutral-200" />
  
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-neutral-900">
            Total
          </span>
  
          <span className="text-3xl font-light tracking-tight text-neutral-900">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }