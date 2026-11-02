
import { siteConfig } from "@/config/site";

export default function JsonLd() {
  if (!siteConfig.url) return null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        contactPoint: siteConfig.contact.whatsapp
          ? {
              "@type": "ContactPoint",
              telephone: `+${siteConfig.contact.whatsapp}`,
              contactType: "customer service",
            }
          : undefined,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: siteConfig.language,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
