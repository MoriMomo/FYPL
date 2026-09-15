"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { id: "freshman", target: 2000, suffix: "+", label: "New Freshman" },
  { id: "organizations", target: 50, suffix: "+", label: "Organizations to Join" },
  { id: "mentors", target: 400, suffix: "+", label: "Mentors to Help" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const statElements = containerRef.current?.querySelectorAll<HTMLElement>(".stat-value");
      if (!statElements) return;

      const mm = gsap.matchMedia();

      // Full motion: count up on scroll.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        statElements.forEach((el) => {
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const suffix = el.getAttribute("data-suffix") || "";

          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: targetVal,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: () => {
              el.textContent = `${Math.floor(counterObj.value).toLocaleString()}${suffix}`;
            },
          });
        });
      });

      // Reduced motion: render the final values immediately, no animation.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        statElements.forEach((el) => {
          const targetVal = parseFloat(el.getAttribute("data-target") || "0");
          const suffix = el.getAttribute("data-suffix") || "";
          el.textContent = `${targetVal.toLocaleString()}${suffix}`;
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-navy-dark py-12 md:py-20 px-6" aria-label="Statistics">
      <div className="grid grid-cols-1 sm:grid-cols-3 border border-white/10 max-w-300 mx-auto">
        {STATS.map((stat, idx) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center justify-center py-8 md:py-10 px-4 md:px-6 text-center gap-2 border-white/10 ${
              idx < 2 ? "border-b sm:border-b-0 sm:border-r" : ""
            }`}
          >
            <span
              className="stat-value font-display font-black text-cyan leading-none"
              data-target={stat.target}
              data-suffix={stat.suffix}
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              0{stat.suffix}
            </span>
            <span className="font-display font-semibold uppercase tracking-widest text-white/60 text-xs sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
