"use client";

import { motion, useReducedMotion } from "motion/react";

import { developmentProcess } from "@/data/process";
import Container from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1];

export default function Process() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  // লাইনটা স্ক্রলে ঢুকলে ধীরে ধীরে লাল হয়ে ভরে যাবে
  const draw = (axis) => ({
    initial: reduce ? false : { [axis]: 0 },
    whileInView: { [axis]: 1 },
    viewport: { once: true, margin: "-120px" },
    transition: { duration: 1.6, delay: 0.2, ease: "easeInOut" },
  });

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-white/15 bg-[#08090B] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <motion.div {...reveal()} className="mb-14 max-w-2xl sm:mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            A clear process{" "}
            <span className="text-white/40">from idea to launch.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Every project follows a structured process to keep requirements,
            communication, and development organized.
          </p>
        </motion.div>

        <div className="relative">
          {/* মোবাইলে লাইন নিচের দিকে নামে */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[6px] top-2 w-px bg-white/10 lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            {...draw("scaleY")}
            className="absolute bottom-2 left-[6px] top-2 w-px origin-top bg-[#E5383B] lg:hidden"
          />

          {/* ডেস্কটপে লাইন ডানে যায় */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 lg:block"
          />
          <motion.span
            aria-hidden="true"
            {...draw("scaleX")}
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-[#E5383B] lg:block"
          />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {developmentProcess.map((item, i) => (
              <motion.li
                key={item.step}
                {...reveal(i * 0.12)}
                className="group relative pl-9 lg:pl-0 lg:pt-12"
              >
                {/* লাইনের ওপরের বিন্দু, hover করলে ভরে যাবে */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#E5383B] bg-[#08090B] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#E5383B] group-hover:shadow-[0_0_18px_#E5383B] lg:top-0"
                />

                <span className="block text-4xl font-bold tracking-tight text-white/15 transition-colors duration-300 group-hover:text-[#E5383B] sm:text-5xl">
                  {item.step}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
