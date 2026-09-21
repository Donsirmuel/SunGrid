import { useEffect, useState } from 'react';

export interface ScrollTelemetryState {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  scrollDirection: 'down' | 'up' | 'idle';
  velocity: number;
}

export function useScrollTelemetry(): ScrollTelemetryState {
  const [telemetry, setTelemetry] = useState<ScrollTelemetryState>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'idle',
    velocity: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY || 0;
    let lastTime = performance.now();
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame((now) => {
          const currentScrollY = Math.max(0, window.scrollY || 0);
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
          const dt = Math.max(1, now - lastTime);
          const diff = currentScrollY - lastScrollY;
          const currentVelocity = Math.abs(diff) / dt;

          let dir: 'down' | 'up' | 'idle' = 'idle';
          if (diff > 1) dir = 'down';
          else if (diff < -1) dir = 'up';

          // Update CSS custom properties on documentElement for zero-render CSS animations
          document.documentElement.style.setProperty('--scroll-p', progress.toFixed(4));
          document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
          document.documentElement.style.setProperty(
            '--scroll-velocity',
            currentVelocity.toFixed(3)
          );

          setTelemetry({
            scrollY: currentScrollY,
            scrollProgress: progress,
            scrollDirection: dir,
            velocity: currentVelocity,
          });

          lastScrollY = currentScrollY;
          lastTime = now;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return telemetry;
}
