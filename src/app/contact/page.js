import Link from "next/link";
import { Mail, MessageCircle, Phone, MapPin, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import ProjectInquiryForm from "@/components/forms/ProjectInquiryForm";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact DotDevX to discuss your website or web development project.",
  path: "/contact",
});

// হোয়াটসঅ্যাপ নাম্বার: শুরুর 0 বাদ দিয়ে দেশের কোড (880) বসানো, wa.me এভাবেই চায়
const WHATSAPP_NUMBER = "8801820037321";
const WHATSAPP_DISPLAY = "+880 1820 037321";
const WHATSAPP_MESSAGE = "Hello DotDevX, I would like to discuss a project.";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// ইমেইল, ফোন আর ঠিকানার সারি একই ধাঁচের, তাই একটাই ছোট কম্পোনেন্ট
function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#E5383B] transition-all duration-500 group-hover:border-transparent group-hover:bg-[#E5383B] group-hover:text-white">
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
          className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E5383B]"
        />
      )}
    </>
  );

  const base =
    "group relative flex items-center gap-4 border-b border-white/10 py-5";

  return href ? (
    <a
      href={href}
      className={`${base} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
    >
      {content}
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[#E5383B] transition-transform duration-700 ease-out group-hover:scale-x-100"
      />
    </a>
  ) : (
    <div className={base}>{content}</div>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#08090B] text-white">
      {/* পেছনের আভা আর হালকা grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 h-[420px] w-[420px] animate-pulse rounded-full bg-[#E5383B]/[0.12] blur-[130px] sm:h-[560px] sm:w-[560px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
        style={{
          backgroundImage:
            "linear-gradient(#E5383B 1px, transparent 1px), linear-gradient(90deg, #E5383B 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="py-20 sm:py-28 lg:py-32">
        {/* হেডিং */}
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5383B] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E5383B]" />
            </span>
            <span className="text-sm text-white/60">
              Available for new projects
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
            Let&apos;s talk{" "}
            <span className="text-white/35">about your next project.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
            Tell us what you have in mind. We will discuss your requirements and
            the right next steps.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-16">
          {/* বামে: যোগাযোগের মাধ্যম */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            {/* সবচেয়ে সহজ পথ হিসেবে হোয়াটসঅ্যাপ সবার ওপরে, বড় করে */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat on WhatsApp ${WHATSAPP_DISPLAY}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-[#E5383B] p-5 shadow-[0_18px_50px_-18px_#E5383B] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_#E5383B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:gap-5 sm:p-6"
            >
              {/* hover করলে আলো সরে যাবে */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[150%]"
              />

              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-16 sm:w-16">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
                <MessageCircle size={26} className="relative" />
              </span>

              <span className="relative min-w-0 flex-1">
                <span className="block text-sm text-white/80">
                  Chat on WhatsApp
                </span>
                <span className="mt-0.5 block text-xl font-bold tracking-tight min-[400px]:text-2xl">
                  {WHATSAPP_DISPLAY}
                </span>
              </span>

              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#E5383B] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </span>
            </a>

            <div className="mt-8 border-t border-white/10">
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
          </Reveal>

          {/* ডানে: ফর্ম */}
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
              {/* প্যানেলের ওপরের কিনারায় লাল আলোর রেখা */}
              <span
                aria-hidden="true"
                className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[#E5383B] to-transparent"
              />

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Tell us about your project
              </h2>
              <p className="mt-2 mb-7 text-sm leading-7 text-white/55 sm:mb-8">
                Share a few details and we will get back to you.
              </p>

              <ProjectInquiryForm />
            </div>
          </Reveal>
        </div>

        {/* নিচের লিংক */}
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
