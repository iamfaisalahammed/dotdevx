"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topButton = (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-[#E5383B]/60 hover:text-[#E5383B]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );

  return (
    <footer className="border-t border-white/40 bg- text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-xs text-white/40 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            .Dev<span className="text-[#E5383B]">X</span>
          </Link>

          {/* শুধু মোবাইলে */}
          <div className="md:hidden">{topButton}</div>
        </div>

        <div className="flex items-center gap-3">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>

          {/* শুধু ডেস্কটপে */}
          <div className="hidden md:block">{topButton}</div>
        </div>

        <div className="flex gap-5">
          <Link
            href="/privacy-policy"
            className="inline-flex items-center gap-2 transition-colors hover:text-[#E5383B]"
          >
            <span className="h-1 w-1 rounded-full bg-[#E5383B]" />
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 transition-colors hover:text-[#E5383B]"
          >
            <span className="h-1 w-1 rounded-full bg-[#E5383B]" />
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}