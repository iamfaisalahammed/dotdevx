import { Code2, Layers3 } from "lucide-react";

import { technologies } from "@/data/technologies";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

export default function Technologies() {
  const groupedTechnologies = technologies.reduce((groups, technology) => {
    const category = technology.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(technology);

    return groups;
  }, {});

  return (
    <section
      id="technologies"
      className="border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Technology Stack"
            title="Built with modern web technologies."
            description="We select technologies based on project requirements, focusing on usability, maintainability, and performance."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {Object.entries(groupedTechnologies).map(
            ([category, items], index) => (
              <Reveal key={category} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#111417] p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2BFF88]/10 text-[#2BFF88]">
                      <Layers3 size={20} />
                    </div>

                    <h3 className="font-semibold text-white">
                      {category}
                    </h3>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {items.map((technology) => (
                      <span
                        key={technology.name}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/75 transition-colors hover:border-[#2BFF88]/30 hover:text-[#2BFF88]"
                      >
                        <Code2 size={15} className="text-[#2BFF88]" />
                        {technology.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )
          )}
        </div>

        <p className="mt-7 text-center text-xs leading-6 text-white/40">
          Technologies are selected according to the specific needs of each project.
        </p>
      </Container>
    </section>
  );
}