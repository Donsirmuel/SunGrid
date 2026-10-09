import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Call02Icon
} from 'hugeicons-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'packages', label: 'Solar packages' },
    { id: 'pricing', label: 'Pricing & plans' },
    { id: 'calculator', label: 'Load calculator' },
    { id: 'about', label: 'Depots & engineers' }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* QuickFleet-style light header with centered pill navigation track */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 h-[76px] sm:h-[84px] px-3 sm:px-6 lg:px-10 bg-white/88 backdrop-blur-[14px] transition-all duration-200 ${
          isScrolled ? 'shadow-[0_1px_0_rgba(12,7,48,0.08)]' : ''
        }`}
      >
        <div className="max-w-[1560px] mx-auto h-full flex items-center justify-between gap-6 relative">
          {/* Logo Left */}
          <button
            onClick={() => handleNavClick('home')}
            className="group text-left cursor-pointer focus:outline-none transition-transform active:scale-[0.98] shrink-0"
            aria-label="SunGrid Systems Home"
          >
            <BrandLogo surface="on-light" variant="gradient" size="md" />
          </button>

          {/* Centered Floating Pill Navigation Track */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-1 p-[5px] bg-[#F3F1EC] rounded-full border border-black/[0.03]">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-4 py-2 rounded-full text-[14.5px] font-medium transition-all cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-white text-[#0C0730] shadow-[0_1px_2px_rgba(12,7,48,0.06)] font-semibold'
                    : 'text-[#0C0730]/80 hover:text-[#0C0730] hover:bg-white/60'
                }`}
              >
                Home
              </button>
              {navItems.map((item) => {
                const isActive = currentTab === item.id || (item.id === 'about' && currentTab === 'depots');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-full text-[14.5px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#0C0730] shadow-[0_1px_2px_rgba(12,7,48,0.06)] font-semibold'
                        : 'text-[#0C0730]/80 hover:text-[#0C0730] hover:bg-white/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Action Right: Ghost Control + Ink CTA + Mobile Burger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Toll-free Hotline Ghost Pill */}
            <a
              href="tel:08007864743"
              className="hidden xl:inline-flex items-center gap-2 h-[44px] px-4.5 rounded-full border border-[#0C0730]/16 hover:border-[#0C0730]/40 hover:bg-white text-[14px] font-medium text-[#0C0730] transition-all cursor-pointer"
            >
              <Call02Icon className="w-4 h-4 text-[#ff5400]" />
              <span>0800-SUNGRID</span>
            </a>

            {/* Solid Ink Action Control (hidden on mobile to prevent overflow) */}
            <button
              onClick={onOpenQuote}
              className="hidden md:inline-flex items-center gap-2 h-[44px] px-5 sm:px-5.5 rounded-full bg-[#0A0A0D] hover:bg-[#22184A] text-white text-[14px] font-medium transition-all cursor-pointer active:scale-95 shadow-xs group"
            >
              <span>Request a quote</span>
              <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Burger Pill */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center gap-2 h-[42px] pl-3.5 pr-1.5 rounded-full bg-[#0A0A0D] text-white text-[14px] font-medium transition-all active:scale-95 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              <span className="w-7 h-7 rounded-full bg-white/14 flex items-center justify-center">
                {mobileMenuOpen ? (
                  <Cancel01Icon className="w-4 h-4 text-[#ff7a3d]" />
                ) : (
                  <span className="flex flex-col gap-1 w-3">
                    <span className="block h-[1.5px] w-full bg-white rounded-full" />
                    <span className="block h-[1.5px] w-full bg-white rounded-full" />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Light Clean Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white text-[#0C0730] flex flex-col justify-between overflow-y-auto animate-fadeIn lg:hidden">
          {/* Top Bar */}
          <div className="h-[76px] sm:h-[84px] px-4 sm:px-6 flex items-center justify-between border-b border-neutral-100">
            <button
              onClick={() => handleNavClick('home')}
              className="group text-left cursor-pointer focus:outline-none"
              aria-label="SunGrid Systems Home"
            >
              <BrandLogo surface="on-light" variant="gradient" size="md" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 h-[40px] px-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#0C0730] text-sm font-medium transition-all cursor-pointer"
              aria-label="Close menu"
            >
              <span>Close</span>
              <Cancel01Icon className="w-4 h-4 text-[#0C0730]" />
            </button>
          </div>

          {/* Clean Nav Links */}
          <div className="flex-1 px-5 py-6 space-y-1.5 max-w-xl mx-auto w-full">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center justify-between transition-colors ${
                currentTab === 'home'
                  ? 'bg-[#F3F1EC] text-[#0C0730] font-semibold'
                  : 'text-[#0C0730]/80 font-medium hover:text-[#0C0730] hover:bg-neutral-50'
              }`}
            >
              <span className="text-[17px]">Home</span>
              <ArrowRight01Icon className={`w-4 h-4 ${currentTab === 'home' ? 'text-[#ff5400]' : 'text-neutral-300'}`} />
            </button>

            {navItems.map((item) => {
              const isItemActive = currentTab === item.id || (item.id === 'about' && currentTab === 'depots');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3.5 px-4 rounded-xl flex items-center justify-between transition-colors ${
                    isItemActive
                      ? 'bg-[#F3F1EC] text-[#0C0730] font-semibold'
                      : 'text-[#0C0730]/80 font-medium hover:text-[#0C0730] hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-[17px]">{item.label}</span>
                  <ArrowRight01Icon className={`w-4 h-4 ${isItemActive ? 'text-[#ff5400]' : 'text-neutral-300'}`} />
                </button>
              );
            })}
          </div>

          {/* Footer CTAs */}
          <div className="p-6 border-t border-neutral-100 bg-[#F9F9F8] space-y-3 max-w-xl mx-auto w-full">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full h-12 rounded-full bg-[#0A0A0D] hover:bg-[#22184A] text-white font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <span>Request a quote</span>
              <ArrowRight01Icon className="w-4 h-4" />
            </button>

            <a
              href="tel:08007864743"
              className="w-full h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-[#0C0730] text-sm font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Call02Icon className="w-4 h-4 text-[#ff5400]" />
              <span>Call 0800-SUNGRID (toll-free)</span>
            </a>

            <p className="text-center text-xs text-neutral-500 pt-1">
              Field depots in Lagos · Abuja · Port Harcourt · Ibadan
            </p>
          </div>
        </div>
      )}
    </>
  );
};
