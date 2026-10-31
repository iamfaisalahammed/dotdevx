export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function truncateText(text, limit = 150) {
  if (!text || text.length <= limit) return text;

  return `${text.slice(0, limit).trim()}...`;
}