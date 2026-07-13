type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
  };
  
  export default function Button({
    children,
    variant = "primary",
    className = "",
  }: ButtonProps) {
    const base =
      "inline-flex items-center justify-center rounded-full px-8 py-4 font-medium transition-all duration-300";
  
    const styles = {
      primary:
        "bg-[#6B7341] text-white hover:bg-[#556032] shadow-lg hover:scale-105",
  
      secondary:
        "border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
    };
  
    return (
      <button className={`${base} ${styles[variant]} ${className}`}>
        {children}
      </button>
    );
  }