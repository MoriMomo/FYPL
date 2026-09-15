"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { site, whatsappUrl, mailtoUrl } from "@/data/site";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-item", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-navy py-20 border-t border-white/10"
    >
      <div className="max-w-250 mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-6">
        <p className="contact-item font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
          Masih Ada Pertanyaan?
        </p>

        <h2
          id="contact-heading"
          className="contact-item font-display font-black uppercase leading-none text-white tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          MAU TANYA <span className="text-pink italic">KAK?</span>
        </h2>

        <p className="contact-item font-body text-white/70 max-w-150 text-sm md:text-base">
          Tim FYPL B2030 siap bantu. Chat kami langsung lewat WhatsApp untuk
          respon paling cepat, atau kirim email untuk pertanyaan yang lebih
          panjang.
        </p>

        <div className="contact-item flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-cyan bg-cyan text-navy font-display font-bold uppercase tracking-widest text-lg hover:bg-transparent hover:text-cyan transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.95 1.37-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.13-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.96-2.31.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.55.81 1.9.88 2.04.07.14.12.3.02.49-.1.19-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.16.28.73 1.2 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.19.69-.8.88-1.08.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.11.07.65-.17 1.33z" />
            </svg>
            Chat WhatsApp
          </a>
          <a
            href={mailtoUrl}
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-pink text-white font-display font-bold uppercase tracking-widest text-lg hover:bg-pink transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          >
            Kirim Email
          </a>
        </div>

        <p className="contact-item font-body text-white/40 text-xs mt-2">
          {site.contact.email}
        </p>
      </div>
    </section>
  );
}
