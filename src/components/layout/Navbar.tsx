"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT FYP", href: "#about" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "TEAM", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const toggleOpen = useCallback(() => setOpen((p) => !p), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance stagger only for users who allow motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".nav-link-item", {
          y: -25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
      });

      // Set initial state for brand logo to be hidden at top
      gsap.set(".nav-brand", {
        opacity: 0,
        x: -20,
      });

      // 2. ScrollTrigger for background glassmorphism morph on scroll
      gsap.to(bgRef.current, {
        backgroundColor: "rgba(21, 31, 92, 0.88)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        scrollTrigger: {
          trigger: document.body,
          start: "top -50px",
          end: "top -51px",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
      });

      // Shrink nav height from 88px to 72px on scroll down
      gsap.to(navRef.current, {
        height: "72px",
        scrollTrigger: {
          trigger: document.body,
          start: "top -50px",
          end: "top -51px",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
      });

      // Fade/slide in logo on scroll down
      gsap.to(".nav-brand", {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: document.body,
          start: "top -50px",
          end: "top -51px",
          toggleActions: "play none none reverse",
          scrub: 0.3,
        },
      });
    },
    { scope: navRef }
  );

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-22 transition-all duration-300"
        aria-label="Main navigation"
      >
        {/* Background panel — glassmorphism morphs via GSAP ScrollTrigger */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-transparent border-b border-transparent transition-all duration-300 pointer-events-none"
        />

        <div className="relative w-full max-w-300 h-full mx-auto px-6 md:px-10 flex items-center justify-center">
          {/* Brand logo (absolute left) */}
          <div className="absolute left-6 md:left-10">
            <Link
              href="/"
              className="nav-brand flex items-center"
              aria-label="FYPL B2030 Home"
            >
              <Image
                src="/logo2.png"
                alt="FYPL B2030"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop links (centered) */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="nav-link-item">
                <Link
                  href={link.href}
                  className="relative font-display text-sm font-bold uppercase tracking-widest text-white hover:text-cyan transition-colors duration-200 py-1 group"
                >
                  {link.label}
                  {/* Gradient animated underline indicator */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-pink to-cyan group-hover:w-full transition-all duration-300 ease-out" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile toggle (absolute right) */}
          <div className="absolute right-6 md:right-10 md:hidden">
            <button
              className="flex flex-col gap-1.25 w-10 h-10 items-center justify-center border border-white/30 rounded"
              onClick={toggleOpen}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-4.5 h-0.5 bg-white rounded-full transition-transform duration-250 origin-center ${open ? "translate-y-1.75 rotate-45" : ""
                  }`}
              />
              <span
                className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-250 ${open ? "opacity-0 scale-x-0" : ""
                  }`}
              />
              <span
                className={`block w-4.5 h-0.5 bg-white rounded-full transition-transform duration-250 origin-center ${open ? "-translate-y-1.75 -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-nav left-0 right-0 bg-navy-dark/95 backdrop-blur-lg z-40 flex flex-col gap-2 px-6 py-6 transition-all duration-300 border-b border-white/10 ${open
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-xl font-bold uppercase tracking-wide text-white px-3 py-3 hover:text-cyan transition-colors duration-150"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
