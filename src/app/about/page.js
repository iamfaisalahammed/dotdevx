
import Link from "next/link";
import { ArrowUpRight, Code2, Lightbulb, Target } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About .DevX",
  description:
    ".DevX is a web development agency in Bangladesh focused on building modern, responsive, and high-performance websites for businesses.",
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090B] text-white">
      {/* Background glow and grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-[420px] w-[420px] animate-pulse rounded-full bg-[#E5383B]/[0.12] blur-[130px] sm:h-[560px] sm:w-[560px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(#E5383B 1px, transparent 1px), linear-gradient(90deg, #E5383B 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="py-20 sm:py-28 lg:py-32">
        {/* Heading */}
        <Reveal className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            Building better{" "}
            <span className="text-white/35">digital experiences.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            We help businesses establish and improve their online presence
            through modern web design and development.
          </p>
        </Reveal>

        {/* About */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:mt-24 sm:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <Reveal>
            <p className="text-2xl font-semibold leading-[1.4] tracking-tight sm:text-3xl lg:text-[34px]">
              .DevX is a web development agency focused on creating modern,
              responsive, and purposeful websites.
            </p>

            <span
              aria-hidden="true"
              className="mt-8 block h-[3px] w-14 rounded-full bg-[#E5383B]"
            />
          </Reveal>

          <Reveal
            delay={0.1}
            className="space-y-5 text-base leading-8 text-white/60"
          >
            <p>
              We believe a website should do more than look attractive. It
              should communicate clearly, provide a useful experience, and
              support meaningful business goals.
            </p>

            <p>
              Our approach combines careful planning, thoughtful design, and
              modern development practices to create digital experiences that
              work across devices.
            </p>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <h2 className="mb-10 text-3xl font-bold tracking-tight sm:mb-14 sm:text-4xl lg:text-5xl">
              What guides <span className="text-white/40">our work.</span>
            </h2>
          </Reveal>

          <ul className="border-t border-white/10">
            {values.map((value, i) => {
              const Icon = value.icon;

              return (
                <li key={value.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="group relative overflow-hidden border-b border-white/10">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#E5383B]/20 via-[#E5383B]/5 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100 group-active:scale-x-100"
                      />

                      <div className="relative grid gap-3 px-1 py-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:px-3 sm:py-8 lg:grid-cols-[5fr_6fr]">
                        <div className="flex items-center gap-4 transition-transform duration-500 ease-out sm:gap-5 sm:group-hover:translate-x-2">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#E5383B] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-transparent group-hover:bg-[#E5383B] group-hover:text-white sm:h-12 sm:w-12">
                            <Icon size={22} strokeWidth={1.8} />
                          </span>

                          <h3 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
                            {value.title}
                          </h3>
                        </div>

                        <p className="pl-[60px] text-sm leading-7 text-white/55 sm:max-w-md sm:pl-0 sm:text-[15px]">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact CTA */}
        <Reveal className="mt-20 flex flex-col gap-8 border-t border-white/10 pt-12 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            Have a project in mind?{" "}
            <span className="text-white/40">Let&apos;s talk.</span>
          </p>

          <Link
            href="/contact"
            className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-[#E5383B] py-4 pl-7 pr-5 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_#E5383B] transition-shadow duration-300 hover:shadow-[0_16px_50px_-8px_#E5383B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
            />

            <span className="relative">
              Let&apos;s Discuss Your Project
            </span>

            <ArrowUpRight
              size={18}
              className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </main>
  );
}
