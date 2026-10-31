import { faqs } from "@/data/faqs";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Questions? We've got answers."
            description="Find answers to common questions about our web development services and project process."
          />
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group rounded-xl border border-white/10 bg-[#111417] px-5 transition-colors open:border-[#2BFF88]/30 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-white marker:hidden sm:text-base">
                  {faq.question}

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#2BFF88] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-white/[0.06] pb-5 pt-4">
                  <p className="text-sm leading-7 text-white/55">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}