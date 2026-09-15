"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for observability (replace with a real logger later).
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cyan">
        Terjadi Kesalahan
      </p>
      <h1
        className="font-display font-black uppercase text-white leading-none"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        OOPS<span className="text-pink italic">!</span>
      </h1>
      <p className="font-body text-white/70 max-w-[480px]">
        Ada yang tidak beres saat memuat halaman. Coba lagi, atau muat ulang
        halaman.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan bg-cyan text-navy font-display font-bold uppercase tracking-widest text-lg hover:bg-transparent hover:text-cyan transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        Coba Lagi
      </button>
    </main>
  );
}
