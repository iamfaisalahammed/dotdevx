"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// Hero-তে --accent সেট করা থাকলে সেটাই নেবে, না থাকলে এই লাল
const ACCENT = "var(--accent, #E5383B)";

export default function ServiceCard({ service, index = 0 }) {
  const reduce = useReducedMotion();
  if (!service) return null;

  const Icon = service.icon;
  const hasIcon = Icon && typeof Icon !== "string";
  const number = String(index + 1).padStart(2, "0");

  // মাউসের জায়গা CSS variable-এ রাখছি, spotlight সেটা দেখে সরবে
  function onMove(e) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  const title = (
    <h3 className="text-xl font-semibold leading-snug text-white sm:text-[22px]">
      {service.title}
    </h3>
  );

  return (
    <motion.article
      onPointerMove={onMove}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      // একসাথে অনেক কার্ড এলে দেরি যেন না বাড়ে, তাই ৩-এ ঘুরিয়ে দিয়েছি
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ "--x": "50%", "--y": "0%" }}
      className="group relative isolate h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E5383B]/50 active:scale-[0.99] sm:p-8"
    >
      {/* মাউসের সঙ্গে সঙ্গে চলা আলো */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--x) var(--y), color-mix(in srgb, ${ACCENT} 16%, transparent), transparent 70%)`,
        }}
      />

      {/* পেছনের বড় ক্রম নম্বর, হালকা করে রাখা */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -right-2 -z-10 select-none text-[120px] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:-translate-y-2 group-hover:text-[#E5383B]/[0.08] sm:text-[150px]"
      >
        {number}
      </span>

      <div className="flex items-start justify-between gap-4">
        {hasIcon ? (
          <span
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0C0E10] text-[#E5383B] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-105 group-hover:border-transparent group-hover:bg-[#E5383B] group-hover:text-white group-hover:shadow-[0_12px_30px_-8px_#E5383B] sm:h-16 sm:w-16"
          >
            <Icon size={26} strokeWidth={1.8} />
          </span>
        ) : (
          <span className="text-sm font-semibold text-white/30">{number}</span>
        )}

        {/* তীর শুধু লিংক থাকলে দেখাবে */}
        {service.href && (
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#E5383B] group-hover:bg-[#E5383B] group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        )}
      </div>

      <div className="mt-8 sm:mt-10">
        {service.href ? (
          // after দিয়ে পুরো কার্ডটাই ক্লিকযোগ্য করা হয়েছে
          <Link
            href={service.href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </Link>
        ) : (
          title
        )}

        {service.description && (
          <p className="mt-3 text-sm leading-7 text-white/55 sm:text-[15px] sm:leading-8">
            {service.description}
          </p>
        )}
      </div>

      {/* নিচের লাল রেখা, hover করলে বাম থেকে ডানে ভরে যাবে */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#E5383B] to-[#FF6B6F] transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </motion.article>
  );
}