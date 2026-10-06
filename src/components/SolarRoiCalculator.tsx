import React, { useState } from 'react';
import { 
  ArrowRight01Icon, 
  Clock01Icon, 
  SparklesIcon
} from 'hugeicons-react';
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

  // Complete setup investment cost
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
    <div className="w-full bg-white rounded-3xl p-5 sm:p-10 lg:p-12 border border-[#dedfe5] shadow-lg">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-[#dedfe5]">
        <div className="max-w-xl">
          <span className="font-label-caps text-xs sm:text-sm text-primary uppercase tracking-widest font-bold block mb-2">
            Savings breakdown
          </span>
          <h3 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1c1c] tracking-tight">
            Solar return and payback calculator
          </h3>
          <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2 leading-relaxed">
            Compare what you currently spend on fuel and electricity against the one-off cost of a solar installation. See how quickly the system pays for itself.
          </p>
        </div>

        {/* Selected Package Selector Pill */}
        <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
          <label className="text-xs sm:text-sm font-semibold text-[#5c5e63] mb-1.5 uppercase font-label-caps">
            Choose a package
          </label>
          <div className="flex items-center gap-1.5 p-1.5 bg-[#eeeeed] rounded-2xl flex-wrap w-full sm:w-auto">
            {SOLAR_PACKAGES.filter((p) => p.category !== 'portable').map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer touch-manipulation flex-1 sm:flex-initial text-center ${
                  selectedPackageId === pkg.id
                    ? 'bg-white text-primary shadow-xs font-bold'
                    : 'text-[#5c5e63] hover:text-[#1a1c1c]'
                }`}
              >
                {pkg.name.replace(' & Family Home', '').replace('Large ', '')}
              </button>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-primary font-bold mt-2">
            Package price: ₦{selectedPkg.priceNgn.toLocaleString('en-NG')}
          </span>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 items-start">
        {/* LEFT COLUMN: 2 Straightforward Sliders */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <h4 className="font-headline-sm text-base sm:text-lg font-bold text-[#1a1c1c]">
            1. Your current monthly energy spending
          </h4>

          {/* Generator Spend Slider */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5]">
            <div className="flex justify-between items-baseline mb-2 gap-2">
              <label className="text-xs sm:text-sm font-bold text-[#1a1c1c]">
                Monthly petrol or diesel and generator servicing:
              </label>
              <span className="font-headline-md text-xl sm:text-2xl font-bold text-primary tabular-nums shrink-0">
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
              className="w-full h-3 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-primary my-2"
            />
            <div className="flex justify-between text-xs sm:text-sm text-[#5c5e63] font-semibold mt-1">
              <span>₦50k (Small generator)</span>
              <span>₦500k (Duplex)</span>
              <span>₦1.5M (Large house)</span>
            </div>
          </div>

          {/* Grid/DisCo Spend Slider */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5]">
            <div className="flex justify-between items-baseline mb-2 gap-2">
              <label className="text-xs sm:text-sm font-bold text-[#1a1c1c]">
                Monthly grid electricity bill:
              </label>
              <span className="font-headline-md text-xl sm:text-2xl font-bold text-[#1a1c1c] tabular-nums shrink-0">
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
              className="w-full h-3 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-[#12161a] my-2"
            />
            <div className="flex justify-between text-xs sm:text-sm text-[#5c5e63] font-semibold mt-1">
              <span>₦10k</span>
              <span>₦200k</span>
              <span>₦600k</span>
            </div>
          </div>

          {/* Current Spending Summary Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-rose-900">Total annual spending without solar:</p>
              <p className="text-xs sm:text-sm text-rose-700 mt-0.5">
                This is an ongoing operating expense that produces no asset ownership.
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="font-metric-counter text-xl sm:text-2xl font-bold text-rose-600 block tabular-nums">
                ₦{currentAnnualCost.toLocaleString('en-NG')}
              </span>
              <span className="text-xs text-rose-700 font-semibold font-mono">
                / year recurring expense
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Clean ROI Verdict */}
        <div className="lg:col-span-6 bg-[#f3f4f3] rounded-3xl p-5 sm:p-8 border border-[#dedfe5] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#dedfe5] mb-5">
              <h4 className="font-headline-sm text-base font-bold text-[#1a1c1c] flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-primary" />
                <span>2. Estimated payback timeline</span>
              </h4>
              <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                Quiet power
              </span>
            </div>

            {/* Core Outcome: Payback Period & Monthly Cash Surplus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 sm:mb-6">
              {/* Box 1: Break-even Time */}
              <div className="bg-white rounded-2xl p-5 border border-[#dedfe5] shadow-xs">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#5c5e63] font-semibold mb-1">
                  <Clock01Icon className="w-4 h-4 text-primary" />
                  <span>Estimated payback period</span>
                </div>
                <div className="font-metric-counter text-3xl font-bold text-primary">
                  {paybackYears} <span className="text-lg font-normal text-[#1a1c1c]">years</span>
                </div>
                <p className="text-sm text-[#5c4037] mt-1 font-medium leading-relaxed">
                  In about {paybackMonths} months, cumulative fuel and grid savings equal the full purchase price of the system.
                </p>
              </div>

              {/* Box 2: Monthly Cash Kept */}
              <div className="bg-white rounded-2xl p-5 border border-[#dedfe5] shadow-xs">
                <div className="text-xs sm:text-sm text-[#5c5e63] font-semibold mb-1">
                  Estimated monthly savings
                </div>
                <div className="font-metric-counter text-3xl font-bold text-emerald-700">
                  +₦{monthlySavings.toLocaleString('en-NG')}
                </div>
                <p className="text-sm text-[#5c4037] mt-1 font-medium leading-relaxed">
                  Money saved each month after accounting for small residual grid tariffs during cloudy weeks.
                </p>
              </div>
            </div>

            {/* Multi-Year Retained Wealth */}
            <div className="space-y-3 mb-5 sm:mb-6">
              <div className="bg-white rounded-2xl p-4 border border-[#dedfe5] flex items-center justify-between gap-3">
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#1a1c1c] block">5-year cumulative savings</span>
                  <span className="text-xs sm:text-sm text-[#5c4037]">Net savings after subtracting the initial installation cost</span>
                </div>
                <span className="font-metric-counter text-xl sm:text-2xl font-bold text-primary shrink-0 tabular-nums">
                  ₦{fiveYearNetSavings.toLocaleString('en-NG')}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#dedfe5] flex items-center justify-between gap-3">
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#1a1c1c] block">10-year cumulative savings</span>
                  <span className="text-xs sm:text-sm text-[#5c4037]">Net savings over 10 years of operation</span>
                </div>
                <span className="font-metric-counter text-xl sm:text-2xl font-bold text-emerald-700 shrink-0 tabular-nums">
                  ₦{tenYearNetSavings.toLocaleString('en-NG')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-[#dedfe5]">
            <button
              onClick={() => onSelectPackage ? onSelectPackage(selectedPkg.name) : null}
              className="w-full py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[48px] touch-manipulation active:scale-[0.98]"
            >
              <span>Request quote for this package ({selectedPkg.name})</span>
              <ArrowRight01Icon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
