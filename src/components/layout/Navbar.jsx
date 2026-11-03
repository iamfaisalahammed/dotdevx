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
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Scroll background and progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop > 12);

      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close mobile menu with Escape
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
          ? "border-white/[0.12] bg-[#08090B]/95"
          : "border-white/[0.08] bg-[#08090B]/80"
      }`}
    >
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-baseline text-3xl font-bold tracking-tight text-white"
          aria-label=".DevX Home"
        >
          <span className="text-white">.</span>
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
                  active ? "text-white" : "text-[#A7B0AC] hover:text-white"
                }`}
              >
                {item.name}

                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-x-0 -bottom-1.5 h-px bg-[#E5252A]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="group relative hidden items-center gap-3 overflow-hidden rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-10px_var(--accent)] ring-1 ring-white/15 transition-all duration-300 hover:shadow-[0_12px_40px_-8px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:inline-flex"
        >
          <span>{navigationCTA.label}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5252A] text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-300 hover:text-white/70 md:hidden"
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

      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full bg-[#E5252A] transition-[width] duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5 ${
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-[#A7B0AC] hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        active ? "bg-[#E5252A]" : "bg-transparent"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
