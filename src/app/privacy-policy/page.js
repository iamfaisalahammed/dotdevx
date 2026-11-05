import Container from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the .DevX Privacy Policy to understand how we handle personal information, contact details, and project inquiries shared through our website and communication channels.",
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
      "We may use third-party services for website analytics, communication, and other functionality. These services may process information according to their own privacy policies and terms.",
  },
  {
    title: "Data Storage",
    content:
      "Our website does not currently use user accounts or a database-backed inquiry system. Messages are handled by the services you use to contact us.",
  },
  {
    title: "Cookies & Analytics",
    content:
      "We may use cookies, analytics tools, and similar technologies to understand website usage, monitor performance, and improve user experience. These tools may collect technical information such as browser type, device details, and website interactions.",
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
              Privacy <span className="text-white/50">Policy</span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
              How we handle information shared through our website and
              communication channels.
            </p>
          </div>
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