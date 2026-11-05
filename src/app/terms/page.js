import Container from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Review the .DevX Terms and Conditions covering website usage, project agreements, pricing, payments, intellectual property, and third-party services.",
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
      "Upon completion and full payment, clients receive ownership of the project deliverables, including the complete source code and project files. Third-party assets and services remain subject to their respective licenses and terms.",
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
        {/* Page Heading */}
        <div className="mx-auto mb-14 max-w-3xl sm:mb-16">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-300 transition hover:border-red-500/60 hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="transition group-hover:-translate-x-1"
            />
            Back to Home
          </Link>

          {/* Centered Title & Description */}
          <div className="text-center">
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Terms <span className="text-white/50">&amp; Conditions</span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
              General terms for using our website and services.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
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