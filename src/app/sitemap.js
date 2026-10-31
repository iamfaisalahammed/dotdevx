
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

export default function sitemap() {
  if (!siteConfig.url) {
    return [];
  }

  let baseUrl;

  try {
    baseUrl = new URL(siteConfig.url);

    if (!["http:", "https:"].includes(baseUrl.protocol)) {
      return [];
    }
  } catch {
    return [];
  }

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/work",
    "/privacy-policy",
    "/terms",
  ];

  const serviceRoutes = services.map(
    (service) => `/services/${service.slug}`
  );

  const projectRoutes = projects.map(
    (project) => `/work/${project.slug}`
  );

  const allRoutes = [
    ...staticRoutes,
    ...serviceRoutes,
    ...projectRoutes,
  ];

  return allRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
  }));
}
