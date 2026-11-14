
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";

export default function sitemap() {
  if (!siteConfig.url) return [];

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
    "/blog",
  ];

  const serviceRoutes = services.map(
    (service) => `/services/${service.slug}`
  );

  const projectRoutes = projects.map(
    (project) => `/work/${project.slug}`
  );

  const blogRoutes = blogs.map(
    (blog) => `/blog/${blog.slug}`
  );

  const allRoutes = [
    ...new Set([
      ...staticRoutes,
      ...serviceRoutes,
      ...projectRoutes,
      ...blogRoutes,
    ]),
  ];

  return allRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : ["/services", "/work", "/blog"].includes(route)
          ? 0.9
          : 0.7,
  }));
}
