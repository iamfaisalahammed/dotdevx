
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";

const ACCENT = "var(--accent, #E5383B)";

export default function ServiceCard({ service, index = 0 }) {
  const reduce = useReducedMotion();

  if (!service) return null;

  const Icon = service.icon;
  const hasIcon = Icon && typeof Icon !== "string";

  const number = String(index + 1).padStart(2, "0");

  const detailsHref = service.slug
    ? `/services/${service.slug}`
    : null;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101113] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#E5383B]/50 hover:bg-[#141416] sm:p-8"
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-[0.2em] text-white/30">
          SERVICE / {number}
        </span>

        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#E5383B] transition-all duration-500 group-hover:border-[#E5383B]/40 group-hover:bg-[#E5383B] group-hover:text-white">
          {hasIcon ? (
            <Icon size={21} strokeWidth={1.7} />
          ) : (
            <Code2 size={21} strokeWidth={1.7} />
          )}
        </span>
      </div>

      {/* Content */}
      <div className="mt-10 flex-1">
        <h3 className="max-w-[280px] text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF6B6F] sm:text-2xl">
          {service.title}
        </h3>

        {service.description && (
          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-[15px]">
            {service.description}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="my-7 h-px w-full bg-white/[0.08] transition-colors duration-500 group-hover:bg-[#E5383B]/30" />

      {/* Bottom */}
      <div className="flex items-center justify-between gap-3">
        {detailsHref ? (
          <Link
            href={detailsHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors duration-300 hover:text-[#E5383B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5383B] rounded-sm"
          >
            Explore Service
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        ) : (
          <span className="text-sm font-semibold text-white/50">
            Our Service
          </span>
        )}

        <span className="text-2xl font-light text-white/[0.12] transition-colors duration-500 group-hover:text-[#E5383B]/50">
          {number}
        </span>
      </div>

      {/* Bottom Accent */}
      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E5383B] transition-all duration-500 group-hover:w-full" />
    </motion.article>
  );
}
