// ============================================
// FYPL — Shared TypeScript Types
// ============================================

// Navigation
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavLink extends NavItem {
  children?: NavItem[];
}

// Common Props
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// Hero Section
export interface HeroProps extends WithClassName {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  badge?: string;
}

// Feature / Card
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  color?: string;
}

// Team Member
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Program / Service
export interface Program {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  organization?: string;
}

// Stats
export interface Stat {
  id: string;
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

// FAQ
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Response
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: "success" | "error";
}
