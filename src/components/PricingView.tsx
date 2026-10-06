import React, { useState } from 'react';
import { NavTab } from '../types';
import { IMAGES } from '../data/assets';
import { LazyImage } from './LazyImage';
import { SolarRoiCalculator } from './SolarRoiCalculator';
import { 
  Shield01Icon, 
  Clock01Icon, 
  SecurityLockIcon, 
  ArrowRight01Icon, 
  ArrowDown01Icon, 
  ArrowUp01Icon, 
  Add01Icon, 
  Remove01Icon,
  SparklesIcon,
  Award01Icon,
  FlashIcon,
  Call02Icon,
  CheckmarkCircle02Icon
} from 'hugeicons-react';

interface PricingViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectTab, onOpenQuote }) => {
  // Package full spec toggles
  const [openSpecs, setOpenSpecs] = useState<{ [key: string]: boolean }>({
    'duplex': false
  });

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<{ [key: number]: boolean }>({
    0: true // first open by default
  });

  const toggleSpec = (id: string) => {
    setOpenSpecs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: 3.5kVA Urban */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-xs uppercase font-bold">
                    3.5kVA urban setup
                  </span>
                  <span className="text-sm text-[#5c5e63] font-semibold">1-2 bed</span>
                </div>
                <div>
                  <p className="text-sm text-[#5c5e63] font-medium">Complete setup & installation</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight mt-0.5">
                    ₦4.25M
                  </h3>
                  <p className="text-sm text-primary font-bold mt-0.5">Or ₦145,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-3 text-sm sm:text-base text-[#5c4037]">
                  <li className="flex items-start gap-2.5 text-[#1a1c1c] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Powers 1 bedroom inverter AC (1.0 HP) overnight</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>5.12 kWh long-life lithium battery (10+ year lifespan)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>6 rooftop solar panels (550W monocrystalline)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Pumps water to overhead tank (0.5 HP pump)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Runs fridge, TV, Starlink Wi-Fi & LED lights 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('urban')}
                  className="text-sm font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer py-1"
                >
                  <span>Specs & plain meaning</span>
                  {openSpecs['urban'] ? <ArrowUp01Icon className="w-4 h-4" /> : <ArrowDown01Icon className="w-4 h-4" />}
                </button>
                {openSpecs['urban'] && (
                  <div className="text-sm text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3.5 rounded-xl mb-3 leading-relaxed">
                    <p><strong className="text-[#1a1c1c]">Pure sine wave:</strong> Smooth electricity without motor hum or flickering lights.</p>
                    <p><strong className="text-[#1a1c1c]">100% copper wiring:</strong> Heavy 16mm wiring inside conduit prevents dangerous heating.</p>
                    <p><strong className="text-[#1a1c1c]">Surge protector:</strong> Absorbs sudden national grid voltage spikes safely.</p>
                    <p><strong className="text-[#1a1c1c]">1-day setup:</strong> Installed, wired, and tested within 24 hours.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('3.5kVA Urban Package (₦4.25M)')}
                  className="w-full py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold transition-colors cursor-pointer min-h-[48px] touch-manipulation"
                >
                  Select package
                </button>
              </div>
            </div>

            {/* Card 2: 10kVA Duplex (Most Popular) */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border-2 border-primary shadow-lg relative md:-translate-y-1 z-10">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-primary text-white font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs">
                MOST POPULAR IN NIGERIA
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#ffdbcf] text-primary font-label-caps text-xs uppercase font-bold">
                    10kVA duplex comfort
                  </span>
                  <span className="text-sm text-[#5c5e63] font-semibold">3-4 bed</span>
                </div>
                <div>
                  <p className="text-sm text-[#5c5e63] font-medium">Complete setup & installation</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight mt-0.5">
                    ₦8.85M
                  </h3>
                  <p className="text-sm text-primary font-bold mt-0.5">Or ₦285,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-3 text-sm sm:text-base text-[#5c4037]">
                  <li className="flex items-start gap-2.5 text-[#1a1c1c] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Runs 3 inverter ACs (1.5 HP) overnight silently</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>10.24 kWh blade lithium battery (EV-grade safety cells)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>12 bifacial solar panels (absorb light from both sides)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Pumps borehole water from standard 1.0 HP wells</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Runs deep freezer, kitchen fridge & TV all day</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('duplex')}
                  className="text-sm font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer py-1"
                >
                  <span>Specs & plain meaning</span>
                  {openSpecs['duplex'] ? <ArrowUp01Icon className="w-4 h-4" /> : <ArrowDown01Icon className="w-4 h-4" />}
                </button>
                {openSpecs['duplex'] && (
                  <div className="text-sm text-[#5c4037] pb-3 space-y-2 bg-[#fdf2ec] p-3.5 rounded-xl mb-3 leading-relaxed">
                    <p><strong className="text-[#1a1c1c]">Instant transfer (&lt;4ms):</strong> Switches so fast that televisions and laptops continue without restarting.</p>
                    <p><strong className="text-[#1a1c1c]">Dual MPPT controllers:</strong> Extracts high solar output even if part of your roof has tree shade.</p>
                    <p><strong className="text-[#1a1c1c]">Chemical earthing:</strong> Real copper earth rod protecting from lightning and grid surges.</p>
                    <p><strong className="text-[#1a1c1c]">Phone app:</strong> Check your live solar generation and battery percent on your smartphone.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('10kVA Duplex Comfort (₦8.85M)')}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold shadow-md transition-colors cursor-pointer min-h-[48px] touch-manipulation"
                >
                  Select package
                </button>
              </div>
            </div>

            {/* Card 3: 15kVA Estate */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-xs uppercase font-bold">
                    15kVA estate & clinic
                  </span>
                  <span className="text-sm text-[#5c5e63] font-semibold">5+ bed</span>
                </div>
                <div>
                  <p className="text-sm text-[#5c5e63] font-medium">Complete setup & installation</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight mt-0.5">
                    ₦14.9M
                  </h3>
                  <p className="text-sm text-primary font-bold mt-0.5">Or ₦490,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-3 text-sm sm:text-base text-[#5c4037]">
                  <li className="flex items-start gap-2.5 text-[#1a1c1c] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Powers 5-7 ACs across all rooms and building wings</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>20.48 kWh server-rack lithium battery bank</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>20 high-output solar panels (600W each)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Pumps water from 2.0 HP deep borehole wells</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Microwave, electric cooker, and compound gate motor</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('estate')}
                  className="text-sm font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer py-1"
                >
                  <span>Specs & plain meaning</span>
                  {openSpecs['estate'] ? <ArrowUp01Icon className="w-4 h-4" /> : <ArrowDown01Icon className="w-4 h-4" />}
                </button>
                {openSpecs['estate'] && (
                  <div className="text-sm text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3.5 rounded-xl mb-3 leading-relaxed">
                    <p><strong className="text-[#1a1c1c]">Dual inverters in parallel:</strong> Two machines sharing the load so power never drops if one unit is serviced.</p>
                    <p><strong className="text-[#1a1c1c]">Clean sine wave:</strong> Safe for medical analyzers, sound systems, and compound elevators.</p>
                    <p><strong className="text-[#1a1c1c]">Master distribution board:</strong> One central switch neatly controlling the building power phases.</p>
                    <p><strong className="text-[#1a1c1c]">Registered engineer sign-off:</strong> NERC-certified engineer performs final safety checks before handover.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('15kVA Estate Package (₦14.9M)')}
                  className="w-full py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold transition-colors cursor-pointer min-h-[48px] touch-manipulation"
                >
                  Select package
                </button>
              </div>
            </div>

            {/* Card 4: 25kVA Commercial */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-xs uppercase font-bold">
                    25kVA commercial
                  </span>
                  <span className="text-sm text-[#5c5e63] font-semibold">Offices / clinics</span>
                </div>
                <div>
                  <p className="text-sm text-[#5c5e63] font-medium">Complete setup & installation</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight mt-0.5">
                    ₦24.5M
                  </h3>
                  <p className="text-sm text-primary font-bold mt-0.5">Corporate payment plans available</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-3 text-sm sm:text-base text-[#5c4037]">
                  <li className="flex items-start gap-2.5 text-[#1a1c1c] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Powers whole office or clinic across all 3 phases</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>40.96 kWh server-rack lithium battery bank</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>36 commercial high-density solar panels (650W each)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Runs server racks, cold rooms, HVAC & passenger lifts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                    <span>Automatic generator controller (runs gen only when needed)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('industrial')}
                  className="text-sm font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer py-1"
                >
                  <span>Specs & plain meaning</span>
                  {openSpecs['industrial'] ? <ArrowUp01Icon className="w-4 h-4" /> : <ArrowDown01Icon className="w-4 h-4" />}
                </button>
                {openSpecs['industrial'] && (
                  <div className="text-sm text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3.5 rounded-xl mb-3 leading-relaxed">
                    <p><strong className="text-[#1a1c1c]">3-phase balancing:</strong> Balanced load on each phase so heavy industrial motors don't overheat.</p>
                    <p><strong className="text-[#1a1c1c]">Class T safety fuses:</strong> Fast-acting fuses that cut electrical faults in milliseconds.</p>
                    <p><strong className="text-[#1a1c1c]">Certified commissioning:</strong> Supervised testing with full safety certification on site.</p>
                    <p><strong className="text-[#1a1c1c]">Scheduled servicing:</strong> Routine checkups to clean panels and check battery balancing.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('25kVA Commercial (₦24.5M)')}
                  className="w-full py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold transition-colors cursor-pointer min-h-[48px] touch-manipulation"
                >
                  Select package
                </button>
              </div>
            </div>
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
