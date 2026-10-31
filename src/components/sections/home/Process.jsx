import { ArrowDown } from "lucide-react";

import { developmentProcess } from "@/data/process";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How We Work"
            title="A clear process from idea to launch."
            description="Every project follows a structured process to keep requirements, communication, and development organized."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {developmentProcess.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06}>
              <article className="relative h-full rounded-2xl border border-white/10 bg-[#111417] p-6 transition-colors duration-300 hover:border-[#2BFF88]/30 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold tracking-tight text-[#2BFF88]/80">
                    {item.step}
                  </span>

                  {index !== developmentProcess.length - 1 && (
                    <span className="hidden text-white/20 lg:block">
                      <ArrowDown size={18} />
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
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}