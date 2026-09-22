import React, { useState } from 'react';
import { NavTab } from '../types';
import { ArrowRight, Menu, X, Phone } from 'lucide-react';
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

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'packages', label: 'Solar Packages' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'calculator', label: 'Load Calculator' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-16 py-3.5 flex items-center justify-between text-white border-b border-white/10 bg-neutral-950/85 backdrop-blur-md">
      {/* Brand Identity */}
      <button
        onClick={() => handleNavClick('home')}
        className="group text-left cursor-pointer focus:outline-none transition-transform active:scale-[0.98]"
        aria-label="SunGrid Systems Home"
      >
        <BrandLogo surface="on-dark" variant="gradient" size="md" />
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-[13.5px]">
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

      {/* Desktop Action Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenQuote}
          className="inline-flex items-center gap-2 rounded-full bg-[#ff5400] hover:bg-[#e04a00] px-5 py-2 text-[13px] text-white font-medium transition-all active:scale-95 cursor-pointer shadow-[0_2px_12px_rgba(255,84,0,0.35)]"
        >
          <span>Get a Free Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-8 h-8 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center text-white md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-2xl md:hidden">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              currentTab === 'home' ? 'bg-neutral-900 text-white font-semibold' : 'text-neutral-300'
            }`}
          >
            Home
          </button>
          {navItems.map((item) => {
            const isItemActive = currentTab === item.id || (item.id === 'about' && currentTab === 'depots');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  isItemActive ? 'bg-neutral-900 text-[#ff8e4d] font-semibold' : 'text-neutral-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href="tel:08007864743"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-neutral-900 text-xs text-white"
            >
              <Phone className="w-4 h-4 text-[#ff8e4d]" />
              <span>Call Priority Line: 0800-SUNGRID</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-full bg-primary text-white font-label-ui text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>Dispatch Sizing Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
