// ============================================
// FYPL — Shared TypeScript Types
// ============================================

// Navigation
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Common prop mixins
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// FAQ (shared shape used by FaqSection)
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
