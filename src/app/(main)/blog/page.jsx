import Link from "next/link";
import Image from "next/image";
import {  ArrowUpRight } from "lucide-react";

import { blogs } from "@/data/blogs";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Blog",
  description:
    "Explore expert insights on website development, React, Next.js, business analytics, custom web applications, and digital solutions for modern businesses.",
  path: "/blog",
  image: "/images/og-image.png",
});

export default async function BlogPage({ searchParams }) {
  // ক্যাটাগরি ফিল্টার (?category=...)
  const { category } = (await searchParams) || {};
  const active = category || "All Posts";

  // ক্যাটাগরি ও কাউন্ট
  const counts = blogs.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});
  const categories = [["All Posts", blogs.length], ...Object.entries(counts)];

  // ফিল্টার করা পোস্ট
  const filtered =
    active === "All Posts" ? blogs : blogs.filter((b) => b.category === active);

  // সাম্প্রতিক পোস্ট
  const recent = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <main className="relative">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-28">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ideas and insights{" "}
              <span className="text-white/40">for the digital world.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Explore practical insights on web development, AI, e-commerce, and
              the technologies shaping the future of business.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_300px]">
        {/* Posts - content-start দিলে কম পোস্টে কার্ড লম্বা হয় না */}
        <div className="grid content-start gap-6 md:grid-cols-2">
          {filtered.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/30"
            >
              <div className="relative h-48 w-full bg-white/5">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                {/* ক্যাটাগরি: নিউট্রাল */}
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                  {blog.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold leading-snug">
                  {blog.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                  {blog.excerpt}
                </p>
                {/* Read more: সাদা, হোভারে তীর লাল */}
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-white/80">
                  Read more
                  <span className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500">
                    ›
                  </span>
                </span>
                <p className="mt-3 font-mono text-xs text-gray-500">
                  {blog.date} · {blog.readTime}
                </p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-400">No posts found.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Categories */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map(([name, count]) => (
                <li key={name}>
                  <Link
                    href={
                      name === "All Posts"
                        ? "/blog"
                        : `/blog?category=${encodeURIComponent(name)}`
                    }
                    className={`flex items-center justify-between border-l-2 px-3 py-2 font-mono text-xs transition ${
                      active === name
                        ? "border-red-500 bg-white/5 text-white"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    {name}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
                      {count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Recent Posts
            </h3>
            <ul className="space-y-4">
              {recent.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white/5">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-xs font-semibold transition group-hover:text-gray-300">
                        {blog.title}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-gray-500">
                        {blog.date}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA - Services সেকশনের মতো: বক্স ছাড়া, লাইনের মাঝে */}
          <div className="border-y border-white/40 py-6">
            <h3 className="text-lg font-semibold text-white">
              Have a project in mind?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Let&apos;s discuss your requirements and find the right solution.
            </p>

            {/* লাল বৃত্ত: হোভার করলে তীর ঘুরবে (এটাই মূল লাল হাইলাইট) */}
            <Link
              href="/contact"
              className="group mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get a Quote
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}