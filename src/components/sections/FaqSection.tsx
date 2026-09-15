"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { FAQ_DATA, FAQ_TABS as TABS, type FaqCategory } from "@/data/faq";

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<FaqCategory>("freshman");
  const [openId, setOpenId] = useState<string | null>("freshman-1");

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleTabChange = useCallback((tab: FaqCategory) => {
    setActiveTab(tab);
    setOpenId(FAQ_DATA[tab][0]?.id || null);
  }, []);

  // Static elements entrance animation (runs once on scroll)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-header", {
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

        gsap.from(".faq-tabs", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  // FAQ items stagger animation (runs on activeTab change and triggers on scroll)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".faq-item",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: ".faq-list",
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Reduced motion: make sure items are simply visible (no transform).
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".faq-item", { clearProps: "all", opacity: 1, y: 0 });
      });
    },
    { dependencies: [activeTab], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="bg-navy-dark py-20 border-t border-white/10"
    >
      <div className="max-w-250 mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="faq-header text-center mb-12">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan mb-3">
            Pertanyaan Umum
          </p>
          <h2
            className="font-display font-black uppercase leading-none text-white tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            FREQUENTLY ASKED <span className="text-pink italic">QUESTIONS</span>
          </h2>
          <p className="font-body text-white/60 text-sm md:text-base mt-3 max-w-150 mx-auto">
            Temukan jawaban lengkap atas pertanyaan yang sering diajukan seputar FYPL B2030
          </p>
        </div>

        {/* Category Tabs */}
        <div className="faq-tabs flex flex-col sm:flex-row justify-center gap-3 p-2 bg-navy/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-175 mx-auto mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 px-6 py-3.5 rounded-xl font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-300 transform ${isActive
                    ? `${tab.activeClass} shadow-[0_4px_20px_rgba(0,0,0,0.25)] scale-[1.03] text-white`
                    : "text-white/60 border border-transparent hover:text-white hover:bg-white/5 hover:border-white/5"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list flex flex-col gap-4">
          {FAQ_DATA[activeTab].map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="faq-item border border-white/10 rounded-xl bg-navy/60 overflow-hidden transition-all duration-300 hover:border-white/25"
              >
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-display font-bold text-lg md:text-xl text-white tracking-wide">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 ${isOpen ? "rotate-45 bg-pink border-pink" : "hover:border-cyan hover:text-cyan"
                      }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 py-0 pb-5" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="font-body text-white/75 text-sm md:text-base leading-relaxed pt-2 border-t border-white/5">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
