import { siteConfig } from "@/config/site";

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "/images/og-image.png",
  keywords,
  type = "website",
}) {
  const baseUrl = siteConfig.url?.replace(/\/+$/, "");
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");

  let pageUrl;
  let imageUrl;
  let metadataBase;

  if (baseUrl) {
    try {
      metadataBase = new URL(`${baseUrl}/`);
      pageUrl = new URL(normalizedPath, metadataBase).toString();

      if (image) {
        imageUrl = new URL(image, metadataBase).toString();
      }
    } catch {
      // Ignore invalid website URLs.
    }
  }

  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  const metadata = {
    title: pageTitle,
    description,
    applicationName: siteConfig.name,

    ...(keywords?.length ? { keywords } : {}),

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
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      type,
      ...(pageUrl ? { url: pageUrl } : {}),
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };

  if (metadataBase) {
    metadata.metadataBase = metadataBase;

    if (pageUrl) {
      metadata.alternates = {
        canonical: pageUrl,
      };
    }
  }

  return metadata;
}