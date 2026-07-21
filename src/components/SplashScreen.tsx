"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        setVisible(false);
        return;
      }

      // Lock the page while the splash plays
      document.documentElement.style.overflow = "hidden";

      const counter = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setVisible(false);
          // The page couldn't be measured correctly while overflow was
          // locked — force ScrollTrigger to re-measure now that it can.
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.6,
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.floor(counter.value)
            ).padStart(3, "0");
          }
          if (barRef.current) {
            barRef.current.style.width = `${counter.value}%`;
          }
        },
      })
        .to({}, { duration: 0.2 }) // brief hold at 100%
        .to(counterRef.current, { opacity: 0, y: -16, duration: 0.4 }, "exit")
        .to(".splash-logo", { opacity: 0, y: -16, duration: 0.4 }, "exit")
        .to(
          ".splash-panel",
          {
            yPercent: -100,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.inOut",
          },
          "exit+=0.1"
        );
    },
    { scope: rootRef }
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[999] overflow-hidden"
    >
      {/* Color-block curtain panels */}
      <div className="absolute inset-0 flex">
        <div className="splash-panel flex-1 bg-navy-dark" />
        <div className="splash-panel flex-1 bg-pink" />
        <div className="splash-panel flex-1 bg-cyan" />
      </div>

      {/* Logo + counter */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="splash-logo flex flex-col items-center gap-2">
          <Image
            src="/logo2.png"
            alt="FYPL B2030"
            width={200}
            height={80}
            className="w-[180px] md:w-[220px] h-auto object-contain"
            priority
          />
          <span className="font-body text-white/50 text-xs uppercase tracking-[0.3em] mt-1">
            Binus University · @Kemanggisan
          </span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span
            ref={counterRef}
            className="font-display font-black text-white text-lg tabular-nums tracking-widest"
          >
            000
          </span>
          <div className="w-[160px] h-[2px] bg-white/15 overflow-hidden">
            <div ref={barRef} className="h-full bg-white w-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
