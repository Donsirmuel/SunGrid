import React, { useState } from 'react';
import { NavTab } from '../types';
import { APPLIANCE_CATALOG } from '../data/appliances';
import { 
  FlashIcon, 
  Refresh01Icon, 
  ArrowRight01Icon, 
  WhatsappIcon,
  Shield01Icon,
  Calendar01Icon
} from 'hugeicons-react';

interface CalculatorViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: (packageName?: string) => void;
}

interface ItemState {
  enabled: boolean;
  qty: number;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onSelectTab,
  onOpenQuote
}) => {
  const [pulseCount, setPulseCount] = useState(0);

  // Initialize appliances state with default quantities from catalog
  const [applianceState, setApplianceState] = useState<{ [id: string]: ItemState }>(() => {
    const init: { [id: string]: ItemState } = {};
    APPLIANCE_CATALOG.forEach((item) => {
      init[item.id] = {
        enabled: item.defaultQty > 0,
        qty: item.defaultQty > 0 ? item.defaultQty : 1
      };
    });
    return init;
  });

  const toggleAppliance = (id: string) => {
    setPulseCount((c) => c + 1);
    setApplianceState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: !prev[id].enabled
      }
    }));
  };

  const updateQty = (id: string, delta: number) => {
    setPulseCount((c) => c + 1);
    setApplianceState((prev) => {
      const current = prev[id];
      const newQty = Math.max(1, Math.min(10, current.qty + delta));
      return {
        ...prev,
        [id]: {
          ...current,
          qty: newQty,
          enabled: true // auto enable when incrementing
        }
      };
    });
  };

  const resetAll = () => {
    setPulseCount((c) => c + 1);
    const init: { [id: string]: ItemState } = {};
    APPLIANCE_CATALOG.forEach((item) => {
      // sensible defaults as in Screen 2
      const isDefaultActive = ['ac15', 'fans', 'freezer', 'fridge', 'microwave', 'pump', 'tv', 'starlink', 'laptops', 'security'].includes(item.id);
      init[item.id] = {
        enabled: isDefaultActive,
        qty: item.defaultQty > 0 ? item.defaultQty : 1
      };
    });
    setApplianceState(init);
  };

  // Math Calculations
  let totalWatts = 0;
  let totalSurge = 0;
  let activeACs = 0;

  APPLIANCE_CATALOG.forEach((item) => {
    const st = applianceState[item.id];
    if (st && st.enabled && st.qty > 0) {
      totalWatts += item.nominalWatts * st.qty;
      totalSurge += item.surgeWatts * st.qty;
      if (item.id.startsWith('ac')) {
        activeACs += st.qty;
      }
    }
  });

  // Factor in 15% baseline conversion / LED ceiling overhead
  const continuousKw = Math.max(0.8, (totalWatts * 1.15) / 1000);
  const surgeKva = Math.max(2.5, (totalSurge * 1.1) / 1000);
  const loadPercentage = Math.min(100, Math.round((continuousKw / 15) * 100));

  // Determine system tier
  let tierName = '';
  let tierSpecs = '';
  let runtimeText = '';
  let fuelSaved = '';
  let priceRange = '';

  if (continuousKw <= 3.8 && surgeKva <= 7.5) {
    tierName = 'Essential Flat & Urban Kit (5kVA)';
    tierSpecs = '5kVA Smart Inverter • 5.12kWh LiFePO4 • 6x 550W Tier-1 Panels';
    runtimeText = 'Designed for apartments & 2-3 bedroom setups. Runs 1 Inverter AC, refrigerator, WiFi, and entertainment continuously with 8–10hr night autonomy.';
    fuelSaved = '₦140,000 – ₦190,000';
    priceRange = '₦3.4M – ₦4.25M';
  } else if (continuousKw <= 7.5 && surgeKva <= 14.0) {
    tierName = 'Executive Duplex Package (10kVA)';
    tierSpecs = '10kVA Pure Sine Inverter • 15.36kWh Lithium Bank • 12x 580W Tier-1 Panels';
    runtimeText = `Runs ${activeACs > 0 ? activeACs + ' ACs' : 'multiple ACs'} with deep freezer, borehole pump, and Starlink. Starts water pumps without lights dimming or electronics tripping.`;
    fuelSaved = '₦260,000 – ₦340,000';
    priceRange = '₦6.8M – ₦8.85M';
  } else {
    tierName = 'Estate Villa & Tri-Phase Power (15kVA+)';
    tierSpecs = '15kVA+ Parallel Industrial Inverters • 25–30kWh Storage • 20x 580W Arrays';
    runtimeText = 'Full home autonomy. Runs entire property including 4+ ACs simultaneously, central water heaters, multi-door refrigeration, and gate automation.';
    fuelSaved = '₦450,000 – ₦650,000+';
    priceRange = '₦11.5M – ₦15.8M';
  }

  // Categories helper
  const coolingItems = APPLIANCE_CATALOG.filter((i) => i.category === 'cooling');
  const kitchenItems = APPLIANCE_CATALOG.filter((i) => i.category === 'kitchen');
  const waterItems = APPLIANCE_CATALOG.filter((i) => i.category === 'water');
  const workItems = APPLIANCE_CATALOG.filter((i) => i.category === 'work');

  const getWhatsAppLink = () => {
    const msg = `Hello SunGrid Energy, I configured my home load using your Smart Sizer:
- Peak Active Load: ${continuousKw.toFixed(1)} kW
- Surge Buffer Margin: ${surgeKva.toFixed(1)} kVA
- Recommended Setup: ${tierName}
- Estimated Fuel Offset: ${fuelSaved}/mo
Please send formal quote & schedule a site inspection.`;
    return `https://wa.me/2348007864743?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      <section className="w-full py-8 sm:py-12 px-4 sm:px-8 lg:px-14">
        <div className="max-w-[1280px] mx-auto">
          {/* Top Context Banner */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold block mb-1">
                Load Sizing Engine
              </span>
              <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-[#1a1c1c] font-bold tracking-tight">
                How much solar power does your home actually need?
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#5c4037]">
              <span>Calibrated for Nigerian home appliances and motor startup surges</span>
            </div>
          </div>

          {/* Main Sizer Card Container */}
          <div className="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(26,28,28,0.06)] border border-[#dedfe5] overflow-hidden">
            {/* Modal Top Bar */}
            <div className="p-5 sm:p-8 bg-[#f3f4f3] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#dedfe5]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#1a1c1c]">
                    SunGrid Smart Appliance Sizer
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-primary/30 text-primary font-label-caps text-xs font-bold uppercase tracking-wider">
                    INTERACTIVE
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#5c4037] max-w-2xl">
                  Select what you run daily and we calculate the exact solar and lithium capacity so your power never trips.
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#dedfe5] text-sm font-semibold text-[#1a1c1c] hover:bg-neutral-50 transition-colors cursor-pointer shadow-xs min-h-[44px] touch-manipulation"
                >
                  <Refresh01Icon className="w-4 h-4 text-primary" />
                  <span>Reset Sizer</span>
                </button>
              </div>
            </div>

            {/* 2-Column Split: Selectors Left, Live Telemetry Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* LEFT COLUMN: Appliance Selectors */}
              <div className="lg:col-span-7 p-5 sm:p-8 space-y-8 overflow-y-auto max-h-[900px] border-b lg:border-b-0 lg:border-r border-[#dedfe5]">
                {/* CATEGORY 1: Cooling & Fans */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c]">
                      Air Conditioners & Fans
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {coolingItems.map((item) => {
                      const st = applianceState[item.id] || { enabled: false, qty: 1 };
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                            st.enabled
                              ? 'bg-white border-primary/40 shadow-xs'
                              : 'bg-[#f9f9f8] border-transparent opacity-65'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              id={`chk-${item.id}`}
                              checked={st.enabled}
                              onChange={() => toggleAppliance(item.id)}
                              className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`chk-${item.id}`}
                                className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c] cursor-pointer block truncate"
                              >
                                {item.name}
                              </label>
                              <p className="text-sm text-[#5c4037]">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              disabled={!st.enabled || st.qty <= 1}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white disabled:opacity-40 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-headline-sm text-sm font-bold w-6 text-center text-[#1a1c1c]">
                              {st.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CATEGORY 2: Kitchen & Refrigeration */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c]">
                      Kitchen & Refrigeration
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {kitchenItems.map((item) => {
                      const st = applianceState[item.id] || { enabled: false, qty: 1 };
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                            st.enabled
                              ? 'bg-white border-primary/40 shadow-xs'
                              : 'bg-[#f9f9f8] border-transparent opacity-65'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              id={`chk-${item.id}`}
                              checked={st.enabled}
                              onChange={() => toggleAppliance(item.id)}
                              className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`chk-${item.id}`}
                                className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c] cursor-pointer block truncate"
                              >
                                {item.name}
                              </label>
                              <p className="text-sm text-[#5c4037]">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              disabled={!st.enabled || st.qty <= 1}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white disabled:opacity-40 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-headline-sm text-sm font-bold w-6 text-center text-[#1a1c1c]">
                              {st.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CATEGORY 3: Water Pumping & Heating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c]">
                      Water Pumping & Heating
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {waterItems.map((item) => {
                      const st = applianceState[item.id] || { enabled: false, qty: 1 };
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                            st.enabled
                              ? 'bg-white border-primary/40 shadow-xs'
                              : 'bg-[#f9f9f8] border-transparent opacity-65'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              id={`chk-${item.id}`}
                              checked={st.enabled}
                              onChange={() => toggleAppliance(item.id)}
                              className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`chk-${item.id}`}
                                className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c] cursor-pointer block truncate"
                              >
                                {item.name}
                              </label>
                              <p className="text-sm text-[#5c4037]">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              disabled={!st.enabled || st.qty <= 1}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white disabled:opacity-40 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-headline-sm text-sm font-bold w-6 text-center text-[#1a1c1c]">
                              {st.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CATEGORY 4: Work, Connectivity & Security */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c]">
                      Work, Connectivity & Security
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {workItems.map((item) => {
                      const st = applianceState[item.id] || { enabled: false, qty: 1 };
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 sm:p-4 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                            st.enabled
                              ? 'bg-white border-primary/40 shadow-xs'
                              : 'bg-[#f9f9f8] border-transparent opacity-65'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <input
                              type="checkbox"
                              id={`chk-${item.id}`}
                              checked={st.enabled}
                              onChange={() => toggleAppliance(item.id)}
                              className="w-5 h-5 rounded accent-primary cursor-pointer"
                            />
                            <div>
                              <label
                                htmlFor={`chk-${item.id}`}
                                className="font-label-ui text-sm sm:text-base font-semibold text-[#1a1c1c] cursor-pointer block truncate"
                              >
                                {item.name}
                              </label>
                              <p className="text-sm text-[#5c4037]">{item.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              disabled={!st.enabled || st.qty <= 1}
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white disabled:opacity-40 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-headline-sm text-sm font-bold w-6 text-center text-[#1a1c1c]">
                              {st.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-[#f3f4f3] text-[#1a1c1c] hover:bg-primary hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Live Telemetry & Instant Sizing Summary */}
              <div className="lg:col-span-5 bg-[#f3f4f3]/70 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Telemetry Badge Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-xs text-[#5c5e63] uppercase tracking-wider font-bold">
                      Live System Sizing
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-primary text-xs font-semibold shadow-xs border border-[#dedfe5]">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      Dynamic Sizing Engine
                    </span>
                  </div>

                  {/* Plain Labeled Stats: Switchover Time & THD */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#dedfe5] shadow-xs">
                    <div>
                      <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider block">
                        Switchover Time
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-metric-counter text-2xl font-bold text-[#1a1c1c] tabular-nums">
                          3.8ms
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-[#5c4037] block mt-0.5 font-medium">
                        No flicker • Laptops stay on
                      </span>
                    </div>

                    <div>
                      <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider block">
                        THD (Waveform Purity)
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="font-metric-counter text-2xl font-bold text-[#1a1c1c] tabular-nums">
                          &lt;1.6%
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-[#5c4037] block mt-0.5 font-medium">
                        Pure sine wave
                      </span>
                    </div>
                  </div>

                  {/* Continuous Load & Surge Physical Ammeter Meters */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#dedfe5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider">
                          Normal Running Load
                        </span>
                        <span className="text-xs font-mono text-neutral-500 font-semibold">
                          {loadPercentage}%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-metric-counter text-3xl sm:text-4xl text-[#1a1c1c] font-bold tabular-nums">
                          {continuousKw.toFixed(1)}
                        </span>
                        <span className="text-sm font-bold text-[#5c5e63]">kW</span>
                      </div>
                      {/* Calibrated Ammeter Needle Bar */}
                      <div className="w-full bg-neutral-100 rounded-sm h-2 overflow-hidden p-0.5 border border-[#dedfe5]">
                        <div
                          className="bg-gradient-to-r from-emerald-500 via-amber-500 to-primary h-full rounded-xs transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, Math.max(10, loadPercentage))}%`,
                            transitionTimingFunction: 'var(--ease-meter)'
                          }}
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-[#5c4037] leading-snug font-medium">
                        Total power needed while appliances are active
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#dedfe5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-xs text-[#5c5e63] uppercase font-bold tracking-wider">
                          Starting Surge (kVA)
                        </span>
                        <span className="text-xs font-mono text-primary font-bold">
                          Trip Protection
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-metric-counter text-3xl sm:text-4xl text-primary font-bold tabular-nums">
                          {surgeKva.toFixed(1)}
                        </span>
                        <span className="text-sm font-bold text-primary">kVA</span>
                      </div>
                      {/* Surge Buffer Bar */}
                      <div className="w-full bg-neutral-100 rounded-sm h-2 overflow-hidden p-0.5 border border-[#dedfe5]">
                        <div
                          className="bg-primary h-full rounded-xs transition-all duration-500"
                          style={{ 
                            width: `${Math.min(100, Math.max(15, (surgeKva / 25) * 100))}%`,
                            transitionTimingFunction: 'var(--ease-meter)'
                          }}
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-[#5c4037] leading-snug font-medium">
                        Extra kick required when AC or water pumps kick on
                      </p>
                    </div>
                  </div>

                  {/* Recommended System Match Card with Telemetry Ping */}
                  <div 
                    key={`rec-card-${pulseCount}`}
                    className="bg-[#12161a] text-white p-6 rounded-3xl space-y-4 relative overflow-hidden shadow-xl border border-neutral-800 telemetry-pulse-active transition-all"
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-1 rounded-md bg-primary text-white font-label-caps text-xs uppercase font-bold tracking-wider">
                        System Recommended
                      </span>
                      <span className="text-xs sm:text-sm text-neutral-300 flex items-center gap-1.5">
                        <FlashIcon className="w-3.5 h-3.5 text-primary" />
                        <span>Grade-A LiFePO4</span>
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h4 className="font-headline-lg text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {tierName}
                      </h4>
                      <p className="text-sm text-neutral-300 mt-1">{tierSpecs}</p>
                    </div>

                    {/* Runtime Capability Box */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 relative z-10 space-y-1">
                      <div className="flex items-center gap-1.5 text-[#ff8e4d] text-xs sm:text-sm font-semibold">
                        <Shield01Icon className="w-4 h-4" />
                        <span>Calculated Performance Profile</span>
                      </div>
                      <p className="text-sm text-neutral-200 leading-relaxed font-normal">
                        {runtimeText}
                      </p>
                    </div>

                    {/* Savings & Cost */}
                    <div className="relative z-10 pt-1 space-y-2 border-t border-neutral-800 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Estimated Monthly Generator Fuel Saved:</span>
                        <span className="font-semibold text-white">{fuelSaved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-400">Estimated Complete Package Price:</span>
                        <span className="font-bold text-base text-[#ff8e4d]">{priceRange}</span>
                      </div>
                    </div>

                    {/* Guarantee Seal Inside Card */}
                    <div className="relative z-10 pt-2 flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                      <Shield01Icon className="w-4 h-4 text-primary shrink-0" />
                      <span>Backed by SunGrid 10-Year Warranty & Local Depot Support</span>
                    </div>
                  </div>

                  {/* Quick System Performance Telemetry Mini-Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-white border border-[#dedfe5] shadow-xs">
                      <span className="font-label-caps text-[11px] text-[#5c5e63] block uppercase font-bold">
                        Switchover
                      </span>
                      <span className="font-headline-sm text-base font-bold text-[#1a1c1c]">&lt;4ms</span>
                      <span className="block text-xs text-[#5c4037] font-medium">Instant transfer</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#dedfe5] shadow-xs">
                      <span className="font-label-caps text-[11px] text-[#5c5e63] block uppercase font-bold">
                        Daily Yield
                      </span>
                      <span className="font-headline-sm text-base font-bold text-primary">28–35</span>
                      <span className="block text-xs text-[#5c4037] font-medium">kWh / Day</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-[#dedfe5] shadow-xs">
                      <span className="font-label-caps text-[11px] text-[#5c5e63] block uppercase font-bold">
                        Warranty
                      </span>
                      <span className="font-headline-sm text-base font-bold text-[#1a1c1c]">10 Yrs</span>
                      <span className="block text-xs text-[#5c4037] font-medium">6,000 cycles</span>
                    </div>
                  </div>
                </div>

                {/* CTAs at Bottom of Telemetry */}
                <div className="pt-6 space-y-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-all shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <WhatsappIcon className="w-5 h-5" />
                    <span>Send Sizing to Solar Engineer on WhatsApp</span>
                  </a>

                  <div className="flex items-center justify-between px-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuote(tierName)}
                      className="font-label-ui text-sm sm:text-base font-semibold text-[#5c4037] hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer py-2"
                    >
                      <span>Get Formal Line-Item PDF Quote</span>
                      <ArrowRight01Icon className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#5c5e63] font-medium">Takes ~45 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Engineer Advisory Callout */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#f3f4f3] border border-[#dedfe5] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-primary shrink-0 border border-[#dedfe5]">
                <Calendar01Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c]">
                  Unsure about heavy industrial workshop tools or central ducted ACs?
                </h4>
                <p className="text-xs sm:text-sm text-[#5c4037]">
                  Our certified NERC field engineers perform on-site data-logging audits in Lagos, Abuja, and Port Harcourt.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-50 text-[#1a1c1c] border border-[#dedfe5] text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              <span>Book an On-Site Audit</span>
              <Calendar01Icon className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Sizing Technical FAQ Section */}
          <div className="mt-16 space-y-8">
            <div className="max-w-2xl">
              <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold">
                Engineering Clarity
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c] mt-1">
                Frequently Addressed Sizing Questions
              </h2>
              <p className="text-sm sm:text-base text-[#5c4037] mt-1.5 leading-relaxed">
                How SunGrid handles Nigeria's unique residential spikes, pump inductive loads, and overcast wet-season months.
              </p>
            </div>

            {/* Simple Stacked List */}
            <div className="divide-y divide-[#dedfe5] border-t border-b border-[#dedfe5]">
              {/* FAQ 1 */}
              <div className="py-6 pl-6 pr-4 border-l-4 border-primary">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-2">
                  Why do borehole pumps trip regular inverters?
                </h3>
                <p className="text-sm sm:text-base text-[#5c4037] leading-relaxed max-w-3xl">
                  Pumps draw three to five times their normal running power for a fraction of a second when the motor starts up. Undersized inverters mistake that quick surge for a short circuit and trip offline. We select our inverters with high surge tolerance so your water pump kicks on without resetting your TV, computers, or air conditioners.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="py-6 pl-6 pr-4 border-l-4 border-primary">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-2">
                  What happens during heavy rainfall in July and August?
                </h3>
                <p className="text-sm sm:text-base text-[#5c4037] leading-relaxed max-w-3xl">
                  Panels still generate power under overcast skies, typically about 30% of their bright-sun output. We size our arrays around realistic rainy-season averages (under 4 peak sun hours a day) rather than dry-season peaks. Combined with overnight battery storage, your essential appliances keep running through multi-day rain.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="py-6 pl-6 pr-4 border-l-4 border-primary">
                <h3 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c] mb-2">
                  Can I add more battery storage or panels later?
                </h3>
                <p className="text-sm sm:text-base text-[#5c4037] leading-relaxed max-w-3xl">
                  Yes. You can start with a 10kVA setup and one battery pack today, then connect extra battery units or more rooftop panels down the road as your family grows. You don't have to replace your main inverter or rewire your home to expand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
