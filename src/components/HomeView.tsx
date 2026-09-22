import React, { useState, useEffect, useRef } from 'react';
import { NavTab } from '../types';
import { HeroCanvas } from './HeroCanvas';
import { IMAGES } from '../data/assets';
import { SOLAR_PACKAGES } from '../data/packages';
import { useScrollTelemetry } from '../hooks/useScrollTelemetry';
import { 
  Sun, 
  ArrowRight, 
  ShieldCheck, 
  BatteryCharging, 
  Zap, 
  VolumeX, 
  Activity, 
  Calendar, 
  Check, 
  ChevronRight,
  TrendingDown,
  Sparkles,
  Award,
  Gauge
} from 'lucide-react';

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

  // Precision Mechanical Scroll Reveal Observer with higher threshold (0.25) and dynamic child stagger
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-reveal-init')
    );

    // Group child elements sharing the same container to apply rhythmic mechanical stagger
    const containerGroups = new Map<HTMLElement, HTMLElement[]>();
    revealElements.forEach((el) => {
      const parent = el.parentElement || document.body;
      if (!containerGroups.has(parent)) {
        containerGroups.set(parent, []);
      }
      containerGroups.get(parent)!.push(el);
    });

    // Assign sequential mechanical stagger delays (e.g. 0ms, 120ms, 240ms, 360ms)
    containerGroups.forEach((children) => {
      children.forEach((child, idx) => {
        child.style.transitionDelay = `${idx * 110}ms`;
      });
    });

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
      { threshold: 0.25, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
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

      setCounterFuel(Math.round(ease * 950));
      setCounterUptime(Number((ease * 99.98).toFixed(2)));
      setCounterHomes(Math.round(ease * 2840));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Guarantee exact audited numbers
        setCounterFuel(950);
        setCounterUptime(99.98);
        setCounterHomes(2840);
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

  let recPackage = 'Small Flat & Apartment (3.5kVA)';
  let recSummary = 'Perfect fit for 2-3 bedroom flats. Runs your refrigerator, TV, laptop workstations, fans, and home WiFi smoothly.';
  if (quickPeakWatts > 2200 || quickKwh > 11) {
    recPackage = 'Duplex & Family Home (10kVA)';
    recSummary = 'Runs 2–3 inverter ACs overnight, your deep freezer, Starlink internet, TV, and water pump with absolute peace of mind.';
  } else if (quickPeakWatts > 1100 || quickKwh > 5) {
    recPackage = 'Home Comfort (5.0kVA)';
    recSummary = 'Easily powers 1 inverter AC in the master bedroom, refrigerator, home office, large TV, and whole-house lighting without interruption.';
  }

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8]">
      {/* SECTION 1: CINEMATIC FULL-BLEED HERO STAGE */}
      <section 
        id="hero-container"
        className="relative w-full min-h-[760px] lg:min-h-[860px] h-[92vh] max-h-[960px] overflow-hidden bg-neutral-950 flex flex-col justify-center"
      >
        {/* 40-Frame Interactive Canvas Engine */}
        <HeroCanvas />

        {/* Hero Copy Overlay positioned in open dusk sky negative space */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 lg:px-16 pt-24 pb-20 text-left pointer-events-none">
          {/* Main Headline with Outfit & -0.03em tracking */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-['Outfit'] font-bold tracking-[-0.03em] text-white leading-[1.08]">
            <span 
              id="hero-synced-line-1"
              className="block drop-shadow-md hero-state-hidden"
            >
              Say goodbye to blackouts.
            </span>
            <span 
              id="hero-synced-line-2" 
              className="block text-white mt-1 drop-shadow-md hero-state-hidden"
            >
              Power your home silently, day &amp; night.
            </span>
          </h1>

          {/* Sub-paragraph narrative with Plus Jakarta Sans at 500 weight and subtle blur transitions */}
          <p 
            id="hero-synced-p"
            className="mt-6 text-sm sm:text-base text-neutral-300 font-['Plus_Jakarta_Sans'] font-medium leading-relaxed max-w-xl hero-state-hidden"
          >
            No smoky generators, no midnight diesel runs, and zero flickering lights when NEPA trips. Just clean, steady solar keeping your ACs, freezers, and internet on 24/7.
          </p>

          {/* Single Focused Call-to-Action Pill matching reference */}
          <div 
            id="hero-synced-cta" 
            className="mt-8 flex items-center gap-4 hero-state-hidden"
          >
            <button
              onClick={() => {
                const el = document.getElementById('home-sizer-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#b93800] hover:bg-[#a03000] text-white font-['Plus_Jakarta_Sans'] font-medium rounded-full text-sm sm:text-[15px] transition-all shadow-lg shadow-[#b93800]/30 cursor-pointer active:scale-95 pointer-events-auto border border-orange-500/20"
            >
              <span>Check Your Home Sizing</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans'] font-medium text-sm backdrop-blur-sm border border-white/15 transition-all cursor-pointer pointer-events-auto active:scale-95"
            >
              <span>Get a Free Quote</span>
            </button>
          </div>
        </div>
      </section>

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
              <span className="font-label-caps text-[11px] text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Fuel Money Saved
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-[#1a1c1c] font-bold tracking-tight mb-1 tabular-nums">
                ₦{counterFuel > 0 ? counterFuel : 950}M<span className="text-primary">+</span>
              </div>
              <p className="font-body-sm text-[13px] text-[#5c4037]/90 leading-relaxed font-medium">
                Real diesel and petrol expenses kept in the pockets of families across Lagos, Abuja, Port Harcourt, and Ibadan.
              </p>
            </div>

            <div className="flex flex-col md:px-10 md:border-l md:border-[#dedfe5] scroll-reveal-init delay-200">
              <span className="font-label-caps text-[11px] text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Verified Grid Uptime
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-primary font-bold tracking-tight mb-1 tabular-nums">
                {counterUptime > 0 ? counterUptime.toFixed(2) : '99.98'}<span className="text-[#1a1c1c]">%</span>
              </div>
              <p className="font-body-sm text-[13px] text-[#5c4037]/90 leading-relaxed font-medium">
                Sub-4ms automatic transfer. Inverter AC compressors, gaming PCs, and Starlink dishes don't reboot.
              </p>
            </div>

            <div className="flex flex-col md:pl-10 md:border-l md:border-[#dedfe5] scroll-reveal-init delay-300">
              <span className="font-label-caps text-[11px] text-[#5c5e63] uppercase tracking-widest mb-1.5 font-bold">
                Homes & Facilities Powered
              </span>
              <div className="font-metric-counter text-4xl lg:text-5xl text-[#1a1c1c] font-bold tracking-tight mb-1 tabular-nums">
                {counterHomes > 0 ? counterHomes.toLocaleString() : '2,840'}<span className="text-primary">+</span>
              </div>
              <p className="font-body-sm text-[13px] text-[#5c4037]/90 leading-relaxed font-medium">
                From residential flats in Victoria Island to multi-story duplexes in Maitama and diagnostic clinics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE LOAD SIZER PREVIEW */}
      <section id="home-sizer-section" className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Precision Engineering Sizer
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Find the Exact Solar Size for Your Home.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-2">
              Select your daily appliances below to calculate continuous load and surge buffer margins.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('calculator')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-container cursor-pointer"
          >
            <span>Open Advanced Deep Sizer →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Interactive Appliance Toggles */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#dedfe5] shadow-sm flex flex-col justify-between scroll-reveal-init delay-100">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-label-ui text-sm text-[#1a1c1c] uppercase tracking-wider font-bold">
                  Common Nigerian Domestic Appliances
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
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        1.5HP Inverter AC
                      </div>
                      <div className="text-xs text-[#5c4037]">Cool bedroom through the night</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.ac
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
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
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        Chest Deep Freezer
                      </div>
                      <div className="text-xs text-[#5c4037]">Keeps food frozen 24/7</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.freezer
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
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
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        Borehole Water Pump
                      </div>
                      <div className="text-xs text-[#5c4037]">1.0HP overhead tank pump</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.pump
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
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
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        Starlink & Home WiFi
                      </div>
                      <div className="text-xs text-[#5c4037]">Zero reboot on grid cut</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.starlink
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
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
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        Smart OLED/QLED TV
                      </div>
                      <div className="text-xs text-[#5c4037]">Soundbar & entertainment</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.tv
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
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
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-label-ui text-sm font-semibold text-[#1a1c1c]">
                        CCTV & Floodlights
                      </div>
                      <div className="text-xs text-[#5c4037]">Dusk to dawn perimeter</div>
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      selectedHomeAppliances.lights
                        ? 'bg-primary text-white font-bold'
                        : 'bg-[#dadad9] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#dedfe5] flex items-center justify-between">
              <span className="text-xs text-[#5c4037]">
                Click appliances to simulate load surge dynamics.
              </span>
              <button
                type="button"
                onClick={resetSizer}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Reset Sizer
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Live Recommended Match Card */}
          <div className="lg:col-span-5 bg-[#12161a] text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between border border-neutral-800 relative overflow-hidden scroll-reveal-init delay-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-[11px] text-[#ff8e4d] uppercase tracking-wider font-bold">
                  Recommended System Match
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-label-caps text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5400] animate-pulse"></span>
                  Instant Sizing
                </span>
              </div>

              <div>
                <span className="text-xs text-neutral-400">Package Recommendation</span>
                <div className="font-headline-xl text-2xl sm:text-3xl text-white font-bold mt-1">
                  {recPackage}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                    Peak Running Load
                  </span>
                  <div className="font-headline-sm text-xl text-[#ff8e4d] font-bold mt-0.5 tabular-nums">
                    {quickPeakWatts.toLocaleString()} W
                  </div>
                </div>
                <div className="bg-white/10 p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                    Battery Storage
                  </span>
                  <div className="font-headline-sm text-xl text-white font-bold mt-0.5 tabular-nums">
                    {quickKwh.toFixed(1)} kWh
                  </div>
                </div>
              </div>

              {/* Physical Ammeter Meter Dial / Bar */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-label-caps text-neutral-300">
                  <span className="flex items-center gap-1.5 text-[#ff8e4d] font-semibold">
                    <Gauge className="w-3.5 h-3.5" />
                    Ammeter Inrush Meter
                  </span>
                  <span className="font-mono text-white font-bold">
                    {Math.min(100, Math.round((quickPeakWatts / 4500) * 100))}% Safe Inverter Buffer
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#ff8e4d] to-primary transition-all duration-700"
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.round((quickPeakWatts / 4500) * 100)))}%`,
                      transitionTimingFunction: 'var(--ease-meter)'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-neutral-500">
                  <span>0W</span>
                  <span>1.5kW (Apartment)</span>
                  <span>3.0kW (Duplex)</span>
                  <span>4.5kW+ (Estate)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {recSummary}
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                onClick={() => onSelectTab('pricing')}
                className="w-full inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-container px-6 py-3.5 font-label-ui text-sm text-white font-semibold shadow-lg transition-all cursor-pointer"
              >
                <span>View Transparent Pricing for This Setup</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
                <span>Backed by 10-Yr Hardware Warranty</span>
                <span>Zero-tripping SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FLAGSHIP SOLAR PACKAGES TEASER */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-24 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Engineered Hardware
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Simple Solar Packages for Every Home.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-2">
              Complete turnkey packages with Tier-1 monocrystalline panels, safe lithium batteries,
              certified cabling, and guaranteed installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Package 1: Flat */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 scroll-reveal-init delay-100">
              <div>
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 bg-neutral-200">
                  <img
                    src={IMAGES.compactApartment}
                    alt="Small Flat Solar Inverter and Battery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Small Flat & Apartment
                  </h3>
                  <span className="text-xs font-semibold text-[#5c5e63]">3.5kVA</span>
                </div>
                <p className="font-body-sm text-[13px] text-[#5c4037] mb-5 font-medium">
                  Runs your refrigerator, TVs, workstations, fans, and home WiFi cleanly.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-[#1a1c1c]">
                    ₦4,250,000
                  </div>
                  <span className="text-xs text-[#5c5e63]">
                    Includes 6 panels, 5.12 kWh battery & neat installation
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Small Flat (3.5kVA)')}
                className="w-full py-3 rounded-full bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm font-semibold transition-colors mt-4 cursor-pointer"
              >
                Choose Small Flat Setup
              </button>
            </div>

            {/* Package 2: Duplex (Flagship Most Popular) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-primary shadow-2xl relative md:-translate-y-2.5 z-20 transition-all duration-300 hover:-translate-y-3.5 scroll-reveal-init delay-200">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white font-label-caps text-[10px] uppercase font-bold tracking-wider shadow-sm">
                MOST POPULAR IN NIGERIA
              </div>
              <div>
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 bg-neutral-200">
                  <img
                    src={IMAGES.modernDuplexExterior}
                    alt="Duplex Family Solar Installation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Duplex & Family Home
                  </h3>
                  <span className="text-xs font-bold text-primary">10kVA Dual</span>
                </div>
                <p className="font-body-sm text-[13px] text-[#5c4037] mb-5 font-medium">
                  Runs 2-3 ACs overnight, chest deep freezer, and water pump effortlessly.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-primary">
                    ₦8,850,000
                  </div>
                  <span className="text-xs text-[#5c5e63]">
                    Includes 14 panels, 15.36 kWh lithium storage & breakers
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Duplex Family Home (10kVA)')}
                className="w-full py-3 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-sm font-semibold shadow-md transition-colors mt-4 cursor-pointer"
              >
                Order Duplex Setup
              </button>
            </div>

            {/* Package 3: Mansion & Commercial */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#dedfe5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 scroll-reveal-init delay-300">
              <div>
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 bg-neutral-200">
                  <img
                    src={IMAGES.industrialRackRoom}
                    alt="Commercial Solar Microgrid"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    Large Mansion & Clinic
                  </h3>
                  <span className="text-xs font-semibold text-[#5c5e63]">25kVA 3-Phase</span>
                </div>
                <p className="font-body-sm text-[13px] text-[#5c4037] mb-5">
                  Heavy-duty commercial grade power for large estates, diagnostic labs, and offices.
                </p>
                <div className="mb-4">
                  <div className="font-metric-counter text-3xl font-bold text-[#1a1c1c]">
                    ₦19,400,000
                  </div>
                  <span className="text-xs text-[#5c5e63]">
                    Includes 32 panels, 30.72 kWh rack & industrial rack cabinet
                  </span>
                </div>
              </div>
              <button
                onClick={() => onOpenQuote('Large Mansion (25kVA)')}
                className="w-full py-3 rounded-full bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-sm font-semibold transition-colors mt-4 cursor-pointer"
              >
                Request Commercial Audit
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onSelectTab('packages')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              <span>View Full Turnkey Hardware Specs & Portable Nomad Kit →</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: SUNGRID NOMAD SPOTLIGHT (Renters / Balcony) */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-20">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm p-6 sm:p-10 lg:p-12 border border-[#dedfe5] scroll-reveal-init">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold mb-2">
                Renter Friendly • Zero Roof Mounting
              </span>
              <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight mb-4 font-bold">
                SunGrid Nomad: <br />
                Plug & Play Power Anywhere.
              </h2>
              <p className="font-body-md text-[#5c4037] mb-6 leading-relaxed font-medium">
                Living in a rented apartment or moving often? Zero roof mounting required. Powers
                refrigerators, workstations, and TVs right away. Charge from wall AC in 84 minutes or
                portable panels on your balcony.
              </p>

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#dedfe5] mb-6">
                <div>
                  <div className="font-headline-sm text-xl text-primary font-bold">2,400W</div>
                  <span className="text-xs text-[#5c5e63]">Output Power</span>
                </div>
                <div>
                  <div className="font-headline-sm text-xl text-[#1a1c1c] font-bold">2,048Wh</div>
                  <span className="text-xs text-[#5c5e63]">Lithium Capacity</span>
                </div>
                <div>
                  <div className="font-headline-sm text-xl text-[#1a1c1c] font-bold">84 Mins</div>
                  <span className="text-xs text-[#5c5e63]">Fast Wall Recharge</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuote('SunGrid Nomad Station (2.4kW)')}
                  className="inline-flex items-center justify-center rounded-full bg-[#12161a] hover:bg-black px-7 py-3 font-label-ui text-sm text-white font-semibold transition-all cursor-pointer"
                >
                  <span>Order Nomad 2400</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <span className="font-body-sm text-sm text-[#1a1c1c] font-semibold">
                  ₦1,850,000 • In Stock (Delivered Next-Day in Lagos & Abuja)
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden bg-[#f3f4f3] shadow-inner">
                <img
                  src={IMAGES.nomadStation}
                  alt="SunGrid Nomad Portable Power Station"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 backdrop-blur-md bg-white/90 px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 border border-white/60">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="font-label-caps text-xs text-[#1a1c1c] font-bold">
                    10-Year Built-to-Last Battery
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
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Contractual Integrity
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              Our 4 Simple Guarantees.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-1">
              Honest engineering and service guarantees backing every SunGrid installation.
            </p>
          </div>

          <div className="space-y-3.5">
            {/* 01 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dedfe5] shadow-xs scroll-reveal-init delay-100">
              <div className="flex items-start gap-4">
                <span className="font-headline-sm text-2xl text-primary font-bold">01</span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#1a1c1c] font-bold">
                    Brand-New Premium Batteries Only
                  </h3>
                  <p className="font-body-sm text-[13px] text-[#5c4037] max-w-2xl mt-0.5 leading-relaxed font-medium">
                    100% factory-sealed Grade-A lithium cells engineered to last 10+ years without rapid degradation.
                    Zero recycled lead-acid packs disguised as lithium storage.
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-7 h-7 text-primary shrink-0 self-end md:self-center" />
            </div>

            {/* 02 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dedfe5] shadow-xs scroll-reveal-init delay-200">
              <div className="flex items-start gap-4">
                <span className="font-headline-sm text-2xl text-primary font-bold">02</span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#1a1c1c] font-bold">
                    Proper House Wiring & Surge Safety
                  </h3>
                  <p className="font-body-sm text-[13px] text-[#5c4037] max-w-2xl mt-0.5 leading-relaxed font-medium">
                    Neat trunking and certified DC/AC surge arrestors safeguard expensive air conditioners,
                    Apple studio displays, and compressor coils from grid voltage spikes.
                  </p>
                </div>
              </div>
              <ShieldCheck className="w-7 h-7 text-primary shrink-0 self-end md:self-center" />
            </div>

            {/* 03 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dedfe5] shadow-xs scroll-reveal-init delay-300">
              <div className="flex items-start gap-4">
                <span className="font-headline-sm text-2xl text-primary font-bold">03</span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#1a1c1c] font-bold">
                    Certified In-House Technicians
                  </h3>
                  <p className="font-body-sm text-[13px] text-[#5c4037] max-w-2xl mt-0.5 leading-relaxed font-medium">
                    Respectful, licensed electrical engineers handle your home and roofing. Zero hanging roadside
                    wires, zero messy roof punctures, and zero unauthorized sub-contractors.
                  </p>
                </div>
              </div>
              <Award className="w-7 h-7 text-primary shrink-0 self-end md:self-center" />
            </div>

            {/* 04 */}
            <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dedfe5] shadow-xs scroll-reveal-init delay-400">
              <div className="flex items-start gap-4">
                <span className="font-headline-sm text-2xl text-primary font-bold">04</span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#1a1c1c] font-bold">
                    24-Hour Gate Swap Warranty
                  </h3>
                  <p className="font-body-sm text-[13px] text-[#5c4037] max-w-2xl mt-0.5 leading-relaxed font-medium">
                    If an inverter or lithium module flags an internal hardware fault, our regional depot van brings
                    a fully operational replacement straight to your gate within 24 hours.
                  </p>
                </div>
              </div>
              <Zap className="w-7 h-7 text-primary shrink-0 self-end md:self-center" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: RECENT VERIFIED FIELD INSTALLATIONS */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Field Commissioning Records
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] tracking-tight font-bold mt-1">
              See How Others Are Living Generator-Free.
            </h2>
            <p className="font-body-md text-[#5c4037] mt-1">Real installations across Nigerian cities.</p>
          </div>
          <span className="font-label-ui text-sm text-primary font-semibold">
            Over 2,800 active installations
          </span>
        </div>

        <div className="space-y-8">
          {/* Featured Case 1: Lekki Phase 1 Duplex */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm grid grid-cols-1 lg:grid-cols-12 scroll-reveal-init delay-100">
            <div 
              ref={lekkiContainerRef}
              className="lg:col-span-8 h-80 sm:h-96 lg:h-[440px] overflow-hidden relative bg-neutral-900"
            >
              <img
                src={IMAGES.lekkiVillaDusk}
                alt="Luxury Lekki Phase 1 Villa with Solar Microgrid"
                className="w-full h-full object-cover transition-transform duration-1000 will-change-transform"
                style={{
                  transform: lekkiInView ? 'scale(1.0)' : 'scale(1.07)',
                  transitionTimingFunction: 'var(--ease-settle)'
                }}
              />
              <div className="absolute top-4 left-4 bg-neutral-950/80 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full font-label-caps text-[10px] uppercase tracking-wider">
                Lekki Phase 1, Lagos • Flagship Residential
              </div>
            </div>
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-label-caps text-[#5c5e63] text-xs uppercase tracking-wider font-bold">
                  Lekki Phase 1, Lagos
                </span>
                <div className="flex items-baseline justify-between mt-1 mb-3">
                  <h3 className="font-headline-md text-xl font-bold text-[#1a1c1c]">
                    5-Bedroom Duplex
                  </h3>
                  <span className="text-xs font-bold text-primary">10.0 kVA</span>
                </div>
                <p className="font-body-md text-sm text-[#5c4037] leading-relaxed mb-6">
                  Runs 3 inverter ACs overnight, deep freezer, and overhead water pump. The family stopped
                  operating their diesel generator completely, eliminating noise and weekly fuel refueling runs.
                </p>
              </div>
              <div className="pt-4 border-t border-[#dedfe5] flex items-center justify-between">
                <span className="text-xs text-[#5c5e63] font-medium uppercase tracking-wider font-label-caps">
                  Verified Diesel Savings
                </span>
                <span className="font-headline-sm text-lg text-primary font-bold">
                  ₦180,000+ / mo
                </span>
              </div>
            </div>
          </div>

          {/* Grid of Two Smaller Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm flex flex-col scroll-reveal-init delay-100">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img
                  src={IMAGES.maitamaAbuja}
                  alt="Maitama Abuja solar townhouse"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-neutral-950/80 text-white backdrop-blur-md px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">
                  Maitama, Abuja
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-[#5c5e63] text-xs uppercase tracking-wider font-bold">
                    Executive Family Townhouse
                  </span>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1a1c1c]">
                      Amina Bello, MNI
                    </h3>
                    <span className="text-xs font-bold text-primary">10.0 kVA Dual</span>
                  </div>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-4">
                    “Zero generator noise. Home workstations, Starlink, and high-definition video conferencing
                    remain completely uninterrupted through national grid collapse.”
                  </p>
                </div>
                <div className="pt-3 border-t border-[#dedfe5] flex items-center justify-between">
                  <span className="text-[11px] text-[#5c5e63] font-medium uppercase font-label-caps">
                    System Reliability
                  </span>
                  <span className="text-xs text-[#1a1c1c] font-bold">2 Years Blackout-Free</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm flex flex-col scroll-reveal-init delay-200">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img
                  src={IMAGES.medicalClinicVI}
                  alt="Victoria Island medical diagnostic center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-neutral-950/80 text-white backdrop-blur-md px-3 py-1 rounded-full font-label-caps text-[10px] uppercase">
                  Victoria Island, Lagos
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-[#5c5e63] text-xs uppercase tracking-wider font-bold">
                    Medical Diagnostics Center
                  </span>
                  <div className="flex items-baseline justify-between mt-1 mb-2">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1a1c1c]">
                      Apex Diagnostics Lab
                    </h3>
                    <span className="text-xs font-bold text-primary">20.0 kVA 3-Phase</span>
                  </div>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-4">
                    Critical blood pathology analyzers, cold-chain vaccines, and diagnostics machines secured around
                    the clock with 0ms uninterrupted switchover.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#dedfe5] flex items-center justify-between">
                  <span className="text-[11px] text-[#5c5e63] font-medium uppercase font-label-caps">
                    Lab Equipment Uptime
                  </span>
                  <span className="text-xs text-[#1a1c1c] font-bold">100% Zero Downtime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL BOTTOM BANNER */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#12161a] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="font-label-caps text-[11px] text-[#ff8e4d] uppercase tracking-wider font-bold block mb-2">
              End The Generator Headache
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4 font-bold">
              A quieter, cooler home begins with one honest audit.
            </h2>
            <p className="font-body-lg text-sm sm:text-base text-neutral-300 mb-8 leading-relaxed">
              Invite SunGrid engineers to measure your load this week. We inspect your breaker distribution board,
              roof azimuth, and surge demands across Lagos, Abuja, Port Harcourt, and Ibadan.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary-container px-8 py-3.5 font-label-ui text-sm text-white font-semibold shadow-xl transition-all group cursor-pointer"
              >
                <span>Book Your Free Site Audit</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:08007864743"
                className="inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3.5 font-label-ui text-sm text-white transition-colors cursor-pointer"
              >
                <span>Call 0800-SUNGRID</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
