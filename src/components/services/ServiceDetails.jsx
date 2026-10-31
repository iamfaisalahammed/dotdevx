import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ServiceDetails({ service }) {
  if (!service) return null;

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#2BFF88]"
        >
          <ArrowLeft size={16} />
          All Services
        </Link>

        <div className="mt-12 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2BFF88]">
            Our Services
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>

          <p className="mt-6 text-base leading-8 text-white/55 sm:text-lg">
            {service.description}
          </p>

          <div className="mt-9">
            <Button href="/contact" size="lg">
              Discuss Your Project
              <ArrowUpRight size={18} />
            </Button>
          </div>
        </div>

        {service.features?.length > 0 && (
          <div className="mt-20 max-w-3xl">
            <h2 className="text-2xl font-semibold">
              What's Included
            </h2>

            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2BFF88]/10 text-[#2BFF88]">
                    <Check size={15} />
                  </span>

                  <span className="text-sm leading-6 text-white/75">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}