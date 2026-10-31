import {
  Target,
  Smartphone,
  Gauge,
  MessageCircle,
  Code2,
  Headset,
} from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const reasons = [
  {
    icon: Target,
    title: "Business-Focused Approach",
    description:
      "We understand your business goals and build websites around your actual needs.",
  },
  {
    icon: Smartphone,
    title: "Responsive by Design",
    description:
      "We create layouts that work smoothly across mobile phones, tablets, and desktops.",
  },
  {
    icon: Gauge,
    title: "Performance-Conscious",
    description:
      "We focus on efficient code, optimized assets, and a smooth browsing experience.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description:
      "We keep project discussions and expectations clear throughout the development process.",
  },
  {
    icon: Code2,
    title: "Modern Development",
    description:
      "We use modern web technologies and maintainable development practices.",
  },
  {
    icon: Headset,
    title: "Post-Launch Planning",
    description:
      "We discuss maintenance, support, and future improvements after your website launches.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why DotDevX"
            title="More than just a website."
            description="We combine thoughtful design, modern development, and a business-focused approach to create meaningful digital experiences."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <Reveal key={reason.title} delay={index * 0.06}>
                <article className="group h-full rounded-2xl border border-white/10 bg-[#111417] p-6 transition-all duration-300 hover:border-[#2BFF88]/30 hover:bg-[#14191A] sm:p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2BFF88]/15 bg-[#2BFF88]/10 text-[#2BFF88] transition-colors group-hover:bg-[#2BFF88] group-hover:text-[#04120A]">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}