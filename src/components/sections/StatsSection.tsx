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
  { id: "organizations", target: 20, suffix: "", label: "Organizations to Join" },
  { id: "mentors", target: 400, suffix: "", label: "Mentors to Help" },
  { id: "program", target: 7, suffix: " Days", label: "Program" },
];

export default function StatsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const statElements = containerRef.current?.querySelectorAll<HTMLElement>(".stat-value");
      if (!statElements) return;

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
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-navy-dark py-20" aria-label="Statistics">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10 max-w-[1200px] mx-auto">
        {STATS.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center justify-center py-10 px-6 text-center gap-2">
            <span
              className="stat-value font-display font-black text-cyan leading-none"
              data-target={stat.target}
              data-suffix={stat.suffix}
              style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
            >
              0{stat.suffix}
            </span>
            <span className="font-display font-semibold uppercase tracking-widest text-white/60 text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
