
import Link from "next/link";
import { Mail, MessageCircle, Phone, ArrowUpRight } from "lucide-react";


import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectInquiryForm from "@/components/forms/ProjectInquiryForm";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact DotDevX to discuss your website or web development project.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = siteConfig;

  const whatsappUrl = getWhatsAppUrl(
    "Hello DotDevX, I would like to discuss a project."
  );

  return (
    <main className="min-h-screen bg-[#08090B] text-white">
      <Container className="py-24 sm:py-32">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's talk about your next project."
          description="Tell us what you have in mind. We will discuss your requirements and the right next steps."
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">
              Get in touch
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/55">
              Choose a contact method or send us your project details
              using the inquiry form.
            </p>

            <div className="mt-8 space-y-5">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 text-sm text-white/70 hover:text-[#2BFF88]"
                >
                  <Mail className="text-[#2BFF88]" />
                  {contact.email}
                </a>
              )}

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 text-sm text-white/70 hover:text-[#2BFF88]"
                >
                  <Phone className="text-[#2BFF88]" />
                  {contact.phone}
                </a>
              )}

              {contact.location && (
                <p className="text-sm text-white/60">
                  {contact.location}
                </p>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2BFF88]/30 px-5 py-3 text-sm font-semibold text-[#2BFF88] hover:bg-[#2BFF88]/10"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111417] p-6 sm:p-8">
            <h2 className="mb-7 text-2xl font-semibold">
              Tell us about your project
            </h2>

            <ProjectInquiryForm />
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/services"
            className="text-sm text-[#2BFF88] hover:text-white"
          >
            Explore our services →
          </Link>
        </div>
      </Container>
    </main>
  );
}
