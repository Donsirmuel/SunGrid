import React, { useState, useEffect, useRef } from 'react';
import { NavTab } from '../types';
import { HeroCanvas } from './HeroCanvas';
import { LazyImage } from './LazyImage';
import { IMAGES } from '../data/assets';
import { SOLAR_PACKAGES } from '../data/packages';
import { SHARED_METRICS } from '../config/metrics';
import { useScrollTelemetry } from '../hooks/useScrollTelemetry';
import { 
  Sun01Icon, 
  ArrowRight01Icon, 
  Shield01Icon, 
  FlashIcon, 
  CheckmarkCircle02Icon,
  Award01Icon,
  DashboardSpeed01Icon
} from 'hugeicons-react';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onOpenQuote }) => {
  const telemetry = useScrollTelemetry();

  // Mechanical Decelerating Metrics Counter State
  const metricsSectionRef = useRef<HTMLElement | null>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [counterFuel, setCounterFuel] = useState(0);
  const [counterUptime, setCounterUptime] = useState(0);
  const [counterHomes, setCounterHomes] = useState(0);

  // Lekki image de-magnification on entering viewport
  const lekkiContainerRef = useRef<HTMLDivElement | null>(null);
  const [lekkiInView, setLekkiInView] = useState(false);

  // General Scroll Reveal Observer for noticeable mechanical entry animations
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-active');
            if (entry.target === metricsSectionRef.current) {
              setMetricsVisible(true);
            }
            if (entry.target === lekkiContainerRef.current) {
              setLekkiInView(true);
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal-init');
    elements.forEach((el) => revealObserver.observe(el));
    if (metricsSectionRef.current) revealObserver.observe(metricsSectionRef.current);
    if (lekkiContainerRef.current) revealObserver.observe(lekkiContainerRef.current);

    return () => revealObserver.disconnect();
  }, []);

  // Run decelerating mechanical tick loop once metrics are in view
  useEffect(() => {
    if (!metricsVisible) return;

    let start: number | null = null;
    const duration = 1400; // 1.4s mechanical settle

    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // Decelerating mechanical ease (Power3.out equivalent: 1 - Math.pow(1 - progress, 3))
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounterFuel(Math.round(ease * SHARED_METRICS.dieselSavings.averageLitersMonthly));
      setCounterUptime(Number((ease * SHARED_METRICS.uptime.percentage).toFixed(2)));
      setCounterHomes(Math.round(ease * SHARED_METRICS.homesAndIndustries.count));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Guarantee exact audited numbers
        setCounterFuel(SHARED_METRICS.dieselSavings.averageLitersMonthly);
        setCounterUptime(SHARED_METRICS.uptime.percentage);
        setCounterHomes(SHARED_METRICS.homesAndIndustries.count);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [metricsVisible]);

  // Mini Load Sizer state in Home View
  const [selectedHomeAppliances, setSelectedHomeAppliances] = useState<{ [key: string]: boolean }>({
    ac: true,
    freezer: true,
    starlink: true,
    pump: false,
    tv: false,
    lights: false
  });

  const toggleHomeAppliance = (key: string) => {
    setSelectedHomeAppliances((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetSizer = () => {
    setSelectedHomeAppliances({
      ac: false,
      freezer: false,
      starlink: false,
      pump: false,
      tv: false,
      lights: false
    });
  };

  // Quick Sizer Calculation
  const selectedCount = Object.values(selectedHomeAppliances).filter(Boolean).length;
  let quickPeakWatts = 200;
  let quickKwh = 2.0;

  if (selectedHomeAppliances.ac) { quickPeakWatts += 1350; quickKwh += 7.2; }
  if (selectedHomeAppliances.freezer) { quickPeakWatts += 450; quickKwh += 3.6; }
  if (selectedHomeAppliances.pump) { quickPeakWatts += 1100; quickKwh += 1.5; }
  if (selectedHomeAppliances.starlink) { quickPeakWatts += 120; quickKwh += 1.8; }
  if (selectedHomeAppliances.tv) { quickPeakWatts += 280; quickKwh += 2.0; }
  if (selectedHomeAppliances.lights) { quickPeakWatts += 180; quickKwh += 1.2; }

  let recPackage = 'Small flat & apartment (3.5kVA)';
  let recSummary = 'Best fit for 2-3 bedroom flats. Runs your refrigerator, TV, laptop workstations, fans, and home Wi-Fi reliably.';
  if (quickPeakWatts > 2200 || quickKwh > 11) {
    recPackage = 'Duplex family comfort (10kVA)';
    recSummary = 'Runs 2-3 inverter ACs overnight, your deep freezer, Starlink internet, TV, and water pump without straining.';
  } else if (quickPeakWatts > 1100 || quickKwh > 5) {
    recPackage = 'Home comfort (5.0kVA)';
    recSummary = 'Runs 1 inverter AC in the master bedroom, refrigerator, home office, large TV, and lighting when the grid cuts out.';
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* SECTION 1: INSET ROUNDED CINEMATIC HERO STAGE (QuickFleet architecture) */}
      <div className="w-full px-2.5 sm:px-4 lg:px-6 pt-2 sm:pt-3">
        <section 
          id="hero-container"
          className="relative w-full rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-[#0A0A0D] h-[min(calc(100svh-96px),880px)] min-h-[580px] sm:min-h-[640px] flex flex-col justify-center shadow-xl shadow-black/8 select-none"
        >
          {/* 40-Frame Interactive Canvas / H.264 Video Engine */}
          <HeroCanvas />

          {/* Hero Copy Overlay positioned on the left with QuickFleet layout */}
          <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-16 py-12 flex flex-col justify-center h-full pointer-events-none">
            <div className="max-w-[700px]">
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-['Outfit'] font-bold text-white tracking-[-0.028em] leading-[1.04]">
                <span 
                  id="hero-synced-line-1"
                  className="block hero-state-hidden text-white"
                >
                  Say goodbye to blackouts.
                </span>
                <span 
                  id="hero-synced-line-2" 
                  className="block text-[#ff8e4d] mt-1 hero-state-hidden"
                >
                  Quiet solar power for your home.
                </span>
              </h1>

              {/* Sub-paragraph narrative */}
              <p 
                id="hero-synced-p"
                className="mt-5 text-base sm:text-lg lg:text-[18px] text-white/90 font-['Plus_Jakarta_Sans'] font-normal leading-relaxed max-w-[500px] hero-state-hidden"
              >
                Keep your air conditioners, refrigerator, and Wi-Fi running through power cuts without generator noise or petrol queues.
              </p>

              {/* Focused Call-to-Action Pill Buttons */}
              <div 
                id="hero-synced-cta" 
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 hero-state-hidden pointer-events-auto"
              >
                {/* Primary Button: Solid White Pill with Dark Ink Text */}
                <button
                  onClick={() => {
                    const el = document.getElementById('home-sizer-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 h-[52px] sm:h-[56px] px-6 sm:px-7 rounded-full bg-white hover:bg-[#F3EFE8] text-[#0C0730] font-['Plus_Jakarta_Sans'] font-semibold text-[15px] sm:text-base transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-black/20 cursor-pointer group"
                >
                  <span>Calculate what size you need</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>

                {/* Ghost Button: Frosted Glass Pill with White Border */}
                <button
                  onClick={() => onOpenQuote()}
                  className="inline-flex items-center gap-2.5 h-[52px] sm:h-[56px] px-6 sm:px-7 rounded-full bg-white/18 hover:bg-white/28 text-white font-['Plus_Jakarta_Sans'] font-semibold text-[15px] sm:text-base border border-white/80 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
                >
                  <span>Request a quote</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* QuickFleet Corner Annotations */}
          <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-6 sm:left-12 lg:left-16 z-10 text-xs sm:text-[13px] text-white/70 font-medium pointer-events-none">
            Field depots open in Lagos · Abuja · Port Harcourt · Ibadan
          </div>
        </section>
      </div>

      {/* SECTION 2: AUDITED PROOF METRICS ROW */}
      <section 
        ref={metricsSectionRef} 
        className="w-full bg-white py-12 lg:py-14 border-b transition-colors duration-500"
        style={{
          borderColor: telemetry.scrollDirection === 'up' ? 'rgba(222, 223, 229, 0.4)' : '#dedfe5'
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Hairline Rule scale-x sweep on viewport entrance */}
          <div 
            className="h-[2px] bg-gradient-to-r from-primary via-primary-container to-transparent hairline-sweep mb-10"
            style={{
              transform: metricsVisible ? 'scaleX(1)' : 'scaleX(0)',
              opacity: telemetry.scrollDirection === 'up' ? 0.2 : 0.6,
              transition: 'transform 850ms var(--ease-draw), opacity 400ms ease'
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            <div className="flex flex-col md:pr-10 scroll-reveal-init delay-100">
              <span className="font-label-caps text-xs sm:text-sm text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Fuel expenses saved
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-[#1a1c1c] font-bold tracking-tight mb-1 tabular-nums">
                ₦{counterFuel > 0 ? counterFuel : SHARED_METRICS.dieselSavings.averageLitersMonthly}M<span className="text-primary">+</span>
              </div>
              <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                Actual petrol and diesel expenses saved by households across Lagos, Abuja, Port Harcourt, and Ibadan.
              </p>
            </div>

            <div className="flex flex-col md:px-10 md:border-l md:border-[#dedfe5] scroll-reveal-init delay-200">
              <span className="font-label-caps text-xs sm:text-sm text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Continuous power uptime
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-primary font-bold tracking-tight mb-1 tabular-nums">
                {counterUptime > 0 ? counterUptime.toFixed(2) : SHARED_METRICS.uptime.percentage.toFixed(2)}<span className="text-[#1a1c1c]">%</span>
              </div>
              <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                {SHARED_METRICS.uptime.description}
              </p>
            </div>

            <div className="flex flex-col md:pl-10 md:border-l md:border-[#dedfe5] scroll-reveal-init delay-300">
              <span className="font-label-caps text-xs sm:text-sm text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Homes & facilities installed
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-[#1a1c1c] font-bold tracking-tight mb-1 tabular-nums">
                {counterHomes > 0 ? counterHomes.toLocaleString() : SHARED_METRICS.homesAndIndustries.count}<span className="text-primary">{SHARED_METRICS.homesAndIndustries.suffix}</span>
              </div>
              <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed font-medium">
                {SHARED_METRICS.homesAndIndustries.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE LOAD SIZER PREVIEW */}
      <section id="home-sizer-section" className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
              Load sizing tool
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Find out what size solar system your home needs.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-2">
              Select what you run daily. We calculate your continuous running load and the extra surge capacity needed when motors kick on.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('calculator')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container cursor-pointer"
          >
            <span>Open full load calculator →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Interactive Appliance Toggles */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#dedfe5] shadow-sm flex flex-col justify-between scroll-reveal-init delay-100">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-label-ui text-sm text-[#1a1c1c] uppercase tracking-wider font-bold">
                  Common Nigerian household appliances
                </span>
                <span className="font-label-caps text-xs text-[#5c5e63] font-semibold">
                  <span className="text-primary font-bold">{selectedCount}</span> Selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1.5HP AC */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('ac')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.ac
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.ac ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <FlashIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        1.5HP Inverter AC
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">Cools bedroom through the night</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.ac
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>

                {/* Chest Deep Freezer */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('freezer')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.freezer
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.freezer ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <Shield01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        Chest deep freezer
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">Keeps food frozen all day</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.freezer
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>

                {/* Borehole Water Pump */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('pump')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.pump
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.pump ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <FlashIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        Borehole water pump
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">1.0 HP pump for overhead tank</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.pump
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>

                {/* Starlink & WiFi */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('starlink')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.starlink
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.starlink ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <FlashIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        Starlink and Wi-Fi
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">Stays connected during power cuts</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.starlink
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>

                {/* 65" Smart TV */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('tv')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.tv
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.tv ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <Sun01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        Smart TV & sound system
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">Living room entertainment</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.tv
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>

                {/* Lights & Security */}
                <button
                  type="button"
                  onClick={() => toggleHomeAppliance('lights')}
                  className={`flex items-center justify-between p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    selectedHomeAppliances.lights
                      ? 'bg-[#ffdbcf]/60 border-primary shadow-sm'
                      : 'bg-[#f3f4f3] border-transparent hover:bg-[#eeeeed]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selectedHomeAppliances.lights ? 'bg-white text-primary' : 'bg-[#e2e2e2] text-[#1a1c1c]'
                      }`}
                    >
                      <Shield01Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c]">
                        Security lights and CCTV
                      </div>
                      <div className="text-xs sm:text-sm text-[#5c4037]">Dusk to dawn perimeter</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.lights
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <CheckmarkCircle02Icon className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#dedfe5] flex items-center justify-between">
              <span className="text-xs text-[#5c4037]">
                Click appliances to see how load and surge change.
              </span>
              <button
                type="button"
                onClick={resetSizer}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Reset selections
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Live Recommended Match Card */}
          <div className="lg:col-span-5 bg-[#12161a] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between border border-neutral-800 relative overflow-hidden scroll-reveal-init delay-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-xs sm:text-sm text-[#ff8e4d] uppercase tracking-wider font-bold">
                  Recommended system match
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-label-caps text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5400]"></span>
                  Live recommendation
                </span>
              </div>

              <div>
                <span className="text-sm text-neutral-400">Package size</span>
                <div className="font-headline-xl text-2xl sm:text-3xl text-white font-bold mt-1">
                  {recPackage}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">
                    Normal running load
                  </span>
                  <div className="font-headline-sm text-xl text-[#ff8e4d] font-bold mt-0.5 tabular-nums">
                    {quickPeakWatts.toLocaleString()} W
                  </div>
                </div>
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-xs text-neutral-400 uppercase font-bold tracking-wider">
                    Battery storage
                  </span>
                  <div className="font-headline-sm text-xl text-white font-bold mt-0.5 tabular-nums">
                    {quickKwh.toFixed(1)} kWh
                  </div>
                </div>
              </div>

              {/* Physical Ammeter Meter Dial / Bar */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-label-caps text-neutral-300">
                  <span className="flex items-center gap-1.5 text-[#ff8e4d] font-semibold">
                    <DashboardSpeed01Icon className="w-4 h-4" />
                    Inverter load buffer
                  </span>
                  <span className="font-mono text-white font-bold">
                    {Math.min(100, Math.round((quickPeakWatts / 4500) * 100))}% of safe capacity
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-sm overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-xs bg-gradient-to-r from-emerald-500 via-[#ff8e4d] to-primary transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.round((quickPeakWatts / 4500) * 100)))}%`,
                      transitionTimingFunction: 'var(--ease-meter)'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>0W</span>
                  <span>1.5kW (Flat)</span>
                  <span>3.0kW (Duplex)</span>
                  <span>4.5kW+ (Estate)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {recSummary}
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={() => onSelectTab('pricing')}
                className="w-full inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-container px-6 py-3.5 font-label-ui text-sm sm:text-base text-white font-semibold shadow-lg transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>See pricing for this setup</span>
                <ArrowRight01Icon className="ml-2 w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
                <span>Backed by 10-year hardware warranty</span>
                <span>Tested against high motor surges</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FLAGSHIP SOLAR PACKAGES TEASER */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-24 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
              Tested equipment
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Solar packages for different home sizes.
            </h2>
            <p className="font-body-md text-base text-[#5c4037] mt-2 leading-relaxed">
              Complete packages with monocrystalline solar panels, safe lithium batteries,
              copper cabling, and professional on-site installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Package 1: Flat */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 scroll-reveal-init delay-100">
              <div>
                <LazyImage
                  src={IMAGES.compactApartment}
                  alt="Small flat solar inverter and battery installation"
                  className="w-full h-52 rounded-2xl mb-5"
                />
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Small flat & apartment
                  </h3>
                  <span className="text-xs font-semibold text-[#5c5e63]">3.5kVA</span>
                </div>
                <p className="font-body-sm text-sm sm:text-base text-[#5c4037] mb-5 font-medium leading-relaxed">
                  Runs your refrigerator, TV, laptops, fans, and home Wi-Fi cleanly.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-[#1a1c1c]">
                    ₦4,250,000
                  </div>
                  <span className="text-xs sm:text-sm text-[#5c5e63] font-medium">
                    Includes 6 solar panels, 5.12 kWh lithium battery & installation
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Small flat setup (3.5kVA)')}
                className="w-full py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold transition-colors mt-4 cursor-pointer"
              >
                Choose small flat setup
              </button>
            </div>

            {/* Package 2: Duplex (Flagship Most Popular) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-primary shadow-2xl relative md:-translate-y-2.5 z-20 transition-all duration-300 hover:-translate-y-3.5 scroll-reveal-init delay-200">
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-md bg-primary text-white font-label-caps text-xs uppercase font-bold tracking-wider shadow-xs">
                MOST POPULAR IN NIGERIA
              </div>
              <div>
                <LazyImage
                  src={IMAGES.modernDuplexExterior}
                  alt="Duplex family solar installation"
                  className="w-full h-52 rounded-2xl mb-5"
                />
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Duplex family comfort
                  </h3>
                  <span className="text-xs font-bold text-primary">10kVA dual</span>
                </div>
                <p className="font-body-sm text-sm sm:text-base text-[#5c4037] mb-5 font-medium leading-relaxed">
                  Runs 2-3 ACs overnight, chest deep freezer, and borehole pump without noise.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-primary">
                    ₦8,850,000
                  </div>
                  <span className="text-xs sm:text-sm text-[#5c5e63] font-medium">
                    Includes 12 panels, 10.24 kWh lithium storage & circuit breakers
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Duplex family comfort (10kVA)')}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold shadow-md transition-colors mt-4 cursor-pointer"
              >
                Order duplex setup
              </button>
            </div>

            {/* Package 3: Mansion & Commercial */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 scroll-reveal-init delay-300">
              <div>
                <LazyImage
                  src={IMAGES.commercialFacility}
                  alt="Commercial & industrial solar facility"
                  className="w-full h-52 rounded-2xl mb-5"
                />
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Commercial & industrial facility
                  </h3>
                  <span className="text-xs font-semibold text-[#5c5e63]">25kVA 3-phase</span>
                </div>
                <p className="font-body-sm text-sm sm:text-base text-[#5c4037] mb-5 font-medium leading-relaxed">
                  Runs entire 3-phase facilities: passenger elevators, medical labs, central air conditioning, and machinery.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-[#1a1c1c]">
                    ₦24,500,000
                  </div>
                  <span className="text-xs sm:text-sm text-[#5c5e63] font-medium">
                    Includes 36 panels, 40.96 kWh server-rack lithium bank & certified engineering sign-off
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Commercial facility (25kVA)')}
                className="w-full py-3.5 rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm sm:text-base font-semibold transition-colors mt-4 cursor-pointer"
              >
                Request commercial audit
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onSelectTab('packages')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-primary hover:underline cursor-pointer py-2"
            >
              <span>View all hardware specs and portable Nomad kit →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUNGRID NOMAD SPOTLIGHT (Renters / Balcony) */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm p-6 sm:p-10 lg:p-12 border border-[#dedfe5] scroll-reveal-init">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="font-label-caps text-[11px] sm:text-xs text-primary uppercase tracking-widest font-bold mb-2">
                For renters • No roof installation needed
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight mb-4 font-bold">
                SunGrid Nomad: <br />
                portable power you can take when you move.
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] mb-6 leading-relaxed font-medium">
                If you rent an apartment or move often, you do not need roof mounting or landlord approval. This desktop unit includes standard wall sockets, a clear digital battery readout, and a built-in carry handle. It powers refrigerators, laptops, and televisions straight out of the box. Recharges from any standard wall socket in 84 minutes, or plugs directly into portable balcony solar panels.
              </p>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#dedfe5] mb-6">
                <div>
                  <div className="font-headline-sm text-xl sm:text-2xl text-primary font-bold">2,400W</div>
                  <span className="text-xs sm:text-sm text-[#5c5e63]">Continuous output</span>
                </div>
                <div>
                  <div className="font-headline-sm text-xl sm:text-2xl text-[#1a1c1c] font-bold">2,048Wh</div>
                  <span className="text-xs sm:text-sm text-[#5c5e63]">Lithium capacity</span>
                </div>
                <div>
                  <div className="font-headline-sm text-xl sm:text-2xl text-[#1a1c1c] font-bold">84 Mins</div>
                  <span className="text-xs sm:text-sm text-[#5c5e63]">Fast wall recharge</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuote('SunGrid Nomad power station (2.4kW)')}
                  className="inline-flex items-center justify-center rounded-xl bg-[#12161a] hover:bg-black px-7 py-3 font-label-ui text-sm sm:text-base text-white font-semibold transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>Order the Nomad 2400</span>
                  <ArrowRight01Icon className="ml-2 w-4 h-4" />
                </button>
                <span className="font-body-sm text-sm sm:text-base text-[#1a1c1c] font-semibold">
                  ₦1,850,000 • In stock (next-day delivery in Lagos and Abuja)
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#f3f4f3] shadow-inner">
                <LazyImage
                  src={IMAGES.nomadStation}
                  alt="SunGrid Nomad portable power station"
                  className="w-full h-full"
                />
                <div className="absolute bottom-4 right-4 backdrop-blur-md bg-white/90 px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 border border-white/60 z-10">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-label-caps text-xs text-[#1a1c1c] font-bold">
                    10-year battery life
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE 4 SIMPLE GUARANTEES */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="mb-10">
            <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
              Our commitments
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Four things we put in writing for every job.
            </h2>
            <p className="font-body-md text-base text-[#5c4037] mt-1 leading-relaxed">
              Clear standards for the equipment we use, how we wire your house, and what happens if something goes wrong.
            </p>
          </div>

          {/* Plain Stacked List */}
          <div className="divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5]">
            {/* 01 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <span className="font-headline-sm text-xl text-primary font-bold tabular-nums">01</span>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-[#1a1c1c] font-bold">
                    Fresh Grade-A lithium cells only
                  </h3>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] max-w-3xl mt-1 leading-relaxed font-medium">
                    Every battery pack arrives factory-sealed with fresh lithium iron phosphate cells rated for 6,000 cycles (roughly 10 to 15 years of daily use). We never install refurbished cells or old electric vehicle batteries.
                  </p>
                </div>
              </div>
              <Shield01Icon className="w-6 h-6 text-primary shrink-0 hidden md:block" />
            </div>

            {/* 02 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <span className="font-headline-sm text-xl text-primary font-bold tabular-nums">02</span>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-[#1a1c1c] font-bold">
                    Dedicated earthing and surge suppression
                  </h3>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] max-w-3xl mt-1 leading-relaxed font-medium">
                    We install dedicated copper earthing rods and separate DC and AC surge suppressors on your distribution board. When lightning strikes nearby or the national grid surges, excess current discharges safely into the ground instead of damaging your appliances.
                  </p>
                </div>
              </div>
              <Shield01Icon className="w-6 h-6 text-primary shrink-0 hidden md:block" />
            </div>

            {/* 03 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <span className="font-headline-sm text-xl text-primary font-bold tabular-nums">03</span>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-[#1a1c1c] font-bold">
                    Full-time electrical crews, no casual labor
                  </h3>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] max-w-3xl mt-1 leading-relaxed font-medium">
                    Your installation is handled by SunGrid's full-time electricians, not temporary day laborers. Cabling is routed through neat surface conduits, roof brackets are sealed against rain leaks, and our crew measures earth resistance before handing over the system.
                  </p>
                </div>
              </div>
              <Award01Icon className="w-6 h-6 text-primary shrink-0 hidden md:block" />
            </div>

            {/* 04 */}
            <div className="py-7 pl-6 pr-4 border-l-4 border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-5">
                <span className="font-headline-sm text-xl text-primary font-bold tabular-nums">04</span>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-[#1a1c1c] font-bold">
                    24-hour equipment replacement
                  </h3>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] max-w-3xl mt-1 leading-relaxed font-medium">
                    If an inverter or battery develops an internal fault during the warranty, our local depot brings a working replacement straight to your premises within 24 hours. We do not leave you without power while a unit sits in a workshop.
                  </p>
                </div>
              </div>
              <FlashIcon className="w-6 h-6 text-primary shrink-0 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: RECENT VERIFIED FIELD INSTALLATIONS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Completed installations
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Homes and businesses running without generator noise.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-1">Real installations across Nigerian cities.</p>
          </div>
          <span className="font-label-ui text-sm text-primary font-semibold">
            Over 150 installations completed
          </span>
        </div>

        <div className="space-y-8">
          {/* Featured Case 1: Lekki Phase 1 Duplex */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm grid grid-cols-1 lg:grid-cols-12 scroll-reveal-init delay-100">
            <div 
              ref={lekkiContainerRef}
              className="lg:col-span-8 h-80 sm:h-96 lg:h-[440px] overflow-hidden relative bg-neutral-900"
            >
              <LazyImage
                src={IMAGES.lekkiVillaDusk}
                alt="Lekki Phase 1 duplex with solar installation"
                placeholderColor="bg-neutral-900"
                className="w-full h-full object-cover transition-transform duration-1000 will-change-transform"
                style={{
                  transform: lekkiInView ? 'scale(1.0)' : 'scale(1.07)',
                  transitionTimingFunction: 'var(--ease-settle)'
                }}
              />
              <div className="absolute top-4 left-4 bg-neutral-950/80 text-white backdrop-blur-md px-3 py-1.5 rounded-md font-label-caps text-xs uppercase tracking-wider z-10 font-bold">
                Lekki Phase 1, Lagos • Residential installation
              </div>
            </div>
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-label-caps text-[#5c5e63] text-xs sm:text-sm uppercase tracking-wider font-bold">
                  Lekki Phase 1, Lagos
                </span>
                <div className="flex items-baseline justify-between mt-1 mb-3">
                  <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-[#1a1c1c]">
                    5-bedroom duplex
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-primary">10.0 kVA</span>
                </div>
                <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed mb-6">
                  Runs 3 inverter ACs overnight, deep freezer, and overhead water pump. The family stopped
                  operating their diesel generator completely, saving weekly fuel trips and eliminating generator noise.
                </p>
              </div>
              <div className="pt-4 border-t border-[#dedfe5] flex items-center justify-between">
                <span className="text-xs sm:text-sm text-[#5c5e63] font-semibold uppercase tracking-wider font-label-caps">
                  Verified diesel savings
                </span>
                <span className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                  ₦180,000+ / mo
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Two Smaller Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm flex flex-col scroll-reveal-init delay-100">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <LazyImage
                  src={IMAGES.maitamaAbuja}
                  alt="Maitama Abuja solar townhouse"
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 bg-neutral-950/80 text-white backdrop-blur-md px-2.5 py-1 rounded-md font-label-caps text-xs uppercase z-10 font-bold">
                  Maitama, Abuja
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-[#5c5e63] text-xs sm:text-sm uppercase tracking-wider font-bold">
                    Executive family townhouse
                  </span>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                      Amina Bello
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-primary">10.0 kVA dual</span>
                  </div>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed mb-4">
                    “I host video conferences for work throughout the week. When the Abuja grid collapsed
                    twice last month, our Starlink connection and air conditioners didn't flicker once. We haven't
                    had to run our generator in two years.”
                  </p>
                </div>
                <div className="pt-3 border-t border-[#dedfe5] flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#5c5e63] font-semibold uppercase font-label-caps">
                    Reliability record
                  </span>
                  <span className="text-xs sm:text-sm text-[#1a1c1c] font-bold">2 years without blackouts</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm flex flex-col scroll-reveal-init delay-200">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <LazyImage
                  src={IMAGES.medicalClinicVI}
                  alt="Victoria Island medical diagnostic center"
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 bg-neutral-950/80 text-white backdrop-blur-md px-2.5 py-1 rounded-md font-label-caps text-xs uppercase z-10 font-bold">
                  Victoria Island, Lagos
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-[#5c5e63] text-xs sm:text-sm uppercase tracking-wider font-bold">
                    Medical diagnostics center
                  </span>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1a1c1c]">
                      Apex Diagnostics Lab
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-primary">20.0 kVA 3-phase</span>
                  </div>
                  <p className="font-body-sm text-sm sm:text-base text-[#5c4037] leading-relaxed mb-4">
                    “Refrigerated reagents and blood analyzers spoil quickly if temperatures drift or power
                    cuts out mid-test. SunGrid balanced all three phases across the building so our machines run
                    uninterrupted around the clock.”
                  </p>
                </div>
                <div className="pt-3 border-t border-[#dedfe5] flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#5c5e63] font-semibold uppercase font-label-caps">
                    Equipment uptime
                  </span>
                  <span className="text-xs sm:text-sm text-[#1a1c1c] font-bold">Zero power downtime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Closing Moment anchored directly to the verified installation photography */}
          <div className="pt-10 border-t border-[#dedfe5] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-wider font-bold block mb-1">
                Next steps
              </span>
              <h3 className="font-headline-xl text-2xl sm:text-3xl text-[#1a1c1c] tracking-tight font-bold mb-2">
                A quiet home starts with an honest load audit.
              </h3>
              <p className="font-body-md text-sm sm:text-base text-[#5c4037] leading-relaxed">
                Let our engineers measure your electrical load this week. We inspect your distribution board,
                roof layout, and motor surge requirements in Lagos, Abuja, Port Harcourt, and Ibadan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-container px-7 py-3.5 font-label-ui text-sm sm:text-base text-white font-semibold shadow-md transition-all group cursor-pointer active:scale-[0.98]"
              >
                <span>Book your free site audit</span>
                <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:08007864743"
                className="inline-flex items-center justify-center rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] px-6 py-3.5 font-label-ui text-sm text-[#1a1c1c] font-semibold transition-colors cursor-pointer"
              >
                <span>Call 0800 786 4743</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
