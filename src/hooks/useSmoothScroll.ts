import { useRef, useEffect, useCallback } from "react";

/**
 * Lerp-damped smooth scroll tracker.
 *
 * Maintains a "current" scroll value that eases toward the real `window.scrollY`
 * every frame, plus a normalised progress (0→1) and instantaneous velocity.
 *
 * The values live on refs (not state) so they can be read inside rAF loops
 * and Framer Motion transforms without triggering React re-renders.
 *
 * Usage:
 *   const scroll = useSmoothScroll();
 *   // In a Framer-Motion useTransform or a Three.js rAF loop:
 *   scroll.current   // damped scroll position (px)
 *   scroll.progress  // 0–1 through entire page
 *   scroll.velocity  // px/frame delta of the damped value
 */

interface SmoothScrollValues {
  /** Damped scroll position in pixels */
  current: number;
  /** Raw (real) scroll position in pixels */
  target: number;
  /** Normalised scroll progress 0 → 1 */
  progress: number;
  /** Instantaneous velocity (px/frame) of the damped value */
  velocity: number;
}

const DAMPING = 0.1; // 0.08 = cinematic, 0.15 = responsive, 0.25 = subtle

export default function useSmoothScroll() {
  const values = useRef<SmoothScrollValues>({
    current: 0,
    target: 0,
    progress: 0,
    velocity: 0,
  });

  const rafId = useRef(0);

  const getMaxScroll = useCallback(() => {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }, []);

  useEffect(() => {
    // Seed with current scroll position
    const initial = window.scrollY;
    values.current.target = initial;
    values.current.current = initial;

    const onScroll = () => {
      values.current.target = window.scrollY;
    };

    const tick = () => {
      const v = values.current;
      const prev = v.current;

      // Lerp toward target
      v.current += (v.target - v.current) * DAMPING;

      // Snap if extremely close (avoids infinite sub-pixel easing)
      if (Math.abs(v.target - v.current) < 0.5) {
        v.current = v.target;
      }

      v.velocity = v.current - prev;

      const max = getMaxScroll();
      v.progress = max > 0 ? v.current / max : 0;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    // Expose on window so non-React code (HologramCanvas) can access it
    (window as any).__smoothScroll = values.current;

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
      delete (window as any).__smoothScroll;
    };
  }, [getMaxScroll]);

  return values;
}
