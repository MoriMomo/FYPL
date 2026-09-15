export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
}

// PLACEHOLDER: confirm/replace with real figures before launch.
export const STATS: StatItem[] = [
  { id: "freshman", target: 2000, suffix: "+", label: "New Freshman" },
  { id: "organizations", target: 50, suffix: "+", label: "Organizations to Join" },
  { id: "mentors", target: 400, suffix: "+", label: "Mentors to Help" },
];
