"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TIMELINE_ITEMS } from "@/data/timeline";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      // Reduced motion: no pinning/scrub — the track becomes a normal
      // horizontally-scrollable strip (see `reducedMotion` class below).
      mm.add("(prefers-reduced-motion: reduce)", () => {
        setReducedMotion(true);
      });

      // Full motion: pin the section and translate the track with scroll.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        setReducedMotion(false);

        const getScrollDistance = () => track.scrollWidth - section.offsetWidth;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top 72px",
            end: () => `+=${getScrollDistance()}`,
            scrub: true, // 1:1 with scroll position, zero inertia lag
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onLeave: () => gsap.set(track, { x: -getScrollDistance() }),
            onLeaveBack: () => gsap.set(track, { x: 0 }),
          },
        });

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh);

        return () => {
          window.removeEventListener("load", refresh);
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      aria-label="FYP Timeline"
      className={`bg-navy ${reducedMotion ? "overflow-x-auto" : "overflow-hidden"}`}
    >
      {/* Horizontal scroll track — wider than the viewport */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
      >
        {/* Header card — always visible as the anchor */}
        <div className="shrink-0 w-[85vw] max-w-80 sm:w-95 h-[calc(100vh-72px)] bg-navy-dark flex flex-col justify-end px-6 sm:px-10 py-8 sm:py-12 border-r border-white/10">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan mb-4">
            BINUS University · FYPL B2030
          </p>
          <h2 className="font-display font-black uppercase leading-none text-white tracking-tight mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            FYP<br />
            <span className="text-cyan italic">TIME</span><br />
            <span className="text-pink">LINE</span>
          </h2>
          <p className="font-body text-white/60 text-sm leading-relaxed max-w-65">
            Enam tahapan utama perjalanan First Year Program — scroll ke kanan untuk menjelajahi.
          </p>
          {/* Scroll hint arrow */}
          <div className="mt-8 flex items-center gap-3 text-white/40">
            <span className="font-display text-xs uppercase tracking-widest">Scroll</span>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" aria-hidden="true">
              <path d="M0 6h36M30 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Stage cards */}
        {TIMELINE_ITEMS.map((item, index) => (
          <article
            key={item.id}
            className={`${item.color} shrink-0 w-[85vw] max-w-105 sm:w-120 h-[calc(100vh-72px)] flex flex-col justify-between px-6 sm:px-10 py-8 sm:py-12 border-r border-white/10 relative overflow-hidden`}
          >
            {/* Stage index indicator top-right */}
            <div className="flex justify-between items-start">
              <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                Stage {String(index + 1).padStart(2, "0")} / 06
              </span>
              {/* Horizontal progress dots */}
              <div className="flex gap-1.5">
                {TIMELINE_ITEMS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/25"}`}
                  />
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col gap-5">
              <h3 className="font-display font-black uppercase tracking-widest text-white text-xl md:text-2xl leading-tight">
                {item.label}
              </h3>
              <p className="font-body text-white/85 text-base leading-relaxed max-w-85">
                {item.description}
              </p>
            </div>

            {/* Giant number — bottom watermark */}
            <div className="absolute bottom-0 right-0 leading-none select-none pointer-events-none">
              <span
                className="font-display font-black italic text-white/10"
                style={{ fontSize: "clamp(10rem, 22vw, 20rem)", lineHeight: 0.8 }}
              >
                {item.id}
              </span>
            </div>
          </article>
        ))}
      </div>
      {/* Mobile touch hint pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-navy-dark/90 border border-white/20 text-cyan text-xs font-display font-bold uppercase tracking-widest pointer-events-none shadow-lg animate-pulse md:hidden">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        <span>Scroll / Geser ke Kanan</span>
      </div>
    </section>
  );
}
