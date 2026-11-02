import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <article className="group">
      <Link
        href={`/work/${project.slug}`}
        className="block outline-none"
        aria-label={`View ${project.title} project`}
      >
        {/* বাইরের ফ্রেম: hover, click ও keyboard focus-এ লাল border */}
        <div className="border-2 border-white/30 p-2 transition-colors duration-300 group-hover:border-[#E5383B] group-focus-visible:border-[#E5383B] group-active:border-[#E5383B]">
          {/* ভেতরের ছবি */}
          <div className="relative aspect-[16/9] overflow-hidden bg-[#111417]">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          </div>
        </div>

        {/* নিচের টাইটেল: ধূসর লাইন + লাল ডট + নাম */}
        <div className="mt-5 flex items-center gap-3">
          <span className="h-px w-8 bg-white/30" />
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#E5383B] transition-transform duration-300 group-hover:scale-150" />
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {project.title}
          </h3>
        </div>

        {/* ক্যাটাগরি ও টাইপ */}
        {(project.category || project.type) && (
          <p className="mt-2 pl-[3.75rem] text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            {[project.category, project.type].filter(Boolean).join("  /  ")}
          </p>
        )}

        {/* বিবরণ */}
        {project.description && (
          <p className="mt-3 line-clamp-2 pl-[3.75rem] text-sm leading-7 text-white/55">
            {project.description}
          </p>
        )}
      </Link>
    </article>
  );
}