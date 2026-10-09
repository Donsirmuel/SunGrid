import React, { useState } from 'react';
import { NavTab } from '../types';
import { IMAGES } from '../data/assets';
import { LazyImage } from './LazyImage';
import { PRICING_PACKAGES, formatCompactNaira, formatMonthlyNaira, formatKva } from '../data/packages';
import { SolarRoiCalculator } from './SolarRoiCalculator';
import { 
  Shield01Icon, 
  Clock01Icon, 
  SecurityLockIcon, 
  ArrowRight01Icon, 
  SparklesIcon,
  CheckmarkCircle02Icon,
  FlashIcon,
  Award01Icon,
  Remove01Icon,
  Add01Icon,
  Call02Icon
} from 'hugeicons-react';

interface PricingViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectTab, onOpenQuote }) => {
  // Mobile selected package tab state (defaults to featured duplex package)
  const [mobileSelectedId, setMobileSelectedId] = useState<string>('duplex');

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({
    0: true // first open by default
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleMobileTabKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % PRICING_PACKAGES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + PRICING_PACKAGES.length) % PRICING_PACKAGES.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = PRICING_PACKAGES.length - 1;
    }
    if (nextIndex !== currentIndex) {
      const nextPkg = PRICING_PACKAGES[nextIndex];
      setMobileSelectedId(nextPkg.id);
      document.getElementById(`tab-${nextPkg.id}`)?.focus();
    }
  };

  const faqs = [
    {
      q: 'Are there any hidden costs after the site inspection?',
      a: 'No. Your final quote lists every physical item: breakers, cable lengths, trunking, mounting rails, and delivery. That price is locked for 30 days. If our engineers discover during installation that your distribution board needs extra work or your roof requires custom brackets, we cover it ourselves rather than billing you extra.'
    },
    {
      q: "How does the 'Pay small-small' financing approval work?",
      a: 'You apply online through our partner commercial banks (Sterling Bank Alternative Energy, FirstBank CleanTech, or Carbon) using your BVN and 6 months of bank statements. Most reviews conclude in 24 to 48 hours. Once approved, you pay a 20% commitment deposit to schedule installation, and the bank finances the balance over 12, 24, or 36 months. You can pay off early at any time without fees.'
    },
    {
      q: 'How does our 24-hour equipment replacement work?',
      a: 'If your inverter or battery develops an internal fault during the warranty period, we do not take it away to a workshop for weeks while you sit in darkness. We send a service van with a matching replacement unit directly to your home within 24 hours, swap it out on the spot, and take the faulty unit back to our depot.'
    },
    {
      q: 'Can these packages power my water pump and air conditioners?',
      a: 'Yes. The 3.5kVA package easily handles a 0.5 HP pumping machine and one bedroom inverter AC. For a standard duplex with a 1.0 HP borehole pump plus two to three inverter ACs, choose the 10kVA system. The inverters are selected specifically to absorb motor startup surges without tripping or resetting your other appliances.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO TITLE & METRICS */}
      <section className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pt-8 sm:pt-16 pb-10 sm:pb-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold block mb-2 sm:mb-3">
            All-inclusive solar pricing
          </span>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight font-bold mb-4">
            Fixed-price solar installations with no surprise costs on site.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl leading-relaxed">
            We inspect your home, calculate your electrical loads, and issue a written quote covering
            every cable, breaker, and mounting rail before work starts.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href="#packages-grid"
              className="px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-base font-semibold shadow-[0_4px_16px_rgba(167,52,0,0.3)] transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
            >
              <span>Explore all-inclusive packages</span>
              <ArrowRight01Icon className="w-5 h-5" />
            </a>
            <a
              href="#financing-calculator"
              className="px-7 py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-base font-semibold transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
            >
              <span>Pay small-small financing</span>
            </a>
          </div>
        </div>

        {/* 4 Value Pillars Strip */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto bg-white rounded-2xl border border-[#dedfe5] shadow-sm p-5 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center px-2 lg:border-r lg:border-[#dedfe5]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">Brand-new cells</p>
              <p className="font-body-sm text-sm text-[#5c4037] mt-0.5">Grade-A Prismatic Cells</p>
            </div>

            <div className="flex flex-col items-center text-center px-2 lg:border-r lg:border-[#dedfe5]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
                <Shield01Icon className="w-6 h-6" />
              </div>
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">10-year warranty</p>
              <p className="font-body-sm text-sm text-[#5c4037] mt-0.5">6,000 LiFePO4 Cycles</p>
            </div>

            <div className="flex flex-col items-center text-center px-2 lg:border-r lg:border-[#dedfe5]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
                <Clock01Icon className="w-6 h-6" />
              </div>
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">24-hour replacement</p>
              <p className="font-body-sm text-sm text-[#5c4037] mt-0.5">Direct Unit Swap on Site</p>
            </div>

            <div className="flex flex-col items-center text-center px-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
                <SecurityLockIcon className="w-6 h-6" />
              </div>
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">30-day price lock</p>
              <p className="font-body-sm text-sm text-[#5c4037] mt-0.5">Written Quote Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ALL-INCLUSIVE PACKAGES GRID */}
      <section id="packages-grid" className="w-full bg-[#f3f4f3] py-12 sm:py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div>
              <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
                Complete installations
              </span>
              <h2 className="font-headline-xl text-2xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
                Certified complete packages
              </h2>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] max-w-md">
              Everything included: monocrystalline solar panels, pure copper wiring, chemical earthing, and on-site testing.
            </p>
          </div>

          {/* DESKTOP COMPARISON TABLE (768px and up) */}
          <div className="hidden md:block w-full">
            <table className="w-full table-fixed border-collapse border border-[#EAEAE7] bg-white rounded-3xl">
              <caption className="sr-only">Certified complete solar package comparison</caption>
              <colgroup>
                <col className="w-[180px] lg:w-[200px]" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
                <col className="w-1/4" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="p-4 lg:p-6 border-b border-[#EAEAE7] text-left align-bottom bg-white rounded-tl-3xl"
                  >
                  </th>
                  {PRICING_PACKAGES.map((pkg, idx) => {
                    const isLast = idx === PRICING_PACKAGES.length - 1;
                    return (
                      <th
                        key={pkg.id}
                        scope="col"
                        className={`p-4 lg:p-6 border-b border-[#EAEAE7] text-left align-top relative transition-colors ${
                          pkg.featured
                            ? 'border-t-2 border-x-2 border-primary bg-[#ffdbcf]/40'
                            : 'bg-white'
                        } ${isLast ? 'rounded-tr-3xl' : ''}`}
                      >
                        {/* Fixed-height pill container to ensure horizontal button alignment */}
                        <div className="h-7 mb-2 flex items-center justify-start">
                          {pkg.featured && (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[13px] font-semibold tracking-wide">
                              Most popular
                            </span>
                          )}
                        </div>

                        {/* Package name: 20px, weight 600, heading font, #111418 */}
                        <h3 className="text-[20px] font-semibold text-[#111418] font-['Outfit'] leading-tight h-7 flex items-center justify-start text-left">
                          {pkg.name}
                        </h3>

                        {/* kVA: 14px, weight 500, grey #5A6169 */}
                        <div className="text-[14px] font-medium text-[#5A6169] mt-1 h-5 flex items-center justify-start text-left">
                          {formatKva(pkg.kva)}
                        </div>

                        {/* Price: 40px, weight 700, heading font, #111418, letter-spacing -0.02em, tabular-nums */}
                        <div className="text-[40px] font-bold text-[#111418] font-['Outfit'] tracking-[-0.02em] [font-variant-numeric:tabular-nums] mt-3 h-12 flex items-center justify-start text-left">
                          {formatCompactNaira(pkg.priceNgn)}
                        </div>

                        {/* Monthly line: 15px, weight 500, dark grey #3A3F45 (NOT orange) */}
                        <div className="text-[15px] font-medium text-[#3A3F45] mt-1 h-6 flex items-center justify-start text-left">
                          {formatMonthlyNaira(pkg.monthlyNgn, pkg.monthlyNote)}
                        </div>

                        {/* Button: full column width, 48px tall, pill radius, label 'Select package' */}
                        <button
                          onClick={() => onOpenQuote(`${pkg.name} (${formatCompactNaira(pkg.priceNgn)})`)}
                          className={`w-full h-[48px] rounded-full mt-4 text-[15px] font-semibold cursor-pointer transition-colors flex items-center justify-center min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2 ${
                            pkg.featured
                              ? 'bg-primary hover:bg-primary-container text-white shadow-none'
                              : 'border border-[#111418] bg-transparent text-[#111418] hover:bg-[#F3F4F3] shadow-none'
                          }`}
                        >
                          Select package
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Best for */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] border-b border-[#EAEAE7] bg-white"
                  >
                    Best for
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <td
                      key={`best-for-${pkg.id}`}
                      className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] border-b border-[#EAEAE7] ${
                        pkg.featured ? 'border-x-2 border-primary bg-[#ffdbcf]/40' : 'bg-white'
                      }`}
                    >
                      {pkg.homeSize}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Runs */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] border-b border-[#EAEAE7] bg-white"
                  >
                    Runs
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <td
                      key={`runs-${pkg.id}`}
                      className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] border-b border-[#EAEAE7] ${
                        pkg.featured ? 'border-x-2 border-primary bg-[#ffdbcf]/40' : 'bg-white'
                      }`}
                    >
                      {pkg.runsShort}
                    </td>
                  ))}
                </tr>

                {/* Row 3: Battery */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] border-b border-[#EAEAE7] bg-white"
                  >
                    Battery
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <td
                      key={`battery-${pkg.id}`}
                      className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] border-b border-[#EAEAE7] ${
                        pkg.featured ? 'border-x-2 border-primary bg-[#ffdbcf]/40' : 'bg-white'
                      }`}
                    >
                      {pkg.batteryKwh} kWh lithium
                    </td>
                  ))}
                </tr>

                {/* Row 4: Solar panels */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] border-b border-[#EAEAE7] bg-white"
                  >
                    Solar panels
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <td
                      key={`panels-${pkg.id}`}
                      className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] border-b border-[#EAEAE7] ${
                        pkg.featured ? 'border-x-2 border-primary bg-[#ffdbcf]/40' : 'bg-white'
                      }`}
                    >
                      {pkg.panelCount} x {pkg.panelWatts} W
                    </td>
                  ))}
                </tr>

                {/* Row 5: Water pump */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] border-b border-[#EAEAE7] bg-white"
                  >
                    Water pump
                  </th>
                  {PRICING_PACKAGES.map((pkg) => (
                    <td
                      key={`pump-${pkg.id}`}
                      className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] border-b border-[#EAEAE7] ${
                        pkg.featured ? 'border-x-2 border-primary bg-[#ffdbcf]/40' : 'bg-white'
                      }`}
                    >
                      {pkg.pumpDescription || '—'}
                    </td>
                  ))}
                </tr>

                {/* Row 6: Full specs */}
                <tr className="h-[72px]">
                  <th
                    scope="row"
                    className="px-4 lg:px-6 py-4 text-left text-[14px] font-semibold text-[#5A6169] bg-white rounded-bl-3xl"
                  >
                    Full specs
                  </th>
                  {PRICING_PACKAGES.map((pkg, idx) => {
                    const isLast = idx === PRICING_PACKAGES.length - 1;
                    return (
                      <td
                        key={`specs-${pkg.id}`}
                        className={`px-4 lg:px-6 py-4 text-left text-[15px] leading-[1.5] text-[#111418] ${
                          pkg.featured
                            ? 'border-b-2 border-x-2 border-primary bg-[#ffdbcf]/40'
                            : 'bg-white'
                        } ${isLast ? 'rounded-br-3xl' : ''}`}
                      >
                        <a
                          href={`#${pkg.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectTab('packages');
                            setTimeout(() => {
                              const el = document.getElementById(pkg.id);
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 50);
                          }}
                          className="text-[15px] font-semibold text-[#111418] underline underline-offset-[3px] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2"
                        >
                          See full specs
                        </a>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW (under 768px): Segmented control tablist + Single tabpanel */}
          <div className="block md:hidden w-full">
            {/* Segmented Control */}
            <div
              role="tablist"
              aria-label="Solar packages by kVA"
              className="grid grid-cols-4 gap-1 p-1 bg-[#eeeeed] rounded-2xl border border-[#dedfe5] mb-6"
            >
              {PRICING_PACKAGES.map((pkg, idx) => {
                const isSelected = mobileSelectedId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    id={`tab-${pkg.id}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${pkg.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setMobileSelectedId(pkg.id)}
                    onKeyDown={(e) => handleMobileTabKeyDown(e, idx)}
                    className={`h-[44px] min-h-[44px] rounded-xl text-[14px] transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'bg-white text-[#111418] font-bold shadow-xs border border-[#dedfe5]'
                        : 'text-[#5A6169] font-medium hover:text-[#111418]'
                    }`}
                  >
                    {formatKva(pkg.kva)}
                  </button>
                );
              })}
            </div>

            {/* Selected Package Tabpanel */}
            {(() => {
              const selectedPkg = PRICING_PACKAGES.find((p) => p.id === mobileSelectedId) || PRICING_PACKAGES[1];
              return (
                <div
                  key={selectedPkg.id}
                  id={`panel-${selectedPkg.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${selectedPkg.id}`}
                  tabIndex={0}
                  className={`rounded-2xl p-6 ${
                    selectedPkg.featured
                      ? 'border-2 border-primary bg-[#ffdbcf]/40'
                      : 'border border-[#EAEAE7] bg-white'
                  }`}
                >
                  {selectedPkg.featured && (
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[13px] font-semibold tracking-wide mb-3">
                      Most popular
                    </span>
                  )}

                  <h3 className="text-[20px] font-semibold text-[#111418] font-['Outfit']">
                    {selectedPkg.name}
                  </h3>

                  <div className="text-[14px] font-medium text-[#5A6169] mt-0.5">
                    {formatKva(selectedPkg.kva)}
                  </div>

                  <div className="text-[36px] font-bold text-[#111418] font-['Outfit'] tracking-[-0.02em] [font-variant-numeric:tabular-nums] mt-2">
                    {formatCompactNaira(selectedPkg.priceNgn)}
                  </div>

                  <div className="text-[15px] font-medium text-[#3A3F45] mt-0.5">
                    {formatMonthlyNaira(selectedPkg.monthlyNgn, selectedPkg.monthlyNote)}
                  </div>

                  <button
                    onClick={() => onOpenQuote(`${selectedPkg.name} (${formatCompactNaira(selectedPkg.priceNgn)})`)}
                    className={`w-full h-[48px] rounded-full mt-5 text-[15px] font-semibold cursor-pointer transition-colors flex items-center justify-center min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2 ${
                      selectedPkg.featured
                        ? 'bg-primary hover:bg-primary-container text-white shadow-none'
                        : 'border border-[#111418] bg-transparent text-[#111418] hover:bg-[#F3F4F3] shadow-none'
                    }`}
                  >
                    Select package
                  </button>

                  <dl className="mt-6 border-t border-[#EAEAE7]">
                    <div className="py-4 border-b border-[#EAEAE7]">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Best for</dt>
                      <dd className="text-[16px] text-[#111418] mt-1">{selectedPkg.homeSize}</dd>
                    </div>

                    <div className="py-4 border-b border-[#EAEAE7]">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Runs</dt>
                      <dd className="text-[16px] text-[#111418] mt-1 leading-relaxed">{selectedPkg.runsShort}</dd>
                    </div>

                    <div className="py-4 border-b border-[#EAEAE7]">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Battery</dt>
                      <dd className="text-[16px] text-[#111418] mt-1">{selectedPkg.batteryKwh} kWh lithium</dd>
                    </div>

                    <div className="py-4 border-b border-[#EAEAE7]">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Solar panels</dt>
                      <dd className="text-[16px] text-[#111418] mt-1">{selectedPkg.panelCount} x {selectedPkg.panelWatts} W</dd>
                    </div>

                    <div className="py-4 border-b border-[#EAEAE7]">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Water pump</dt>
                      <dd className="text-[16px] text-[#111418] mt-1">{selectedPkg.pumpDescription || '—'}</dd>
                    </div>

                    <div className="py-4">
                      <dt className="text-[14px] font-semibold text-[#5A6169]">Full specs</dt>
                      <dd className="mt-1">
                        <a
                          href={`#${selectedPkg.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectTab('packages');
                            setTimeout(() => {
                              const el = document.getElementById(selectedPkg.id);
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 50);
                          }}
                          className="text-[16px] font-semibold text-[#111418] underline underline-offset-[3px] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2"
                        >
                          See full specs
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* SECTION: PAY SMALL-SMALL FINANCING & UPGRADED SOLAR ROI CALCULATOR */}
      <section id="financing-calculator" className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
        <SolarRoiCalculator onSelectPackage={onOpenQuote} />

        {/* Banking Partners & Pre-qualification Guarantee */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#dedfe5] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5">
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
                Financing Options
              </span>
              <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-[#1a1c1c] tracking-tight mt-1">
                Spread payments over 12, 24, or 36 months
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#5c4037] mt-1.5 leading-relaxed">
                Available through clean energy desks at major commercial banks. Installation begins upon a 20% deposit, with no fees or penalties if you pay off the balance early.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 bg-[#f9f9f8] rounded-xl border border-[#dedfe5] text-xs sm:text-sm font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600" />
                <span>Carbon Energy Desk</span>
              </div>
              <div className="px-4 py-2.5 bg-[#f9f9f8] rounded-xl border border-[#dedfe5] text-xs sm:text-sm font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600" />
                <span>Sterling Bank Alternative Energy</span>
              </div>
              <div className="px-4 py-2.5 bg-[#f9f9f8] rounded-xl border border-[#dedfe5] text-xs sm:text-sm font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckmarkCircle02Icon className="w-4 h-4 text-emerald-600" />
                <span>FirstBank CleanTech Desk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE 4 HONEST PROMISES */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
              Installation standards
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
              Four standards included in every installation
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
              Every detail is specified up front so you never run into unplanned site expenses.
            </p>
          </div>

          {/* Plain Stacked List */}
          <div className="max-w-4xl mx-auto divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5]">
            {/* Promise 1 */}
            <div className="py-6 sm:py-7 pl-4 sm:pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-xl font-bold text-[#1a1c1c] mb-1.5">
                  Pure copper wiring and rigid conduit
                </h3>
                <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
                  Every cable is electrolytic copper run inside UV-resistant conduit and rigid trunking. We do not use aluminum wiring or leave exposed cords along your walls.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
                <FlashIcon className="w-5 h-5" />
              </div>
            </div>

            {/* Promise 2 */}
            <div className="py-6 sm:py-7 pl-4 sm:pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-xl font-bold text-[#1a1c1c] mb-1.5">
                  Dedicated copper grounding array
                </h3>
                <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
                  We drive 3-meter copper-bonded grounding rods with bentonite earth enhancement into the soil to achieve under 5 Ohms electrical resistance. This protects your home and appliances from lightning and grid voltage spikes.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
                <Shield01Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Promise 3 */}
            <div className="py-6 sm:py-7 pl-4 sm:pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-xl font-bold text-[#1a1c1c] mb-1.5">
                  We don't add last-minute site charges
                </h3>
                <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
                  Our quote covers delivery to your door, installation labor, community interface, and crane lifts where needed. You will never be asked for additional cash on site.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
                <Award01Icon className="w-5 h-5" />
              </div>
            </div>

            {/* Promise 4 */}
            <div className="py-6 sm:py-7 pl-4 sm:pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-xl font-bold text-[#1a1c1c] mb-1.5">
                  24-hour equipment replacement
                </h3>
                <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
                  If an inverter or lithium module flags a hardware fault during warranty, our technicians bring a working replacement directly to your house within 24 hours. You do not wait weeks for factory repairs.
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-primary shrink-0">
                <Clock01Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VISUAL INSPECTION STORY */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dedfe5] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
                Free on-site inspection
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] mt-1 mb-4">
                We measure your actual power draw before you pay anything
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] mb-6 leading-relaxed">
                Our electricians visit your home with clamp meters and thermal scanners to measure starting surges on your compressors and check your distribution board. This gives you a system sized exactly for your actual loads.
              </p>

              <div className="flex items-center gap-8 pt-2">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl font-bold text-[#1a1c1c]">48 hours</span>
                  <span className="text-xs text-[#5c5e63]">Turnaround from inspection to fixed quote</span>
                </div>
                <div className="w-px h-10 bg-[#dedfe5]" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl font-bold text-primary">₦0 fee</span>
                  <span className="text-xs text-[#5c5e63]">Free for Lagos & Abuja homes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <LazyImage
                  src={IMAGES.telemetryAudit}
                  alt="Precision surge inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#1a1c1c] font-label-caps text-[10px] font-bold z-10">
                  Surge measurement
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <LazyImage
                  src={IMAGES.roofArraySunny}
                  alt="Solar roof mounting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#1a1c1c] font-label-caps text-[10px] font-bold z-10">
                  Double-glass solar panels
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION */}
      <section className="w-full max-w-4xl mx-auto px-5 sm:px-10 py-10 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-bold">
            Clear answers
          </span>
          <h2 className="font-headline-xl text-2xl sm:text-3xl font-bold text-[#1a1c1c] mt-1">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = !!openFaqs[i];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-[#dedfe5] shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none min-h-[44px]"
                >
                  <span className="font-headline-sm text-sm sm:text-base font-bold text-[#1a1c1c] pr-4">
                    {f.q}
                  </span>
                  <span className="w-8 h-8 rounded-lg bg-[#f3f4f3] flex items-center justify-center text-primary shrink-0">
                    {isOpen ? <Remove01Icon className="w-4 h-4" /> : <Add01Icon className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm sm:text-base text-[#5c4037] leading-relaxed animate-fadeIn">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: MINIMAL CTA BOX */}
      <section className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pb-12 sm:pb-16">
        <div className="bg-[#12161a] text-white rounded-3xl p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-xl">
          <div className="max-w-xl text-center sm:text-left">
            <span className="font-label-caps text-xs text-[#ff8e4d] uppercase tracking-wider font-bold mb-1 block">
              Ready to verify your home loads?
            </span>
            <h3 className="font-headline-xl text-2xl sm:text-3xl text-white font-bold mb-2">
              Book a free on-site electrical inspection
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Our technicians test your breaker panel, roof angles, and heavy appliances across Lagos, Abuja, Ibadan, or Port Harcourt.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:08007864743"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
            >
              <Call02Icon className="w-5 h-5 text-primary" />
              <span>0800-SUNGRID</span>
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[48px] touch-manipulation"
            >
              <span>Schedule site audit</span>
              <ArrowRight01Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
