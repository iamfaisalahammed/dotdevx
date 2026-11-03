// components/ProjectCard.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  if (!project) return null;

  // শুধু মাউস থাকলে spotlight চলবে, টাচে নয়
  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  // আইকনে ক্লিক করলে শুধু বিবরণ খুলবে/বন্ধ হবে, পেজে যাবে না
  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  return (
    <article
      onPointerMove={handleMove}
      className="group relative aspect-square h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0B0D10] transition-all duration-500 [-webkit-tap-highlight-color:transparent] sm:aspect-[4/5] md:rounded-[2rem] [&:has(a:active)]:scale-[0.98] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-white/25 [@media(hover:hover)]:hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]"
    >
      {/* ব্যাকগ্রাউন্ড ছবি */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 [@media(hover:hover)]:group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#1c1517,#0B0D10_70%)]">
          <span className="text-6xl font-black tracking-tighter text-white/[0.06] sm:text-7xl">
            .DevX
          </span>
        </div>
      )}

      {/* গাঢ় overlay (বিবরণ খুললে একটু গাঢ় হয়, যাতে লেখা পড়া যায়) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/50 to-transparent transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-90"
        }`}
      />

      {/* হালকা সাদা spotlight (শুধু ডেস্কটপ) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 bg-[radial-gradient(240px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.09),transparent_70%)] [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100"
      />

      {/* পুরো কার্ড জুড়ে লিংক (এর ওপরে আইকন বাটন আলাদাভাবে কাজ করে) */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="absolute inset-0 z-10 rounded-[inherit] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      />

      {/* উপরের সারি: ক্যাটাগরি + তীর */}
      <div className="pointer-events-none absolute inset-x-4 top-4 z-20 flex items-start justify-between sm:inset-x-5 sm:top-5">
        {project.category ? (
          <span className="rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/85 ring-1 ring-white/15 backdrop-blur-md sm:text-[11px]">
            {project.category}
          </span>
        ) : (
          <span />
        )}

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/15 backdrop-blur-md transition-all duration-300 sm:h-11 sm:w-11 [@media(hover:hover)]:group-hover:bg-white [@media(hover:hover)]:group-hover:text-black [@media(hover:hover)]:group-hover:ring-white">
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* নিচের glass panel */}
      <div
        className={`pointer-events-none absolute inset-x-3 bottom-3 z-20 rounded-2xl border bg-black/50 p-4 backdrop-blur-xl transition-colors duration-500 sm:inset-x-4 sm:bottom-4 sm:p-5 [@media(hover:hover)]:group-hover:border-white/20 ${
          open ? "border-white/25" : "border-white/10"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {project.type && (
              <p className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5383B]" />
                <span className="truncate">{project.type}</span>
              </p>
            )}

            <h3 className="text-lg font-semibold leading-tight text-white sm:text-xl md:text-2xl">
              {project.title}
            </h3>
          </div>

          {/* মোবাইল/ট্যাবলেটের জন্য আইকন বাটন (ডেস্কটপে hover থাকায় লুকানো) */}
          {project.description && (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-label={open ? "Hide details" : "Show details"}
              className={`pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 [-webkit-tap-highlight-color:transparent] active:scale-90 [@media(hover:hover)]:md:hidden ${
                open
                  ? "bg-white text-black ring-white"
                  : "bg-white/10 text-white ring-white/20"
              }`}
            >
              <Plus
                size={18}
                className={`transition-transform duration-300 ${
                  open ? "rotate-45" : "rotate-0"
                }`}
              />
            </button>
          )}
        </div>

        {/* বিবরণ: মোবাইলে আইকনে খোলে, ডেস্কটপে hover-এ খোলে */}
        {project.description && (
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 [@media(hover:hover)]:md:grid-rows-[0fr] [@media(hover:hover)]:md:opacity-0 [@media(hover:hover)]:md:group-hover:grid-rows-[1fr] [@media(hover:hover)]:md:group-hover:opacity-100 ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="line-clamp-3 pt-3 text-[13px] leading-6 text-white/65 sm:text-sm sm:leading-7">
                {project.description}
              </p>

              {/* শুধু মোবাইলে: প্রজেক্ট দেখার ইঙ্গিত */}
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/80 [@media(hover:hover)]:md:hidden">
                View project
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        )}

        {/* নিচের রেখা (শুধু ডেস্কটপ hover) */}
        <span
          aria-hidden="true"
          className="mt-3 hidden h-px w-0 bg-gradient-to-r from-white/40 to-transparent transition-all duration-700 [@media(hover:hover)]:md:block [@media(hover:hover)]:group-hover:w-full"
        />
      </div>
    </article>
  );
}