import { siteConfig } from "@/config/site";

export function getWhatsAppUrl(message = "") {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "");

  if (!phone) return "";

  const encodedMessage = encodeURIComponent(
    message || `Hello ${siteConfig.name}, I would like to discuss a project.`
  );

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function getProjectInquiryUrl(projectName = "") {
  const message = projectName
    ? `Hello ${siteConfig.name}, I am interested in your services. I would like to discuss a project: ${projectName}.`
    : `Hello ${siteConfig.name}, I would like to discuss a new project.`;

  return getWhatsAppUrl(message);
}