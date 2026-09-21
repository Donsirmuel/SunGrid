import React from 'react';
import { NavTab } from '../types';
import { Sun, Phone, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenQuote }) => {
  return (
    <footer className="w-full bg-[#eeeeed] border-t border-[#dedfe5]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Col 1 & 2: Brand and Mission */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sun className="w-4 h-4 text-primary" />
              </div>
              <span className="font-headline-md text-[22px] font-bold text-[#1a1c1c] tracking-tight">
                SunGrid
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary">
                Nigeria
              </span>
            </div>

            <p className="font-body-md text-[14px] text-[#5c4037]/90 max-w-sm mb-6 leading-relaxed">
              Next-generation residential and commercial solar infrastructure, tier-one lithium
              storage, and resilient zero-downtime engineering for homes across Nigeria.
            </p>

            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/70 border border-neutral-300/60 w-full sm:w-auto">
              <span className="font-label-caps text-[10px] text-[#5c4037] uppercase font-bold tracking-wider">
                Priority Engineering & Client Line
              </span>
              <a
                className="font-headline-sm text-[18px] text-primary font-bold hover:text-primary-container transition-colors inline-flex items-center gap-2"
                href="tel:08007864743"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>0800-SUNGRID (0800 786 4743)</span>
              </a>
            </div>
          </div>

          {/* Col 3: Regional Hubs */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-caps text-[11px] text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Regional Hubs
            </span>
            <span className="font-body-sm text-[13px] text-[#5c4037]">
              Lagos (Victoria Island & Lekki)
            </span>
            <span className="font-body-sm text-[13px] text-[#5c4037]">
              Abuja (Maitama Energy Lab)
            </span>
            <span className="font-body-sm text-[13px] text-[#5c4037]">
              Port Harcourt (GRA Phase 2)
            </span>
            <span className="font-body-sm text-[13px] text-[#5c4037]">
              Ibadan (Bodija Operations)
            </span>
            <button
              onClick={() => {
                onSelectTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left text-xs font-semibold text-primary hover:underline mt-2 cursor-pointer"
            >
              View Hub Dispatch Telemetry →
            </button>
          </div>

          {/* Col 4: Systems */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-caps text-[11px] text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              Engineered Systems
            </span>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-[13px] text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Small Flat & Work (3.5kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-[13px] text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Duplex Family Comfort (8-10kVA)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-[13px] text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              Estate Villa & Clinic (15kVA+)
            </button>
            <button
              onClick={() => {
                onSelectTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-[13px] text-[#5c4037] hover:text-[#1a1c1c] transition-colors cursor-pointer"
            >
              SunGrid Nomad Portable (2.4kW)
            </button>
            <button
              onClick={() => {
                onSelectTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-body-sm text-[13px] text-primary font-semibold hover:underline mt-1 cursor-pointer"
            >
              Smart Load Telemetry Sizer →
            </button>
          </div>

          {/* Col 5: SunGrid Standards */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-caps text-[11px] text-[#1a1c1c] uppercase tracking-wider font-bold mb-1">
              SunGrid Standards
            </span>
            <div className="flex items-center gap-1.5 text-[13px] text-[#5c4037]">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>10-Year Inverter Warranty</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#5c4037]">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>6,000 Cycle LiFePO4</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#5c4037]">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>24hr Rapid Field Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#5c4037]">
              <Award className="w-4 h-4 text-primary shrink-0" />
              <span>Zero-Flicker &lt;4ms Switch</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-[#5c4037]">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
              <span>Pure Electrolytic Copper Conduits</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-[#dedfe5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5c4037]">
          <p>© 2025 SunGrid Systems Nigeria Limited. RC 1892044. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-neutral-500">NERC Certified Solar Engineering</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-500">IEEE 1547 Grid Standard Compliant</span>
            <span className="text-neutral-500">•</span>
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
