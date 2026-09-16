"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { THROUGHLINE } from "@/data/excellence";

export default function ThroughlineTracker() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".xp-phase", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="throughline-heading"
      className="bg-navy-dark py-16 md:py-24 border-t border-white/10"
    >
      <div className="max-w-300 mx-auto px-6 md:px-10">
        <h2
          id="throughline-heading"
          className="font-display font-black uppercase leading-none text-white tracking-tight text-center mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          PROGRAM <span className="text-cyan italic">THROUGHLINE</span>
        </h2>
        <p className="font-body text-white/60 text-sm md:text-base text-center max-w-150 mx-auto mb-12">
          The four phases every freshman moves through across the journey.
        </p>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {THROUGHLINE.map((p, i) => (
            <li
              key={p.id}
              className={`xp-phase relative ${p.bg} rounded-xl p-6 flex flex-col gap-3 min-h-[180px] overflow-hidden`}
            >
              <span className="font-display font-black text-white/20 text-5xl leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-black uppercase text-white text-xl leading-tight">
                {p.id}
              </h3>
              <p className="font-display text-xs font-bold uppercase tracking-widest text-white/80">
                {p.subtitle}
              </p>
              <p className="font-body text-white/75 text-sm leading-relaxed">
                {p.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
