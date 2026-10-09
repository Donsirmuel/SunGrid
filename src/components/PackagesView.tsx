import React, { useState } from 'react';
import { NavTab } from '../types';
import { PACKAGES, formatFullNaira, formatMonthlyNaira, formatKva } from '../data/packages';
import { DailyEnergyYieldChart } from './DailyEnergyYieldChart';
import { 
  FlashIcon, 
  VolumeMute01Icon, 
  Shield01Icon, 
  Calculator01Icon, 
  BatteryCharging01Icon
} from 'hugeicons-react';

interface PackagesViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({ onSelectTab, onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filterCategories = [
    { id: 'all', label: 'All Packages' },
    { id: 'apartments', label: 'Flats & Apartments' },
    { id: 'duplex', label: 'Family Duplexes' },
    { id: 'mansions', label: 'Large Mansions' },
    { id: 'portable', label: 'Renters & Portable' }
  ];

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO HEADER */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pt-8 sm:pt-16 pb-8 sm:pb-12 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] tracking-tight mb-4 font-bold">
            Solar packages for Nigerian homes and offices.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl font-normal leading-relaxed">
            Complete solar installations with high-efficiency solar panels, long-life lithium batteries,
            and surface-trunked copper wiring designed for Nigerian grid conditions.
          </p>

          {/* Single intro line + comparison link */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-2 text-sm text-[#5c4037]">
            <span>Every price includes panels, battery, copper cabling and installation.</span>
            <button
              onClick={() => onSelectTab('pricing')}
              className="text-[#111418] font-semibold underline underline-offset-[3px] hover:text-black cursor-pointer inline-flex items-center min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2"
            >
              Compare prices side by side
            </button>
          </div>

          {/* Category Filter Tabs - Mobile Scrollable */}
          <div className="w-full overflow-x-auto pb-2 sm:pb-0 scrollbar-none flex justify-start sm:justify-center mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#eeeeed] border border-[#dedfe5] shrink-0">
              {filterCategories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl font-label-ui text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer touch-manipulation whitespace-nowrap min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2 ${
                      active
                        ? 'bg-white text-primary font-bold shadow-xs border border-[#dedfe5]'
                        : 'text-[#5c5e63] hover:text-[#1a1c1c]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PACKAGE ROWS (Single column, 24px apart) */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pb-16 sm:pb-20 w-full">
        <div className="flex flex-col space-y-6">
          {filteredPackages.map((pkg) => {
            const isFeatured = pkg.featured;

            return (
              <div
                id={pkg.id}
                key={pkg.id}
                className={`w-full rounded-3xl transition-colors ${
                  isFeatured
                    ? 'border-2 border-primary bg-white'
                    : 'border border-[#EAEAE7] bg-white'
                } p-6 md:p-8 flex flex-col gap-6`}
              >
                {/* Zone 1: Header zone (Name & meta on left, Price, monthly & button on right, top-aligned) */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left: Most popular badge, name, meta line, description sentence (max 52ch) */}
                  <div className="flex flex-col items-start max-w-[52ch]">
                    {isFeatured && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[13px] font-semibold tracking-wide mb-3">
                        Most popular
                      </span>
                    )}
                    <h2 className="text-[24px] font-semibold text-[#111418] font-['Outfit'] leading-tight">
                      {pkg.name}
                    </h2>
                    <div className="text-[14px] font-medium text-[#5A6169] mt-1">
                      {pkg.homeSize} · {formatKva(pkg.kva)}
                    </div>
                    <p className="mt-2 text-[14px] leading-[1.5] text-[#5A6169] max-w-[52ch]">
                      {pkg.descriptionSentence}
                    </p>
                  </div>

                  {/* Right: Price, monthly line, and button, top-aligned */}
                  <div className="flex flex-col items-start md:items-end shrink-0 w-full md:w-auto">
                    <div className="text-[32px] font-bold text-[#111418] font-['Outfit'] [font-variant-numeric:tabular-nums] leading-none">
                      {formatFullNaira(pkg.priceNgn)}
                    </div>
                    <div className="text-[15px] font-medium text-[#3A3F45] mt-1.5">
                      {formatMonthlyNaira(pkg.monthlyNgn, pkg.monthlyNote)}
                    </div>
                    <button
                      onClick={() => onOpenQuote(`${pkg.name} (${formatFullNaira(pkg.priceNgn)})`)}
                      className={`w-full md:w-[200px] h-[48px] rounded-full mt-4 text-[15px] font-semibold cursor-pointer transition-colors flex items-center justify-center min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111418] focus-visible:ring-offset-2 ${
                        isFeatured
                          ? 'bg-primary hover:bg-primary-container text-white shadow-none'
                          : 'border border-[#111418] bg-transparent text-[#111418] hover:bg-[#F3F4F3] shadow-none'
                      }`}
                    >
                      Select package
                    </button>
                  </div>
                </div>

                {/* Zone 2: Body zone (Two equal columns with 40px gap, items-start, collapses to 1 col below 768px) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                  {/* Left Column: What it runs */}
                  <div className="flex flex-col items-start">
                    <div className="text-[14px] font-semibold text-[#5A6169] mb-3">
                      What it runs
                    </div>
                    <ul className="space-y-2 list-disc list-outside pl-4 text-[15px] text-[#111418] marker:text-[#3A3F45] leading-relaxed">
                      {pkg.runs.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Hardware */}
                  <div className="flex flex-col items-start">
                    <div className="text-[14px] font-semibold text-[#5A6169] mb-3">
                      Hardware
                    </div>
                    <div className="space-y-4 w-full">
                      {/* Inverter */}
                      <div>
                        <div className="text-[14px] font-semibold text-[#5A6169]">
                          Inverter
                        </div>
                        <div className="text-[15px] font-semibold text-[#111418] mt-0.5">
                          {pkg.hardware.inverter.value}
                        </div>
                        {pkg.hardware.inverter.plainMeaning && (
                          <div className="text-[14px] text-[#5A6169] mt-0.5 leading-[1.5] max-w-[60ch]">
                            {pkg.hardware.inverter.plainMeaning}
                          </div>
                        )}
                      </div>

                      {/* Battery */}
                      <div>
                        <div className="text-[14px] font-semibold text-[#5A6169]">
                          Battery
                        </div>
                        <div className="text-[15px] font-semibold text-[#111418] mt-0.5">
                          {pkg.hardware.battery.value}
                        </div>
                        {pkg.hardware.battery.plainMeaning && (
                          <div className="text-[14px] text-[#5A6169] mt-0.5 leading-[1.5] max-w-[60ch]">
                            {pkg.hardware.battery.plainMeaning}
                          </div>
                        )}
                      </div>

                      {/* Solar panels */}
                      <div>
                        <div className="text-[14px] font-semibold text-[#5A6169]">
                          Solar panels
                        </div>
                        <div className="text-[15px] font-semibold text-[#111418] mt-0.5">
                          {pkg.hardware.solarPanels.value}
                        </div>
                        {pkg.hardware.solarPanels.plainMeaning && (
                          <div className="text-[14px] text-[#5A6169] mt-0.5 leading-[1.5] max-w-[60ch]">
                            {pkg.hardware.solarPanels.plainMeaning}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DEDICATED SECTION: HARDWARE SPECS & WHAT THEY MEAN */}
      <section id="hardware-specs" className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 w-full scroll-mt-12">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
            Component guide
          </span>
          <h2 className="font-headline-xl text-2xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            What each component does in plain language
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2 leading-relaxed">
            Every component explained in terms of real-world home performance, not manufacturer marketing.
          </p>
        </div>

        {/* Stacked Breakdown List with strong left border per item */}
        <div className="divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5] bg-white rounded-2xl shadow-xs border border-[#dedfe5] overflow-hidden">
          {/* Inverter */}
          <div className="p-5 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Inverter:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                Low-frequency hybrid inverter
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                An inverter converts direct current (DC) power from your panels and batteries into alternating current (AC) power for your wall sockets. A hybrid unit can draw from solar, battery, grid, or generator automatically, and absorbs high startup kicks when pumps or AC compressors turn on.
              </p>
            </div>
          </div>

          {/* Battery */}
          <div className="p-5 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Battery storage:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                Lithium iron phosphate (LiFePO4) battery
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                The safest modern battery chemistry for home storage. It does not overheat easily and lasts 6,000 charge cycles (about 10 to 15 years of daily use), compared to older lead-acid batteries that usually fail within two years.
              </p>
            </div>
          </div>

          {/* Solar Array */}
          <div className="p-5 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Solar panels:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                Bifacial monocrystalline solar panels
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Panels that generate electricity from overhead sun and light reflected off your roof tiles on the underside. Monocrystalline silicon maintains high output even under intense tropical heat.
              </p>
            </div>
          </div>

          {/* Switch Speed */}
          <div className="p-5 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Automatic transfer switch:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                Sub-4 millisecond transfer speed
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                When grid power cuts out, the system takes over in under 4 milliseconds. Because that is faster than a monitor refreshes, desktop computers, Wi-Fi routers, and TVs stay on without rebooting.
              </p>
            </div>
          </div>

          {/* Surge Protection */}
          <div className="p-5 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Earthing &amp; surge protection:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                Chemical copper grounding rod &amp; surge arrestors
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                A copper rod driven deep into the soil with conductive chemical enhancement, plus surge arrestors on your board. Voltage spikes from lightning or the grid get diverted safely into the ground rather than through your appliances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: D3.JS DAILY ENERGY YIELD & LOAD CURVE VISUALIZATION */}
      <section className="w-full bg-[#f3f4f3] py-12 sm:py-16 lg:py-20 border-y border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14">
          <DailyEnergyYieldChart onSelectPackage={onOpenQuote} />
        </div>
      </section>

      {/* SECTION: WHAT'S INSIDE EVERY COMPLETE SUNGRID INSTALLATION */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
            Installation standards
          </span>
          <h2 className="font-headline-xl text-2xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            What goes into every SunGrid installation
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2 leading-relaxed">
            Every breaker, cable, and mounting bracket is chosen to withstand tropical humidity and prolonged heat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary mb-4">
              <FlashIcon className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              Pure copper wiring
            </h4>
            <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
              We use heavy electrolytic copper cabling (never aluminum or copper-clad wire) inside protective conduit to prevent heat buildup and voltage drop under continuous heavy loads.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary mb-4">
              <VolumeMute01Icon className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              Quiet inverter operation
            </h4>
            <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
              Smart magnetic cooling keeps operating noise under 25 decibels, which is quieter than a whisper in your hallway.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary mb-4">
              <BatteryCharging01Icon className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              10 to 15-year lithium batteries
            </h4>
            <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
              Grade-A prismatic lithium iron phosphate cells with built-in thermal protection, safe management circuits, and 6,000 deep cycle endurance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary mb-4">
              <Shield01Icon className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              Leak-proof roof mountings
            </h4>
            <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
              EPDM rubber-sealed clamps and aircraft-grade aluminum rails secure panels to your roof without causing rainwater leaks during heavy storms.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-14 pb-12 sm:pb-16 w-full">
        <div className="rounded-3xl bg-[#eeeeed] border border-[#dedfe5] p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl text-center sm:text-left">
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-wider font-bold mb-1 block">
              Load assessment
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl text-[#1a1c1c] font-bold tracking-tight mb-2">
              Not sure which package fits your appliances?
            </h3>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
              Use our 2-minute load calculator or book an on-site audit to have an electrical engineer evaluate your distribution board and roof space in Lagos, Abuja, Port Harcourt, or Ibadan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectTab('calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer min-h-[48px] touch-manipulation gap-2"
            >
              <Calculator01Icon className="w-5 h-5 text-primary" />
              <span>Use load calculator</span>
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-colors shadow-sm cursor-pointer min-h-[48px] touch-manipulation"
            >
              <span>Book an on-site visit</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
