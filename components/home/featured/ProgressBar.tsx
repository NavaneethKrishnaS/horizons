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
  
        <div className="relative h-px w-44 overflow-hidden bg-[#D8D1C7]">
          {/*
            Scaled rather than widened. Width is layout and transition-all
            animates it frame by frame; a transform is handed to the
            compositor and costs the main thread nothing.
          */}
          <div
            className="absolute left-0 top-0 h-full w-full origin-left bg-[#1F2937] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>
  
        <span className="text-xs tracking-[0.35em] text-[#7C7468]">
          {String(total).padStart(2, "0")}
        </span>
      </div>
    );
  }