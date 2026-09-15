"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Left shattered text image reveal
        gsap.from(leftPanelRef.current, {
          x: -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Right content stagger reveal
        gsap.from(".about-content-item", {
          x: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightPanelRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* 2-column split: left white | right pink */}
      <div className="flex flex-col md:flex-row min-h-150">
        {/* Left — White panel with shattered text illustration */}
        <div className="flex-[0_0_58%] bg-white flex items-center justify-center px-10 py-16">
          <div ref={leftPanelRef} className="w-full max-w-130">
            <Image
              src="/efwiekay.png"
              alt="FYPL Every Way Okayyyy shattered text logo"
              width={560}
              height={420}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right — Hot pink panel */}
        <div
          ref={rightPanelRef}
          className="flex-1 bg-pink flex items-center px-10 py-16"
        >
          <div className="flex flex-col gap-6 max-w-105">
            {/* "ABOUT FYP" heading */}
            <h2
              id="about-heading"
              className="about-content-item font-display font-black uppercase leading-none flex items-baseline flex-wrap gap-x-2"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              <span className="text-white">ABOUT</span>
              <span className="text-navy italic">FYP</span>
            </h2>

            {/* Body text */}
            <p
              className="about-content-item font-body text-white/90 leading-[1.7]"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
            >
              First Year Program (FYP) adalah sebuah program mahasiswa di Binus
              University. Program ini dirancang untuk mendorong mahasiswa
              menerapkan seluruh ilmu dan keterampilan yang telah dipelajari
              selama studi dalam sebuah proyek nyata yang bermakna.
            </p>

            <p
              className="about-content-item font-body text-white/90 leading-[1.7]"
              style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
            >
              Di FYPL B2030 Binus @Kemanggisan, kami percaya bahwa setiap langkah
              dalam proses ini adalah bagian dari perjalanan luar biasa. Dari
              ideasi hingga presentasi akhir, kami hadir untuk memastikan setiap
              mahasiswa mendapatkan dukungan, bimbingan, dan semangat yang mereka
              butuhkan. Every step, every way — OKAYYYY!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="flex h-2" aria-hidden="true">
        <div className="flex-1 bg-pink" />
        <div className="flex-[0.4] bg-white" />
        <div className="flex-1 bg-cyan" />
        <div className="flex-1 bg-navy" />
      </div>
    </section>
  );
}
