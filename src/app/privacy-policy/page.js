
import Container from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Learn how .DevX handles information shared through its website and communication channels.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information You Share",
    content:
      "You may share your name, contact details, and project requirements when contacting us through email or WhatsApp.",
  },
  {
    title: "How We Use Information",
    content:
      "We use shared information to respond to inquiries, understand project needs, and discuss our services.",
  },
  {
    title: "Third-Party Services",
    content:
      "Communications through WhatsApp, email, or other external services are subject to their respective privacy policies.",
  },
  {
    title: "Data Storage",
    content:
      "Our website does not currently use user accounts or a database-backed inquiry system. Messages are handled by the services you use to contact us.",
  },
  {
    title: "Cookies & Analytics",
    content:
      "Our website may use analytics and technical tools to understand website usage and improve user experience.",
  },
  {
    title: "Policy Updates",
    content:
      "We may update this policy when our website, services, or information-handling practices change.",
  },
  {
    title: "Contact",
    content:
      "For questions about this policy, contact us using the details provided on our website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">

        {/* Page Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#E5383B]/70" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Legal
            </span>

            <span className="h-px w-8 bg-[#E5383B]/70" />
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Privacy <span className="text-white/50">Policy</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
            How we handle information shared through our website and communication channels.
          </p>
        </div>

        {/* Policy Sections */}
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
