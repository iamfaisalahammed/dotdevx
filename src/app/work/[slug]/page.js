
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
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

  const project = projects.find(
    (item) => item.slug === slug
  );

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

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-[#2BFF88]"
        >
          <ArrowLeft size={17} />
          Back to Work
        </Link>

        <div className="mt-12 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2BFF88]">
            {project.type || "Project"}
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-6 text-base leading-8 text-white/55">
            {project.description}
          </p>

          <p className="mt-4 text-sm text-white/40">
            Category: {project.category}
          </p>

          {project.technologies?.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/65"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-14">
          <ProjectGallery
            images={project.gallery || []}
            title={project.title}
          />
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-[#2BFF88]/40 hover:text-[#2BFF88]"
            >
              View Live Project
              <ArrowUpRight size={17} />
            </a>
          )}

          <Button href="/contact">
            Discuss a Similar Project
            <ArrowUpRight size={17} />
          </Button>
        </div>

        {project.type === "Concept Project" && (
          <p className="mt-8 text-xs leading-6 text-white/40">
            This is a concept project created for demonstration purposes.
            It is not presented as commissioned client work.
          </p>
        )}
      </Container>
    </main>
  );
}
