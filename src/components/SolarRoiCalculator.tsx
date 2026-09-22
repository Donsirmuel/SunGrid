import React, { useState } from 'react';
import { 
  Zap, 
  Fuel, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Coins, 
  Clock, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SOLAR_PACKAGES } from '../data/packages';

interface SolarRoiCalculatorProps {
  onSelectPackage?: (packageName: string) => void;
}

export const SolarRoiCalculator: React.FC<SolarRoiCalculatorProps> = ({ onSelectPackage }) => {
  // Simple, intuitive user inputs
  const [monthlyFuelSpend, setMonthlyFuelSpend] = useState<number>(350000); // ₦350,000 / mo typical generator budget
  const [monthlyDisCoBill, setMonthlyDisCoBill] = useState<number>(85000); // ₦85,000 / mo DisCo/Band-A bill
  const [selectedPackageId, setSelectedPackageId] = useState<string>('duplex-executive'); // 10kVA Duplex

  const selectedPkg = SOLAR_PACKAGES.find((p) => p.id === selectedPackageId) || SOLAR_PACKAGES[1];

  // Calculations
  const currentTotalMonthlyCost = monthlyFuelSpend + monthlyDisCoBill;
  const currentAnnualCost = currentTotalMonthlyCost * 12;

  // Turnkey investment cost
  const systemInvestmentCost = selectedPkg.priceNgn;

  // With SunGrid, fuel generator drops to ₦0 (100% replacement). 
  // DisCo bill drops by ~85% (residual trickle connection during extreme monsoon)
  const remainingMonthlyBill = Math.round(monthlyDisCoBill * 0.15);
  const monthlySavings = currentTotalMonthlyCost - remainingMonthlyBill;
  const annualSavings = monthlySavings * 12;

  // Break-even calculation in months & years
  const paybackMonths = Math.max(1, Math.round(systemInvestmentCost / monthlySavings));
  const paybackYears = (paybackMonths / 12).toFixed(1);

  // Cumulative 5-year and 10-year wealth preserved
  // Factoring standard 10% annual fuel inflation in Nigeria
  const fiveYearFuelCost = Math.round(currentAnnualCost * 5 * 1.15);
  const fiveYearSolarCost = systemInvestmentCost + remainingMonthlyBill * 60;
  const fiveYearNetSavings = Math.max(0, fiveYearFuelCost - fiveYearSolarCost);

  const tenYearFuelCost = Math.round(currentAnnualCost * 10 * 1.25);
  const tenYearSolarCost = systemInvestmentCost + remainingMonthlyBill * 120 + 450000; // includes 10th-yr minor service
  const tenYearNetSavings = Math.max(0, tenYearFuelCost - tenYearSolarCost);

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#dedfe5] shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#dedfe5]">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdbcf] text-primary text-xs font-bold uppercase tracking-wider mb-2 font-label-caps">
            <Coins className="w-3.5 h-3.5" />
            Simple Financial Clarity
          </div>
          <h3 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1c1c] tracking-tight">
            Solar ROI & Lifetime Savings Calculator
          </h3>
          <p className="font-body-md text-sm text-[#5c4037] mt-2 leading-relaxed">
            Stop pouring hard-earned money into generator fuel tanks and unstable grid tariffs. See exactly when your SunGrid installation pays for itself and how many millions you keep in your pocket.
          </p>
        </div>

        {/* Selected Package Selector Pill */}
        <div className="flex flex-col items-start lg:items-end">
          <label className="text-xs font-semibold text-[#5c5e63] mb-1.5 uppercase font-label-caps">
            Target Turnkey Setup
          </label>
          <div className="flex items-center gap-1.5 p-1 bg-[#eeeeed] rounded-2xl flex-wrap">
            {SOLAR_PACKAGES.filter((p) => p.category !== 'portable').map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedPackageId === pkg.id
                    ? 'bg-white text-primary shadow-xs font-bold'
                    : 'text-[#5c5e63] hover:text-[#1a1c1c]'
                }`}
              >
                {pkg.name.replace(' & Family Home', '').replace('Large ', '')}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-primary font-bold mt-1.5">
            Turnkey Price: ₦{selectedPkg.priceNgn.toLocaleString('en-NG')}
          </span>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 items-start">
        {/* LEFT COLUMN: 2 Straightforward Sliders */}
        <div className="lg:col-span-6 space-y-6">
          <h4 className="font-headline-sm text-lg font-bold text-[#1a1c1c] flex items-center gap-2">
            <Fuel className="w-5 h-5 text-primary" />
            1. Your Current Monthly Energy Expenses
          </h4>

          {/* Generator Spend Slider */}
          <div className="p-5 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5]">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#1a1c1c]">
                Monthly Generator Fuel (Petrol/Diesel) + Oil Servicing:
              </label>
              <span className="font-headline-md text-xl sm:text-2xl font-bold text-primary tabular-nums">
                ₦{monthlyFuelSpend.toLocaleString('en-NG')}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={1500000}
              step={25000}
              value={monthlyFuelSpend}
              onChange={(e) => setMonthlyFuelSpend(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-[#5c5e63] font-semibold mt-2">
              <span>₦50k (Small Gen)</span>
              <span>₦500k (Duplex)</span>
              <span>₦1.5M (Mansion/Commercial)</span>
            </div>
          </div>

          {/* Grid/DisCo Spend Slider */}
          <div className="p-5 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5]">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#1a1c1c]">
                Monthly DisCo / NEPA Bill (Band A / Prepaid Meter):
              </label>
              <span className="font-headline-md text-xl sm:text-2xl font-bold text-[#1a1c1c] tabular-nums">
                ₦{monthlyDisCoBill.toLocaleString('en-NG')}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={600000}
              step={10000}
              value={monthlyDisCoBill}
              onChange={(e) => setMonthlyDisCoBill(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-[#12161a]"
            />
            <div className="flex justify-between text-[10px] text-[#5c5e63] font-semibold mt-2">
              <span>₦10k</span>
              <span>₦200k</span>
              <span>₦600k</span>
            </div>
          </div>

          {/* Current Spending Summary Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-900">Total Money Burned Each Year Right Now:</p>
              <p className="text-[11px] text-rose-700 mt-0.5">
                Without solar, this money is gone forever with 0 asset equity.
              </p>
            </div>
            <div className="text-right">
              <span className="font-metric-counter text-xl sm:text-2xl font-bold text-rose-600 block">
                ₦{currentAnnualCost.toLocaleString('en-NG')}
              </span>
              <span className="text-[10px] text-rose-700 font-semibold font-mono">
                / year sunk expense
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Clean ROI Verdict */}
        <div className="lg:col-span-6 bg-[#f3f4f3] rounded-3xl p-6 sm:p-8 border border-[#dedfe5] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#dedfe5] mb-5">
              <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                2. Your Guaranteed Solar Payback
              </h4>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Zero Generator Noise
              </span>
            </div>

            {/* Core Outcome: Payback Period & Monthly Cash Surplus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Box 1: Break-even Time */}
              <div className="bg-white rounded-2xl p-5 border border-[#dedfe5] shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#5c5e63] font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Full System Payback Time
                </div>
                <div className="font-metric-counter text-3xl font-bold text-primary">
                  {paybackYears} <span className="text-lg font-normal text-[#1a1c1c]">Years</span>
                </div>
                <p className="text-xs text-[#5c4037] mt-1 font-medium">
                  After ~{paybackMonths} months, your entire system has completely paid for itself!
                </p>
              </div>

              {/* Box 2: Monthly Cash Kept */}
              <div className="bg-white rounded-2xl p-5 border border-[#dedfe5] shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#5c5e63] font-semibold mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Monthly Cash Kept In Pocket
                </div>
                <div className="font-metric-counter text-3xl font-bold text-emerald-700">
                  +₦{monthlySavings.toLocaleString('en-NG')}
                </div>
                <p className="text-xs text-[#5c4037] mt-1 font-medium">
                  Direct monthly savings you redirect to school fees, food or business.
                </p>
              </div>
            </div>

            {/* Multi-Year Retained Wealth */}
            <div className="space-y-3 mb-6">
              <div className="bg-white rounded-2xl p-4 border border-[#dedfe5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1a1c1c] block">5-Year Retained Wealth</span>
                  <span className="text-[11px] text-[#5c4037]">Money saved after deducting initial solar installation</span>
                </div>
                <span className="font-metric-counter text-xl font-bold text-primary">
                  ₦{fiveYearNetSavings.toLocaleString('en-NG')}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#dedfe5] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#1a1c1c] block">10-Year Cumulative Savings</span>
                  <span className="text-[11px] text-[#5c4037]">Solar panels guaranteed for 25 years of free sun</span>
                </div>
                <span className="font-metric-counter text-xl font-bold text-emerald-700">
                  ₦{tenYearNetSavings.toLocaleString('en-NG')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-[#dedfe5]">
            <button
              onClick={() => onSelectPackage ? onSelectPackage(selectedPkg.name) : null}
              className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lock In This Turnkey System ({selectedPkg.name})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
