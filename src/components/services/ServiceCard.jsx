// components/ServiceCard.jsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";

export default function ServiceCard({ service, index = 0 }) {
  const reduce = useReducedMotion();

  if (!service) return null;

  const Icon = service.icon;
  const hasIcon = Icon && typeof Icon !== "string";

  const number = String(index + 1).padStart(2, "0");

  const detailsHref = service.slug ? `/services/${service.slug}` : null;

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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101113] p-5 transition-all duration-500 [-webkit-tap-highlight-color:transparent] active:scale-[0.99] sm:p-8 [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:border-white/25 [@media(hover:hover)]:hover:bg-[#141416] [@media(hover:hover)]:hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]"
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.2em] text-white/30 sm:text-xs">
          SERVICE / {number}
        </span>

        <span >
          {hasIcon ? (
            <Icon size={20} strokeWidth={1.7} />
          ) : (
            <Code2 size={20} strokeWidth={1.7} />
          )}
        </span>
      </div>

      {/* Content */}
      <div className="mt-8 flex-1 sm:mt-10">
        <h3 className="max-w-[280px] text-lg font-semibold leading-snug tracking-tight text-white sm:text-2xl">
          {service.title}
        </h3>

        {service.description && (
          <p className="mt-3 line-clamp-4 text-[13px] leading-6 text-white/50 sm:mt-4 sm:text-[15px] sm:leading-7">
            {service.description}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="my-6 h-px w-full bg-white/[0.08] transition-colors duration-500 sm:my-7 [@media(hover:hover)]:group-hover:bg-white/20" />

      {/* Bottom */}
      <div className="flex items-center justify-between gap-3">
        {detailsHref ? (
          <Link
            href={detailsHref}
            className="inline-flex items-center gap-2 rounded-sm py-1 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Explore Service
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <span className="text-sm font-semibold text-white/50">
            Our Service
          </span>
        )}

        <span className="text-2xl font-light text-white/[0.12] transition-colors duration-500 [@media(hover:hover)]:group-hover:text-white/25">
          {number}
        </span>
      </div>

      {/* Bottom Accent (শুধু হালকা সাদা, ডেস্কটপ hover) */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 hidden h-[2px] w-0 bg-gradient-to-r from-[#E5383B] to-transparent transition-all duration-500 [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:w-full"
      />
    </motion.article>
  );
}