import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import ProjectGallery from "@/components/projects/ProjectGallery";

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
      title: "Project Not Found",
    };
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090B] text-white">
      {/* পেছনের আভা আর হালকা grid — এখানে কোনো Reveal নেই, শুধু CSS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-[420px] w-[420px] animate-pulse rounded-full bg-[#E5383B]/[0.12] blur-[130px] sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(#E5383B 1px, transparent 1px), linear-gradient(90deg, #E5383B 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="py-20 sm:py-28 lg:py-32">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <ArrowLeft
            size={17}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Work
        </Link>

        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          {/* বামে: প্রজেক্টের তথ্য, বড় স্ক্রিনে গ্যালারি স্ক্রল করলেও আটকে থাকবে */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B]" />
              {project.type || "Project"}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-white/55">
              {project.description}
            </p>

            {/* ক্যাটাগরি আর টেকনোলজি */}
            <dl className="mt-8 border-t border-white/10">
              {project.category && (
                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-4 text-sm">
                  <dt className="text-white/45">Category</dt>
                  <dd className="text-right font-medium text-white">
                    {project.category}
                  </dd>
                </div>
              )}

              {project.technologies?.length > 0 && (
                <div className="border-b border-white/10 py-4 text-sm">
                  <dt className="text-white/45">Built with</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/70 transition-colors duration-300 hover:border-[#E5383B]/60 hover:text-white"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            {/* বাটন */}
            <div className="mt-8 flex flex-col items-stretch gap-4 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#E5383B] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_#E5383B] transition-shadow duration-300 hover:shadow-[0_16px_50px_-8px_#E5383B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
                />
                <span className="relative">Discuss a Similar Project</span>
                <ArrowUpRight
                  size={17}
                  className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#E5383B] hover:text-[#FF6B6F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  View Live Project
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>

            {project.type === "Concept Project" && (
              <p className="mt-8 flex gap-3 border-t border-white/10 pt-6 text-xs leading-6 text-white/45">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5383B]" />
                This is a concept project created for demonstration purposes.
                It is not presented as commissioned client work.
              </p>
            )}
          </div>

          {/* ডানে: গ্যালারি */}
          <div className="min-w-0">
            <ProjectGallery
              images={project.gallery || []}
              title={project.title}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}