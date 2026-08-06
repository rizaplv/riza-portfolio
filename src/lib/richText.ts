// Shared helpers for rich-text (HTML) project descriptions.

/** True if the string already contains HTML markup (vs plain text). */
export function isHtml(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

/** Escape plain text and convert newlines to <br> so it renders like a textarea. */
export function plainToHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

/** Plain-text version (for meta descriptions / JSON-LD). */
export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>|<\/li>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Minimal sanitizer for admin-written HTML before public render.
 * Removes script tags, inline event handlers, and javascript: URLs.
 * (Admin-only content, so this covers the realistic threat surface.)
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?\/?>/gi, "")
    .replace(/(href|src)\s*=\s*("|')javascript:[^"']*("|')/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}
