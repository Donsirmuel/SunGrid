import React, { useState } from 'react';
import { NavTab, SolarPackage } from '../types';
import { SOLAR_PACKAGES } from '../data/packages';
import { LazyImage } from './LazyImage';
import { DailyEnergyYieldChart } from './DailyEnergyYieldChart';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  VolumeX, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Layers,
  BatteryCharging,
  Sun,
  Lightbulb
} from 'lucide-react';

interface PackagesViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({ onSelectTab, onOpenQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSpecs, setExpandedSpecs] = useState<{ [key: string]: boolean }>({
    'duplex-executive': true // Duplex open by default as in design
  });

  const filterCategories = [
    { id: 'all', label: 'All Packages' },
    { id: 'apartments', label: 'Flats & Apartments' },
    { id: 'duplex', label: 'Family Duplexes' },
    { id: 'mansions', label: 'Large Mansions' },
    { id: 'portable', label: 'Renters & Portable' }
  ];

  const filteredPackages = SOLAR_PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const toggleSpecs = (id: string) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO HEADER */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-12 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] tracking-tight mb-4 font-bold">
            Reliable Solar Packages for Every Nigerian Home.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl font-normal leading-relaxed">
            Complete solar installations with high-efficiency bifacial panels, Grade-A lithium batteries,
            and surface-trunked wiring designed for Nigerian grid conditions.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 rounded-xl bg-[#eeeeed] border border-[#dedfe5]">
            {filterCategories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-label-ui text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
      </section>

      {/* SECTION: PACKAGES GRID */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const isFeatured = pkg.id === 'duplex-executive';
            const isOpen = !!expandedSpecs[pkg.id];

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl bg-white p-6 transition-all duration-300 relative ${
                  isFeatured
                    ? 'ring-2 ring-primary shadow-xl md:-translate-y-2'
                    : 'border border-[#dedfe5] shadow-sm hover:shadow-md'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-primary text-white font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-xs">
                    {pkg.badge || "Nigeria's #1 Most Selected"}
                  </div>
                )}

                <div>
                  {/* Image container */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-neutral-200 mb-5">
                    <LazyImage
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${
                        isFeatured
                          ? 'bg-primary text-white'
                          : 'bg-white/95 text-[#1a1c1c] shadow-xs'
                      }`}
                    >
                      {pkg.powerKva}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c4037] mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  {/* Price Box */}
                  <div className="mb-5 pb-4 border-b border-[#dedfe5]">
                    <span className="font-label-caps text-[10px] text-[#5c5e63] uppercase font-bold tracking-wider block">
                      Turnkey Investment
                    </span>
                    <div
                      className={`font-metric-counter text-2xl sm:text-3xl font-bold tracking-tight ${
                        isFeatured ? 'text-primary' : 'text-[#1a1c1c]'
                      }`}
                    >
                      ₦{pkg.priceNgn.toLocaleString('en-NG')}
                    </div>
                    {pkg.monthlyInstallment && (
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        Or ₦{pkg.monthlyInstallment.toLocaleString('en-NG')} / month
                      </p>
                    )}
                    <span className="text-[11px] text-[#5c5e63] block mt-1">
                      Includes complete installation, cables & surge gear
                    </span>
                  </div>

                  {/* Simple Plain-English Summary Banner */}
                  {pkg.simpleSummary && (
                    <div className="mb-4 p-2.5 rounded-xl bg-[#fdf2ec] border border-[#ffdbcf] text-xs text-[#5c4037] leading-relaxed flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{pkg.simpleSummary}</span>
                    </div>
                  )}

                  {/* Highlights List */}
                  <div
                    className={`space-y-2 py-3 rounded-xl px-3 mb-4 ${
                      isFeatured ? 'bg-[#ffdbcf]/30' : 'bg-[#f3f4f3]'
                    }`}
                  >
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#1a1c1c]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accordion Toggle */}
                  <button
                    onClick={() => toggleSpecs(pkg.id)}
                    className="flex items-center justify-between w-full font-label-ui text-xs text-[#5c5e63] hover:text-primary transition-colors py-2 cursor-pointer border-t border-dashed border-[#dedfe5]"
                  >
                    <span className="font-semibold">Hardware Specs & What They Mean</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-[#5c5e63]'
                      }`}
                    />
                  </button>

                  {/* Specs Content with smooth collapsible layout */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-2 pb-3 space-y-2.5 text-xs text-[#5c4037] border-b border-[#dedfe5]">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-neutral-500 font-medium">Inverter:</span>
                          <span className="text-[#1a1c1c] font-semibold text-right">{pkg.specs.inverter}</span>
                        </div>
                        {pkg.specs.plainMeaning?.inverterExplanation && (
                          <p className="text-[11px] text-[#5c4037]/80 mt-0.5 leading-snug flex items-start gap-1.5">
                            <Lightbulb className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                            <span>{pkg.specs.plainMeaning.inverterExplanation}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-neutral-500 font-medium">Battery:</span>
                          <span className="text-[#1a1c1c] font-semibold text-right">{pkg.specs.battery}</span>
                        </div>
                        {pkg.specs.plainMeaning?.batteryExplanation && (
                          <p className="text-[11px] text-[#5c4037]/80 mt-0.5 leading-snug flex items-start gap-1.5">
                            <BatteryCharging className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pkg.specs.plainMeaning.batteryExplanation}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-neutral-500 font-medium">Solar Array:</span>
                          <span className="text-[#1a1c1c] font-semibold text-right">{pkg.specs.solarArray}</span>
                        </div>
                        {pkg.specs.plainMeaning?.solarExplanation && (
                          <p className="text-[11px] text-[#5c4037]/80 mt-0.5 leading-snug flex items-start gap-1.5">
                            <Sun className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>{pkg.specs.plainMeaning.solarExplanation}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-neutral-500 font-medium">Switch Speed:</span>
                          <span className="text-primary font-semibold text-right">{pkg.specs.transferSpeed}</span>
                        </div>
                        {pkg.specs.plainMeaning?.switchExplanation && (
                          <p className="text-[11px] text-[#5c4037]/80 mt-0.5 leading-snug flex items-start gap-1.5">
                            <Zap className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                            <span>{pkg.specs.plainMeaning.switchExplanation}</span>
                          </p>
                        )}
                      </div>

                      {pkg.specs.protection && (
                        <div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-neutral-500 font-medium">Surge Protection:</span>
                            <span className="text-[#1a1c1c] font-semibold text-right">{pkg.specs.protection}</span>
                          </div>
                          {pkg.specs.plainMeaning?.protectionExplanation && (
                            <p className="text-[11px] text-[#5c4037]/80 mt-0.5 leading-snug flex items-start gap-1.5">
                              <ShieldCheck className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                              <span>{pkg.specs.plainMeaning.protectionExplanation}</span>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-5">
                  <button
                    onClick={() => onOpenQuote(pkg.name)}
                    className={`w-full py-3 rounded-xl font-label-ui text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-primary hover:bg-primary-container text-white shadow-md'
                        : 'bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c]'
                    }`}
                  >
                    {isFeatured ? 'Reserve This System' : 'Configure Package'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: D3.JS DAILY ENERGY YIELD & LOAD CURVE VISUALIZATION */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-y border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <DailyEnergyYieldChart onSelectPackage={onOpenQuote} />
        </div>
      </section>

      {/* SECTION: WHAT'S INSIDE EVERY TURNKEY SUNGRID BOX */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
            Installation Standards
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            What’s Inside Every Turnkey SunGrid Box
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
            Every breaker, cable, and mounting bracket is chosen to withstand tropical humidity and prolonged peak heat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
              100% Pure Copper
            </h4>
            <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
              We use thick electrolytic copper cabling (never aluminum or copper-clad wire) to prevent heat buildup and voltage drop under continuous heavy loads.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <VolumeX className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
              Whisper Inverter
            </h4>
            <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
              Smart magnetic cooling architecture keeps operating sound below 25 decibels, quieter than a light rustle of leaves in your hallway.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
              10–15 Year LiFePO4
            </h4>
            <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
              Automotive-grade prismatic lithium iron phosphate cells with built-in thermal run-away suppression and 6,000 deep cycle endurance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
              Leak-Proof Mounting
            </h4>
            <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
              EPDM rubber-sealed clamps and aircraft-grade anodized aluminum rails prevent roof penetration leaks during torrential tropical rainstorms.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-16 w-full">
        <div className="rounded-3xl bg-[#eeeeed] border border-[#dedfe5] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-wider font-bold mb-1 block">
              Personalized Energy Audit
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl text-[#1a1c1c] font-bold tracking-tight mb-2">
              Not sure which package fits your appliances?
            </h3>
            <p className="font-body-md text-sm text-[#5c4037]">
              Use our 2-minute load calculator or book an on-site audit to have an electrical engineer evaluate your distribution board and roof space in Lagos, Abuja, or Port Harcourt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectTab('calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
            >
              <Calculator className="w-4 h-4 mr-2 text-primary" />
              <span>Use Load Calculator</span>
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span>Book Free Home Visit</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
