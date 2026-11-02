import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <article className="group h-full">
      <Link
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title} project`}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E5383B]/60 hover:shadow-[0_28px_60px_-28px_#E5383B] focus-visible:-translate-y-1.5 focus-visible:border-[#E5383B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:border-[#E5383B]"
      >
        {/* কার্ডের ওপরের কিনারায় লাল আলোর রেখা, hover-এ দেখা যায় */}
        <span
          aria-hidden="true"
          className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-[#E5383B] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* ছবির অংশ */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#111417]">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="text-4xl font-bold tracking-tight text-white/10">
                .DevX
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                Project Preview
              </span>
            </div>
          )}

          {/* নিচে গাঢ় gradient, যাতে ছবির সাথে ট্যাগ মানায় */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B]/70 via-transparent to-transparent"
          />

          {/* ক্যাটাগরি ট্যাগ */}
          {project.category && (
            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/80 backdrop-blur">
              {project.category}
            </span>
          )}

          {/* hover করলে তীর বাটন ভেসে ওঠে */}
          <span className="absolute right-3 top-3 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-[#E5383B] text-white opacity-0 shadow-[0_10px_30px_-8px_#E5383B] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>

        {/* লেখার অংশ */}
        <div className="flex flex-1 flex-col px-2 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:scale-150" />
            <h3 className="flex-1 text-lg font-semibold text-white sm:text-xl">
              {project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF4D50]"
            />
          </div>

          {/* টাইপ */}
          {project.type && (
            <p className="mt-2 pl-5 text-xs font-medium uppercase tracking-[0.18em] text-white/45">
              {project.type}
            </p>
          )}

          {/* বিবরণ */}
          {project.description && (
            <p className="mt-3 line-clamp-2 pl-5 text-sm leading-7 text-white/55">
              {project.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}