import React from 'react';

export type BrandLogoVariant = 'gradient' | 'flat-orange' | 'mono-obsidian' | 'mono-white';

interface BrandLogoProps {
  /**
   * Surface context:
   * 'on-dark': for obsidian/dark backgrounds (Header, dark cards)
   * 'on-light': for alabaster/light backgrounds (Footer, light cards)
   */
  surface?: 'on-dark' | 'on-light';
  /**
   * Mark rendering style:
   * 'gradient': warm high-res gradient (default for header/hero)
   * 'flat-orange': #ff5400 flat solar orange
   * 'mono-white': #fbfbfa
   * 'mono-obsidian': #111418
   */
  variant?: BrandLogoVariant;
  /**
   * Layout format:
   * 'horizontal': mark + "SunGrid" + "SYSTEMS NIGERIA" subtext
   * 'stacked': mark on top of "SunGrid"
   * 'icon-only': mark only
   * 'wordmark-only': "SunGrid" only
   */
  layout?: 'horizontal' | 'stacked' | 'icon-only' | 'wordmark-only';
  /**
   * Size scale
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtext?: boolean;
}

/**
 * Exact 12-ray Sine-Wave Solar Mark from SunGrid Brand System.
 * Ray length = base amplitude + sine(angle), tracing 1 full AC cycle around the circle.
 * Directional peak: longest ray points due east (188px).
 */
export const SunGridMark: React.FC<{
  variant?: BrandLogoVariant;
  className?: string;
  size?: number;
}> = ({ variant = 'gradient', className = '', size = 40 }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`shrink-0 overflow-visible ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sgRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7a3d" />
          <stop offset="100%" stopColor="#a73400" />
        </linearGradient>
      </defs>

      <g
        strokeLinecap="round"
        strokeWidth={variant === 'flat-orange' ? 14 : 13}
        stroke={
          variant === 'gradient'
            ? 'url(#sgRayGrad)'
            : variant === 'flat-orange'
            ? '#ff5400'
            : variant === 'mono-white'
            ? '#fbfbfa'
            : '#111418'
        }
      >
        <line x1="100" y1="70" x2="100" y2="32" />
        <line x1="115" y1="74" x2="139" y2="32.5" />
        <line x1="126" y1="85" x2="173.6" y2="57.5" />
        <line x1="130" y1="100" x2="188" y2="100" />
        <line x1="126" y1="115" x2="173.6" y2="142.5" />
        <line x1="115" y1="126" x2="139" y2="167.5" />
        <line x1="100" y1="130" x2="100" y2="168" />
        <line x1="85" y1="126" x2="71" y2="150.2" />
        <line x1="74" y1="115" x2="55.8" y2="125.5" />
        <line x1="70" y1="100" x2="52" y2="100" />
        <line x1="74" y1="85" x2="55.8" y2="74.5" />
        <line x1="85" y1="74" x2="71" y2="49.8" />
      </g>
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  surface = 'on-dark',
  variant,
  layout = 'horizontal',
  size = 'md',
  className = '',
  showSubtext = true
}) => {
  const isOnDark = surface === 'on-dark';
  // Default variant matches official spec: gradient for primary on dark, or flat-orange
  const resolvedVariant: BrandLogoVariant = variant || (isOnDark ? 'gradient' : 'flat-orange');

  const markPixelSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 64
  };

  const wordmarkSizes = {
    sm: 'text-[18px]',
    md: 'text-[22px]',
    lg: 'text-[26px]',
    xl: 'text-[36px]'
  };

  const subtextSizes = {
    sm: 'text-[8px] tracking-[0.14em]',
    md: 'text-[9.5px] tracking-[0.18em]',
    lg: 'text-[11px] tracking-[0.2em]',
    xl: 'text-[13px] tracking-[0.22em]'
  };

  if (layout === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <SunGridMark variant={resolvedVariant} size={markPixelSizes[size]} />
      </div>
    );
  }

  if (layout === 'wordmark-only') {
    return (
      <div
        className={`font-['Space_Grotesk'] font-bold tracking-tight ${wordmarkSizes[size]} ${
          isOnDark ? 'text-[#fbfbfa]' : 'text-[#111418]'
        } ${className}`}
      >
        SunGrid
      </div>
    );
  }

  if (layout === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-2.5 ${className}`}>
        <SunGridMark variant={resolvedVariant} size={markPixelSizes[size]} />
        <div className="flex flex-col items-center leading-none">
          <span
            className={`font-['Space_Grotesk'] font-bold tracking-tight ${wordmarkSizes[size]} ${
              isOnDark ? 'text-[#fbfbfa]' : 'text-[#111418]'
            }`}
          >
            SunGrid
          </span>
          {showSubtext && (
            <span
              className={`font-['Plus_Jakarta_Sans'] font-bold uppercase mt-1 ${subtextSizes[size]} ${
                isOnDark ? 'text-white/60' : 'text-[#636b74]'
              }`}
            >
              SYSTEMS NIGERIA
            </span>
          )}
        </div>
      </div>
    );
  }

  // Primary horizontal lockup (default for navbar and headers)
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <SunGridMark variant={resolvedVariant} size={markPixelSizes[size]} />
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-['Space_Grotesk'] font-bold tracking-[-0.025em] ${wordmarkSizes[size]} ${
            isOnDark ? 'text-[#fbfbfa]' : 'text-[#111418]'
          }`}
        >
          SunGrid
        </span>
        {showSubtext && (
          <span
            className={`font-['Plus_Jakarta_Sans'] font-bold uppercase mt-1 ${subtextSizes[size]} ${
              isOnDark ? 'text-white/60' : 'text-[#636b74]'
            }`}
          >
            SYSTEMS NIGERIA
          </span>
        )}
      </div>
    </div>
  );
};
