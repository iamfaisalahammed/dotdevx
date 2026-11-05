"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export default function ServiceDetails({ service }) {
  const reduce = useReducedMotion();
  const mobileLineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: mobileLineRef,
    offset: ["start 75%", "end 65%"],
  });

  const mobileLineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  if (!service) return null;

  const features = service.features ?? [];

  // SEO: structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    areaServed: ["Bangladesh", "Worldwide"],
    provider: { "@type": "Organization", name: ".DevX", url: SITE_URL },
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* বাঁয়ে: sticky হেডিং */}
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                All Services
              </Link>

              <div className="mt-10 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#E5252A]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5252A]">
                  Our Services
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[#A7B0AC] sm:text-base">
                {service.description}
              </p>
            </div>
          </Reveal>

          {/* ডানে: নম্বরযুক্ত ফিচার সারি */}
          <div>
            <Reveal>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                What&apos;s included
              </p>
            </Reveal>

            <div ref={mobileLineRef} className="relative">
              {/* Mobile scroll-based glowing line */}
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[6px] top-2 w-px bg-white/10 lg:hidden"
              />

              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  style={{ height: mobileLineProgress }}
                  className="absolute left-[5px] top-2 w-[3px] rounded-full bg-[#E5252A] shadow-[0_0_8px_#E5252A,0_0_18px_#E5252A] lg:hidden"
                />
              )}

              <div className="border-t border-white/15 pl-8 lg:pl-0">
                {features.map((feature, index) => (
                  <Reveal key={feature} delay={index * 0.05}>
                    <div className="group relative flex items-start gap-5 border-b border-white/15 py-8 transition-colors duration-300 hover:border-[#E5252A] sm:gap-8">
                      {/* Mobile dot */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-9 h-3.5 w-3.5 rounded-full border border-[#E5252A] bg-black lg:hidden"
                      />

                      {/* Number */}
                      <span className="pt-1 text-sm font-semibold text-white/30 transition-colors duration-300 group-hover:text-[#E5252A]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Feature text */}
                      <p className="flex-1 text-lg leading-8 text-white/85 sm:text-xl sm:leading-9">
                        {feature}
                      </p>
                    </div>
                  </Reveal>
                ))}

                {/* Empty state */}
                {features.length === 0 && (
                  <p className="py-16 text-center text-white/50">
                    Details will be available soon.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom CTA */}
            <Reveal>
              <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    Ready to start your project?
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-7 text-[#A7B0AC]">
                    Tell us what you&apos;re building and we&apos;ll get back to
                    you with a clear plan and timeline.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex w-fit shrink-0 items-center gap-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Let&apos;s Talk
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5252A] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </main>
  );
}