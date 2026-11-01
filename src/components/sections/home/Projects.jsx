import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionBackground from "@/components/motion/SectionBackground";

export default function Projects() {
  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Ideas transformed into digital experiences."
          description="Explore our project concepts and see how we approach modern website design and development."
          align="center"
        />

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-white/40">
              Concept projects are design explorations and are not
              presented as commissioned client work.
            </p>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111417]/90 px-6 py-16 text-center backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white">
              Our portfolio is taking shape.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
              We are preparing project showcases. Get in touch to
              discuss what we can build for your business.
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#111417]/90 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[#4F83FF]/30 sm:flex-row sm:p-9">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Have an idea for your next website?
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/50">
              Let’s turn your business idea into a digital experience.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#4F83FF] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4F83FF]/25 transition-all hover:bg-[#75A0FF] hover:shadow-[#75A0FF]/30"
          >
            Start Your Project
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </Container>
    </section>
  );
}