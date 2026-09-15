import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import ScrollToTop from "@/components/layout/ScrollToTop";
import Analytics from "@/components/Analytics";
import { site } from "@/data/site";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.fullName,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["FYPL", "FYP", "Binus", "Final Year Project", "Kemanggisan"],
  authors: [{ name: `${site.name} Team` }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.name,
    title: site.fullName,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.campus}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E2B7B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <SplashScreen />
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}

