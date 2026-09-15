import Script from "next/script";
import { site } from "@/data/site";

/**
 * Privacy-friendly analytics (Plausible). Renders nothing unless
 * `site.analytics.plausibleDomain` is set — no cookies, no consent banner
 * required. Swap for Vercel Analytics or GA if you prefer.
 */
export default function Analytics() {
  const domain = site.analytics.plausibleDomain;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
