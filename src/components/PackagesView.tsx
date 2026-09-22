import React, { useState } from 'react';
import { NavTab, SolarPackage } from '../types';
import { SOLAR_PACKAGES } from '../data/packages';
import { LazyImage } from './LazyImage';
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
  Sparkles,
  RefreshCw,
  Layers,
  BatteryCharging
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
  const [simulatorState, setSimulatorState] = useState<'grid' | 'blackout'>('blackout');

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
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffdbcf] text-primary font-label-caps text-xs uppercase tracking-wider mb-4 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Certified Turnkey Energy • Tier-1 Guaranteed
          </span>

          <h1 className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] tracking-tight mb-4 font-bold">
            Reliable Solar Packages for Every Nigerian Home.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl font-normal leading-relaxed">
            Built with genuine Tier-1 bifacial panels, long-life lithium storage, and certified fire-safe
            installation. Turnkey peace of mind engineered for the reality of the Nigerian grid.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full bg-[#e8e8e7]/70 backdrop-blur-sm border border-[#dedfe5]">
            {filterCategories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2 rounded-full font-label-ui text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-white text-[#1a1c1c] font-bold shadow-sm'
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
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-primary text-white font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-sm">
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
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${
                        isFeatured
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-[#1a1c1c]'
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
                    <span className="font-semibold">Hardware Architecture</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : 'text-[#5c5e63]'
                      }`}
                    />
                  </button>

                  {/* Specs Content with smooth collapsible layout */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-2 pb-3 space-y-1.5 text-xs text-[#5c4037] border-b border-[#dedfe5]">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Inverter:</span>
                        <span className="text-[#1a1c1c] font-medium text-right">{pkg.specs.inverter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Battery:</span>
                        <span className="text-[#1a1c1c] font-medium text-right">{pkg.specs.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Solar Array:</span>
                        <span className="text-[#1a1c1c] font-medium text-right">{pkg.specs.solarArray}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Switch Speed:</span>
                        <span className="text-primary font-semibold text-right">{pkg.specs.transferSpeed}</span>
                      </div>
                      {pkg.specs.protection && (
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Protection:</span>
                          <span className="text-[#1a1c1c] font-medium text-right">{pkg.specs.protection}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-5">
                  <button
                    onClick={() => onOpenQuote(pkg.name)}
                    className={`w-full py-3 rounded-full font-label-ui text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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

      {/* SECTION: INTERACTIVE ZERO-FLICKER REAL-TIME TRANSFER SIMULATOR */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-y border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Engineering Narrative */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffdbcf] text-primary font-label-caps text-[11px] uppercase tracking-wider mb-3 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Grid Immunity
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mb-4">
                Zero Flickering. 0ms Real-Time Transfer.
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] mb-6 leading-relaxed">
                When the national grid trips or collapses, standard inverters cause smart TVs to reboot, desktop PCs
                to crash, and air conditioners to hum loudly. SunGrid's ultra-fast transfer relay switches sources
                in less than 4 milliseconds — faster than a single AC electrical cycle.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#dedfe5] flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm font-bold text-[#1a1c1c]">
                      Sensitive Electronics Shield
                    </h4>
                    <p className="text-xs text-[#5c4037] mt-0.5">
                      Starlink never reboots, gaming consoles keep running, and surgical/clinic equipment maintains continuous voltage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#dedfe5] flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <VolumeX className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm font-bold text-[#1a1c1c]">
                      Whisper-Quiet Operation
                    </h4>
                    <p className="text-xs text-[#5c4037] mt-0.5">
                      Zero fumes, zero rattling diesel noise. Just silent, clean autonomous current flowing through your breaker box.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Waveform Simulator Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#dedfe5] relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-6 bg-[#f3f4f3] rounded-2xl px-4 py-3">
                  <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold">
                    Live Grid Loss Simulation
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSimulatorState(simulatorState === 'grid' ? 'blackout' : 'grid')}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-primary border border-primary/20 shadow-xs hover:bg-primary/10 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>{simulatorState === 'grid' ? 'Simulate Grid Drop' : 'Restore Grid'}</span>
                    </button>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Standard Nigerian Inverter Behavior */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#5c5e63]">Standard Roadside Inverter Switch</span>
                      <span className="text-rose-600 font-bold">
                        {simulatorState === 'blackout' ? '2,000ms Delay • Systems Crash & Reboot' : 'Grid Active • Normal Voltage'}
                      </span>
                    </div>
                    <div className="h-6 w-full bg-[#dedfe5] rounded-full overflow-hidden flex transition-all">
                      <div className={`h-full ${simulatorState === 'blackout' ? 'bg-neutral-500' : 'bg-neutral-700'} w-1/3 flex items-center justify-center text-[10px] text-white font-mono font-bold transition-colors`}>
                        GRID
                      </div>
                      <div className={`h-full flex items-center justify-center text-[10px] font-bold w-1/3 transition-all ${
                        simulatorState === 'blackout' 
                          ? 'bg-rose-500 text-white animate-pulse' 
                          : 'bg-neutral-300 text-neutral-600'
                      }`}>
                        {simulatorState === 'blackout' ? 'BLACKOUT GAP (2s)' : 'STANDBY'}
                      </div>
                      <div className={`h-full ${simulatorState === 'blackout' ? 'bg-neutral-700' : 'bg-neutral-400'} w-1/3 flex items-center justify-center text-[10px] text-white font-mono font-bold transition-colors`}>
                        INVERTER
                      </div>
                    </div>
                  </div>

                  {/* SunGrid Seamless Switch */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#1a1c1c] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> SunGrid Microgrid Inverter
                      </span>
                      <span className="text-primary font-bold">&lt;3.8ms Perceived • 100% Continuity</span>
                    </div>
                    <div className="h-6 w-full bg-gradient-to-r from-primary via-[#ff8e4d] to-primary rounded-full overflow-hidden flex items-center justify-center text-white font-label-caps text-[10px] tracking-wider font-bold shadow-sm relative">
                      <span className="relative z-10">CONTINUOUS UNBROKEN SINE WAVE (ZERO REBOOT)</span>
                      <div className="absolute inset-0 bg-white/20 beam-travel-active pointer-events-none" />
                    </div>
                  </div>

                  {/* SVG Synchronized Sine Wave Graphic with Oscilloscope Glow */}
                  <div className="p-4 bg-[#f9f9f8] rounded-2xl border border-[#dedfe5] relative overflow-hidden">
                    <div className="flex justify-between items-center text-[#5c5e63] font-label-caps text-[10px] uppercase mb-2">
                      <span>Grid Input (230V AC @ 50Hz)</span>
                      <span className="text-primary font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        Sub-Cycle Transfer Synchronization
                      </span>
                    </div>

                    <div className="relative">
                      <svg
                        className="w-full h-16 text-primary oscilloscope-glow"
                        fill="none"
                        viewBox="0 0 600 64"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 32 Q 37.5 0, 75 32 T 150 32 T 225 32 T 300 32 T 375 32 T 450 32 T 525 32 T 600 32"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M300 8 L300 56"
                          opacity="0.6"
                          stroke="#a73400"
                          strokeDasharray="3 3"
                          strokeWidth="1.5"
                        />
                        <circle cx="300" cy="32" fill="#a73400" r="5" className="animate-pulse" />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[#5c4037] text-[11px] mt-1 font-medium font-mono">
                      <span>Public Grid (NEPA/DisCo)</span>
                      <span className="text-primary font-bold">Transfer Event &lt;3.8ms</span>
                      <span>SunGrid Blade Battery Wave</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHAT'S INSIDE EVERY TURNKEY SUNGRID BOX */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
            Engineering Integrity
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            What’s Inside Every Turnkey SunGrid Box
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
            We never cut corners on hidden safety items. Every screw, breaker, and wire is specified to surpass extreme tropical heat and humidity.
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
              Zero aluminum alloys. We use heavy gauge electrolytic oxygen-free copper conduits to eliminate heating and voltage loss under continuous heavy draw.
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
              Smart magnetic cooling architecture keeps operating sound below 25 decibels—quieter than a light rustle of leaves in your hallway.
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
              Run our interactive 2-minute load calculator or book a certified SunGrid engineer for an on-site structural and energy audit anywhere in Lagos, Abuja, or Port Harcourt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectTab('calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
            >
              <Calculator className="w-4 h-4 mr-2 text-primary" />
              <span>Use Load Calculator</span>
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span>Book Free Home Visit</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
