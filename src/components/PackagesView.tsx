import React, { useState } from 'react';
import { NavTab, SolarPackage } from '../types';
import { SOLAR_PACKAGES } from '../data/packages';
import { LazyImage } from './LazyImage';
import { DailyEnergyYieldChart } from './DailyEnergyYieldChart';
import { 
  CheckCircle2, 
  Zap, 
  VolumeX, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Layers,
  BatteryCharging,
  Sun
} from 'lucide-react';

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

  const filteredPackages = SOLAR_PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

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
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-primary text-white font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs">
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
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-md z-10 ${
                        isFeatured
                          ? 'bg-primary text-white'
                          : 'bg-white/95 text-[#1a1c1c] shadow-xs'
                      }`}
                    >
                      {pkg.powerKva}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-headline-sm text-xl font-bold text-[#1a1c1c] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="font-body-sm text-sm text-[#5c4037] mb-4 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price Box */}
                  <div className="mb-5 pb-4 border-b border-[#dedfe5]">
                    <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider block">
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
                      <p className="text-sm text-primary font-bold mt-0.5">
                        Or ₦{pkg.monthlyInstallment.toLocaleString('en-NG')} / month
                      </p>
                    )}
                    <span className="text-xs text-[#5c5e63] block mt-1 font-medium">
                      Includes complete installation, cables & surge gear
                    </span>
                  </div>

                  {/* Simple Plain-English Summary Banner */}
                  {pkg.simpleSummary && (
                    <div className="mb-4 p-3 rounded-xl bg-[#fdf2ec] border border-[#ffdbcf] text-sm text-[#5c4037] leading-relaxed flex items-start gap-2">
                      <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
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
                      <div key={i} className="flex items-start gap-2 text-sm text-[#1a1c1c]">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Link to Dedicated Hardware Specs Section */}
                  <div className="pt-2 border-t border-dashed border-[#dedfe5]">
                    <a
                      href="#hardware-specs"
                      className="flex items-center justify-between w-full font-label-ui text-sm text-[#5c5e63] hover:text-primary transition-colors py-1.5 cursor-pointer group"
                    >
                      <span className="font-semibold group-hover:underline">Hardware Specs &amp; What They Mean</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onOpenQuote(pkg.name)}
                    className={`w-full py-3.5 rounded-xl font-label-ui text-sm sm:text-base font-semibold transition-all cursor-pointer ${
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

      {/* DEDICATED SECTION: HARDWARE SPECS & WHAT THEY MEAN */}
      <section id="hardware-specs" className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20 w-full scroll-mt-12">
        <div className="max-w-3xl mb-12">
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
            Technical Transparency
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            Hardware Specs &amp; What They Mean
          </h2>
          <p className="font-body-md text-base text-[#5c4037] mt-2 leading-relaxed">
            Every component explained in terms of real-world home performance—not manufacturer marketing.
          </p>
        </div>

        {/* Stacked Breakdown List with strong left border per item */}
        <div className="divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5] bg-white rounded-2xl shadow-xs border border-[#dedfe5] overflow-hidden">
          {/* Inverter */}
          <div className="p-6 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Inverter:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                8kVA–10kVA Low-Frequency Hybrid
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Heavy-duty inverter built to absorb heavy motor kicks when water pumps or large AC compressors kick on.
              </p>
            </div>
          </div>

          {/* Battery */}
          <div className="p-6 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Battery:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                10.24kWh Blade LiFePO4 (6,000 cycles)
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Blade lithium pack providing 14–18 hours of overnight backup without exhaust or fumes.
              </p>
            </div>
          </div>

          {/* Solar Array */}
          <div className="p-6 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Solar Array:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                12x 580W Bifacial Glass PVs
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                12 bifacial glass panels that produce electricity from direct sunlight and reflected light from your roof tiles.
              </p>
            </div>
          </div>

          {/* Switch Speed */}
          <div className="p-6 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Switch Speed:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                &lt; 4ms (Instant transfer: continuous power changeover)
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Instant handover under 4ms: your AC, television, and WiFi continue without restarting.
              </p>
            </div>
          </div>

          {/* Surge Protection */}
          <div className="p-6 sm:p-8 border-l-4 border-primary flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="md:w-5/12">
              <span className="font-label-caps text-xs sm:text-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Surge Protection:
              </span>
              <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                4-Point Chemical Copper Earthing Array &amp; Surge Arrestors
              </h3>
            </div>
            <div className="md:w-7/12">
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Dedicated deep copper chemical grounding rod absorbing lightning and grid voltage spikes.
              </p>
            </div>
          </div>
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
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
            Installation Standards
          </span>
          <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
            What’s Inside Every Turnkey SunGrid Box
          </h2>
          <p className="font-body-md text-base text-[#5c4037] mt-2 leading-relaxed">
            Every breaker, cable, and mounting bracket is chosen to withstand tropical humidity and prolonged peak heat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              100% Pure Copper
            </h4>
            <p className="font-body-sm text-sm text-[#5c4037] leading-relaxed font-medium">
              We use thick electrolytic copper cabling (never aluminum or copper-clad wire) to prevent heat buildup and voltage drop under continuous heavy loads.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <VolumeX className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              Whisper Inverter
            </h4>
            <p className="font-body-sm text-sm text-[#5c4037] leading-relaxed font-medium">
              Smart magnetic cooling architecture keeps operating sound below 25 decibels, quieter than a light rustle of leaves in your hallway.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              10–15 Year LiFePO4
            </h4>
            <p className="font-body-sm text-sm text-[#5c4037] leading-relaxed font-medium">
              Automotive-grade prismatic lithium iron phosphate cells with built-in thermal run-away suppression and 6,000 deep cycle endurance.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#dedfe5] shadow-xs flex flex-col justify-start">
            <div className="w-12 h-12 rounded-xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] mb-1">
              Leak-Proof Mounting
            </h4>
            <p className="font-body-sm text-sm text-[#5c4037] leading-relaxed font-medium">
              EPDM rubber-sealed clamps and aircraft-grade anodized aluminum rails prevent roof penetration leaks during torrential tropical rainstorms.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: CTA BANNER */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-16 w-full">
        <div className="rounded-3xl bg-[#eeeeed] border border-[#dedfe5] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-wider font-bold mb-1 block">
              Personalized Energy Audit
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl text-[#1a1c1c] font-bold tracking-tight mb-2">
              Not sure which package fits your appliances?
            </h3>
            <p className="font-body-md text-base text-[#5c4037] leading-relaxed">
              Use our 2-minute load calculator or book an on-site audit to have an electrical engineer evaluate your distribution board and roof space in Lagos, Abuja, or Port Harcourt.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onSelectTab('calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
            >
              <Calculator className="w-4 h-4 mr-2 text-primary" />
              <span>Use Load Calculator</span>
            </button>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span>Book Free Home Visit</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
