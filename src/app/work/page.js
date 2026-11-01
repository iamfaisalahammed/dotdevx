import Container from "@/components/ui/Container";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/motion/Reveal";

import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Our Work",
  description:
    "Explore website development concepts and project showcases by DotDevX.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        {/* Heading */}
        <Reveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#E5383B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5383B]">
                Our Portfolio
              </span>
              <span className="h-px w-8 bg-[#E5383B]" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ideas{" "}
              <span className="text-white/50">brought to life.</span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
              Explore our project concepts and digital experience designs.
            </p>
          </div>
        </Reveal>

        {projects.length > 0 ? (
          <>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  delay={index * 0.06}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>

            <p className="mt-14 border-t border-white/15 pt-7 text-center text-xs text-white/40">
              Concept projects are not presented as commissioned client work.
            </p>
          </>
        ) : (
          <div className="border-y border-white/15 px-6 py-16 text-center">
            <h2 className="flex items-center justify-center gap-2 text-xl font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B]" />
              Portfolio coming soon
            </h2>

            <p className="mt-3 text-sm text-white/50">
              We are preparing our project showcases.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}