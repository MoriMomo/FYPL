"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apa itu First Year Program (FYP) di Binus University?",
    answer:
      "First Year Program (FYP) adalah rangkaian program pendampingan dan pengembangan bagi mahasiswa baru Binus University untuk beradaptasi dengan kehidupan perkuliahan, membangun soft skills, dan mempersiapkan diri menghadapi tantangan akademis maupun non-akademis.",
  },
  {
    id: "faq-2",
    question: "Siapa saja yang wajib mengikuti FYP?",
    answer:
      "Seluruh mahasiswa baru Binus University angkatan B2030 (khususnya @Kemanggisan) wajib mengikuti seluruh tahapan FYP sebagai syarat utama orientasi dan pembentukan karakter BINUSIAN.",
  },
  {
    id: "faq-3",
    question: "Bagaimana struktur kegiatan FYP berlangsung?",
    answer:
      "FYP terbagi menjadi beberapa tahapan utama mulai dari Kickoff, penyusunan Proposal & Ideasi, Development proyek, Testing & Evaluasi, Revisi mandiri, hingga Presentasi Final di hadapan juri & dosen pembimbing.",
  },
  {
    id: "faq-4",
    question: "Bagaimana cara mendapatkan bantuan atau bimbingan selama FYP?",
    answer:
      "Mahasiswa akan didampingi oleh Freshmen Leader (FL) dan Freshmen Partner (FP) serta Dosen Pembimbing yang siap memberikan arahan, konsultasi, dan motivasi sepanjang program.",
  },
  {
    id: "faq-5",
    question: "Apakah ada penilaian akhir dalam FYP?",
    answer:
      "Ya, keaktifan, kehadiran, serta hasil akhir proyek kelompok akan dievaluasi dan menjadi bagian dari rekam jejak perkembangan mahasiswa baru di BINUS.",
  },
  {
    id: "faq-6",
    question: "Berapa lama durasi pelaksanaan FYP B2030?",
    answer:
      "Program FYP berlangsung selama kurun waktu semester awal dengan sesi intensif seperti NEXT, Academic Orientation, serta pendampingan berkala sepanjang tahun pertama perkuliahan.",
  },
  {
    id: "faq-7",
    question: "Apa konsekuensinya jika tidak menghadiri salah satu sesi FYP?",
    answer:
      "Kehadiran FYP sangat penting untuk pemenuhan kelulusan orientasi. Jika berhalangan hadir karena kendala mendesak atau sakit, mahasiswa wajib memberikan surat izin resmi ke Freshmen Leader (FL).",
  },
  {
    id: "faq-8",
    question: "Bagaimana ketentuan pakaian dan atribut selama sesi FYP berlangsung?",
    answer:
      "Mahasiswa wajib mengenakan kemeja putih polos berkerah, celana bahan warna hitam polos, sepatu tertutup, serta mengalungkan BINUSIAN Card Flazz selama berada di lingkungan kampus.",
  },
  {
    id: "faq-9",
    question: "Di mana lokasi pelaksanaan sesi FYP @Kemanggisan?",
    answer:
      "Sesi FYP dilaksanakan di lingkungan kampus BINUS @Kemanggisan (Kampus Anggrek, Syahdan, dan Kijang) sesuai dengan jadwal kelas dan informasi prodi masing-masing.",
  },
  {
    id: "faq-10",
    question: "Di mana mahasiswa dapat melihat jadwal dan pengumuman resmi FYP?",
    answer:
      "Seluruh jadwal sesi, materi pendukung, dan pengumuman resmi dapat dipantau langsung melalui portal BINUSMAYA, aplikasi mobile BINUS, atau Microsite FYP student.binus.ac.id/fyp.",
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  useGSAP(
    () => {
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

      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="bg-navy-dark py-20 border-t border-white/10"
    >
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
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
          <p className="font-body text-white/60 text-sm md:text-base mt-3 max-w-[600px] mx-auto">
            Temukan jawaban lengkap atas pertanyaan yang sering diajukan seputar FYPL B2030
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list flex flex-col gap-4">
          {FAQ_ITEMS.map((item) => {
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
                  <span className="font-display font-bold uppercase text-lg md:text-xl text-white tracking-wide">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-pink border-pink" : "hover:border-cyan hover:text-cyan"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 py-0 pb-5" : "grid-rows-[0fr] opacity-0"
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
