import { cn } from "@/lib/utils";

const variants = {
  primary: "border-[#2BFF88]/20 bg-[#2BFF88]/10 text-[#2BFF88]",
  secondary: "border-white/10 bg-white/5 text-white/70",
  success: "border-green-500/20 bg-green-500/10 text-green-400",
};

export default function Badge({
  children,
  variant = "primary",
  className = "",
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant] || variants.primary,
        className
      )}
    >
      {children}
    </span>
  );
}