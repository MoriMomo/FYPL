"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollLock } from "@/lib/useScrollLock";
import { WEEKS, ACTIVITY_TYPES, type WeekNode } from "@/data/excellence";

export default function RoadmapPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<WeekNode | null>(null);

  useScrollLock(Boolean(active));

  // Node entrance stagger (motion-safe)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".xp-node", {
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".xp-roadmap",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  // Modal open animation
  useGSAP(
    () => {
      if (!active || !overlayRef.current || !cardRef.current) return;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [active], scope: sectionRef }
  );

  const close = () => {
    if (!cardRef.current || !overlayRef.current) {
      setActive(null);
      return;
    }
    gsap.to(cardRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setActive(null),
    });
  };

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      aria-label="13-week roadmap"
      className="bg-navy py-16 md:py-24"
    >
      <div className="max-w-300 mx-auto px-6 md:px-10">
        <h2
          className="font-display font-black uppercase leading-none text-white tracking-tight text-center mb-14"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          THE <span className="text-pink italic">13-WEEK</span> ROADMAP
        </h2>

        {/* Roadmap grid: zigzag on md+, single column on mobile */}
        <ol className="xp-roadmap grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 relative">
          {WEEKS.map((w, i) => {
            const t = ACTIVITY_TYPES[w.type];
            // Alternate sides on desktop for the winding feel
            const alignRight = i % 2 === 1;
            return (
              <li
                key={w.week}
                className={`xp-node ${alignRight ? "md:col-start-2" : "md:col-start-1"}`}
              >
                <button
                  type="button"
                  onClick={() => setActive(w)}
                  aria-haspopup="dialog"
                  aria-label={`Week ${w.week}: ${w.title}`}
                  className="group w-full text-left flex items-center gap-4 rounded-xl border border-white/10 bg-navy-dark/60 hover:border-white/30 hover:bg-navy-dark px-5 py-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  {/* Week number badge */}
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full ${t.bg} text-navy font-display font-black text-lg`}
                  >
                    {String(w.week).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-1 min-w-0">
                    <span className={`font-display text-[10px] font-bold uppercase tracking-widest ${t.text}`}>
                      {w.type} · {w.phase}
                    </span>
                    <span className="font-display font-bold uppercase text-white text-sm md:text-base leading-tight truncate group-hover:whitespace-normal">
                      {w.title}
                    </span>
                  </span>
                  {/* Chevron */}
                  <span className="ml-auto flex-shrink-0 text-white/40 group-hover:text-cyan transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Week detail modal */}
      {active && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="xp-modal-title"
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={cardRef}
            className="relative w-full max-w-180 max-h-[90vh] overflow-y-auto bg-navy-dark border border-white/10 rounded-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Accent header */}
            <div className={`${ACTIVITY_TYPES[active.type].bg} px-8 py-6 rounded-t-2xl`}>
              <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-navy/80">
                Week {String(active.week).padStart(2, "0")} · {ACTIVITY_TYPES[active.type].label}
              </p>
              <h3
                id="xp-modal-title"
                className="font-display font-black uppercase text-navy text-2xl md:text-3xl leading-tight mt-1"
              >
                {active.title}
              </h3>
            </div>

            <div className="px-8 py-6 flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-white/15 font-display text-[10px] font-bold uppercase tracking-widest text-white/70">
                Phase · {active.phase}
              </span>
              <p className="font-body text-white/80 text-sm md:text-base leading-relaxed">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
