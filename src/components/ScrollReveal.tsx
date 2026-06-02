import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Extra translateY parallax multiplier. 0 = no parallax. Positive = slower scroll. */
  parallaxSpeed?: number;
  /** Initial translateY offset in px before reveal */
  offset?: number;
  /** Extra delay in ms for stagger sequencing */
  delay?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
}

export default function ScrollReveal({
  children,
  parallaxSpeed = 0,
  offset = 60,
  delay = 0,
  threshold = 0.12,
  className = "",
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const parallaxRef = useRef(0);
  const rafRef = useRef(0);

  // Intersection Observer — trigger reveal once
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay for stagger effect
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  // Parallax RAF loop — only runs if parallaxSpeed is set
  useEffect(() => {
    if (parallaxSpeed === 0) return;

    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const smoothScroll = (window as Window & {
        __smoothScroll?: {
          current: number;
          velocity: number;
        };
      }).__smoothScroll;
      if (smoothScroll && el) {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distFromCenter = elementCenter - viewportCenter;

        // Target parallax offset proportional to distance from viewport center
        const target = distFromCenter * parallaxSpeed * 0.1;
        parallaxRef.current += (target - parallaxRef.current) * 0.08;

        el.style.transform = isVisible
          ? `translateY(${parallaxRef.current}px) translateZ(0)`
          : `translateY(${offset}px) translateZ(0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [parallaxSpeed, isVisible, offset]);

  return (
    <div
      ref={ref}
      {...props}
      className={`scroll-reveal ${className}`}
      style={{
        ...props.style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? parallaxSpeed !== 0
            ? undefined // managed by rAF above
            : `translateY(0px) scale(1) translateZ(0)`
          : `translateY(${offset}px) scale(0.97) translateZ(0)`,
        transitionDelay: parallaxSpeed !== 0 ? undefined : `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
