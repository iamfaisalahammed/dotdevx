import Link from "next/link";
import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";

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
    <footer className="border-t border-white/[0.08] bg-[#08090B] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              DotDev<span className="text-[#2BFF88]">X</span>
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
                    className="text-sm capitalize text-white/55 transition-colors hover:text-[#2BFF88]"
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
                    className="text-sm text-white/55 transition-colors hover:text-[#2BFF88]"
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
                    className="text-sm text-white/55 transition-colors hover:text-[#2BFF88]"
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
                  className="block transition-colors hover:text-[#2BFF88]"
                >
                  {siteConfig.contact.email}
                </a>
              )}

              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="block transition-colors hover:text-[#2BFF88]"
                >
                  {siteConfig.contact.phone}
                </a>
              )}

              {siteConfig.contact.location && (
                <p>{siteConfig.contact.location}</p>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-semibold text-[#2BFF88]"
              >
                Start a Project
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-white/45">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#2BFF88]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-[#2BFF88]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}