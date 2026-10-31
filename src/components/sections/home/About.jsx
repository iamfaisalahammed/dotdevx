import Link from "next/link";
import { ArrowRight, Target, Lightbulb, Code2 } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const values = [
  {
    icon: Target,
    title: "Business First",
    description:
      "We focus on understanding your business goals before choosing the right digital solution.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Solutions",
    description:
      "Every design and development decision should serve a clear purpose and improve the user experience.",
  },
  {
    icon: Code2,
    title: "Modern Development",
    description:
      "We use modern web technologies and maintainable code to build reliable digital experiences.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="About DotDevX"
                title="We turn business ideas into digital experiences."
                description="DotDevX is a web development agency focused on creating modern, responsive, and purposeful websites for businesses."
                align="left"
                className="mb-7"
              />

              <p className="text-sm leading-8 text-white/55 sm:text-base">
                We believe a good website should do more than look
                attractive. It should communicate clearly, provide a
                smooth user experience, and support real business goals.
                Our approach combines thoughtful planning, practical
                design, and modern web development.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#2BFF88] transition-colors hover:text-white"
              >
                Learn More About Us
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <article className="flex gap-5 rounded-2xl border border-white/10 bg-[#111417] p-6 transition-colors hover:border-[#2BFF88]/30 sm:p-7">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2BFF88]/10 text-[#2BFF88]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {value.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-white/55">
                        {value.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}