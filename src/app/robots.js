
import { siteConfig } from "@/config/site";

export default function robots() {
  let sitemapUrl = "";

  if (siteConfig.url) {
    try {
      const baseUrl = new URL(siteConfig.url);

      if (["http:", "https:"].includes(baseUrl.protocol)) {
        sitemapUrl = new URL("/sitemap.xml", baseUrl).toString();
      }
    } catch {
      sitemapUrl = "";
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    ...(sitemapUrl ? { sitemap: sitemapUrl } : {}),
  };
}
