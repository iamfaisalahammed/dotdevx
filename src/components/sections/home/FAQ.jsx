import { faqs } from "@/data/faqs";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionBackground from "@/components/motion/SectionBackground";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#0C0E10] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Questions? We've got answers."
          description="Find answers to common questions about our web development services and project process."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-white/10 bg-[#111417]/90 px-5 backdrop-blur-sm transition-all duration-300 hover:border-[#4F83FF]/25 open:border-[#4F83FF]/40 open:shadow-lg open:shadow-[#4F83FF]/10 sm:px-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-sm font-semibold text-white marker:hidden sm:text-base">
                {faq.question}

                {/* খুললে + ঘুরে × হবে */}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#4F83FF] transition-all duration-200 group-hover:bg-[#4F83FF]/10 group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="border-t border-white/[0.06] pb-5 pt-4">
                <p className="text-sm leading-7 text-white/55">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}