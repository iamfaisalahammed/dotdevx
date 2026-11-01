"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Target, Lightbulb, Code2 } from "lucide-react";

import Container from "@/components/ui/Container";

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

const statement =
  "We believe a good website should do more than look attractive. It should communicate clearly, provide a smooth user experience, and support real business goals. Our approach combines thoughtful planning, practical design, and modern web development.";

const words = statement.split(" ");
const ease = [0.22, 1, 0.36, 1];

// একেকটা শব্দ নিজের পালা এলে ফ্যাকাশে থেকে উজ্জ্বল হবে
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const statementRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/15 bg-[#08090B] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[#E5383B]/[0.06] blur-[120px]"
      />

      <Container>
        {/* ওপরে: হেডিং বামে, ছোট লেখা আর বাটন ডানে */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <motion.h2
            {...reveal()}
            className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            We turn business ideas{" "}
            <span className="text-white/40">into digital experiences.</span>
          </motion.h2>

          <motion.div {...reveal(0.1)}>
            <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              .DevX is a web development agency focused on creating modern,
              responsive, and purposeful websites for businesses.
            </p>

            <Link
              href="/about"
              className="group relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#E5252A] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#E5252A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Learn More About Us
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* মাঝখানে বড় লেখা, স্ক্রল করলে শব্দ ধরে ধরে জ্বলে উঠবে */}
        <p
          ref={statementRef}
          className="mt-16 max-w-4xl text-2xl font-semibold leading-[1.45] tracking-tight text-white sm:mt-20 sm:text-3xl lg:text-[34px]"
        >
          {reduce
            ? statement
            : words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;

                return (
                  <span key={i}>
                    <Word progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>{" "}
                  </span>
                );
              })}
        </p>

        {/* নিচে তিনটা মূল্যবোধ */}
        <ul className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;

            return (
              <motion.li
                key={value.title}
                {...reveal(i * 0.1)}
                className="group relative border-t border-white/15 pt-6"
              >
                {/* hover করলে ওপরের দাগ লাল হয়ে ভরে যাবে */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-[#E5383B] transition-transform duration-700 ease-out group-hover:scale-x-100"
                />

                <Icon
                  size={26}
                  strokeWidth={1.7}
                  className="text-[#E5383B] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                />

                <h3 className="mt-5 text-lg font-semibold text-white sm:text-xl">
                  {value.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                  {value.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}