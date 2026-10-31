"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, navigationCTA } from "@/config/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#08090B]/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white"
        >
          DotDev<span className="text-[#2BFF88]">X</span>
          <span className="h-2 w-2 rounded-full bg-[#2BFF88]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/65 transition-colors hover:text-[#2BFF88]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href={navigationCTA.href}
          className="hidden items-center gap-2 rounded-full bg-[#2BFF88] px-5 py-3 text-sm font-semibold text-[#04120A] transition-colors hover:bg-[#52FF9D] md:inline-flex"
        >
          {navigationCTA.label}
          <ArrowUpRight size={16} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/[0.08] bg-[#08090B] px-4 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-[#2BFF88]"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={navigationCTA.href}
              onClick={() => setIsOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#2BFF88] px-5 py-3 font-semibold text-[#04120A] transition-colors hover:bg-[#52FF9D]"
            >
              {navigationCTA.label}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}