
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
        <Reveal>
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Ideas brought to life."
            description="Explore our project concepts and digital experience designs."
          />
        </Reveal>

        {projects.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

            <p className="mt-7 text-center text-xs text-white/40">
              Concept projects are not presented as commissioned client work.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111417] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
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
