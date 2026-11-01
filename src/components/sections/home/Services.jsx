import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import SectionBackground from "@/components/motion/SectionBackground";

export default function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Digital solutions built around your business."
          description="From business websites to custom web applications, we create digital experiences that help businesses move forward."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>

        <div className="group mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#111417]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4F83FF]/40 hover:shadow-[0_0_40px_-12px_rgba(79,131,255,0.45)] sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-[#F5F7F6] sm:text-xl">
              Have a project in mind?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#A7B0AC]">
              Let’s discuss your requirements and find the right solution.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#4F83FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4F83FF]/20 transition-all hover:bg-[#75A0FF] hover:shadow-[#75A0FF]/30"
          >
            Explore All Services
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}