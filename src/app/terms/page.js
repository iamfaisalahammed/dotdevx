
import Container from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Read the terms for using the .DevX website and services.",
  path: "/terms",
});

const sections = [
  {
    title: "Website Use",
    content:
      "This website provides general information about .DevX and its services. You agree to use it responsibly and lawfully.",
  },
  {
    title: "Project Agreements",
    content:
      "Project scope, deliverables, timelines, and responsibilities will be agreed upon before development begins.",
  },
  {
    title: "Pricing & Payment",
    content:
      "Pricing depends on project requirements and complexity. Payment terms will be discussed and confirmed before work begins.",
  },
  {
    title: "Intellectual Property",
    content:
      "Ownership and usage rights for project deliverables will be agreed upon between both parties.",
  },
  {
    title: "Third-Party Services",
    content:
      "Our website may contain links to external services. We are not responsible for their content or policies.",
  },
  {
    title: "Changes & Contact",
    content:
      "We may update these terms when necessary. For questions, contact us through the information provided on our website.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#E5383B]/70" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Legal
            </span>

            <span className="h-px w-8 bg-[#E5383B]/70" />
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Terms <span className="text-white/50">&amp; Conditions</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
            General terms for using our website and services.
          </p>
        </div>

        <div className="mx-auto max-w-3xl border-t border-white/15">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-white/15 py-7 sm:py-8"
            >
              <h2 className="flex items-center gap-3 text-lg font-semibold text-white sm:text-xl">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5383B]" />
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
