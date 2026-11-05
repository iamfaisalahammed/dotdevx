"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ShoppingBag,
  Orbit,
  GraduationCap,
  Utensils,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

import { industries } from "@/data/industries";
import Container from "@/components/ui/Container";

const industryIcons = {
  "E-commerce": ShoppingBag,
  Startups: Orbit,
  Education: GraduationCap,
  Restaurants: Utensils,
  "Professional Services": BriefcaseBusiness,
  "Local Businesses": Building2,
};

const ease = [0.22, 1, 0.36, 1];

export default function Industries() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section
      id="industries"
      className="relative overflow-hidden border-t border-white/15 bg-[#08090B] py-20 sm:py-24 lg:py-28"
    >
      {/* ডান দিকের কোণায় হালকা আভা */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full  blur-[120px]"
      />

      <Container>
        <motion.div {...reveal()} className="mb-12 max-w-2xl sm:mb-16">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Digital solutions{" "}
            <span className="text-white/40">for different industries.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            We work with businesses and professionals who want to establish or
            improve their online presence.
          </p>
        </motion.div>

        <ul className="border-t border-white/10">
          {industries.map((industry, i) => {
            const Icon = industryIcons[industry.title] || Building2;

            return (
              <motion.li
                key={industry.title}
                {...reveal((i % 3) * 0.07)}
                className="group relative overflow-hidden border-b border-white/10"
              >
               

                <div className="relative grid gap-3 px-1 py-6 sm:grid-cols-2 sm:items-center sm:gap-10 sm:px-3 sm:py-8 lg:grid-cols-[5fr_6fr]">
                  <div className="flex items-center gap-4 transition-transform duration-500 ease-out sm:gap-5 sm:group-hover:translate-x-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#E5383B] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-transparent group-hover:bg-[#E5383B] group-hover:text-white sm:h-12 sm:w-12">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>

                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                      {industry.title}
                    </h3>
                  </div>

                  <p className="pl-[60px] text-sm leading-7 text-white/55 sm:max-w-md sm:pl-0 sm:text-[15px]">
                    {industry.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}