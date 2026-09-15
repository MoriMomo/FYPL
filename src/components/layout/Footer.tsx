import Image from "next/image";

// FYPL Footer — Server Component — Tailwind v4

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT FYP", href: "#about" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "TEAM", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark" aria-label="Site footer">
      {/* Top accent stripe */}
      <div className="flex h-1.5" aria-hidden="true">
        <div className="flex-1 bg-pink" />
        <div className="flex-1 bg-cyan" />
        <div className="flex-1 bg-navy-light" />
      </div>

      {/* Main footer content */}
      <div className="max-w-300 mx-auto px-10 py-16 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Image
            src="/logo2.png"
            alt="FYPL Logo"
            width={140}
            height={140}
            className="w-35 h-auto object-contain rounded-full bg-white p-1"
          />
          <p className="font-display font-semibold uppercase tracking-widest text-sm text-cyan">
            B2030 · Binus University · @Kemanggisan
          </p>
          <p className="font-body text-white/60 text-base">
            Every step, every way —{" "}
            <em className="text-pink font-bold not-italic">OKAYYYY!</em>
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-3" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-display font-semibold uppercase tracking-widest text-sm text-white/60 hover:text-cyan transition-colors duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-white/35 font-body">
        © {year} FYPL B2030 Binus University. All rights reserved.
      </div>
    </footer>
  );
}
