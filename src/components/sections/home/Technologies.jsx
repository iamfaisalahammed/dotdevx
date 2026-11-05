"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { technologies } from "@/data/technologies";
import Container from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1];

// ট্যাবের নামগুলো ডেটা থেকেই বের করছি, নতুন ক্যাটাগরি যোগ করলে নিজে থেকেই চলে আসবে
const categories = [
  "All",
  ...new Set(technologies.map((t) => t.category || "Other")),
];

export default function Technologies() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? technologies
      : technologies.filter((t) => (t.category || "Other") === active);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="technologies"
      className="relative overflow-hidden border-t border-white/[0.06] bg-black py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full  blur-[120px]"
      />

      <Container>
        <motion.div {...reveal()} className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built with{" "}
            <span className="text-white/40">modern web technologies.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            We select technologies based on project requirements, focusing on
            usability, maintainability, and performance.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)}>
          {/* ট্যাব — মোবাইলে পাশে স্ক্রল করা যাবে */}
          <div
            role="group"
            aria-label="Filter technologies by category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const isActive = active === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(category)}
                  className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isActive ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {/* সক্রিয় ট্যাবের লাল পিল এক ট্যাব থেকে আরেকটাতে পিছলে যাবে */}
                  {isActive && (
                    <motion.span
                      layoutId="tech-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#E5383B] shadow-[0_8px_24px_-8px_#E5383B]"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full border border-white/10" />
                  )}
                  <span className="relative">{category}</span>
                </button>
              );
            })}
          </div>

          {/* চিপগুলো — উচ্চতা ধরে রাখা হয়েছে যাতে ট্যাব বদলালে নিচের অংশ না লাফায় */}
          <div className="mt-8 min-h-[200px] border-t border-white/10 pt-8 sm:mt-10 sm:min-h-[180px] sm:pt-10">
            <motion.ul layout className="flex flex-wrap gap-2.5 sm:gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((technology, i) => (
                  <motion.li
                    key={`${technology.category}-${technology.name}`}
                    layout
                    initial={reduce ? false : { opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4), ease }}
                    className="group inline-flex cursor-default items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E5383B]/60 hover:bg-[#E5383B]/10 hover:text-white sm:px-5 sm:text-[15px]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B] transition-shadow duration-300 group-hover:shadow-[0_0_10px_#E5383B]" />
                    {technology.name}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
        </motion.div>

        <p className="mt-10 text-xs leading-6 text-white/40">
          Technologies are selected according to the specific needs of each
          project.
        </p>
      </Container>
    </section>
  );
}