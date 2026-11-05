import Link from "next/link";
import {  ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";

import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

// SEO metadata for the services page
export const metadata = createMetadata({
  title: "Web Development Services",
  description:
    ".DevX offers professional web development services, including business websites, e-commerce websites, landing pages, and custom web applications for businesses in Bangladesh and worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Container className="py-24 sm:py-32">

        <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
          {/* Left: sticky heading */}
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#E5252A]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5252A]">
                  Our Services
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                What we build
                <span className="block text-white/50">for your business.</span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[#A7B0AC] sm:text-base">
                Explore our website development services and find the right
                solution for your business.
              </p>
            </div>
          </Reveal>

          {/* Right: numbered service rows */}
          <div className="border-t border-white/15">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-start gap-5 border-b border-white/15 py-8 transition-colors duration-300 hover:border-[#E5252A] sm:gap-8"
                >
                  {/* Number */}
                  <span className="pt-1 text-sm font-semibold text-white/30 transition-colors duration-300 group-hover:text-[#E5252A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title + description */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      {service.title}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-7 text-[#A7B0AC]">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={22}
                    className="mt-1 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#E5252A]"
                  />
                </Link>
              </Reveal>
            ))}

            {/* Empty state */}
            {services.length === 0 && (
              <p className="py-16 text-center text-white/50">
                Services will be available soon.
              </p>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
}