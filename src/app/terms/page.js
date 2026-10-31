
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Read the general terms for using the DotDevX website and discussing our services.",
  path: "/terms",
});

const sections = [
  {
    title: "Website Information",
    content:
      "The content on this website is provided for general information about DotDevX and its services. Service descriptions may be updated as our offerings evolve.",
  },
  {
    title: "Project Agreements",
    content:
      "Every project should have an agreed scope, deliverables, timeline, pricing, payment arrangements, and responsibilities before development begins. The specific agreement between the parties will govern the project.",
  },
  {
    title: "Pricing and Quotations",
    content:
      "Project pricing depends on requirements, complexity, features, and scope. Any quotation should be considered subject to the terms and validity period stated in that quotation.",
  },
  {
    title: "Intellectual Property",
    content:
      "Ownership, licensing, source code delivery, third-party assets, and usage rights should be clearly agreed upon in the relevant project agreement.",
  },
  {
    title: "Third-Party Services",
    content:
      "This website may link to external websites or services. DotDevX does not control their content, availability, or policies.",
  },
  {
    title: "Website Availability",
    content:
      "We aim to keep this website accessible and its information useful, but uninterrupted availability and error-free operation cannot be guaranteed.",
  },
  {
    title: "Changes to These Terms",
    content:
      "These terms may be updated as the website and services change. The latest published version will apply to use of this website.",
  },
  {
    title: "Contact",
    content:
      "For questions about these terms, please contact DotDevX through the contact information published on this website.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading
          eyebrow="Legal"
          title="Terms & Conditions"
          description="General terms concerning the use of the DotDevX website and its services."
          align="left"
        />

        <div className="max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-8 text-white/55">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
