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
              Complete residential and commercial solar installations, Grade-A lithium storage,
              and dedicated depot warranty support across Nigeria.
            </p>

            <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white/80 border border-neutral-300/60 w-full sm:w-auto">
              <span className="font-label-caps text-xs text-[#5c4037] uppercase font-bold tracking-wider">
                Priority Engineering & Client Line
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
              Regional Hubs
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Lagos (Victoria Island & Lekki)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Abuja (Maitama Energy Lab)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Port Harcourt (GRA Phase 2)
            </span>
            <span className="font-body-sm text-sm text-[#5c4037]">
              Ibadan (Bodija Operations)
            </span>
            <button
              onClick={() => {
                onSelectTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-sm font-semibold text-primary hover:underline mt-2 cursor-pointer"
            >
              View Regional Hubs & Depots →
            </button>
          </div>

          {/* Col 4: Systems */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Engineered Systems
            </span>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Small Flat & Work (3.5kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Duplex Family Comfort (8-10kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Estate Villa & Clinic (15kVA+)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              SunGrid Nomad Portable (2.4kW)
            </button>
            <button
              onClick={() => {
                onSelectTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-sm text-primary font-semibold hover:underline mt-1 cursor-pointer"
            >
              Smart Load Telemetry Sizer →
            </button>
          </div>

          {/* Col 5: SunGrid Standards */}
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-xs text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              SunGrid Standards
            </span>
            <span className="text-sm text-[#5c4037] font-medium">10-Year Inverter Warranty</span>
            <span className="text-sm text-[#5c4037] font-medium">6,000 Cycle LiFePO4</span>
            <span className="text-sm text-[#5c4037] font-medium">24hr Rapid Field Support</span>
            <span className="text-sm text-[#5c4037] font-medium">Fast &lt;4ms Transfer Switch</span>
            <span className="text-sm text-[#5c4037] font-medium">Pure Electrolytic Copper Conduits</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-[#dedfe5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#5c4037]">
          <p>© 2025 SunGrid Systems Nigeria Limited. RC 1892044. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-neutral-500">NERC Certified Solar Engineering</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-500">IEEE 1547 Grid Standard Compliant</span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <button
              onClick={onOpenQuote}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Book Physical Site Audit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
