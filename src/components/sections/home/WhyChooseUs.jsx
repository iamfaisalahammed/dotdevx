"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Target,
  Smartphone,
  Gauge,
  MessageCircle,
  Code2,
  Headset,
} from "lucide-react";

import Container from "@/components/ui/Container";

const reasons = [
  {
    icon: Target,
    title: "Business-Focused Approach",
    description:
      "We understand your business goals and build websites around your actual needs.",
  },
  {
    icon: Smartphone,
    title: "Responsive by Design",
    description:
      "We create layouts that work smoothly across mobile phones, tablets, and desktops.",
  },
  {
    icon: Gauge,
    title: "Performance-Conscious",
    description:
      "We focus on efficient code, optimized assets, and a smooth browsing experience.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "We keep project discussions and expectations clear throughout the development process.",
  },
  {
    icon: Code2,
    title: "Modern Development",
    description:
      "We use modern web technologies and maintainable development practices.",
  },
  {
    icon: Headset,
    title: "Post-Launch Planning",
    description:
      "We discuss maintenance, support, and future improvements after your website launches.",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function WhyChooseUs() {
  const reduce = useReducedMotion();

  // সব জায়গায় একই reveal, একবারই চলবে
  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0C0E10] py-20 sm:py-24 lg:py-28">
      {/* কোণার দিকে খুব হালকা একটা লাল আভা */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[#E5383B]/[0.07] blur-[120px]"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* বামে হেডিং — বড় স্ক্রিনে স্ক্রল করলেও আটকে থাকবে */}
          <motion.div {...reveal()} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              More than
              <br />
              <span className="text-white/40">just a website.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-white/55">
              We combine thoughtful design, modern development, and a
              business-focused approach to create meaningful digital
              experiences.
            </p>

            <span
              aria-hidden="true"
              className="mt-8 block h-[3px] w-14 rounded-full bg-[#E5383B]"
            />
          </motion.div>

          {/* ডানে লিস্ট — কার্ড নেই, শুধু পাতলা দাগ */}
          <ul>
            {reasons.map((reason, i) => {
              const Icon = reason.icon;

              return (
                <motion.li
                  key={reason.title}
                  {...reveal((i % 3) * 0.08)}
                  className="group relative border-b border-white/10 py-6 first:pt-0 sm:py-7"
                >
                  <div className="flex items-start gap-4 transition-transform duration-500 ease-out sm:gap-6 sm:group-hover:translate-x-2">
                    <Icon
                      size={24}
                      strokeWidth={1.7}
                      className="mt-0.5 shrink-0 text-[#E5383B] transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white sm:text-xl">
                        {reason.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-white/55 sm:text-[15px]">
                        {reason.description}
                      </p>
                    </div>
                  </div>

                  {/* hover করলে নিচের দাগ লাল হয়ে বাম থেকে ডানে চলে আসবে */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[#E5383B] transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}