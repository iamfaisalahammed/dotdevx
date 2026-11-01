import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section
      id="work"
      className="border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      <Container>
        {/* হেডিং */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#E5383B]/70" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Selected Work
            </span>
            <span className="h-px w-8 bg-[#E5383B]/70" />
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ideas transformed into{" "}
            <span className="text-white/50">digital experiences.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Explore our project concepts and see how we approach modern website
            design and development.
          </p>
        </div>

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            <p className="mt-10 text-center text-xs leading-6 text-white/40">
              Concept projects are design explorations and are not presented as
              commissioned client work.
            </p>
          </>
        ) : (
          // প্রজেক্ট না থাকলে: বক্স ছাড়া, লাল লাইনের মাঝে
          <div className="mx-auto max-w-2xl border-y border-[#E5383B]/40 px-6 py-14 text-center">
            <h3 className="text-xl font-semibold text-white">
              Our portfolio is taking shape.
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/55">
              We are preparing project showcases. Get in touch to discuss what
              we can build for your business.
            </p>
          </div>
        )}

        {/* নিচের CTA: বক্স ছাড়া, লাল লাইনের মাঝে */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-y border-[#E5383B]/40 py-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Have an idea for your next website?
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Let&apos;s turn your business idea into a digital experience.
            </p>
          </div>

          {/* লাল বাটন: hover করলে তীর কোণায় সরে যাবে */}
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5252A] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#E5252A]
"
          >
            Start Your Project
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}