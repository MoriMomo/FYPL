"use client";

import { useEffect } from "react";

// Module-level refcount so multiple components (splash, modal overlay, etc.)
// can each request a scroll lock without clobbering one another. The page is
// only unlocked once every locker has released.
let lockCount = 0;

function applyLock() {
  lockCount += 1;
  if (lockCount === 1) {
    document.documentElement.style.overflow = "hidden";
  }
}

function releaseLock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.style.overflow = "";
  }
}

/**
 * Lock page scroll while `active` is true. Safe to use from several components
 * at once — the lock is only lifted when the last active locker releases.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    applyLock();
    return releaseLock;
  }, [active]);
}
