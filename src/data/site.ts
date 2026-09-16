// ============================================
// FYPL — Central Site Configuration
// Single source of truth for everything a non-dev committee member
// might need to change. Swap the PLACEHOLDER values below before launch.
// ============================================

export const site = {
  name: "FYPL B2030",
  fullName: "FYPL B2030 — Binus University",
  tagline: "Every step, every way — OKAYYYY!",
  campus: "Binus University · @Kemanggisan",
  description:
    "Final Year Project Lab B2030 — Binus University @Kemanggisan. Every step, every way, OKAYYYY!",

  // ---- PLACEHOLDERS: replace before launch ----
  // Production URL (used by metadataBase, sitemap.ts, robots.ts).
  url: "https://fypl-b2030.example.com",

  // Contact channels. WhatsApp number in full international format, digits
  // only, no "+" or spaces (e.g. Indonesia: 6281234567890).
  contact: {
    whatsapp: "628111040342",
    whatsappMessage:
      "Halo Kak! Saya freshman FYPL B2030 dan ingin bertanya tentang ...",
    email: "fypl.b2030@example.com",
  },

  // Optional: privacy-friendly analytics. Set the domain to enable; the
  // component only renders the script when this is non-empty.
  analytics: {
    // e.g. "fypl-b2030.example.com" for Plausible; "" disables it.
    plausibleDomain: "",
  },

  // Open Graph image (lives in /public).
  ogImage: "/og-image.png",
} as const;

/** Ready-to-use WhatsApp click-to-chat URL built from the config. */
export const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
  site.contact.whatsappMessage
)}`;

/** Ready-to-use mailto URL built from the config. */
export const mailtoUrl = `mailto:${site.contact.email}`;
