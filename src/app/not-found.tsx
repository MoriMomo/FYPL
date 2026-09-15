import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
        Error 404
      </p>
      <h1
        className="font-display font-black uppercase text-white leading-none"
        style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
      >
        4<span className="text-pink italic">0</span>4
      </h1>
      <p className="font-body text-white/70 max-w-[480px]">
        Halaman yang kamu cari tidak ada. Mungkin sudah dipindahkan atau
        tautannya salah.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan bg-cyan text-navy font-display font-bold uppercase tracking-widest text-lg hover:bg-transparent hover:text-cyan transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
