type Props = {
    current: number;
    total: number;
  };
  
  export default function ProgressBar({
    current,
    total,
  }: Props) {
    const progress = ((current + 1) / total) * 100;
  
    return (
      <div className="flex items-center gap-5">
        <span className="text-xs tracking-[0.35em] text-[#7C7468]">
          {String(current + 1).padStart(2, "0")}
        </span>
  
        <div className="relative h-px w-44 bg-[#D8D1C7] overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#1F2937] transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
  
        <span className="text-xs tracking-[0.35em] text-[#7C7468]">
          {String(total).padStart(2, "0")}
        </span>
      </div>
    );
  }