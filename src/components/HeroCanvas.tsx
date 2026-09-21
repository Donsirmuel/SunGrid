import React, { useEffect, useRef, useCallback } from 'react';

interface HeroCanvasProps {
  onFrameUpdate?: (frameIndex: number) => void;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ onFrameUpdate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Persistent milestone flags: ensure text and CTA only animate once and stay permanently
  const hasLine1AnimatedRef = useRef<boolean>(false);
  const hasLine2AnimatedRef = useRef<boolean>(false);
  const hasPAnimatedRef = useRef<boolean>(false);
  const hasCtaAnimatedRef = useRef<boolean>(false);

  // Helper to transition elements with subtle blur filter & translate-y mechanical settle
  const revealElement = useCallback((elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.classList.remove('hero-state-hidden');
      el.classList.add('hero-state-visible');
    }
  }, []);

  // Beat 1: Initial Hook "Say goodbye to blackouts." (reveals smoothly at t=0.2s)
  const triggerLine1Animation = useCallback(() => {
    if (hasLine1AnimatedRef.current) return;
    hasLine1AnimatedRef.current = true;
    revealElement('hero-synced-line-1');
  }, [revealElement]);

  // Beat 2: "Power your home silently, day & night." (reveals at t=2.4s as solar panels mount on roof)
  const triggerLine2Animation = useCallback(() => {
    if (hasLine2AnimatedRef.current) return;
    hasLine2AnimatedRef.current = true;
    revealElement('hero-synced-line-2');
  }, [revealElement]);

  // Beat 3: Supporting narrative paragraph (reveals at t=3.6s as warm window lights ignite)
  const triggerPAnimation = useCallback(() => {
    if (hasPAnimatedRef.current) return;
    hasPAnimatedRef.current = true;
    revealElement('hero-synced-p');
  }, [revealElement]);

  // Beat 4: Action buttons "Check Your Home Sizing" + "Get a Free Quote" (reveals at t=4.6s)
  const triggerCtaAnimation = useCallback(() => {
    if (hasCtaAnimatedRef.current) return;
    hasCtaAnimatedRef.current = true;
    revealElement('hero-synced-cta');
  }, [revealElement]);

  // Synchronize narrative reveals with video time progression
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const t = video.currentTime;
    const duration = video.duration || 8.0;

    // t >= 0.2s: Reveal line 1
    if (t >= 0.2) {
      triggerLine1Animation();
    }
    // t >= 2.4s: Reveal line 2 (solar installation beat)
    if (t >= 2.4) {
      triggerLine2Animation();
    }
    // t >= 3.6s: Reveal narrative paragraph (window lights ignition beat)
    if (t >= 3.6) {
      triggerPAnimation();
    }
    // t >= 4.6s: Reveal CTAs (steady compound beat)
    if (t >= 4.6) {
      triggerCtaAnimation();
    }

    // Freeze gracefully at final frame without rewinding
    if (t >= duration - 0.08) {
      video.pause();
    }

    if (onFrameUpdate) {
      const progress = Math.min(Math.max(t / duration, 0), 1);
      onFrameUpdate(Math.round(progress * 39));
    }
  };

  const handleVideoEnded = () => {
    triggerLine1Animation();
    triggerLine2Animation();
    triggerPAnimation();
    triggerCtaAnimation();
  };

  // Immediate start & scroll reveal backup
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerLine1Animation();
    }, 250);

    const handleScroll = () => {
      const sy = window.scrollY || 0;
      if (sy > 20) {
        triggerLine1Animation();
        triggerLine2Animation();
      }
      if (sy > 60) {
        triggerPAnimation();
        triggerCtaAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerCtaAnimation, triggerLine1Animation, triggerLine2Animation, triggerPAnimation]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-950 select-none">
      {/* Native 720p H.264 Muted 60 FPS Video - Plays once and stays frozen at final frame */}
      <video
        ref={videoRef}
        src="/hero-power.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Subtle Directional Overlays ensuring text legibility over dusk sky while keeping house crisp */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
