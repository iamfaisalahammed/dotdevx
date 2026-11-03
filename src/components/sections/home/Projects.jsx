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
      aria-labelledby="work-heading"
      className="border-t border-white/[0.06] bg-[#08090B] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        {/* হেডিং — Technologies সেকশনের প্যাটার্ন: বামে সাজানো, লেবেল ছাড়া */}
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2
            id="work-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ideas transformed into{" "}
            <span className="text-white/40">digital experiences.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
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

            <p className="mt-10 text-xs leading-6 text-white/40">
              Concept projects are design explorations and are not presented as
              commissioned client work.
            </p>
          </>
        ) : (
          // প্রজেক্ট না থাকলে: বক্স ছাড়া, লাল লাইনের মাঝে
          <div className="max-w-2xl border-y border-[#E5383B]/40 py-12 sm:py-14">
            <h3 className="text-xl font-semibold text-white">
              Our portfolio is taking shape.
            </h3>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/55">
              We are preparing project showcases. Get in touch to discuss what
              we can build for your business.
            </p>
          </div>
        )}

        {/* নিচের CTA: বক্স ছাড়া, লাল লাইনের মাঝে */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-y border-[#ffffff]/40 py-8 sm:flex-row sm:items-center">
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
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Start Your Project
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
