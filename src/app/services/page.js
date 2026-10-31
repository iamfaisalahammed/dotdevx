
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/services/ServiceCard";
import Reveal from "@/components/motion/Reveal";

import { services } from "@/data/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Explore DotDevX web development services, including business websites, e-commerce, landing pages, and custom web applications.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Solutions for your digital needs."
            description="Explore our website development services and find the right solution for your business."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
