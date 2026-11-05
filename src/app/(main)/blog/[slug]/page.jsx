import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { blogs } from "@/data/blogs";
import Container from "@/components/ui/Container";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

// date স্ট্রিং থেকে ISO তারিখ, ভুল হলে undefined
const toISO = (d) => {
  const t = new Date(d);
  return isNaN(t) ? undefined : t.toISOString();
};

// কভার ইমেজের পুরো URL (SEO/OG-র জন্য)
const absolute = (src) =>
  src?.startsWith("http") ? src : `${SITE_URL}${src || ""}`;

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return {};

  // Blog-specific SEO data
  const seoTitle = blog.seo?.title || blog.title;
  const description = blog.seo?.description || blog.excerpt;
  const keywords = blog.seo?.keywords;

  const url = `${SITE_URL}/blog/${blog.slug}`;
  const title = `${seoTitle} | .DevX`;
  const image = absolute(blog.coverImage);

  return {
    title,
    description,

    ...(keywords?.length ? { keywords } : {}),

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: ".DevX",
      type: "article",
      publishedTime: toISO(blog.date),
      images: [
        {
          url: image,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  // সেকশনের id (সূচিপত্রের লিংকের জন্য)
  const sections = blog.content.map((s, i) => ({
    ...s,
    id: `section-${i + 1}`,
  }));

  // রিলেটেড পোস্ট: আগে একই ক্যাটাগরি, কম হলে বাকিগুলো থেকে
  const others = blogs.filter((b) => b.slug !== blog.slug);
  const related = [
    ...others.filter((b) => b.category === blog.category),
    ...others.filter((b) => b.category !== blog.category),
  ].slice(0, 2);

  // SEO: structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo?.description || blog.excerpt,
    image: absolute(blog.coverImage),
    datePublished: toISO(blog.date),
    mainEntityOfPage: `${SITE_URL}/blog/${blog.slug}`,
    author: { "@type": "Person", name: blog.author || ".DevX Team" },
    publisher: { "@type": "Organization", name: ".DevX" },
    ...(blog.seo?.keywords?.length
      ? { keywords: blog.seo.keywords.join(", ") }
      : {}),
  };

  return (
    <main className="min-h-screen bg-[#0C0E10] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-white/[0.06] pb-12 pt-28 sm:pb-14 sm:pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">

            <span className="block font-mono text-[11px] font-medium uppercase tracking-widest text-white/50">
              {blog.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 text-base leading-8 text-white/55 sm:text-lg">
                {blog.excerpt}
              </p>
            )}

            {/* লেখক, তারিখ, পড়ার সময় */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-white/45">
              {blog.author && (
                <>
                  <span className="text-white/70">{blog.author}</span>
                  <span aria-hidden>·</span>
                </>
              )}
              <time dateTime={toISO(blog.date)}>{blog.date}</time>
              <span aria-hidden>·</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </Container>
      </header>

      <Container>
        {/* কভার ইমেজ */}
        <div className="relative mx-auto -mt-px mb-12 mt-10 h-56 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-80 lg:h-[26rem]">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 pb-20 lg:grid-cols-[1fr_220px]">
          {/* আর্টিকেল: পড়ার জন্য আরামদায়ক লাইন-দৈর্ঘ্য ও লাইন-হাইট */}
          <article className="min-w-0 max-w-[44rem]">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="mb-5 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-[28px]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mb-5 text-[17px] leading-[1.85] text-white/75"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}

            {/* CTA */}
            <div className="mt-4 flex flex-col items-start justify-between gap-6 border-y border-white/20 py-8 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Have a project in mind?
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Let&apos;s discuss your requirements and find the right
                  solution.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Get a Quote
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            </div>
          </article>

          {/* সূচিপত্র: ডেস্কটপে স্টিকি */}
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28">
              <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/50">
                On this page
              </h2>
              <ul className="space-y-1 border-l border-white/10">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-white/50 transition hover:border-[#E5383B] hover:text-white"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* রিলেটেড পোস্ট */}
        {related.length > 0 && (
          <section
            aria-label="Related posts"
            className="mx-auto max-w-5xl border-t border-white/[0.06] pb-20 pt-12"
          >
            <h2 className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/50">
              Keep Reading
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-white transition hover:border-white/25 hover:text-white"
                >
                  <div className="relative h-40 w-full bg-white/5">
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/50">
                      {r.category}
                    </span>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-white group-hover:text-white">
                      {r.title}
                    </h3>
                    <p className="mt-4 font-mono text-xs text-white/40">
                      {r.date} · {r.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}