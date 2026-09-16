"use client";

import { useRef, useState, useId } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ESSENTIALS, type EssentialGroup } from "@/data/excellence";

// Inline icon set (no dependency) keyed by EssentialGroup.icon.
function Icon({ name }: { name: EssentialGroup["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
    case "checklist":
      return (
        <svg {...common}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M16 8l-2.5 5.5L8 16l2.5-5.5L16 8z" />
        </svg>
      );
  }
}

/**
 * "What you need to know" — an expandable panel that unfolds DOWNWARD from the
 * Excellence Program teaser, revealing a distilled summary of the 13-week
 * material (deadlines, targets, checklist, outcomes). GSAP-animated, motion-safe.
 */
export default function ExcellenceEssentials() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);
  const reducedRef = useRef(false);
  const panelId = useId();

  // Detect reduced-motion once (used to skip animation and just snap open/closed).
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      reducedRef.current = true;
    });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      reducedRef.current = false;
    });
  });

  const toggle = () => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    const chevron = chevronRef.current;
    if (!panel || !inner) return;

    const next = !open;
    setOpen(next);

    // Chevron rotation (cheap, always animate lightly).
    if (chevron) {
      gsap.to(chevron, {
        rotate: next ? 180 : 0,
        duration: reducedRef.current ? 0 : 0.4,
        ease: "power2.out",
      });
    }

    if (reducedRef.current) {
      // No motion: snap to final state.
      gsap.set(panel, { height: next ? "auto" : 0 });
      gsap.set(".xp-ess-card", { opacity: next ? 1 : 0, y: 0 });
      return;
    }

    if (next) {
      // Expand: animate height from 0 to the inner's natural height, then
      // release to `auto` so it stays responsive.
      gsap.set(panel, { height: 0, overflow: "hidden" });
      gsap.to(panel, {
        height: inner.offsetHeight,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => gsap.set(panel, { height: "auto" }),
      });
      gsap.fromTo(
        ".xp-ess-card",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.12,
        }
      );
    } else {
      // Collapse: fade cards, then close the height.
      gsap.to(".xp-ess-card", {
        y: 16,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(panel, {
        height: 0,
        duration: 0.45,
        ease: "power3.inOut",
        delay: 0.1,
        overflow: "hidden",
      });
    }
  };

  return (
    <div className="relative max-w-300 mx-auto px-6 md:px-10 mt-10 md:mt-14">
      {/* Toggle trigger */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group mx-auto flex items-center gap-3 rounded-full border-2 border-cyan/50 bg-navy/60 px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-cyan transition-colors duration-250 hover:border-cyan hover:bg-cyan/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan/15"
          aria-hidden="true"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        {open ? "Hide the essentials" : "What you need to know"}
        <span ref={chevronRef} className="inline-flex" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* Expanding panel */}
      <div
        id={panelId}
        ref={panelRef}
        className="overflow-hidden"
        style={{ height: 0 }}
        role="region"
        aria-label="Excellence Program essentials"
      >
        <div ref={innerRef} className="pt-10 md:pt-12">
          <p className="mb-8 text-center font-body text-sm text-white/55 md:text-base">
            The must-knows distilled from the 13-week material — deadlines,
            targets, and what you&apos;ll walk away with.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ESSENTIALS.map((group) => (
              <div
                key={group.id}
                className="xp-ess-card flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy/50 p-6"
                style={{ borderTopColor: group.accent, borderTopWidth: 3 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${group.accent}1f`,
                      color: group.accent,
                    }}
                  >
                    <Icon name={group.icon} />
                  </span>
                  <h3 className="font-display text-sm font-black uppercase tracking-wider text-white">
                    {group.heading}
                  </h3>
                </div>

                <ul className="flex flex-col gap-3" role="list">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex flex-col gap-1">
                      <span
                        className="font-display text-xs font-bold uppercase tracking-wide"
                        style={{ color: group.accent }}
                      >
                        {item.title}
                      </span>
                      <span className="font-body text-[13px] leading-snug text-white/70">
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
