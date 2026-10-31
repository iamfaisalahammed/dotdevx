
import Link from "next/link";
import { ArrowRight, Code2, Lightbulb, Target } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about DotDevX, our approach, and how we build modern websites for businesses.",
  path: "/about",
});

const values = [
  {
    icon: Target,
    title: "Business First",
    description:
      "We start by understanding your business goals and project requirements.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Solutions",
    description:
      "We make design and development decisions with a clear purpose.",
  },
  {
    icon: Code2,
    title: "Modern Development",
    description:
      "We focus on maintainable code, responsive interfaces, and modern technologies.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading
          eyebrow="About DotDevX"
          title="Building better digital experiences."
          description="We help businesses establish and improve their online presence through modern web design and development."
          align="left"
        />

        <div className="mt-12 max-w-3xl space-y-5 text-base leading-8 text-white/60">
          <p>
            DotDevX is a web development agency focused on creating
            modern, responsive, and purposeful websites.
          </p>

          <p>
            We believe a website should do more than look attractive.
            It should communicate clearly, provide a useful experience,
            and support meaningful business goals.
          </p>

          <p>
            Our approach combines careful planning, thoughtful design,
            and modern development practices to create digital
            experiences that work across devices.
          </p>
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Our Values"
            title="What guides our work."
            align="left"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-[#111417] p-7"
                >
                  <Icon size={26} className="text-[#2BFF88]" />

                  <h2 className="mt-6 text-xl font-semibold">
                    {value.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#2BFF88] px-7 py-4 text-sm font-semibold text-[#04120A] hover:bg-[#52FF9D]"
          >
            Let's Discuss Your Project
            <ArrowRight size={17} />
          </Link>
        </div>
      </Container>
    </main>
  );
}
