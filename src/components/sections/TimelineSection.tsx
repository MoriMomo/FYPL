"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TIMELINE_ITEMS = [
  {
    id: "01",
    color: "bg-pink",
    accentColor: "#E8185A",
    label: "PRE-FYP",
    description:
      "Kegiatan sebelum dimulainya FYP. Kesempatan pertama Freshmen untuk mengenal lebih dalam tentang fakultas dan program studi pilihan.",
  },
  {
    id: "02",
    color: "bg-cyan",
    accentColor: "#45C8D8",
    label: "OPENING FYP",
    description:
      "Tanda resmi dimulainya program FYP. Upacara pembukaan dilaksanakan serentak di seluruh kampus BINUS University.",
  },
  {
    id: "03",
    color: "bg-navy-dark",
    accentColor: "#2A3B9E",
    label: "NEXT",
    description:
      "New Student Experience and Transition — pembekalan visi, misi, budaya kampus, dan kehidupan akademik bersama Freshmen Leader.",
  },
  {
    id: "04",
    color: "bg-navy-dark",
    accentColor: "#2A3B9E",
    label: "ACADEMIC ORIENTATION",
    description:
      "Pengenalan mendalam jurusan, kurikulum 4 tahun, dan pimpinan program studi yang dikemas seperti simulasi perkuliahan.",
  },
  {
    id: "05",
    color: "bg-pink",
    accentColor: "#E8185A",
    label: "INAUGURATION",
    description:
      "Upacara peresmian mahasiswa baru BINUS University yang diiringi dengan pentas seni Freshmen dan Unit Kegiatan Mahasiswa (UKM).",
  },
  {
    id: "06",
    color: "bg-cyan",
    accentColor: "#45C8D8",
    label: "EXCELLENCE PROGRAM",
    description:
      "Program peningkatan soft skill dan pengembangan diri mahasiswa baru dengan pendampingan langsung dari Freshmen Partner.",
  },
] as const;

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="timeline"
      aria-label="FYP Timeline"
      className="bg-navy overflow-hidden"
    >
      {/* Horizontal scroll track — wider than the viewport */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
      >
        {/* Header card — always visible as the anchor */}
        <div className="flex-shrink-0 w-[85vw] max-w-[320px] sm:w-[380px] h-[calc(100vh-72px)] bg-navy-dark flex flex-col justify-end px-6 sm:px-10 py-8 sm:py-12 border-r border-white/10">
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
          <p className="font-body text-white/60 text-sm leading-relaxed max-w-[260px]">
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
            className={`${item.color} flex-shrink-0 w-[85vw] max-w-[420px] sm:w-[480px] h-[calc(100vh-72px)] flex flex-col justify-between px-6 sm:px-10 py-8 sm:py-12 border-r border-white/10 relative overflow-hidden`}
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
              <p className="font-body text-white/85 text-base leading-relaxed max-w-[340px]">
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
