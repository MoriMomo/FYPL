"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger entrance for text headline lines
      tl.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
      })
        .from(
          ".hero-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .from(
          imageRef.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 1,
          },
          "-=0.7"
        );

      // Smooth floating animation for hand illustration
      gsap.to(imageRef.current, {
        y: "-=16",
        rotation: 1.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen bg-navy flex items-center overflow-hidden pt-[72px]"
      aria-label="Hero"
    >
      {/* Background grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-8 py-16 min-h-[calc(100vh-72px)]">
        {/* Left — Text */}
        <div className="flex-1 flex flex-col gap-6 md:max-w-[55%] text-center md:text-left items-center md:items-start">
          {/* Headline block */}
          <div className="flex flex-col leading-none gap-0">
            {/* Line 1: EVERY STEP */}
            <div
              className="hero-line flex items-baseline justify-center md:justify-start font-display font-black uppercase tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              <span className="text-white">EVERY</span>
              <span className="text-cyan italic">&nbsp;STEP</span>
            </div>
            {/* Line 2: EVERY WAY */}
            <div
              className="hero-line flex items-baseline justify-center md:justify-start font-display font-black uppercase tracking-tight"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)" }}
            >
              <span className="text-white">EVERY</span>
              <span className="text-cyan italic">&nbsp;WAY</span>
            </div>
            {/* OKAYYYY! — pink italic */}
            <div
              className="hero-line font-display font-black italic uppercase text-pink leading-[0.9] mt-2"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              OKAYYYY!
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="hero-sub font-display italic font-semibold uppercase tracking-wide text-cyan"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
          >
            FYPL B2030 BINUS @KEMANGGISAN
          </p>

          {/* CTA Button */}
          <Link
            href="#about"
            className="hero-cta inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-display font-bold uppercase tracking-widest text-lg hover:bg-white hover:text-navy transition-colors duration-250 w-fit"
          >
            LET&apos;S GO
          </Link>
        </div>

        {/* Right — Illustration */}
        <div className="flex-1 flex items-center justify-center md:max-w-[45%]">
          <div ref={imageRef} className="w-full max-w-[520px]">
            <Image
              src="/jumbotronHnad.png"
              alt="FYPL OK hand illustration"
              width={520}
              height={520}
              className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(232,24,90,0.35)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
