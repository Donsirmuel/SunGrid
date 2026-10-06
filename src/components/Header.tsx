import React, { useState } from 'react';
import { NavTab } from '../types';
import {
  ArrowRight01Icon,
  Menu01Icon,
  Cancel01Icon,
  Call02Icon,
  Home01Icon,
  Sun01Icon,
  Tag01Icon,
  CalculatorIcon,
  InformationCircleIcon
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

  const navItems: { id: NavTab; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'packages', label: 'Solar packages', icon: Sun01Icon, desc: '5kVA to 20kVA complete home setups' },
    { id: 'pricing', label: 'Pricing & plans', icon: Tag01Icon, desc: 'Transparent costs with no surprise site fees' },
    { id: 'calculator', label: 'Load calculator', icon: CalculatorIcon, desc: 'Find the right size inverter and battery' },
    { id: 'about', label: 'Depots & engineers', icon: InformationCircleIcon, desc: 'Local parts hubs in Lagos, Abuja, PH & Ibadan' }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-16 py-3.5 flex items-center justify-between text-white border-b border-white/10 bg-neutral-950/90 backdrop-blur-md">
        {/* Brand Identity */}
        <button
          onClick={() => handleNavClick('home')}
          className="group text-left cursor-pointer focus:outline-none transition-transform active:scale-[0.98]"
          aria-label="SunGrid Systems Home"
        >
          <BrandLogo surface="on-dark" variant="gradient" size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[15px]">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (item.id === 'about' && currentTab === 'depots');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 cursor-pointer relative font-medium ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5400] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuote}
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[#ff5400] hover:bg-[#e04a00] px-5 py-2.5 text-sm text-white font-semibold transition-all active:scale-95 cursor-pointer shadow-[0_2px_12px_rgba(255,84,0,0.35)]"
          >
            <span>Request a quote</span>
            <ArrowRight01Icon className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white md:hidden transition-colors active:scale-95 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <Cancel01Icon className="w-6 h-6 text-[#ff8e4d]" /> : <Menu01Icon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer / Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-neutral-950/80 backdrop-blur-md md:hidden flex flex-col justify-between overflow-y-auto">
          <div className="bg-neutral-950 border-b border-neutral-800 p-4 sm:p-5 space-y-2.5 shadow-2xl">
            {/* Home Link */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-colors min-h-[56px] ${
                currentTab === 'home'
                  ? 'bg-primary/20 text-[#ff8e4d] font-bold border border-primary/30'
                  : 'text-neutral-200 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${currentTab === 'home' ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-300'}`}>
                  <Home01Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-semibold">Home overview</div>
                  <div className="text-xs text-neutral-400">Overview of systems and installations</div>
                </div>
              </div>
              <ArrowRight01Icon className="w-5 h-5 text-neutral-500" />
            </button>

            {/* Nav Tabs */}
            {navItems.map((item) => {
              const isItemActive = currentTab === item.id || (item.id === 'about' && currentTab === 'depots');
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-colors min-h-[56px] ${
                    isItemActive
                      ? 'bg-primary/20 text-[#ff8e4d] font-bold border border-primary/30'
                      : 'text-neutral-200 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isItemActive ? 'bg-primary text-white' : 'bg-neutral-800 text-neutral-300'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base font-semibold">{item.label}</div>
                      <div className="text-xs text-neutral-400">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight01Icon className="w-5 h-5 text-neutral-500" />
                </button>
              );
            })}

            {/* Quick Priority Call Direct */}
            <div className="pt-3 mt-3 border-t border-neutral-800/80">
              <a
                href="tel:08007864743"
                className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors min-h-[52px]"
              >
                <Call02Icon className="w-5 h-5 text-[#ff8e4d]" />
                <span>Call direct: 0800-SUNGRID (toll-free)</span>
              </a>
            </div>
          </div>

          {/* Tap outside backdrop area */}
          <div className="flex-1 min-h-[60px]" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};
