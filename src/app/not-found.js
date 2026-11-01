import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-[#08090B] text-white">
      {/* পেছনের লাল আভা আর হালকা grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#E5383B]/20 blur-[130px] sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(#E5383B 1px, transparent 1px), linear-gradient(90deg, #E5383B 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="py-20 text-center sm:py-28">
        {/* 404 — মাঝের শূন্যটা ঘুরন্ত রিং, Hero-র রিংয়ের সঙ্গে মিল রেখে */}
        <Reveal>
          <h1
            aria-label="404"
            className="flex items-center justify-center text-[104px] font-extrabold leading-none tracking-tight min-[400px]:text-[132px] sm:text-[200px] lg:text-[240px]"
          >
            <span aria-hidden="true" className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
              4
            </span>

            <span
              aria-hidden="true"
              className="relative mx-[0.04em] inline-block h-[0.72em] w-[0.72em]"
            >
              <span className="absolute inset-0 animate-spin rounded-full border-[0.05em] border-white/10 border-t-[#E5383B] [animation-duration:6s]" />
              <span className="absolute inset-[22%] animate-spin rounded-full border-[0.025em] border-white/10 border-b-[#FF6B6F] [animation-direction:reverse] [animation-duration:9s]" />
              <span className="absolute left-1/2 top-1/2 h-[0.09em] w-[0.09em] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#E5383B] shadow-[0_0_30px_#E5383B]" />
            </span>

            <span aria-hidden="true" className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
              4
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-xs text-[#FF6B6F] sm:text-sm">
            {"// route not found"}
          </p>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55 sm:text-base">
            The page you are looking for may have been moved, removed, or does
            not exist.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-4 min-[400px]:flex-row min-[400px]:items-center">
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#E5383B] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_#E5383B] transition-shadow duration-300 hover:shadow-[0_16px_50px_-8px_#E5383B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {/* hover করলে আলো সরে যাবে */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
              />
              <Home size={17} className="relative" />
              <span className="relative">Back to Home</span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#E5383B] hover:text-[#FF6B6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Contact Us
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}