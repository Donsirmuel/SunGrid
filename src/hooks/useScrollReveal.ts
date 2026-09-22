import { useEffect } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelayMs?: number;
  containerSelector?: string;
}

/**
 * Custom hook to manage IntersectionObserver scroll animations with quiet mechanical precision.
 * - threshold: default 0.25 (as requested)
 * - rootMargin: default '0px 0px -40px 0px'
 * - dynamically applies progressive mechanical stagger delays to sibling/child elements
 */
export function useScrollReveal({
  threshold = 0.25,
  rootMargin = '0px 0px -40px 0px',
  staggerDelayMs = 90
}: ScrollRevealOptions = {}) {
  useEffect(() => {
    // Select all scroll-reveal containers or direct items
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-reveal-init')
    );

    if (revealElements.length === 0) return;

    // Group elements by their parent container to compute mechanical stagger indexes
    const containerGroups = new Map<HTMLElement, HTMLElement[]>();
    revealElements.forEach((el) => {
      const parent = el.parentElement || document.body;
      if (!containerGroups.has(parent)) {
        containerGroups.set(parent, []);
      }
      containerGroups.get(parent)!.push(el);
    });

    // Assign dynamic stagger transitions so sibling elements cascade smoothly
    containerGroups.forEach((items) => {
      items.forEach((item, index) => {
        // Only set if not explicitly set via custom inline style
        const computedDelay = index * staggerDelayMs;
        item.style.transitionDelay = `${computedDelay}ms`;
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-active');
            // Once revealed with mechanical precision, unobserve so it remains stable
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelayMs]);
}
