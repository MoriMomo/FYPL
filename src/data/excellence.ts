// ============================================
// FYPL — Excellence Program Journey data
// 13-week roadmap. Edit content here; components read from this file.
// ============================================

export type ActivityType = "GSLC" | "F2F";

/** The four psychological phases of the program (the "throughline"). */
export type Phase = "Discover" | "Connect" | "Grow" | "Move Forward";

export interface WeekNode {
  week: number;
  type: ActivityType;
  title: string;
  description: string;
  phase: Phase;
}

// --- Activity type metadata (mapped onto the FYPL brand palette) ---
// GSLC (self-learning) -> cyan; F2F (onsite) -> pink.
export const ACTIVITY_TYPES: Record<
  ActivityType,
  { label: string; sessions: number; accent: string; bg: string; text: string }
> = {
  GSLC: {
    label: "GSLC · Self-learning",
    sessions: 7,
    accent: "#45C8D8", // cyan
    bg: "bg-cyan",
    text: "text-cyan",
  },
  F2F: {
    label: "F2F · Onsite",
    sessions: 6,
    accent: "#E8185A", // pink
    bg: "bg-pink",
    text: "text-pink",
  },
};

// --- The 13 weeks (content verbatim from the program brief) ---
export const WEEKS: WeekNode[] = [
  {
    week: 1,
    type: "GSLC",
    title: "Start Your Growth Journey",
    description:
      "Overview of the Excellence Program and BGA Foundation. Students must complete 9 self-paced BGA modules on the CX platform by October 18, 2026.",
    phase: "Discover",
  },
  {
    week: 2,
    type: "F2F",
    title: "Ready to Start",
    description:
      "Program briefing, CSA (Community Service Activity) introduction, and campus readiness. Includes a well-being check-in using the BeeCare app.",
    phase: "Discover",
  },
  {
    week: 3,
    type: "GSLC",
    title: "Your Campus Support System",
    description:
      'Explore campus services through the "Freshmen Race," where students find and check into support centers (e.g., BINUS Support, Library, Student Advisory) via QR codes.',
    phase: "Connect",
  },
  {
    week: 4,
    type: "F2F",
    title: "Plan Your First Semester",
    description:
      "Focuses on academic planning. Students simulate their GPA/GPS, build an Academic Study Plan using an Excel workbook, and map out activities to hit a target of 120 SAT points and 30 CSH by Semester 2.",
    phase: "Connect",
  },
  {
    week: 5,
    type: "GSLC",
    title: "The Art of Communication",
    description:
      "Focuses on building rapport, active listening, and questioning skills. Students must self-enroll on the CX platform and pass a quiz with a minimum score of 70.",
    phase: "Connect",
  },
  {
    week: 6,
    type: "F2F",
    title: "Explore Learning Opportunities",
    description:
      "Student-Led Learning, UTS (midterm) reflection, mentoring, and a CSA checkpoint.",
    phase: "Connect",
  },
  {
    week: 7,
    type: "GSLC",
    title: "Optimizing Me",
    description:
      "Self-awareness, emotional intelligence, time, and learning management.",
    phase: "Grow",
  },
  {
    week: 8,
    type: "F2F",
    title: "My Campus Survival Guide",
    description: "A Content Creation Challenge based on campus life.",
    phase: "Grow",
  },
  {
    week: 9,
    type: "GSLC",
    title: "Applied BGA",
    description:
      "Growth Mindset, Adaptability, Initiative. Choosing better responses to first-year challenges.",
    phase: "Grow",
  },
  {
    week: 10,
    type: "F2F",
    title: "Circle Time — Reflect and Reset",
    description:
      'Study plan evaluation and emotion check-in. Students review their Week 4 Study Plan to see if their academic targets are still reachable and adjust them if necessary. Also includes an "Advice Gallery Walk" sharing survival tips via Padlet.',
    phase: "Grow",
  },
  {
    week: 11,
    type: "GSLC",
    title: "Applied BGA",
    description: "Critical & Creative Thinking and Digital & Technology Fluency.",
    phase: "Grow",
  },
  {
    week: 12,
    type: "GSLC",
    title: "Applied BGA",
    description:
      "Social Awareness, Collaboration, and Applied Management Skills.",
    phase: "Move Forward",
  },
  {
    week: 13,
    type: "F2F",
    title: "Complete Your Growth Journey",
    description: "Survey reflection, final check-in, and appreciation.",
    phase: "Move Forward",
  },
];

// --- Program throughline (4 phases) ---
// Brand mapping: Discover -> navy-light, Connect -> cyan, Grow -> pink,
// Move Forward -> cyan-dark. (Brief's purple/green/orange re-mapped to brand.)
export interface ThroughlinePhase {
  id: Phase;
  subtitle: string;
  description: string;
  bg: string;
  accent: string;
}

export const THROUGHLINE: ThroughlinePhase[] = [
  {
    id: "Discover",
    subtitle: "Find passion & build connection",
    description: "Find passion and build connection.",
    bg: "bg-navy-light",
    accent: "#2A3B9E",
  },
  {
    id: "Connect",
    subtitle: "Learn & Navigate",
    description:
      "Understand systems, services, and academic cultures.",
    bg: "bg-cyan",
    accent: "#45C8D8",
  },
  {
    id: "Grow",
    subtitle: "Grow with BGA",
    description: "Practice BGA through relevant skills development.",
    bg: "bg-pink",
    accent: "#E8185A",
  },
  {
    id: "Move Forward",
    subtitle: "Complete & Reflect",
    description: "Act, evaluate, reflect, and apply with intention.",
    bg: "bg-cyan-dark",
    accent: "#2AABB8",
  },
];

// --- Applied BGA competency groups (3 cards) ---
export interface BGAGroup {
  id: string;
  title: string;
  skills: string[];
  accent: string;
}

export const BGA_GROUPS: BGAGroup[] = [
  {
    id: "self",
    title: "Self-Readiness",
    skills: ["Growth Mindset", "Adaptability", "Resilience"],
    accent: "#E8185A",
  },
  {
    id: "academic",
    title: "Academic & Thinking Readiness",
    skills: ["Critical & Creative Thinking", "Digital & Technology Fluency"],
    accent: "#45C8D8",
  },
  {
    id: "social",
    title: "Social & Action Readiness",
    skills: [
      "Social Awareness",
      "Collaboration",
      "Applied Management Skills",
    ],
    accent: "#2A3B9E",
  },
];

export const EXCELLENCE_META = {
  title: "Excellence Program Journey",
  subtitle:
    "13-Week Guided Journey for Freshmen Growth, Campus Readiness, and BGA Development.",
} as const;
