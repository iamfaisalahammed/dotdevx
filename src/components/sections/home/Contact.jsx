"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

import Container from "@/components/ui/Container";

const ease = [0.22, 1, 0.36, 1];

export default function Contact() {
  const reduce = useReducedMotion();

  const whatsappUrl = getWhatsAppUrl(
    "Hello DotDevX, I would like to discuss a website project."
  );
  const email = siteConfig.contact.email;

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease },
  });

  // হোয়াটসঅ্যাপ আর ইমেইল একই ধাঁচের, তাই একটা তালিকা বানিয়ে নিলাম
  const links = [
    whatsappUrl && {
      label: "WhatsApp",
      value: "Chat with us directly",
      href: whatsappUrl,
      external: true,
    },
    email && {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28 lg:py-36"
    >
      {/* পেছনে ধীরে নড়া বড় লাল আভা, এই সেকশনটাই শেষ ডাক তাই একটু বেশি জমকালো */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0C0E10]/20 blur-[130px] sm:h-[560px] sm:w-[560px]"
      />

      {/* হালকা grid, মাঝখান থেকে মিলিয়ে যাবে */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(#E5383B 1px, transparent 1px), linear-gradient(90deg, #E5383B 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container>
        <div className="mx-auto max-w-5xl">
          <motion.div {...reveal()} className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5383B] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E5383B]" />
            </span>
            <span className="text-sm text-white/60">
              Available for new projects
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.1)}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
          >
            Have a project in mind?{" "}
            <span className="text-white/35">
              Let&apos;s build something great.
            </span>
          </motion.h2>

          <motion.p
            {...reveal(0.2)}
            className="mt-6 max-w-lg text-base leading-8 text-white/55 sm:mt-8 sm:text-lg"
          >
            Tell us about your business and your ideas. Let&apos;s discuss how
            we can help bring your next website project to life.
          </motion.p>

          <motion.div {...reveal(0.3)} className="mt-9 sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5252A] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#E5252A]"
            >
              {/* hover করলে আলো ওপর দিয়ে সরে যাবে */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
              />
              <span className="relative">Start a Project</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* যোগাযোগের বড় লিংক */}
          {links.length > 0 && (
            <div className="mt-16 grid border-t border-white/10 sm:mt-20 sm:grid-cols-2 sm:gap-x-10">
              {links.map((item, i) => (
                <motion.a
                  key={item.label}
                  {...reveal(0.1 + i * 0.1)}
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group relative flex items-center justify-between gap-4 border-b border-white/10 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-8"
                >
                  <span className="min-w-0">
                    <span className="block text-sm text-white/45">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block break-words text-xl font-semibold text-white transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-2xl">
                      {item.value}
                    </span>
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[#E5383B] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>

                  {/* নিচের দাগ লাল হয়ে ভরে যাবে */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[#E5383B] transition-transform duration-700 ease-out group-hover:scale-x-100"
                  />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}