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
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold tracking-tight text-white"
          aria-label=".DevX Home"
        >
          <span className="text-[#4F83FF]">.</span>DevX
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
                    : "text-[#A7B0AC] hover:text-[#75A0FF]"
                }`}
              >
                {item.name}

                {/* Active পেজের নিচের নীল দাগ (এক মেনু থেকে অন্যটায় সরে যায়) */}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-x-0 -bottom-1.5 h-px bg-[#4F83FF]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          href={navigationCTA.href}
          className="hidden items-center gap-2 rounded-full bg-[#4F83FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4F83FF]/20 transition-all hover:bg-[#75A0FF] hover:shadow-[#75A0FF]/30 md:inline-flex"
        >
          {navigationCTA.label}
          <ArrowUpRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#4F83FF]/40 hover:text-[#4F83FF] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
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
                        : "text-[#A7B0AC] hover:text-[#75A0FF]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                href={navigationCTA.href}
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#4F83FF] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#75A0FF]"
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