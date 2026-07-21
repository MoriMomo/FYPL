// ============================================
// FYPL — Utility Functions
// ============================================

/**
 * Combine class names (lightweight clsx alternative)
 * Avoids importing barrel files — bundle-barrel-imports rule
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format number with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toString();
}

/**
 * Slugify a string for URLs
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Debounce function — js-cache-function-results rule
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if code runs in browser environment
 * rendering-hydration-no-flicker rule
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Wait/sleep utility for async operations
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  // js-min-max-loop rule — avoid sort for min/max
  return Math.min(Math.max(value, min), max);
}
