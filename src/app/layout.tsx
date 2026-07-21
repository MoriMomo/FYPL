import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

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
  title: {
    default: "FYPL B2030 — Binus University",
    template: "%s | FYPL B2030",
  },
  description:
    "Final Year Project Lab B2030 — Binus University @Kemanggisan. Every step, every way, OKAYYYY!",
  keywords: ["FYPL", "FYP", "Binus", "Final Year Project", "Kemanggisan"],
  authors: [{ name: "FYPL B2030 Team" }],
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
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}

