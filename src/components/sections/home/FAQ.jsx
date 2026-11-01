"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";

import { faqs } from "@/data/faqs";
import Container from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1];

export default function FAQ() {
  const reduce = useReducedMotion();
  // একসাথে একটাই খোলা থাকবে, শুরুতে প্রথমটা
  const [openIndex, setOpenIndex] = useState(0);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0C0E10] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#E5383B]/[0.06] blur-[120px]"
      />

      <Container>
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="mb-10 sm:mb-14">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Questions?{" "}
              <span className="text-white/40">We&apos;ve got answers.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Find answers to common questions about our web development
              services and project process.
            </p>
          </motion.div>

          <ul className="border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.li
                  key={faq.question}
                  {...reveal((index % 4) * 0.06)}
                  className="group relative border-b border-white/10"
                >
                  {/* খোলা প্রশ্নের পাশে বাম দিকে লাল দাগ */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-px top-0 h-full w-[2px] origin-top bg-[#E5383B] transition-transform duration-500 ${
                      isOpen ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 px-1 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-8 sm:px-4 sm:py-6"
                  >
                    <span
                      className={`text-base font-semibold leading-snug transition-colors duration-300 sm:text-lg ${
                        isOpen
                          ? "text-white"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* খুললে + ঘুরে × হয়ে যাবে */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:h-10 sm:w-10 ${
                        isOpen
                          ? "rotate-45 border-transparent bg-[#E5383B] text-white shadow-[0_8px_24px_-8px_#E5383B]"
                          : "border-white/15 text-white/60 group-hover:border-[#E5383B]/60 group-hover:text-[#E5383B]"
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl px-1 pb-6 pr-12 text-sm leading-7 text-white/55 sm:px-4 sm:pr-20 sm:text-[15px] sm:leading-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>

          {/* নিচে যোগাযোগের ডাক */}
          <motion.div
            {...reveal()}
            className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-white/55 sm:text-base">
              Still have a question? We&apos;re happy to talk.
            </p>

            <Link
              href="/contact"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in touch
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}