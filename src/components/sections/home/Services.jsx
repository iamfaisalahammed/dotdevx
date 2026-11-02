import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import ServiceCard from "@/components/services/ServiceCard";

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-white/[0.06] bg-[#0C0E10] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* হেডিং — Technologies সেকশনের প্যাটার্ন: বামে সাজানো, লেবেল ছাড়া */}
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Digital solutions{" "}
            <span className="text-white/40">built around your business.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            From business websites to custom web applications, we create digital
            experiences that help businesses move forward.
          </p>
        </div>

        {/* সার্ভিস কার্ড */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        {/* নিচের CTA: বক্স ছাড়া, লাল লাইনের মাঝে */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-y border-[#E5383B]/40 py-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Have a project in mind?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Let&apos;s discuss your requirements and find the right solution.
            </p>
          </div>

          {/* লাল বাটন: hover করলে তীর কোণায় সরে যাবে */}
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5252A] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#E5252A]"
          >
            Explore All Services
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}