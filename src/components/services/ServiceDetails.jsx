import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import Button from "@/components/ui/Button";
import SectionBackground from "@/components/motion/SectionBackground";

export default function ServiceDetails({ service }) {
  if (!service) return null;

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <section className="relative isolate overflow-hidden">
        {/* Hero-র মতো animated tech background */}
        <SectionBackground />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#75A0FF]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All Services
          </Link>

          <div className="mt-12 max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F83FF]">
              Our Services
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-white/55 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-9">
              <Button href="/contact" size="lg">
                Discuss Your Project
                <ArrowUpRight size={18} />
              </Button>
            </div>
          </div>

          {service.features?.length > 0 && (
            <div className="mt-20 max-w-3xl">
              <h2 className="text-2xl font-semibold"> What's Included</h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="group flex items-start gap-3 rounded-xl border border-white/10 bg-[#111417]/90 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4F83FF]/40 hover:shadow-lg hover:shadow-[#4F83FF]/10"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4F83FF]/10 text-[#4F83FF] transition-colors group-hover:bg-[#4F83FF] group-hover:text-white">
                      <Check size={15} />
                    </span>

                    <span className="text-sm leading-6 text-white/75">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}