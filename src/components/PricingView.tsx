import React, { useState } from 'react';
import { NavTab } from '../types';
import { IMAGES } from '../data/assets';
import { LazyImage } from './LazyImage';
import { SolarRoiCalculator } from './SolarRoiCalculator';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Clock, 
  Lock, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus,
  Sparkles,
  Award,
  Zap,
  Phone
} from 'lucide-react';

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
      q: "How does the 'Pay Small-Small' financing approval work?",
      a: 'You apply online through our partner banks (Sterling Bank Alternative Energy, FirstBank CleanTech, or Carbon) using your BVN and 6 months of bank statements. Most reviews conclude in 24 to 48 hours. Once approved, you pay a 20% commitment to schedule installation, and the bank finances the balance over 12, 24, or 36 months.'
    },
    {
      q: 'What does the 24-Hour Gate Swap cover?',
      a: 'If your inverter or battery develops an internal fault during the warranty period, we don’t take it away to a workshop for weeks while you sit in darkness. We send a service van with a matching replacement unit directly to your gate within 24 hours, swap it out on the spot, and take the faulty unit back to our depot.'
    },
    {
      q: 'Can these packages power my water pump and air conditioners?',
      a: 'Yes. The 3.5kVA package easily handles a 0.5HP pumping machine and one bedroom inverter AC. For a standard duplex with a 1HP or 1.5HP borehole pump plus two to three inverter ACs, choose the 10kVA system. The inverters are selected specifically to absorb motor startup surges without tripping or resetting your other appliances.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO TITLE & METRICS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold block mb-3">
            Turnkey Solar Pricing
          </span>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight font-bold mb-4">
            Fixed-price solar installations with no surprise costs on site.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl leading-relaxed">
            We inspect your home, calculate your electrical loads, and issue a written quote covering
            every cable, breaker, and mounting rail before work starts.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages-grid"
              className="px-7 py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm font-semibold shadow-[0_4px_16px_rgba(167,52,0,0.3)] transition-all flex items-center gap-2"
            >
              <span>Explore Tier-1 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#financing-calculator"
              className="px-7 py-3 rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <span>Pay 'Small-Small' Financing</span>
            </a>
          </div>
        </div>

        {/* 4 Value Pillars Strip */}
        <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl border border-[#dedfe5] shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
            <div className="flex flex-col items-center text-center px-4 lg:border-r lg:border-[#dedfe5]">
              <Sparkles className="w-7 h-7 text-primary mb-2" />
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">100% Brand-New</p>
              <p className="font-body-sm text-xs text-[#5c4037]">Grade-A Prismatic Cells</p>
            </div>

            <div className="flex flex-col items-center text-center px-4 lg:border-r lg:border-[#dedfe5]">
              <ShieldCheck className="w-7 h-7 text-primary mb-2" />
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">10-Year Warranty</p>
              <p className="font-body-sm text-xs text-[#5c4037]">6,000 LiFePO4 Cycles</p>
            </div>

            <div className="flex flex-col items-center text-center px-4 lg:border-r lg:border-[#dedfe5]">
              <Clock className="w-7 h-7 text-primary mb-2" />
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">24-Hour Gate Swap</p>
              <p className="font-body-sm text-xs text-[#5c4037]">Free Unit Replacement</p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <Lock className="w-7 h-7 text-primary mb-2" />
              <p className="font-headline-sm text-base font-bold text-[#1a1c1c]">30-Day Lock</p>
              <p className="font-body-sm text-xs text-[#5c4037]">Written Price Protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TURNKEY PACKAGES GRID */}
      <section id="packages-grid" className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
                Turnkey Installations
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
                Certified Turnkey Packages
              </h2>
            </div>
            <p className="font-body-md text-sm text-[#5c4037] max-w-md">
              Everything included: Monocrystalline panels, pure copper trunking, class-1 earthing array, and full commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: 3.5kVA Urban */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
                    3.5kVA Urban
                  </span>
                  <span className="text-xs text-[#5c5e63]">1-2 Bed</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c5e63]">All-Inclusive Turnkey</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                    ₦4.25M
                  </h3>
                  <p className="text-xs text-primary font-bold mt-0.5">Or ₦145,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-2 text-xs text-[#5c4037]">
                  <li className="flex items-start gap-2 text-[#1a1c1c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Powers 1 bedroom Inverter AC (1.0HP) overnight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>5.12kWh Long-Life Lithium Battery (10+ yr lifespan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>6 Rooftop Solar Panels (550W High-Efficiency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Pumps water to overhead tank (0.5HP pump)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Runs fridge, TV, Starlink Wi-Fi & LED lights 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('urban')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>Specs & Plain Meaning</span>
                  {openSpecs['urban'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['urban'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3 rounded-xl mb-3">
                    <p><strong className="text-[#1a1c1c]">Pure Sine Wave:</strong> Clean current without humming or light flicker.</p>
                    <p><strong className="text-[#1a1c1c]">100% Copper Cables:</strong> Heavy 16mm wiring prevents dangerous overheating.</p>
                    <p><strong className="text-[#1a1c1c]">Surge Protector (SPD):</strong> Absorbs sudden NEPA high-voltage spikes safely.</p>
                    <p><strong className="text-[#1a1c1c]">1-Day Setup:</strong> Fully installed and tested within 24 hours.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('3.5kVA Urban Package (₦4.25M)')}
                  className="w-full py-2.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 2: 5kVA Executive (Most Popular) */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border-2 border-primary shadow-lg relative scale-[1.02] z-10">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-primary text-white font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-xs">
                MOST POPULAR
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#ffdbcf] text-primary font-label-caps text-[10px] uppercase font-bold">
                    5kVA Executive
                  </span>
                  <span className="text-xs text-[#5c5e63]">3-4 Bed</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c5e63]">All-Inclusive Turnkey</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                    ₦8.85M
                  </h3>
                  <p className="text-xs text-primary font-bold mt-0.5">Or ₦285,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-2 text-xs text-[#5c4037]">
                  <li className="flex items-start gap-2 text-[#1a1c1c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Runs 3 Inverter ACs (1.5HP) overnight silently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>10.24kWh Blade Lithium Battery (EV-grade safety cells)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>12 Bifacial Solar Panels (catches front & reflected sunlight)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Effortless 1.0HP borehole water pumping anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Runs deep freezer, refrigerator & home cinema 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('duplex')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>Specs & Plain Meaning</span>
                  {openSpecs['duplex'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['duplex'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-2 bg-[#fdf2ec] p-3 rounded-xl mb-3">
                    <p><strong className="text-[#1a1c1c]">Instant Handover (&lt;4ms):</strong> Switches fast enough that televisions and computers run without rebooting.</p>
                    <p><strong className="text-[#1a1c1c]">Dual MPPT Solar Brain:</strong> Produces high electricity even if part of your roof has shade.</p>
                    <p><strong className="text-[#1a1c1c]">Chemical Earthing:</strong> Real copper ground rod protecting from thunder and grid surges.</p>
                    <p><strong className="text-[#1a1c1c]">Smartphone App:</strong> See live solar generation and battery percent on your phone.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('5kVA Executive Duplex (₦8.85M)')}
                  className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 3: 10kVA Estate */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
                    10kVA Estate
                  </span>
                  <span className="text-xs text-[#5c5e63]">5+ Bed</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c5e63]">All-Inclusive Turnkey</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                    ₦14.9M
                  </h3>
                  <p className="text-xs text-primary font-bold mt-0.5">Or ₦490,000 / month</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-2 text-xs text-[#5c4037]">
                  <li className="flex items-start gap-2 text-[#1a1c1c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Powers 5–7 ACs simultaneously across all building wings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>20.48kWh High-Capacity Server Rack Lithium Storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>20 Ultra-High Efficiency Solar Panels (600W each)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Heavy-duty borehole submersible pump (2.0HP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Microwave, electric cooker, elevator & motorized gate</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('estate')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>Specs & Plain Meaning</span>
                  {openSpecs['estate'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['estate'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3 rounded-xl mb-3">
                    <p><strong className="text-[#1a1c1c]">Dual Industrial Inverters:</strong> Two machines working in tandem so you never experience blackout if one needs service.</p>
                    <p><strong className="text-[#1a1c1c]">Clean Sine Wave:</strong> Safe for medical lab equipment, home elevators, and sensitive audio systems.</p>
                    <p><strong className="text-[#1a1c1c]">Changeover Board:</strong> One master switch neatly controlling your entire estate grid.</p>
                    <p><strong className="text-[#1a1c1c]">Registered Engineer:</strong> NERC-certified engineer conducts final safety check before handover.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('10kVA Estate Package (₦14.9M)')}
                  className="w-full py-2.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 4: 20kVA Industrial */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
                    25kVA Commercial
                  </span>
                  <span className="text-xs text-[#5c5e63]">Offices / Clinics</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c5e63]">All-Inclusive Turnkey</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                    ₦24.5M
                  </h3>
                  <p className="text-xs text-primary font-bold mt-0.5">Flexible corporate financing</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-2 text-xs text-[#5c4037]">
                  <li className="flex items-start gap-2 text-[#1a1c1c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Powers whole office or clinic across all 3 phases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>40.96kWh Rackmount Server Lithium Bank</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>36 Commercial High-Density Solar Panels (650W each)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Runs server racks, cold rooms, HVAC & passenger lifts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Generator synchronizer (cranks generator only if needed)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('industrial')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>Specs & Plain Meaning</span>
                  {openSpecs['industrial'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['industrial'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-2 bg-[#f3f4f3] p-3 rounded-xl mb-3">
                    <p><strong className="text-[#1a1c1c]">3-Phase Balancing:</strong> Equal current on all 3 phases so heavy motors don't burn out.</p>
                    <p><strong className="text-[#1a1c1c]">Class T Fused Protection:</strong> Rapid electrical safety fuses cutting off faults in milliseconds.</p>
                    <p><strong className="text-[#1a1c1c]">Engineer On-Site:</strong> Supervised startup with full compliance safety certificate.</p>
                    <p><strong className="text-[#1a1c1c]">2-Yr Service Included:</strong> Quarterly maintenance visits keeping panels clean and batteries balanced.</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('20kVA Industrial (₦24.5M)')}
                  className="w-full py-2.5 rounded-xl bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
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
                Spread Payments Over 12, 24, or 36 Months
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-[#5c4037] mt-1.5 leading-relaxed">
                Available through clean energy desks at major commercial banks. Installation begins upon a 20% deposit, with no fees or penalties if you pay off the balance early.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-wrap items-center gap-3">
              <div className="px-5 py-3 bg-[#f9f9f8] rounded-2xl border border-[#dedfe5] text-xs font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Carbon Energy Desk
              </div>
              <div className="px-5 py-3 bg-[#f9f9f8] rounded-2xl border border-[#dedfe5] text-xs font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Sterling Bank Alternative Energy
              </div>
              <div className="px-5 py-3 bg-[#f9f9f8] rounded-2xl border border-[#dedfe5] text-xs font-bold text-[#1a1c1c] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> FirstBank CleanTech Desk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE 4 HONEST PROMISES */}
      <section className="w-full bg-white py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Installation Standards
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
              Our Four Installation Commitments
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
              Every detail is specified up front so you are never hit with unforeseen site fees.
            </p>
          </div>

          {/* Plain Stacked List: Checklist with strong left border / rules, full width, no card boundaries */}
          <div className="max-w-4xl mx-auto divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5]">
            {/* Promise 1 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-1">
                  Pure Copper Trunking & Conduits
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  Every millimeter of cable is heavy electrolytic copper sheathed inside UV-resistant conduit and rigid trunking. We never use aluminum cords or leave loose wires exposed.
                </p>
              </div>
              <Zap className="w-5 h-5 text-primary shrink-0 mt-1" />
            </div>

            {/* Promise 2 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-1">
                  Deep Chemical Grounding Array
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  We install 3-meter copper-bonded grounding rods with bentonite earth enhancement to achieve &lt;5 Ohms resistance, protecting against lightning and grid surges.
                </p>
              </div>
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-1" />
            </div>

            {/* Promise 3 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-1">
                  We don't add last-minute site charges
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  Our quote covers delivery to your door, installation labor, community interface, and crane lifts where needed. You will never be asked for additional cash on site.
                </p>
              </div>
              <Award className="w-5 h-5 text-primary shrink-0 mt-1" />
            </div>

            {/* Promise 4 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-1">
                  Rapid 24-Hour Gate Swap
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  If an inverter or lithium module flags an internal hardware fault, our engineering team brings a fully operational replacement to your gate within 24 hours. No weeks of lab waiting.
                </p>
              </div>
              <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
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
                Free Engineering Audit
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] mt-1 mb-4">
                We Measure Your Exact Load Before You Pay a Kobo.
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] mb-6 leading-relaxed">
                Our NERC-certified field engineers visit your residence with true-RMS clamp meters and solar
                thermal roof scanners to verify startup surges, breaker health, and daily energy consumption patterns.
              </p>

              <div className="flex items-center gap-8 pt-2">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl font-bold text-[#1a1c1c]">48 Hours</span>
                  <span className="text-xs text-[#5c5e63]">Turnaround from audit to quote</span>
                </div>
                <div className="w-px h-10 bg-[#dedfe5]" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-xl font-bold text-primary">₦0 Cost</span>
                  <span className="text-xs text-[#5c5e63]">Free for Lagos & Abuja homes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <LazyImage
                  src={IMAGES.telemetryAudit}
                  alt="Precision Surge Telemetry Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#1a1c1c] font-label-caps text-[10px] font-bold z-10">
                  Precision Surge Telemetry
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <LazyImage
                  src={IMAGES.roofArraySunny}
                  alt="Tier-1 Bifacial Solar Mounts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[#1a1c1c] font-label-caps text-[10px] font-bold z-10">
                  Tier-1 Bifacial Solar Mounts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION */}
      <section className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-12">
        <div className="text-center mb-10">
          <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
            Got Questions?
          </span>
          <h2 className="font-headline-xl text-3xl font-bold text-[#1a1c1c] mt-1">
            Frequently Asked Questions
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
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-headline-sm text-sm sm:text-base font-bold text-[#1a1c1c] pr-4">
                    {f.q}
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-[#f3f4f3] flex items-center justify-center text-primary shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-[#5c4037] leading-relaxed animate-fadeIn">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: MINIMAL CTA BOX */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-16">
        <div className="bg-[#12161a] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="font-label-caps text-[11px] text-[#ff8e4d] uppercase tracking-wider font-bold mb-1 block">
              Ready for True Energy Freedom?
            </span>
            <h3 className="font-headline-xl text-2xl sm:text-3xl text-white font-bold mb-2">
              Book Your Free On-Site Engineering Audit.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Our certified solar engineers will inspect your breaker distribution board, roof azimuth,
              and load surge profiles across Lagos, Abuja, Ibadan, or Port Harcourt.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:08007864743"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>0800-SUNGRID</span>
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Site Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
