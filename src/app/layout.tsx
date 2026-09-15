import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import ScrollToTop from "@/components/layout/ScrollToTop";

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
  metadataBase: new URL("https://fypl-b2030.example.com"),
  title: {
    default: "FYPL B2030 — Binus University",
    template: "%s | FYPL B2030",
  },
  description:
    "Final Year Project Lab B2030 — Binus University @Kemanggisan. Every step, every way, OKAYYYY!",
  keywords: ["FYPL", "FYP", "Binus", "Final Year Project", "Kemanggisan"],
  authors: [{ name: "FYPL B2030 Team" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "FYPL B2030",
    title: "FYPL B2030 — Binus University",
    description:
      "Final Year Project Lab B2030 — Binus University @Kemanggisan. Every step, every way, OKAYYYY!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FYPL B2030 — Binus University @Kemanggisan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FYPL B2030 — Binus University",
    description:
      "Final Year Project Lab B2030 — Binus University @Kemanggisan. Every step, every way, OKAYYYY!",
    images: ["/og-image.png"],
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
      </body>
    </html>
  );
}

