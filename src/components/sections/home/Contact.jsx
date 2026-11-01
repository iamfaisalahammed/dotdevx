import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Mail,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

import Container from "@/components/ui/Container";
import SectionBackground from "@/components/motion/SectionBackground";

export default function Contact() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello DotDevX, I would like to discuss a website project."
  );

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#08090B] py-24 sm:py-28"
    >
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl border border-[#4F83FF]/25 bg-[#111417]/90 px-6 py-16 text-center backdrop-blur-sm sm:px-12 sm:py-20">
          {/* কার্ডের ভেতরের নীল glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-20 -z-10 bg-[#4F83FF]/[0.08] blur-[100px]"
          />

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F83FF]">
            Let's Work Together
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Have a project in mind?
            <span className="bg-gradient-to-r from-[#4F83FF] via-[#75A0FF] to-[#4F83FF] bg-clip-text text-transparent">
              {" "}Let's build something great.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/55 sm:text-base">
            Tell us about your business and your ideas. Let's
            discuss how we can help bring your next website project
            to life.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F83FF] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4F83FF]/25 transition-all hover:bg-[#75A0FF] hover:shadow-[#75A0FF]/30"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </Link>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-[#75A0FF]/60 hover:text-[#75A0FF]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            )}
          </div>

          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[#75A0FF]"
            >
              <Mail size={16} />
              {siteConfig.contact.email}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}