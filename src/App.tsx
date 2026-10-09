import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CalculatorView } from './components/CalculatorView';
import { PricingView } from './components/PricingView';
import { PackagesView } from './components/PackagesView';
import { DepotsView } from './components/DepotsView';
import { QuoteModal } from './components/QuoteModal';
import { WhatsappIcon } from 'hugeicons-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState<string | undefined>(undefined);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleOpenQuote = (packageName?: string) => {
    setSelectedPackageForQuote(packageName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setSelectedPackageForQuote(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0C0730] selection:bg-orange-500/20 selection:text-[#ff5400] relative font-sans antialiased pb-safe overflow-x-hidden max-w-full">
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Content View Switcher */}
      <main key={currentTab} className="flex-1 w-full flex flex-col mech-settle animate-fadeIn">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={setCurrentTab}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorView
            onSelectTab={setCurrentTab}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingView
            onSelectTab={setCurrentTab}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentTab === 'packages' && (
          <PackagesView
            onSelectTab={setCurrentTab}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {(currentTab === 'depots' || currentTab === 'about') && (
          <DepotsView
            onSelectTab={setCurrentTab}
            onOpenQuote={() => handleOpenQuote('Regional Depot Engineering Consultation')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={setCurrentTab}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Free Site Audit & Line-Item Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedPackage={selectedPackageForQuote}
      />

      {/* Persistent Floating Quick Action Bar for Nigeria */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href="https://wa.me/2348007864743?text=Hello%20SunGrid,%20I%20would%20like%20to%20ask%20about%20a%20solar%20installation%20for%20my%20home."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with SunGrid"
          className="group flex items-center gap-2.5 px-4 py-3 sm:px-4 sm:py-3 rounded-2xl bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20ba59] transition-all hover:scale-105 active:scale-95 touch-manipulation"
        >
          <WhatsappIcon className="w-5 h-5" />
          <span className="font-label-ui text-sm font-bold tracking-tight hidden sm:inline">
            Chat on WhatsApp
          </span>
          <span className="font-label-ui text-xs font-bold tracking-tight sm:hidden">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
