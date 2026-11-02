import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Sparkles } from "lucide-react";

export default function ServiceDetails({ service }) {
  if (!service) return null;

  const features = service.features ?? [];

  return (
    <main className="min-h-screen bg-[#08090B] text-white selection:bg-[#E5383B]/30">
      <section className="relative isolate overflow-hidden">
        {/* Background: grid + glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_40%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#E5383B]/[0.14] blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-[-10%] -z-10 h-[360px] w-[360px] rounded-full bg-[#E5383B]/[0.06] blur-[130px]"
        />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Back navigation */}
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 backdrop-blur transition-all duration-300 hover:border-[#E5383B]/40 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Services
          </Link>

          {/* Hero */}
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E5383B]/25 bg-[#E5383B]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B6F]">
                <Sparkles size={13} />
                Our Services
              </span>

              <h1 className="mt-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-4xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                {service.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#E5383B] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(229,56,59,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F0484B] hover:shadow-[0_14px_44px_-8px_rgba(229,56,59,0.85)]"
                >
                  Discuss Your Project
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                >
                  Browse Services
                </Link>
              </div>
            </div>

            {/* Glass summary card */}
            <aside className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-xl lg:sticky lg:top-24">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#E5383B]/70 to-transparent"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Service Overview
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">
                {service.title}
              </h2>

              {features.length > 0 && (
                <div className="mt-6 flex items-end gap-3 border-t border-white/10 pt-6">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {String(features.length).padStart(2, "0")}
                  </span>
                  <span className="pb-1.5 text-sm text-white/50">
                    deliverables included
                  </span>
                </div>
              )}

              <Link
                href="/contact"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#E5383B]/50 hover:bg-[#E5383B] "
              >
                Get a Free Quote
                <ArrowUpRight size={16} />
              </Link>
            </aside>
          </div>

          {/* What's included */}
          {features.length > 0 && (
            <div className="mt-24">
              <div className="mb-10 max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF6B6F]/80">
                  What You Get
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  What&apos;s Included
                  <span className="text-[#E5383B]">.</span>
                </h2>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <li
                    key={feature}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0E0F12] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E5383B]/40 hover:shadow-[0_20px_50px_-20px_rgba(229,56,59,0.35)]"
                  >
                    {/* hover glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E5383B]/0 blur-3xl transition-all duration-500 group-hover:bg-[#E5383B]/25"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5383B]/20 bg-[#E5383B]/10 text-[#FF6B6F] transition-all duration-500 group-hover:border-[#E5383B] group-hover:bg-[#E5383B] group-hover:text-white">
                        <Check size={20} strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-white/20 transition-colors duration-500 group-hover:text-white/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="relative mt-6 text-[15px] leading-7 text-white/65 transition-colors duration-300 group-hover:text-white">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="relative mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#E5383B]/[0.16] via-[#0E0F12] to-[#0E0F12] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#E5383B]/20 blur-[90px]"
            />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Ready to start your project?
                </h3>
                <p className="mt-3 text-white/55">
                  Tell us what you&apos;re building and we&apos;ll get back to you with
                  a clear plan and timeline.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#08090B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF6B6F] hover:text-white"
              >
                Let&apos;s Talk
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}