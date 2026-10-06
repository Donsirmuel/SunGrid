import React from 'react';
import { NavTab } from '../types';
import { Call02Icon } from 'hugeicons-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenQuote }) => {
  return (
    <footer className="w-full bg-[#eeeeed] border-t border-[#dedfe5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-14 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand and Mission */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="mb-4">
              <BrandLogo surface="on-light" variant="flat-orange" size="lg" />
            </div>

            <p className="font-body-md text-sm text-[#5c4037]/90 max-w-sm mb-6 leading-relaxed">
              Solar power systems, long-life lithium battery storage, and physical spare parts depots across Nigeria.
            </p>

            <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white/80 border border-neutral-300/60 w-full sm:w-auto">
              <span className="font-label-caps text-xs text-[#5c4037] uppercase font-bold tracking-wider">
                Engineering and support line
              </span>
              <a
                className="font-headline-sm text-lg text-primary font-bold hover:text-primary-container transition-colors inline-flex items-center gap-2"
                href="tel:08007864743"
              >
                <Call02Icon className="w-5 h-5 text-primary" />
                <span>0800-SUNGRID (0800 786 4743)</span>
              </a>
            </div>
          </div>

          {/* Col 3: Regional Hubs */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Regional depots
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Lagos (Victoria Island & Lekki)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Abuja (Maitama & Idu Industrial)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Port Harcourt (Trans-Amadi)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Ibadan (Bodija & Ring Road)
            </span>
            <button
              onClick={() => {
                onSelectTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-sm font-semibold text-primary hover:underline mt-2 cursor-pointer"
            >
              View regional depots & stock →
            </button>
          </div>

          {/* Col 4: Systems */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Solar packages
            </span>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Small flat & apartment (3.5kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Family duplex (8-10kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Mansion & clinic (15kVA+)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Nomad portable power (2.4kW)
            </button>
            <button
              onClick={() => {
                onSelectTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-primary font-semibold hover:underline mt-1 cursor-pointer"
            >
              Calculate your load size →
            </button>
          </div>

          {/* Col 5: SunGrid Standards */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Installation standards
            </span>
            <span className="text-sm text-[#5c4037] font-medium">10-year inverter warranty</span>
            <span className="text-sm text-[#5c4037] font-medium">6,000-cycle LiFePO4 batteries</span>
            <span className="text-sm text-[#5c4037] font-medium">24-hour equipment replacement</span>
            <span className="text-sm text-[#5c4037] font-medium">&lt;4ms automatic transfer switch</span>
            <span className="text-sm text-[#5c4037] font-medium">Pure electrolytic copper wiring</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-[#dedfe5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#5c4037]">
          <p>© 2025 SunGrid Systems Nigeria Limited. RC 1892044. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-neutral-500">NERC-certified electrical engineers</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-500">IEEE 1547 grid standard compliant</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <button
              onClick={onOpenQuote}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Book an on-site audit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
