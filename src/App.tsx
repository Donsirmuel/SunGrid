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
import { MessageSquare, Phone } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-[#f9f9f8] text-[#1a1c1c] selection:bg-primary/20 selection:text-primary relative font-sans antialiased">
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
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href="https://wa.me/2348007864743?text=Hello%20SunGrid%20Energy,%20I%20would%20like%20to%20speak%20with%20a%20solar%20engineer%20about%20a%20turnkey%20installation."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with SunGrid Solar Engineer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:bg-[#20ba59] transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="font-label-ui text-xs font-bold tracking-tight hidden sm:inline">
            Chat with Engineer
          </span>
        </a>
      </div>
    </div>
  );
}
