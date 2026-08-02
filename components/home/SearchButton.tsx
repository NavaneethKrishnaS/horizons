export default function SearchButton() {
    return (
      <button
        className="
          flex items-center gap-2
          bg-[#1F2937]
          px-6 py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-[#111827]
        "
      >
        Search
        <span>→</span>
      </button>
    );
  }