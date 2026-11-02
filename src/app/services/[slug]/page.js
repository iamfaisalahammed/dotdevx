
import { notFound } from "next/navigation";

import { services } from "@/data/services";
import ServiceDetails from "@/components/services/ServiceDetails";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {
      title: "Service Not Found | .DevX",
      description: "The requested service could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createMetadata({
    title: `${service.title} Services`,
    description: `${service.description} Explore professional ${service.title.toLowerCase()} services by .DevX for businesses in Bangladesh and worldwide.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return <ServiceDetails service={service} />;
}
