import { ArrowRight } from "lucide-react";

import { developmentProcess } from "@/data/process";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionBackground from "@/components/motion/SectionBackground";

export default function Process() {
  return (
    <section
      id="process"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="A clear process from idea to launch."
          description="Every project follows a structured process to keep requirements, communication, and development organized."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {developmentProcess.map((item, index) => (
            <article
              key={item.step}
              className="group relative h-full rounded-2xl border border-white/10 bg-[#111417]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4F83FF]/40 hover:shadow-lg hover:shadow-[#4F83FF]/10 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold tracking-tight text-[#4F83FF]/80 transition-colors group-hover:text-[#75A0FF]">
                  {item.step}
                </span>

                {/* শেষ কার্ড বাদে বাকিগুলোতে পরের ধাপের তীর (শুধু lg-তে) */}
                {index !== developmentProcess.length - 1 && (
                  <span className="hidden text-white/20 transition-colors group-hover:text-[#4F83FF] lg:block">
                    <ArrowRight size={18} />
                  </span>
                )}
              </div>

              <h3 className="mt-7 text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}