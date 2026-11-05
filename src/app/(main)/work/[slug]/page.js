// app/work/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";

import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | .DevX",
      description: "The requested project could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createMetadata({
    title: `${project.title} | Web Development Project`,
    description: project.description,
    path: `/work/${project.slug}`,
    image: project.image || "/images/og-image.png",
  });
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const hasTech = project.technologies?.length > 0;

  // gallery না থাকলে main image fallback হিসেবে ব্যবহার হবে
  const galleryImages = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      {/* Background: খুব হালকা glow আর dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[360px] -translate-x-1/2 blur-[140px] sm:h-[520px] sm:w-[720px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="py-16 sm:py-24 lg:py-28">
        {/* Back */}
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 transition-colors duration-300 [-webkit-tap-highlight-color:transparent] active:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [@media(hover:hover)]:hover:border-white/25 [@media(hover:hover)]:hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-x-0.5"
          />
          Back to Work
        </Link>

        {/* Header */}
        <header className="mt-10 max-w-3xl sm:mt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B]" />
            {project.type || "Project"}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="mt-5 text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
            {project.description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [@media(hover:hover)]:hover:bg-white/90"
              >
                View Live Project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
                />
              </a>
            )}

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 [-webkit-tap-highlight-color:transparent] active:scale-[0.98] active:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white [@media(hover:hover)]:hover:border-white/35 [@media(hover:hover)]:hover:bg-white/[0.05]"
            >
              Discuss a Similar Project
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </header>

        {/* Info strip */}
        {(project.category || project.type || hasTech) && (
          <dl className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] sm:mt-16">
            <div className="grid divide-y divide-white/10 md:grid-cols-[1fr_1fr_2fr] md:divide-x md:divide-y-0">
              {project.category && (
                <div className="p-5 sm:p-6">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Category
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-white">
                    {project.category}
                  </dd>
                </div>
              )}

              {project.type && (
                <div className="p-5 sm:p-6">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Project Type
                  </dt>
                  <dd className="mt-2 text-base font-semibold text-white">
                    {project.type}
                  </dd>
                </div>
              )}

              {hasTech && (
                <div className="p-5 sm:p-6">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Built with
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition-colors duration-300 [@media(hover:hover)]:hover:border-white/30 [@media(hover:hover)]:hover:text-white"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </div>
          </dl>
        )}

        {/* Gallery */}
        <section
          aria-label={`${project.title} gallery`}
          className="mt-10 min-w-0 sm:mt-14"
        >
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {galleryImages.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className={`relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${project.title} preview ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/40">No preview images available.</p>
          )}
        </section>

        {/* Concept note */}
        {(project.type === "Concept Project" ||
          project.type === "Demo Project") && (
          <p className="mt-10 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-xs leading-6 text-white/50 sm:text-sm sm:leading-7">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5383B]" />
            This is a concept project created for demonstration purposes. It is
            not presented as commissioned client work.
          </p>
        )}

        {/* Bottom CTA */}
        <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 sm:mt-24 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Have a similar idea in mind?
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/55 sm:text-base">
              Tell us what you need and we will help you shape it into a
              working product.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:shrink-0 [@media(hover:hover)]:hover:bg-white/90"
          >
            Start a Project
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:translate-x-0.5"
            />
          </Link>
        </section>
      </Container>
    </main>
  );
}