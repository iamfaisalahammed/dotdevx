"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, navigationCTA } from "@/config/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // এই লিংকটা এখন খোলা পেজের কি না তা যাচাই করে
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // স্ক্রল করলে Navbar-এর স্টাইল বদলাবে
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc চাপলে মোবাইল মেনু বন্ধ হবে
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? "border-[#4F83FF]/20 bg-[#08090B]/95"
          : "border-white/[0.08] bg-[#08090B]/80"
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo — ডট ও X লাল, X একটু বড় */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-baseline text-3xl font-bold tracking-tight text-white"
          aria-label=".DevX Home"
        >
          <span className="text-[#E5252A]">.</span>
          Dev
          <span className="text-[1.25em] font-extrabold leading-none text-[#E5252A]">
            X
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-[#A7B0AC] hover:text-[#E5252A]"
                }`}
              >
                {item.name}

                {/* Active পেজের নিচের নীল দাগ (এক মেনু থেকে অন্যটায় সরে যায়) */}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-x-0 -bottom-1.5 h-px bg-[#E5252A]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA — লাল বর্ডার, hover করলে লাল ভরাট */}
        <Link
          href={navigationCTA.href}
          className="hidden items-center gap-2 rounded-full border border-[#E5252A] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#E5252A] hover:shadow-lg hover:shadow-[#E5252A]/25 md:inline-flex"
        >
          {navigationCTA.label}
          <ArrowUpRight size={16} />
        </Link>

       
{/* Mobile Menu Button */}
<button
  type="button"
  onClick={() => setIsOpen((prev) => !prev)}
  className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-300 hover:text-[#E5252A] md:hidden"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
  aria-controls="mobile-navigation"
>
  <AnimatePresence mode="wait" initial={false}>
    {isOpen ? (
      <motion.span
        key="close"
        initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <X size={26} strokeWidth={1.7} />
      </motion.span>
    ) : (
      <motion.span
        key="menu"
        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <Menu size={26} strokeWidth={1.7} />
      </motion.span>
    )}
  </AnimatePresence>
</button>

      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-white/[0.08] bg-[#08090B] px-4 py-5 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 ${
                      active
                        ? "bg-[#4F83FF]/10 text-white"
                        : "text-[#A7B0AC] hover:text-[#E5252A]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile CTA — লাল বর্ডার */}
              <Link
                href={navigationCTA.href}
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#E5252A] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#E5252A]"
              >
                {navigationCTA.label}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}