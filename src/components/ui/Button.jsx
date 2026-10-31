import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-[#2BFF88] text-[#04120A] hover:bg-[#52FF9D]",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  outline:
    "border border-[#2BFF88] text-[#2BFF88] hover:bg-[#2BFF88]/10",
  ghost: "text-white hover:bg-white/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2BFF88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B] disabled:pointer-events-none disabled:opacity-50",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  if (href) {
    const isExternal = /^(https?:\/\/|mailto:|tel:|#)/i.test(href);
    const Component = isExternal ? "a" : Link;

    return (
      <Component href={href} className={classes} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}