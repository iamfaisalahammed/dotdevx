import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service, index = 0 }) {
  if (!service) return null;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#111417]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4F83FF]/40 hover:shadow-lg hover:shadow-[#4F83FF]/10 sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wider text-[#4F83FF] transition-colors group-hover:text-[#75A0FF]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <ArrowUpRight
          size={20}
          className="text-white/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#4F83FF]"
        />
      </div>

      <h3 className="text-xl font-semibold text-white">
        {service.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-7 text-white/55">
        {service.description}
      </p>

      <Link
        href={`/services/${service.slug}`}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#4F83FF] transition-colors hover:text-[#75A0FF]"
      >
        Explore Service
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}