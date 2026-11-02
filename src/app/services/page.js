
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/services/ServiceCard";
import Reveal from "@/components/motion/Reveal";

import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Web Development Services",
  description:
    ".DevX offers professional web development services, including business websites, e-commerce websites, landing pages, and custom web applications for businesses in Bangladesh and worldwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#E5383B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5383B]">
                Our Services
              </span>
              <span className="h-px w-8 bg-[#E5383B]" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Solutions{" "}
              <span className="text-white/50">
                for your digital needs.
              </span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
              Explore our website development services and find the right
              solution for your business.
            </p>
          </div>
        </Reveal>

        {/* Services */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-white/15 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        {services.length === 0 && (
          <p className="py-16 text-center text-white/50">
            Services will be available soon.
          </p>
        )}
      </Container>
    </main>
  );
}
