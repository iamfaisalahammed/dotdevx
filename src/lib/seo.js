
import { siteConfig } from "@/config/site";

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/images/og-image.png",
}) {
  const baseUrl = siteConfig.url?.replace(/\/+$/, "");

  const pageUrl = baseUrl
    ? `${baseUrl}/${path.replace(/^\/+|\/+$/g, "")}`.replace(/\/$/, path ? "" : "/")
    : undefined;

  const metadata = {
    title: title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name,

    description,
    applicationName: siteConfig.name,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name,
      description,
      siteName: siteConfig.name,
      type: "website",
      ...(pageUrl ? { url: pageUrl } : {}),
      ...(baseUrl && image
        ? { images: [{ url: image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}` }] }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.name,
      description,
      ...(baseUrl && image
        ? { images: [image.startsWith("http") ? image : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`] }
        : {}),
    },
  };

  if (baseUrl) {
    try {
      metadata.metadataBase = new URL(`${baseUrl}/`);

      if (pageUrl) {
        metadata.alternates = {
          canonical: pageUrl,
        };
      }
    } catch {
      // Ignore invalid website URLs.
    }
  }

  return metadata;
}
