
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  Sparkles,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import ProjectInquiryForm from "@/components/forms/ProjectInquiryForm";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact .DevX | Web Development Agency",
  description:
    "Get in touch with .DevX to discuss your website, business website, e-commerce platform, or custom web development project in Bangladesh and worldwide.",
  path: "/contact",
});

// WhatsApp configuration
const WHATSAPP_NUMBER = "8801820037321";
const WHATSAPP_DISPLAY = "+880 1820 037321";
const WHATSAPP_MESSAGE =
  "Hello .DevX, I would like to discuss a project.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// Contact process
const steps = [
  {
    title: "Share your idea",
    text: "Fill the form or message us on WhatsApp.",
  },
  {
    title: "We review it",
    text: "We go through your requirements carefully.",
  },
  {
    title: "Let's plan",
    text: "We discuss scope, timeline and next steps.",
  },
];

// WhatsApp icon
function WhatsAppIcon({ size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Contact information row
function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#FF4D50] ring-1 ring-white/10 transition-all duration-300 group-hover:bg-[#E5383B] group-hover:text-white group-hover:ring-transparent">
        <Icon size={19} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-white/45">{label}</span>
        <span className="mt-0.5 block break-words text-sm font-medium text-white sm:text-base">
          {value}
        </span>
      </span>

      {href && (
        <ArrowUpRight
          size={18}
          className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF4D50]"
        />
      )}
    </>
  );

  const base =
    "group flex items-center gap-4 rounded-2xl p-3 transition-colors duration-300";

  return href ? (
    <a
      href={href}
      className={`${base} hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090B] text-white">
      {/* Background glow and grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-20 -z-10 h-[420px] w-[420px] animate-pulse rounded-full bg-[#E5383B]/[0.14] blur-[130px] sm:h-[560px] sm:w-[560px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 -z-10 h-[360px] w-[360px] rounded-full bg-[#25D366]/[0.06] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="py-20 sm:py-28 lg:py-32">
        {/* Heading */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
            </span>

            <span className="text-sm text-white/70">
              Available for new projects
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            Let&apos;s talk{" "}
            <span className="bg-gradient-to-r from-white/60 to-white/25 bg-clip-text text-transparent">
              about your next project.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            Tell us what you have in mind. We will discuss your requirements
            and the right next steps.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-14">
          {/* Contact information */}
          <Reveal delay={0.1} className="space-y-5 lg:sticky lg:top-28">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp ${WHATSAPP_DISPLAY}`}
              className="group relative block overflow-hidden rounded-3xl border border-[#25D366]/25 bg-gradient-to-br from-[#25D366]/[0.14] via-white/[0.03] to-transparent p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-[#25D366]/50 hover:shadow-[0_24px_60px_-24px_#25D366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/10 transition-all duration-700 group-hover:left-[150%]"
              />

              <div className="relative flex items-start justify-between gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_10px_30px_-8px_#25D366] sm:h-16 sm:w-16">
                  <WhatsAppIcon size={30} />
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                  <Sparkles size={12} className="text-[#25D366]" />
                  Fastest way
                </span>
              </div>

              <div className="relative mt-6">
                <span className="block text-sm text-white/60">
                  Chat on WhatsApp
                </span>

                <span className="mt-1 block text-2xl font-bold tracking-tight min-[400px]:text-3xl">
                  {WHATSAPP_DISPLAY}
                </span>
              </div>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm font-medium text-[#25D366]">
                  Start chat
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#08090B] transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>

            {/* Email, phone and location */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur">
              {contact.email && (
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
              )}

              {contact.phone && (
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={contact.phone}
                  href={`tel:${contact.phone}`}
                />
              )}

              {contact.location && (
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  value={contact.location}
                />
              )}
            </div>

            {/* Next steps */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <p className="text-sm font-semibold text-white">
                What happens next
              </p>

              <ol className="mt-5 space-y-5">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5383B]/15 text-sm font-semibold text-[#FF4D50] ring-1 ring-[#E5383B]/30">
                      {i + 1}
                    </span>

                    <span>
                      <span className="block text-sm font-medium text-white">
                        {step.title}
                      </span>

                      <span className="mt-0.5 block text-sm leading-6 text-white/50">
                        {step.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Inquiry form */}
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-40px_rgba(229,56,59,0.5)] backdrop-blur-xl sm:p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[#E5383B] to-transparent"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#E5383B]/20 blur-[90px]"
              />

              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5383B] text-white shadow-[0_10px_30px_-10px_#E5383B]">
                  <Send size={19} />
                </span>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Tell us about your project
                </h2>

                <p className="mt-2 mb-7 text-sm leading-7 text-white/55 sm:mb-8">
                  Share a few details and we will get back to you.
                </p>

                <ProjectInquiryForm />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Services link */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#FF4D50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5383B]" />
            Explore our services

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </main>
  );
}
