// app/work/page.jsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Container from "@/components/ui/Container";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/motion/Reveal";

import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/seo";

// SEO metadata for the work page
export const metadata = createMetadata({
  title: "Web Development Portfolio",
  description:
    "Explore .DevX website development portfolio, including creative website concepts, modern web designs, and digital experiences built with modern technologies.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090B] text-white">
      {/* Background: হালকা glow + dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#E5383B]/[0.07] blur-[140px] sm:h-[480px] sm:w-[720px]"
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

      <Container className="py-20 sm:py-28 lg:py-32">
        {/* Back to Home বাটন */}
        <Reveal>
          <Link
            href="/"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 transition-all hover:border-[#E5383B]/60 hover:text-white sm:mb-10"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            Back to Home
          </Link>
        </Reveal>

        {/* Header — Services সেকশনের প্যাটার্ন: বামে সাজানো, লেবেল ছাড়া */}
        <Reveal>
          <header className="mb-10 max-w-2xl sm:mb-12">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ideas <span className="text-white/40">brought to life.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Explore our project concepts and digital experience designs.
            </p>

            {/* প্রজেক্ট সংখ্যা */}
            {projects.length > 0 && (
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                {String(projects.length).padStart(2, "0")}{" "}
                {projects.length === 1 ? "Project" : "Projects"}
              </p>
            )}
          </header>
        </Reveal>

        {/* Project cards */}
        <div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  delay={(index % 3) * 0.06}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-14 text-center">
              <h2 className="flex items-center justify-center gap-2 text-xl font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B]" />
                Portfolio coming soon
              </h2>
              <p className="mt-3 text-sm text-white/55">
                We are preparing our project showcases.
              </p>
            </div>
          )}
        </div>

        {/* Concept note */}
        <p className="mt-14 max-w-xl text-xs leading-6 text-white/40 sm:mt-20">
          Concept projects are not presented as commissioned client work.
        </p>
      </Container>
    </main>
  );
}