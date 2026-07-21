"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const TEAM_MEMBERS = [
  {
    id: "t01",
    name: "School of Design",
    image: "/team/SOD.png",
    accentColor: "#E8185A",
    description:
      "Mengembangkan solusi desain yang inovatif dan berpusat pada pengguna untuk proyek FYP.",
  },
  {
    id: "t02",
    name: "School of Computer Science",
    image: "/team/SOCS.png",
    accentColor: "#45C8D8",
    description:
      "Membangun sistem dan aplikasi teknis yang menjadi tulang punggung proyek FYP.",
  },
  {
    id: "t03",
    name: "School of Information Systems",
    image: "/team/sois.png",
    accentColor: "#E8185A",
    description:
      "Merancang arsitektur informasi dan integrasi sistem untuk mendukung proyek.",
  },
  {
    id: "t04",
    name: "Faculty of Engineering",
    image: "/team/teknik.png",
    accentColor: "#45C8D8",
    description:
      "Menerapkan prinsip rekayasa untuk menyelesaikan tantangan teknis proyek FYP.",
  },
  {
    id: "t05",
    name: "Faculty of Digital Communication & Hotel Management",
    image: "/team/FCDHT.png",
    accentColor: "#E8185A",
    description:
      "Menghadirkan strategi komunikasi dan pengalaman layanan dalam proyek FYP.",
  },
  {
    id: "t06",
    name: "Binus Business School",
    image: "/team/BBS.png",
    accentColor: "#45C8D8",
    description:
      "Menyusun strategi bisnis dan model keberlanjutan untuk proyek FYP.",
  },
  {
    id: "t07",
    name: "School of Accounting",
    image: "/team/SOA.png",
    accentColor: "#E8185A",
    description:
      "Mengelola aspek keuangan dan akuntabilitas dalam pelaksanaan proyek FYP.",
  },
  {
    id: "t08",
    name: "Faculty of Humanity",
    image: "/team/foh.png",
    accentColor: "#45C8D8",
    description:
      "Membawa perspektif sosial dan humaniora ke dalam pendekatan proyek FYP.",
  },
] as const;

type TeamMember = (typeof TEAM_MEMBERS)[number];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  useGSAP(
    () => {
      gsap.from(".team-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".team-card", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  // Animate the overlay in whenever a member is selected
  useGSAP(
    () => {
      if (!activeMember || !overlayRef.current || !cardRef.current) return;

      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    },
    { dependencies: [activeMember], scope: overlayRef }
  );

  const closeOverlay = () => {
    if (!cardRef.current || !overlayRef.current) {
      setActiveMember(null);
      return;
    }

    gsap.to(cardRef.current, {
      opacity: 0,
      y: 24,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setActiveMember(null),
    });
  };

  // Lock page scroll + allow Escape to close while overlay is open
  useEffect(() => {
    if (!activeMember) return;

    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeMember]);

  return (
    <section
      ref={sectionRef}
      id="team"
      aria-label="Meet the Team"
      className="bg-[#111827] py-16 relative"
    >
      {/* Header */}
      <div className="team-header max-w-[1200px] mx-auto px-6 md:px-10 mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan mb-3">
          The People Behind It
        </p>
        <h2
          className="font-display font-black uppercase leading-none text-white tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          MEET THE <span className="text-pink italic">TEAM</span>
        </h2>
      </div>

      {/* 3-column photo grid */}
      <div className="team-grid max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-3 gap-4">
        {TEAM_MEMBERS.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setActiveMember(member)}
            aria-label={`Lihat detail ${member.name}`}
            className="team-card group relative overflow-hidden bg-[#1a1a2e] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
              sizes="(max-width: 768px) 50vw, 33vw"
              draggable={false}
            />
            {/* Hover affordance hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
              <span className="font-display text-white text-xs uppercase tracking-widest">
                View details →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[999] hidden items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        style={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeOverlay();
        }}
      >
        {activeMember && (
          <div
            ref={cardRef}
            className="relative w-full max-w-[720px] bg-navy-dark overflow-hidden flex flex-col md:flex-row"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeOverlay}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2l12 12M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Image half */}
            <div
              className="relative w-full md:w-[45%] aspect-[16/9] md:aspect-auto"
              style={{ backgroundColor: activeMember.accentColor }}
            >
              <Image
                src={activeMember.image}
                alt={activeMember.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>

            {/* Detail half */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <span
                className="font-display text-xs font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: activeMember.accentColor }}
              >
                FYPL B2030
              </span>
              <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-white leading-tight mb-4">
                {activeMember.name}
              </h3>
              <p className="font-body text-white/75 text-sm md:text-base leading-relaxed">
                {activeMember.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}