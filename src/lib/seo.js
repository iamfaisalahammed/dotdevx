import { siteConfig } from "@/config/site";

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = "",
}) {
  const baseUrl = siteConfig.url;

  const pageUrl =
    baseUrl && path
      ? `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
      : baseUrl || undefined;

  const metadata = {
    title: title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name,

    description,

    applicationName: siteConfig.name,

    robots: {
      index: true,
      follow: true,
    },
  };

  if (baseUrl) {
    try {
      metadata.metadataBase = new URL(baseUrl);

      if (pageUrl) {
        metadata.alternates = {
          canonical: pageUrl,
        };

        metadata.openGraph = {
          title: metadata.title,
          description,
          url: pageUrl,
          siteName: siteConfig.name,
          type: "website",
          ...(image ? { images: [image] } : {}),
        };
      }
    } catch {
      // Ignore invalid or unconfigured website URLs.
    }
  }

  return metadata;
}