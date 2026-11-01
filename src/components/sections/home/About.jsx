import Link from "next/link";
import { ArrowRight, Target, Lightbulb, Code2 } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionBackground from "@/components/motion/SectionBackground";

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
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
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
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#4F83FF] transition-colors hover:text-[#75A0FF]"
            >
              Learn More About Us
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid gap-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-[#111417]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-[#4F83FF]/40 hover:shadow-lg hover:shadow-[#4F83FF]/10 sm:p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4F83FF]/10 text-[#4F83FF] transition-colors group-hover:bg-[#4F83FF] group-hover:text-white">
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}