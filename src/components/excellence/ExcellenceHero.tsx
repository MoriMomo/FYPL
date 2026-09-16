"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ACTIVITY_TYPES, EXCELLENCE_META } from "@/data/excellence";

export default function ExcellenceHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".xp-hero-item", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });
      });
    },
    { scope: ref }
  );

  return (
    <>
      <section
        ref={ref}
        className="relative bg-navy pt-nav overflow-hidden"
        aria-labelledby="xp-heading"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-300 mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col items-center text-center gap-6">
          <p className="xp-hero-item font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
            FYPL B2030 · Binus University
          </p>

          <h1
            id="xp-heading"
            className="xp-hero-item font-display font-black uppercase leading-none text-white tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            EXCELLENCE PROGRAM{" "}
            <span className="text-cyan italic">JOURNEY</span>
          </h1>

          <p className="xp-hero-item font-body text-white/75 max-w-150 text-base md:text-lg leading-relaxed">
            {EXCELLENCE_META.subtitle}
          </p>

          {/* Graduation cap + students motif (inline SVG) */}
          <div className="xp-hero-item mt-2" aria-hidden="true">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L1 8l11 5 9-4.09V15h2V8L12 3z"
                fill="#45C8D8"
              />
              <path
                d="M5 11.18v3.5c0 1.66 3.13 3.32 7 3.32s7-1.66 7-3.32v-3.5l-7 3.18-7-3.18z"
                fill="#E8185A"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Sticky legend bar */}
      <div className="sticky top-nav z-30 bg-navy-dark/90 backdrop-blur-md border-y border-white/10">
        <div className="max-w-300 mx-auto px-6 md:px-10 py-3 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <LegendChip type="GSLC" />
          <LegendChip type="F2F" />
        </div>
      </div>
    </>
  );
}

function LegendChip({ type }: { type: "GSLC" | "F2F" }) {
  const t = ACTIVITY_TYPES[type];
  const isGslc = type === "GSLC";
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`inline-flex items-center justify-center w-8 h-8 rounded-md ${t.bg} text-navy`}
        aria-hidden="true"
      >
        {isGslc ? (
          // Desktop / self-learning icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        ) : (
          // People / onsite icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )}
      </span>
      <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-white">
        {t.label}
      </span>
      <span className={`font-display text-xs sm:text-sm font-black ${t.text}`}>
        {t.sessions} sessions
      </span>
    </div>
  );
}
