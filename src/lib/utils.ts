// ============================================
// FYPL — Utility Functions
// ============================================

/**
 * Combine class names (lightweight clsx alternative).
 * Filters out falsy values so conditional classes are ergonomic.
 */
export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/** True when running in the browser (guards window-only code). */
export const isBrowser = typeof window !== "undefined";
