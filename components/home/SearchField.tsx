import { LucideIcon } from "lucide-react";

type SearchFieldProps = {
  icon: LucideIcon;
  value: string;
  active: boolean;
  onHover: () => void;
};

export default function SearchField({
  icon: Icon,
  value,
  active,
  onHover,
}: SearchFieldProps) {
  return (
    <button
      onMouseEnter={onHover}
      className={`
        flex w-full items-center gap-2.5
        px-3 py-2
        transition-all duration-300
        ${
          active
            ? "bg-[#F1ECE4]"
            : "hover:bg-[#F5F1EA]"
        }
      `}
    >
      <Icon
        className={`
          h-4 w-4
          ${
            active
              ? "text-[#6B7341]"
              : "text-[#8B867A]"
          }
        `}
      />

      <span className="text-[15px] text-[#1F2937]">
        {value}
      </span>
    </button>
  );
}