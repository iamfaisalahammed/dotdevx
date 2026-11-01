import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#E5383B]/40 bg-[#08090B] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-xs text-white/40 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          .Dev<span className="text-[#E5383B]">X</span>
        </Link>

        <p>© 2026 {siteConfig.name}. All rights reserved.</p>

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