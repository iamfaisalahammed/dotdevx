import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import Reveal from "@/components/motion/Reveal";

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Digital solutions built around your business."
            description="From business websites to custom web applications, we create digital experiences that help businesses move forward."
            align="center"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal
              key={service.slug}
              delay={index * 0.08}
              className="h-full"
            >
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#111417] p-6 sm:flex-row sm:p-8">
            <div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">
                Have a project in mind?
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Let’s discuss your requirements and find the right solution.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2BFF88] px-6 py-3 text-sm font-semibold text-[#04120A] transition-colors hover:bg-[#52FF9D]"
            >
              Explore All Services
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}