import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Globe2,
  Layers3,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#08090B] text-white">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#2BFF88]/[0.07] blur-[120px]"
      />

      <Container className="grid min-h-[720px] items-center gap-16 py-24 lg:grid-cols-2 lg:gap-12 lg:py-28">
        {/* Hero Content */}
        <div className="max-w-2xl">
          <Badge>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#2BFF88]" />
            Web Development Agency
          </Badge>

          <h1 className="mt-8 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Websites that make businesses look{" "}
            <span className="text-[#2BFF88]">
              world-class.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            We design and develop modern, high-performance websites
            that help businesses build trust, reach more customers,
            and grow online.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Start a Project
              <ArrowUpRight size={18} />
            </Button>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition-colors hover:border-[#2BFF88]/50 hover:text-[#2BFF88]"
            >
              Explore Our Work
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Supporting Text */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-sm text-white/45">
            <span>Business Websites</span>
            <span className="h-1 w-1 rounded-full bg-[#2BFF88]" />
            <span>E-commerce</span>
            <span className="h-1 w-1 rounded-full bg-[#2BFF88]" />
            <span>Custom Solutions</span>
          </div>
        </div>

        {/* Visual Panel */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-5 rounded-[2rem] bg-[#2BFF88]/[0.04] blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111417] shadow-2xl shadow-black/30">
            {/* Browser Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>

              <span className="rounded-md bg-white/5 px-4 py-1.5 text-xs text-white/35">
                dotdevx.com
              </span>

              <div className="h-2 w-2 rounded-full bg-[#2BFF88]" />
            </div>

            {/* Interface Preview */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">
                  DotDev<span className="text-[#2BFF88]">X</span>
                </span>

                <div className="flex gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-white/15" />
                  <span className="h-1.5 w-8 rounded-full bg-white/15" />
                  <span className="h-1.5 w-8 rounded-full bg-white/15" />
                </div>
              </div>

              <div className="mt-12">
                <div className="h-2 w-24 rounded-full bg-[#2BFF88]/70" />

                <div className="mt-5 space-y-3">
                  <div className="h-7 w-full max-w-[300px] rounded-md bg-white/90" />
                  <div className="h-7 w-4/5 max-w-[240px] rounded-md bg-[#2BFF88]" />
                </div>

                <div className="mt-5 space-y-2">
                  <div className="h-2 w-full max-w-[280px] rounded-full bg-white/15" />
                  <div className="h-2 w-3/4 rounded-full bg-white/10" />
                </div>

                <div className="mt-7 h-9 w-32 rounded-full bg-[#2BFF88]" />
              </div>

              <div className="mt-12 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Code2 className="text-[#2BFF88]" size={20} />
                  <div className="mt-5 h-2 w-full rounded-full bg-white/20" />
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/10" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Globe2 className="text-[#2BFF88]" size={20} />
                  <div className="mt-5 h-2 w-full rounded-full bg-white/20" />
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/10" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Layers3 className="text-[#2BFF88]" size={20} />
                  <div className="mt-5 h-2 w-full rounded-full bg-white/20" />
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/10" />
                </div>
              </div>
            </div>

            {/* Browser Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
              <span className="text-xs text-white/35">
                Crafted for modern businesses
              </span>

              <span className="h-2 w-2 rounded-full bg-[#2BFF88]" />
            </div>
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-6 -left-3 rounded-xl border border-white/10 bg-[#171B1E] px-4 py-3 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2BFF88]/10 text-[#2BFF88]">
                <Code2 size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Built with purpose
                </p>
                <p className="mt-1 text-[10px] text-white/45">
                  Design · Development
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}