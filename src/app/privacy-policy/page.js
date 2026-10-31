
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how DotDevX handles information shared through its website and communication channels.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information You Share",
    content:
      "When you contact us through email or WhatsApp, you may choose to share your name, contact details, project requirements, and other information relevant to your inquiry.",
  },
  {
    title: "How We Use Information",
    content:
      "Information you share may be used to respond to inquiries, understand project requirements, communicate with you, and discuss potential services.",
  },
  {
    title: "Third-Party Services",
    content:
      "When you use WhatsApp, email, or other external services to contact us, your communication is also subject to the privacy policies and practices of those providers.",
  },
  {
    title: "Data Storage",
    content:
      "The current website does not provide user accounts or a database-backed inquiry system. Messages sent through external communication services are handled by those services.",
  },
  {
    title: "Cookies and Analytics",
    content:
      "Website hosting or third-party tools may process technical information. Any analytics, tracking, or cookie-based features introduced in the future should be reflected in an updated version of this policy.",
  },
  {
    title: "Policy Updates",
    content:
      "We may update this Privacy Policy when our website, services, or information-handling practices change.",
  },
  {
    title: "Contact",
    content:
      "For questions about this policy, please contact DotDevX through the contact details published on our website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="How information shared through our website and communication channels is handled."
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
