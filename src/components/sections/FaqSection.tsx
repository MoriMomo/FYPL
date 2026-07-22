"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: Record<"freshman" | "leader" | "partner", FaqItem[]> = {
  freshman: [
    {
      id: "freshman-1",
      question: "Bagaimana jika saya mengalami kendala saat melakukan absensi (WiFi Attendance atau Binusmaya)?",
      answer:
        "Jika Anda mengalami kesulitan login ke Binusmaya atau WiFi Attendance bermasalah (seperti halaman log in tidak muncul atau scan QR merah terutama di iOS), segera laporkan ke Freshmen Leader (FL) agar kehadiran Anda dicatat secara manual di sesi tersebut.",
    },
    {
      id: "freshman-2",
      question: "Bagaimana jika nama saya tidak terdata di absensi kelas atau jadwal di Binusmaya tidak sesuai?",
      answer:
        "Segera laporkan ke FL kelas Anda agar dapat dikoordinasikan dengan tim IT dan Admission. Beberapa freshmen mungkin mengalami keterlambatan sinkronisasi jadwal atau salah ruangan kelas (misal tertukar ABN/ruangan).",
    },
    {
      id: "freshman-3",
      question: "Apa yang harus saya lakukan jika belum mendapatkan Flazzcard, lanyard, atau almamater?",
      answer:
        "Jika Anda belum terdaftar, belum menerima Flazzcard (BINUSIAN Card), lanyard, atau almamater karena terlambat mendaftar atau kesalahan data logistik, harap lapor ke FL pendamping Anda agar dicatat di form kendala logistik dan dapat diproses susulan ke Admission.",
    },
    {
      id: "freshman-4",
      question: "Bagaimana jika ukuran almamater yang diterima tidak sesuai (kekecilan/kebesaran) atau terdapat kerusakan (seperti kancing lepas)?",
      answer:
        "Anda dapat mengajukan penukaran atau retur ukuran almamater melalui tim logistik Admission dengan mencatat kendala pada lembar retur melalui bantuan FL kelas Anda.",
    },
    {
      id: "freshman-5",
      question: "Mengapa jaringan internet (WiFi) di kelas lambat dan server AOB/Binusmaya lemot?",
      answer:
        "Pada hari-hari pertama FYP, lalu lintas server sangat padat. Jika komputer atau web AOB lemot, silakan laporkan ke FL. Jangan melakukan klik atau uncheck sembarangan di web AOB agar data ukuran almet/logistik Anda tidak terubah otomatis menjadi ukuran default (S).",
    },
  ],
  leader: [
    {
      id: "leader-1",
      question: "Bagaimana jika sistem absensi QR untuk FL error atau saya lupa melakukan scan?",
      answer:
        "Jika QR code absensi FL tidak muncul atau Anda terlewat melakukan scan karena mengurus mobilisasi freshmen ke atrium, segera hubungi koordinator FYPL untuk melakukan verifikasi dan input absensi manual.",
    },
    {
      id: "leader-2",
      question: "Apa yang harus dilakukan jika terjadi kekacauan/penumpukan saat pembagian Flazzcard dan almamater?",
      answer:
        "Pembagian tugas harus jelas: delegasikan minimal satu FL untuk mengontrol barisan, satu FL mencocokkan tanda tangan freshmen di lembar serah terima, dan satu FL mengambil logistik. Jika petugas pembagian kewalahan (misal hanya ada 1 staff logistik), FL/FYPL lainnya wajib berinisiatif membackup proses distribusi.",
    },
    {
      id: "leader-3",
      question: "Bagaimana mengantisipasi kesalahan tanda tangan freshmen pada lembar rekap logistik?",
      answer:
        "Pastikan nomor baris di tabel rekap sesuai dengan data freshmen. Dampingi freshmen secara langsung saat tanda tangan dan minta mereka membaca nama serta ukuran almet dengan teliti agar tidak menandatangani kolom milik orang lain.",
    },
    {
      id: "leader-4",
      question: "Bagaimana jika menu Logbook atau Session Log di Binusmaya tidak muncul atau tidak bisa diisi?",
      answer:
        "Jika menu Logbook bermasalah atau kosong (misal kendala tanggal kosong), kumpulkan poin-poin aktivitas mentoring kelas secara lokal terlebih dahulu. Lakukan pengisian susulan di sistem setelah tim IT menyelesaikan perbaikan server.",
    },
    {
      id: "leader-5",
      question: "Apa yang harus dilakukan jika kelas terasa sepi, freshmen pasif, bosan, atau sibuk bermain HP?",
      answer:
        "Persiapkan rundown cadangan dan game ice-breaking menarik untuk mengisi waktu kosong (misal ketika penjelasan materi selesai lebih cepat). FL dilarang berkumpul sendiri di depan kelas; berbaurlah dan ajak freshmen berinteraksi secara aktif.",
    },
    {
      id: "leader-6",
      question: "Bagaimana menyikapi info perubahan jadwal kelas atau penggabungan ABN yang mendadak dari FYPL?",
      answer:
        "Bila mendapat kabar penggabungan kelas secara mendadak, segera berkoordinasi dengan FL/FP kelas mitra untuk berbagi peran penyampaian materi (siapa PIC mic utama, siapa yang backup teknis). Hal ini mencegah miss-komunikasi atau berebutan menjelaskan materi di depan kelas.",
    },
    {
      id: "leader-7",
      question: "Bagaimana mendampingi freshmen dengan kebutuhan khusus atau disabilitas (tunarungu)?",
      answer:
        "Lakukan pendekatan personal yang empati, gunakan media visual atau komunikasi tertulis (kertas/notes) untuk menyampaikan materi orientasi, dan dampingi mereka secara intensif agar tetap dapat mengikuti rangkaian FYP dengan nyaman.",
    },
    {
      id: "leader-8",
      question: "Bagaimana jika terjadi miskomunikasi terkait rundown kegiatan yang kurang detail?",
      answer:
        "Diskusikan rundown secara detail saat briefing pagi bersama seluruh tim FL/FP. Jika briefing terlambat (ngaret) dan waktu mepet dengan jam masuk kelas, segera bagi tugas utama terlebih dahulu dan prioritaskan kesiapan kelas sebelum freshmen tiba.",
    },
    {
      id: "leader-9",
      question: "Apa tindakan pertama jika fasilitas fisik kelas bermasalah (AC panas atau speaker noise)?",
      answer:
        "Laporkan segera ke satpam gedung atau operational staff terdekat untuk penanganan AC dan kelistrikan. Jika mic/speaker kelas mati, gunakan saramonic/speaker portable cadangan atau maksimalkan proyeksi suara agar freshmen tetap mendengar materi dengan jelas.",
    },
    {
      id: "leader-10",
      question: "Bagaimana mengelola mobilisasi freshmen dalam jumlah besar (misal saat menuju Atrium atau pulang)?",
      answer:
        "Tentukan rute mobilisasi dengan matang. Satu FL/FP bertindak sebagai penunjuk jalan di depan (lead), sementara yang lain merapikan barisan di tengah dan belakang (sweep). Lakukan koordinasi waktu agar tidak bentrok dengan ABN lain di lorong/tangga.",
    },
  ],
  partner: [
    {
      id: "partner-coming-soon",
      question: "Kapan FAQ untuk Freshman Partner (FP) dirilis?",
      answer:
        "Coming Soon! Rangkaian tanya-jawab lengkap khusus untuk peran Freshman Partner sedang dalam proses penyusunan dan akan segera dirilis dalam waktu dekat. Tetap pantau microsite ini untuk pembaruan selanjutnya!",
    },
  ],
};

