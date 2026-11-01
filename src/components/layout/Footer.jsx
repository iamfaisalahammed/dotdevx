import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";
import SectionBackground from "@/components/motion/SectionBackground";

const services = [
  "Business Website",
  "E-commerce Development",
  "Landing Page",
  "Website Redesign",
  "Custom Web Application",
];

export default function Footer() {
  const socialLinks = Object.entries(siteConfig.socialLinks).filter(
    ([, url]) => Boolean(url)
  );

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#08090B] text-white">
      {/* Hero-র মতো animated tech background */}
      <SectionBackground />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              DotDev<span className="text-[#4F83FF]">X</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              {siteConfig.description}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {socialLinks.map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm capitalize text-white/55 transition-colors hover:text-[#75A0FF]"
                  >
                    {name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-[#75A0FF]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Our Services
            </h3>

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="inline-block text-sm text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-[#75A0FF]"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/55">
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="block transition-colors hover:text-[#75A0FF]"
                >
                  {siteConfig.contact.email}
                </a>
              )}

              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="block transition-colors hover:text-[#75A0FF]"
                >
                  {siteConfig.contact.phone}
                </a>
              )}

              {siteConfig.contact.location && (
                <p>{siteConfig.contact.location}</p>
              )}

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-semibold text-[#4F83FF] transition-colors hover:text-[#75A0FF]"
              >
                Start a Project
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-white/45">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#75A0FF]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#75A0FF]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}