import React, { useState } from 'react';
import { NavTab } from '../types';
import { IMAGES } from '../data/assets';
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
  // Fuel Slider state
  const [fuelSpend, setFuelSpend] = useState<number>(350000);
  
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

  // Calculations for fuel slider
  const solarInstallment = Math.round(fuelSpend * 0.50);
  const monthlySavings = fuelSpend - solarInstallment;
  const threeYearSavings = (monthlySavings * 24) + (fuelSpend * 12); // After 24mo payoff, 100% of fuel is retained!

  const faqs = [
    {
      q: 'Are there any hidden costs after the site inspection?',
      a: 'None whatsoever. Our initial quotation includes our written 30-Day Price Lock Guarantee. After the physical engineer audit, your formal quote lists every breaker, cable length, mounting rail, earthing array, and logistics cost. If unexpected structural fittings are required, SunGrid absorbs the difference.'
    },
    {
      q: "How does the 'Pay Small-Small' financing approval work?",
      a: 'Through our accredited banking partners (Carbon Zero, Sterling Bank, FirstBank CleanTech), applications are completed online in under 15 minutes using your BVN and proof of income or business statements. Once approved, you provide an initial 20% commitment, and SunGrid commissions your full solar hardware within 5 business days while you pay off the remainder across 12 to 36 months.'
    },
    {
      q: 'What does the 24-Hour Gate Swap cover?',
      a: 'Unlike roadside vendors who ship malfunctioning inverters overseas or to Alaba market for repairs leaving you in darkness for weeks, SunGrid maintains local regional hubs in Lagos, Abuja, Port Harcourt, and Ibadan with pre-commissioned reserve inventory. If our telemetry confirms an internal hardware fault, we swap it at your gate in 24 hours.'
    },
    {
      q: 'Can these packages power my water pump and air conditioners?',
      a: 'Yes! All packages from 3.5kVA upward are engineered specifically for high inductive startup loads. Our 5kVA/10kVA Executive package comfortably runs 3 modern inverter ACs simultaneously and handles a 1HP borehole pump without flickering your home lights or dropping delicate electronics.'
    }
  ];

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO TITLE & METRICS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffdbcf] text-primary mb-4 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Nigerian Solar Engineering</span>
          </div>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight font-bold mb-4">
            One Fixed Price.<br className="hidden sm:inline" /> Zero Roadside Surprises.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl leading-relaxed">
            Unlike makeshift installers with hidden fees for trunking and earthing, our turnkey quote covers
            every nut, breaker, and cable with written price protection.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#packages-grid"
              className="px-7 py-3 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-sm font-semibold shadow-[0_4px_16px_rgba(167,52,0,0.3)] transition-all flex items-center gap-2"
            >
              <span>Explore Tier-1 Packages</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#financing-calculator"
              className="px-7 py-3 rounded-full bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm font-semibold transition-colors flex items-center gap-2"
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
                  <span className="px-3 py-0.5 rounded-full bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
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
                    <span>Supports 1 Inverter AC (1.0HP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>5.12kWh Tier-1 LiFePO4 Battery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>6x 550W Monocrystalline PVs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>0.5HP Surface Water Pump</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Fridge, TV, Wi-Fi & LED Lighting</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('urban')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>View full specs</span>
                  {openSpecs['urban'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['urban'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-1">
                    <p>• Pure sine wave hybrid inverter</p>
                    <p>• 16mm heavy gauge copper core DC cables</p>
                    <p>• Surge protection (SPD) & dual disconnects</p>
                    <p>• 1-day typical deployment</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('3.5kVA Urban Package (₦4.25M)')}
                  className="w-full py-2.5 rounded-full bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 2: 5kVA Executive (Most Popular) */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border-2 border-primary shadow-lg relative scale-[1.02] z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-primary text-white font-label-caps text-[10px] uppercase tracking-wider font-bold shadow-sm">
                MOST POPULAR
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#ffdbcf] text-primary font-label-caps text-[10px] uppercase font-bold">
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
                    <span>Runs 3 Inverter ACs (1.5HP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>10.24kWh LiFePO4 Dual Pack</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>12x 580W Tier-1 Bifacial Solar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>1HP Deep Well / Borehole Pumping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Freezer, Refrigerator, Home Audio</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('duplex')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>View full specs</span>
                  {openSpecs['duplex'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['duplex'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-1">
                    <p>• High-Yield Hybrid Inverter (Zero-Flicker &lt;4ms)</p>
                    <p>• Dual MPPT trackers for shaded roofs</p>
                    <p>• 4-point chemical copper earthing array</p>
                    <p>• Cloud mobile app live telemetry</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('5kVA Executive Duplex (₦8.85M)')}
                  className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-xs font-semibold shadow-md transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 3: 10kVA Estate */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
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
                    <span>Powers 6 ACs simultaneously</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>20.48kWh High-C Modular Bank</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>20x 600W High Efficiency Solar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>2HP Heavy Duty Submersible Pump</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Microwave, Induction & Gate Motor</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('estate')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>View full specs</span>
                  {openSpecs['estate'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['estate'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-1">
                    <p>• Parallel dual-stack industrial inverters</p>
                    <p>• Zero flicker (&lt;4ms transfer switchover)</p>
                    <p>• Master changeover isolation switchboard</p>
                    <p>• Full on-site engineering sign-off</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('10kVA Estate Package (₦14.9M)')}
                  className="w-full py-2.5 rounded-full bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>

            {/* Card 4: 20kVA Industrial */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-[#eeeeed] text-[#1a1c1c] font-label-caps text-[10px] uppercase font-bold">
                    20kVA Industrial
                  </span>
                  <span className="text-xs text-[#5c5e63]">Offices/Hospitals</span>
                </div>
                <div>
                  <p className="text-xs text-[#5c5e63]">All-Inclusive Turnkey</p>
                  <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] tracking-tight">
                    ₦24.5M
                  </h3>
                  <p className="text-xs text-primary font-bold mt-0.5">Custom installment plan</p>
                </div>

                <div className="w-full h-px bg-[#dedfe5] my-4" />

                <ul className="space-y-2 text-xs text-[#5c4037]">
                  <li className="flex items-start gap-2 text-[#1a1c1c] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Full Facility / All Three Phases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>40.96kWh Rackmount Server LiFePO4</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>36x 650W Tier-1 TopCon Modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Server racks, cold rooms & elevators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>Auto generator synchronizer</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dedfe5]">
                <button
                  onClick={() => toggleSpec('industrial')}
                  className="text-xs font-semibold text-[#5c5e63] hover:text-primary flex items-center justify-between w-full mb-3 cursor-pointer"
                >
                  <span>View full specs</span>
                  {openSpecs['industrial'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {openSpecs['industrial'] && (
                  <div className="text-xs text-[#5c4037] pb-3 space-y-1">
                    <p>• 3-Phase balancing & harmonic filtering</p>
                    <p>• Class T fused busbar isolation units</p>
                    <p>• Dedicated on-site engineer on commissioning</p>
                    <p>• 2-year included quarterly maintenance</p>
                  </div>
                )}
                <button
                  onClick={() => onOpenQuote('20kVA Industrial (₦24.5M)')}
                  className="w-full py-2.5 rounded-full bg-[#eeeeed] hover:bg-[#12161a] hover:text-white text-[#1a1c1c] font-label-ui text-xs font-semibold transition-colors cursor-pointer"
                >
                  Select Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PAY SMALL-SMALL FINANCING & FUEL SLIDER */}
      <section id="financing-calculator" className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Explanatory copy */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold mb-1">
              Zero Upfront Barrier
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mb-4">
              Switch to Solar Today. Pay Small-Small.
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mb-6 leading-relaxed">
              Do not let fuel price spikes choke your family's cash flow. Spread your solar installation
              across 12, 24, or 36 low-interest monthly installments backed by Nigeria’s leading clean energy bank partners.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <p className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider">
                Financed In Partnership With
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-4 py-2 bg-white rounded-xl border border-[#dedfe5] font-headline-sm text-xs sm:text-sm font-bold text-[#1a1c1c] shadow-xs">
                  Carbon Zero
                </div>
                <div className="px-4 py-2 bg-white rounded-xl border border-[#dedfe5] font-headline-sm text-xs sm:text-sm font-bold text-[#1a1c1c] shadow-xs">
                  Sterling Bank
                </div>
                <div className="px-4 py-2 bg-white rounded-xl border border-[#dedfe5] font-headline-sm text-xs sm:text-sm font-bold text-[#1a1c1c] shadow-xs">
                  FirstBank CleanTech
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#5c4037]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Instant BVN-based pre-qualification within 15 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Zero penalty for early full loan liquidation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Solar hardware active immediately upon 20% down payment</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive ROI Calculator */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#dedfe5]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-[#1a1c1c]">
                  Fuel vs. Solar Calculator
                </h3>
                <p className="text-xs text-[#5c4037]">See how much you save every single month</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf]/60 flex items-center justify-center text-primary">
                <Calculator className="w-6 h-6" />
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-semibold text-[#1a1c1c]">
                  Your Current Generator Fuel & Servicing / Mo:
                </label>
                <span className="font-headline-md text-2xl font-bold text-primary tabular-nums">
                  ₦{fuelSpend.toLocaleString('en-NG')}
                </span>
              </div>

              <input
                type="range"
                min={100000}
                max={1200000}
                step={25000}
                value={fuelSpend}
                onChange={(e) => setFuelSpend(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between font-label-caps text-[10px] text-[#5c5e63] mt-2 font-semibold">
                <span>₦100k / mo</span>
                <span>₦600k / mo</span>
                <span>₦1.2M / mo</span>
              </div>

              {/* Comparative Mechanical Fuel vs Solar Bar */}
              <div className="mt-4 p-3.5 bg-neutral-900 rounded-2xl text-white space-y-2 border border-neutral-800">
                <div className="flex justify-between text-[10px] font-label-caps text-neutral-400 font-semibold">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Generator Fuel Burned (Sunk Loss)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Solar Asset Build (Retained)
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden flex p-0.5 border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-l-full transition-all duration-300"
                    style={{ 
                      width: '50%',
                      transitionTimingFunction: 'var(--ease-meter)'
                    }}
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-primary rounded-r-full transition-all duration-300"
                    style={{ 
                      width: '50%',
                      transitionTimingFunction: 'var(--ease-meter)'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-neutral-400">Fixed Cost: ₦{solarInstallment.toLocaleString('en-NG')}</span>
                  <span className="text-emerald-400 font-bold">Monthly Cash Surplus: +₦{monthlySavings.toLocaleString('en-NG')}</span>
                </div>
              </div>
            </div>

            {/* Interactive Result Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f9f9f8] rounded-2xl p-5 border border-[#dedfe5]">
                <p className="font-label-caps text-[10px] text-[#5c5e63] uppercase font-bold tracking-wider">
                  Predictable Solar Installment
                </p>
                <p className="font-metric-counter text-2xl sm:text-3xl font-bold text-[#1a1c1c] mt-1">
                  ₦{solarInstallment.toLocaleString('en-NG')}
                </p>
                <p className="text-xs text-[#5c4037] mt-1">24-month fixed plan</p>
              </div>

              <div className="bg-[#ffdbcf]/40 rounded-2xl p-5 border border-primary/20">
                <p className="font-label-caps text-[10px] text-primary uppercase font-bold tracking-wider">
                  Instant Monthly Cash In Pocket
                </p>
                <p className="font-metric-counter text-2xl sm:text-3xl font-bold text-primary mt-1">
                  +₦{monthlySavings.toLocaleString('en-NG')}
                </p>
                <p className="text-xs text-[#5c4037] mt-1">Kept in your pocket from Day 1</p>
              </div>
            </div>

            {/* 3-Year Projection */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#f3f4f3] border border-[#dedfe5]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#1a1c1c]">3-Year Projected Retained Wealth</p>
                  <p className="text-[11px] text-[#5c4037]">
                    Total cumulative savings once solar loan is completely paid off
                  </p>
                </div>
              </div>
              <span className="font-headline-sm text-lg sm:text-xl font-bold text-primary">
                ₦{threeYearSavings.toLocaleString('en-NG')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: THE 4 HONEST PROMISES */}
      <section className="w-full bg-white py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Contractual Integrity
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
              The 4 Honest SunGrid Promises
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
              Never let a cheap initial quotation trap you in thousands of unforeseen site costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Promise 1 */}
            <div className="bg-[#f9f9f8] rounded-2xl p-6 sm:p-8 border border-[#dedfe5] shadow-xs flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf] flex items-center justify-center text-primary shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
                  Pure Copper Trunking & Conduits
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  Every millimeter of cable is 100% heavy electrolytic copper sheathed inside UV-proof metal-clad and rigid PVC trunking. No dangling roadside wires or flammable aluminum cords.
                </p>
              </div>
            </div>

            {/* Promise 2 */}
            <div className="bg-[#f9f9f8] rounded-2xl p-6 sm:p-8 border border-[#dedfe5] shadow-xs flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf] flex items-center justify-center text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
                  Deep Chemical Grounding Array
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  We drill genuine 3-meter copper-bonded grounding rods with bentonite chemical enhancement to achieve &lt;5 Ohms resistance, guarding against Nigerian lightning strikes.
                </p>
              </div>
            </div>

            {/* Promise 3 */}
            <div className="bg-[#f9f9f8] rounded-2xl p-6 sm:p-8 border border-[#dedfe5] shadow-xs flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf] flex items-center justify-center text-primary shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
                  Zero 'Boy-Boy' or Logistics Surcharges
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  Our quote includes direct haulage to your doorstep, full rigging, labor, community interface, and crane lifts where needed. You will never be asked to 'settle boys' on site.
                </p>
              </div>
            </div>

            {/* Promise 4 */}
            <div className="bg-[#f9f9f8] rounded-2xl p-6 sm:p-8 border border-[#dedfe5] shadow-xs flex gap-5 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#ffdbcf] flex items-center justify-center text-primary shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1">
                  Rapid 24-Hour Gate Swap
                </h3>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] leading-relaxed">
                  If an inverter or lithium module flags an internal hardware fault, our engineering team brings a fully operational replacement to your gate within 24 hours. No weeks of lab waiting.
                </p>
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
                <img
                  src={IMAGES.telemetryAudit}
                  alt="Precision Surge Telemetry Inspection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#1a1c1c] font-label-caps text-[10px] font-bold">
                  Precision Surge Telemetry
                </div>
              </div>
              <div className="h-64 rounded-2xl overflow-hidden relative shadow-sm">
                <img
                  src={IMAGES.roofArraySunny}
                  alt="Tier-1 Bifacial Solar Mounts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#1a1c1c] font-label-caps text-[10px] font-bold">
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
                  <span className="w-7 h-7 rounded-full bg-[#f3f4f3] flex items-center justify-center text-primary shrink-0">
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
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>0800-SUNGRID</span>
            </a>
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