const TABS = [
  { id: "freshman", label: "Freshman", activeClass: "bg-pink text-white shadow-pink/30" },
  { id: "leader", label: "Freshman Leader", activeClass: "bg-cyan text-white shadow-cyan/30" },
  { id: "partner", label: "Freshman Partner", activeClass: "bg-gradient-to-r from-pink to-cyan text-white shadow-pink/20" },
] as const;

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"freshman" | "leader" | "partner">("freshman");
  const [openId, setOpenId] = useState<string | null>("freshman-1");

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const handleTabChange = useCallback((tab: "freshman" | "leader" | "partner") => {
    setActiveTab(tab);
    setOpenId(FAQ_DATA[tab][0]?.id || null);
  }, []);

  // Static elements entrance animation (runs once on scroll)
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
    },
    { scope: sectionRef }
  );

  // FAQ items stagger animation (runs on activeTab change and triggers on scroll)
  useGSAP(
    () => {
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

        {/* Category Tabs */}
        <div className="faq-tabs flex flex-col sm:flex-row justify-center gap-3 p-2 bg-navy/40 backdrop-blur-md rounded-2xl border border-white/10 max-w-[700px] mx-auto mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 px-6 py-3.5 rounded-xl font-display font-bold uppercase text-xs md:text-sm tracking-widest transition-all duration-300 transform ${
                  isActive
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
