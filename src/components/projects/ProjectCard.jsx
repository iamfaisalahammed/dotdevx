import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111417] transition-all duration-300 hover:border-[#2BFF88]/30">
      <Link
        href={`/work/${project.slug}`}
        className="block"
        aria-label={`View ${project.title} project`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#171B1E]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-4xl font-bold tracking-tight text-white/10">
                DotDevX
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                Project Preview
              </span>
            </div>
          )}

          {project.type && (
            <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#08090B]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {project.type}
            </span>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2BFF88]">
                {project.category}
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                {project.title}
              </h3>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all group-hover:border-[#2BFF88] group-hover:bg-[#2BFF88] group-hover:text-[#04120A]">
              <ArrowUpRight size={19} />
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/55">
            {project.description}
          </p>

          {project.technologies?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/60"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}