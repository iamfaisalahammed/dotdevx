import {
  ShoppingBag,
  Rocket,
  GraduationCap,
  Utensils,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

import { industries } from "@/data/industries";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionBackground from "@/components/motion/SectionBackground";

const industryIcons = {
  "E-commerce": ShoppingBag,
  Startups: Rocket,
  Education: GraduationCap,
  Restaurants: Utensils,
  "Professional Services": BriefcaseBusiness,
  "Local Businesses": Building2,
};

export default function Industries() {
  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <SectionHeading
          eyebrow="Who We Work With"
          title="Digital solutions for different industries."
          description="We work with businesses and professionals who want to establish or improve their online presence."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.title] || Building2;

            return (
              <article
                key={industry.title}
                className="group flex h-full items-start gap-5 rounded-2xl border border-white/10 bg-[#111417]/90 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4F83FF]/40 hover:shadow-lg hover:shadow-[#4F83FF]/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#4F83FF] transition-colors group-hover:bg-[#4F83FF]/10 group-hover:text-[#75A0FF]">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {industry.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-white/55">
                    {industry.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}