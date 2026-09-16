"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BGA_GROUPS } from "@/data/excellence";

export default function AppliedBGACards() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".xp-bga", {
          y: 50,
          opacity: 0,
          scale: 0.96,
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
      id="applied-bga"
      aria-labelledby="bga-heading"
      className="bg-navy py-16 md:py-24 border-t border-white/10"
    >
      <div className="max-w-300 mx-auto px-6 md:px-10">
        <h2
          id="bga-heading"
          className="font-display font-black uppercase leading-none text-white tracking-tight text-center mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          APPLIED <span className="text-pink italic">BGA</span>
        </h2>
        <p className="font-body text-white/60 text-sm md:text-base text-center max-w-150 mx-auto mb-12">
          The core competencies students develop across the Excellence Program.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BGA_GROUPS.map((g) => (
            <article
              key={g.id}
              className="xp-bga relative rounded-2xl border border-white/10 bg-navy-dark/60 p-8 flex flex-col gap-5 overflow-hidden"
            >
              {/* Accent top bar */}
              <span
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: g.accent }}
                aria-hidden="true"
              />
              <h3
                className="font-display font-black uppercase text-white text-xl leading-tight"
                style={{ color: g.accent }}
              >
                {g.title}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {g.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start gap-3 font-body text-white/80 text-sm md:text-base"
                  >
                    <span
                      className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
                      style={{ backgroundColor: g.accent }}
                      aria-hidden="true"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
