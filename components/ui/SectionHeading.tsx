type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    description?: string;
  };
  
  export default function SectionHeading({
    eyebrow,
    title,
    description,
  }: SectionHeadingProps) {
    return (
      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#7C7468]">
          {eyebrow}
        </p>
  
        <h2 className="mt-5 whitespace-pre-line font-[family:var(--font-cormorant)] text-[64px] leading-[0.95] tracking-[-0.04em] text-[#1F2937]">
          {title}
        </h2>
  
        {description && (
          <p className="mt-6 max-w-xl text-[18px] leading-8 text-[#66645F]">
            {description}
          </p>
        )}
      </div>
    );
  }