"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ACTIVITY_TYPES, WEEKS, EXCELLENCE_META } from "@/data/excellence";

// Home-page teaser for the full Excellence Program Journey (/excellence).
export default function ExcellenceTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Text column reveal
        gsap.from(".xp-teaser-item", {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Preview week chips pop in
        gsap.from(".xp-teaser-chip", {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".xp-teaser-chips",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Subtle continuous float on the big "13" badge
        gsap.to(".xp-teaser-badge", {
          y: "-=10",
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    },
    { scope: sectionRef }
  );

  // Show the first 6 weeks as a teaser
  const preview = WEEKS.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="excellence"
      aria-labelledby="xp-teaser-heading"
      className="relative bg-navy-dark py-16 md:py-24 overflow-hidden border-t border-white/10"
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

      <div className="relative max-w-300 mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left — copy + CTA */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <p className="xp-teaser-item font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
            New · Interactive
          </p>

          <h2
            id="xp-teaser-heading"
            className="xp-teaser-item font-display font-black uppercase leading-none text-white tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            EXCELLENCE PROGRAM{" "}
            <span className="text-cyan italic">JOURNEY</span>
          </h2>

          <p className="xp-teaser-item font-body text-white/75 max-w-150 text-base md:text-lg leading-relaxed">
            {EXCELLENCE_META.subtitle}
          </p>

          {/* Session counts */}
          <div className="xp-teaser-item flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${ACTIVITY_TYPES.GSLC.bg}`} aria-hidden="true" />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-white/80">
                {ACTIVITY_TYPES.GSLC.sessions} GSLC
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${ACTIVITY_TYPES.F2F.bg}`} aria-hidden="true" />
              <span className="font-display text-sm font-bold uppercase tracking-widest text-white/80">
                {ACTIVITY_TYPES.F2F.sessions} F2F
              </span>
            </span>
          </div>

          {/* CTA to the full page */}
          <Link
            href="/excellence"
            className="xp-teaser-item group inline-flex items-center gap-3 px-8 py-3.5 border-2 border-cyan bg-cyan text-navy font-display font-bold uppercase tracking-widest text-lg hover:bg-transparent hover:text-cyan transition-colors duration-250 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Explore the 13-Week Journey
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-250 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Right — big badge + week preview chips */}
        <div className="flex-1 flex flex-col items-center gap-6 w-full">
          <div
            className="xp-teaser-badge flex items-center justify-center w-40 h-40 rounded-full border-4 border-cyan/40"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center leading-none">
              <span className="font-display font-black text-white text-6xl">13</span>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-cyan mt-1">
                Weeks
              </span>
            </div>
          </div>

          <ul className="xp-teaser-chips grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-105" role="list">
            {preview.map((w) => {
              const t = ACTIVITY_TYPES[w.type];
              return (
                <li
                  key={w.week}
                  className="xp-teaser-chip flex items-center gap-2 rounded-lg border border-white/10 bg-navy/60 px-3 py-2"
                >
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full ${t.bg} text-navy font-display font-black text-xs`}
                  >
                    {String(w.week).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[10px] font-bold uppercase tracking-wide text-white/70 truncate">
                    {w.title}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="font-body text-white/40 text-xs">+ 7 more weeks inside →</p>
        </div>
      </div>
    </section>
  );
}
