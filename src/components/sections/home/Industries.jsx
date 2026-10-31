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
import Reveal from "@/components/motion/Reveal";

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
      className="border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who We Work With"
            title="Digital solutions for different industries."
            description="We work with businesses and professionals who want to establish or improve their online presence."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industryIcons[industry.title] || Building2;

            return (
              <Reveal key={industry.title} delay={index * 0.06}>
                <article className="group flex h-full items-start gap-5 rounded-2xl border border-white/10 bg-[#111417] p-6 transition-colors duration-300 hover:border-[#2BFF88]/30">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#2BFF88] transition-colors group-hover:bg-[#2BFF88]/10">
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
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}