import React, { useState } from 'react';
import { NavTab, RegionalHub } from '../types';
import { REGIONAL_HUBS } from '../data/depots';
import { IMAGES } from '../data/assets';
import { SHARED_METRICS } from '../config/metrics';
import { LazyImage } from './LazyImage';
import { 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Truck, 
  Building2, 
  Zap, 
  MessageSquare,
  Sparkles,
  Users,
  Box
} from 'lucide-react';

interface DepotsViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenQuote: () => void;
}

export const DepotsView: React.FC<DepotsViewProps> = ({ onSelectTab, onOpenQuote }) => {
  const [selectedHubId, setSelectedHubId] = useState<string>('lagos');

  const activeHub = REGIONAL_HUBS.find((h) => h.id === selectedHubId) || REGIONAL_HUBS[0];

  return (
    <div className="w-full flex flex-col bg-[#f9f9f8] min-h-screen">
      {/* SECTION: HERO HEADER */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-12 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="font-label-caps text-xs text-primary font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Field Infrastructure Across Nigeria</span>
          </div>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight font-bold mb-4">
            Four physical depots across Nigeria with spare parts on the shelf.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl leading-relaxed">
            Instead of ordering parts from abroad when a system faults, we keep replacement inverters
            and battery packs stocked in Lagos, Abuja, Port Harcourt, and Ibadan. If an issue occurs,
            our in-house technicians arrive with hardware ready to swap.
          </p>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-10">
            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">
                {SHARED_METRICS.geographicReach.formattedDepots}
              </span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                Regional Hubs
              </span>
              <span className="text-[11px] text-[#5c4037]">Lagos, Abuja, PH & Ibadan</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">
                {SHARED_METRICS.gateSwapSla.formatted}
              </span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                {SHARED_METRICS.gateSwapSla.label}
              </span>
              <span className="text-[11px] text-[#5c4037]">{SHARED_METRICS.gateSwapSla.subtext}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">
                {SHARED_METRICS.nercEngineers.formatted}
              </span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                {SHARED_METRICS.nercEngineers.label}
              </span>
              <span className="text-[11px] text-[#5c4037]">{SHARED_METRICS.nercEngineers.subtext}</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">
                {SHARED_METRICS.homesAndIndustries.formatted}
              </span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                {SHARED_METRICS.homesAndIndustries.shortLabel}
              </span>
              <span className="text-[11px] text-[#5c4037]">{SHARED_METRICS.homesAndIndustries.subtext}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE REGIONAL HUB SELECTOR & DETAILS */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 pb-16 w-full">
        {/* City Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {REGIONAL_HUBS.map((hub) => {
            const isSelected = hub.id === selectedHubId;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`px-5 py-2.5 rounded-xl font-label-ui text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-[#5c5e63] hover:text-[#1a1c1c] border border-[#dedfe5]'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-primary'}`} />
                <span>{hub.city} Depot</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Card */}
        <div 
          key={activeHub.id}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dedfe5] shadow-md mech-settle transition-all relative overflow-hidden"
        >
          {/* Subtle radar sweep line across top border */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Depot Info */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">
                    {activeHub.state} State Regional Operations
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Operational • Telemetry Live
                  </span>
                </div>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1a1c1c]">
                  {activeHub.name}
                </h2>
                <p className="font-body-md text-xs sm:text-sm text-[#5c4037] mt-1 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{activeHub.address}</span>
                </p>
              </div>

              {/* Coverage Areas */}
              <div className="p-4 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5]">
                <span className="font-label-caps text-[10px] text-[#5c5e63] uppercase font-bold tracking-wider block mb-2">
                  Immediate 2-Hour Dispatch Coverage
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeHub.coverage.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white text-[#1a1c1c] text-xs font-medium border border-[#dedfe5] shadow-2xs hover:border-primary/40 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real-time Inventory on Hand */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[10px] text-[#5c5e63] uppercase font-bold tracking-wider block">
                    Live Physical Stock on Hand (Hub Reserve)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                    VERIFIED TODAY 08:00 WAT
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3.5 rounded-xl bg-[#f3f4f3] text-center border border-[#dedfe5] hover:border-primary/30 transition-all">
                    <span className="font-metric-counter text-xl sm:text-2xl font-bold text-[#1a1c1c] block tabular-nums">
                      {activeHub.inventory.panels}
                    </span>
                    <span className="text-[10px] text-[#5c4037] font-medium">Tier-1 Panels</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f3f4f3] text-center border border-[#dedfe5] hover:border-primary/30 transition-all">
                    <span className="font-metric-counter text-xl sm:text-2xl font-bold text-primary block tabular-nums">
                      {activeHub.inventory.inverters}
                    </span>
                    <span className="text-[10px] text-[#5c4037] font-medium">Inverters Standby</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f3f4f3] text-center border border-[#dedfe5] hover:border-primary/30 transition-all">
                    <span className="font-metric-counter text-xl sm:text-2xl font-bold text-[#1a1c1c] block tabular-nums">
                      {activeHub.inventory.batteries}
                    </span>
                    <span className="text-[10px] text-[#5c4037] font-medium">LiFePO4 Packs</span>
                  </div>
                </div>
              </div>

              {/* Contact and Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`tel:${activeHub.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {activeHub.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${activeHub.whatsapp}?text=${encodeURIComponent(`Hello SunGrid ${activeHub.city} Hub, I would like to inquire about inventory and site audit availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>WhatsApp Hub Dispatch</span>
                </a>
              </div>
            </div>

            {/* Right: Hub Facility Visual & Live Dispatch Feed */}
            <div className="lg:col-span-6 space-y-4">
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-sm border border-[#dedfe5] group">
                <LazyImage
                  src={IMAGES.industrialRackRoom}
                  alt={`${activeHub.name} Facility`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <p className="font-headline-sm text-sm font-bold">
                      {activeHub.activeCrews} Field Engineering Crews Active
                    </p>
                  </div>
                  <p className="text-xs text-neutral-200">
                    Equipped with thermal drone imaging, Fluke true-RMS meters & backup hardware.
                  </p>
                </div>
              </div>

              {/* Service Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#f9f9f8] border border-[#dedfe5] flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1a1c1c]">Emergency SLA</p>
                    <p className="text-[11px] text-[#5c4037]">{activeHub.responseTime}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f9f9f8] border border-[#dedfe5] flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#1a1c1c]">Direct Delivery</p>
                    <p className="text-[11px] text-[#5c4037]">Delivery included in your quote</p>
                  </div>
                </div>
              </div>

              {/* Static Fleet & Dispatch Line */}
              <div className="p-3 bg-[#f9f9f8] rounded-xl text-xs border border-[#dedfe5] flex items-center justify-between">
                <span className="text-[11px] text-[#5c4037]">
                  {activeHub.activeCrews} fully equipped mobile response vans dedicated to {activeHub.city} and surrounding corridors.
                </span>
                <span className="font-mono text-[10px] text-[#5c5e63] shrink-0 font-medium">On Standby</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 24-HOUR GATE SWAP PROTOCOL - CONNECTED TIMELINE */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Warranty Response
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
              How the 24-Hour Gate Swap Works
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
              If a core component develops an internal fault, we replace it at your gate instead of keeping you waiting on workshop repairs.
            </p>
          </div>

          {/* Connected Timeline: Continuous line through all four step markers */}
          <div className="relative">
            {/* Horizontal line for desktop (runs through centers of the step marker nodes at top-6) */}
            <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-[#dedfe5] z-0" />
            {/* Vertical line for mobile/tablet (runs down through left marker column) */}
            <div className="lg:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-[#dedfe5] z-0" />

            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
              {/* Step 1 */}
              <div className="flex lg:flex-col items-start gap-5 lg:gap-5 relative pl-16 lg:pl-0">
                <div className="absolute left-0 lg:relative lg:left-auto w-12 h-12 rounded-xl bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-xs z-10">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1.5">
                    Fault Diagnostic
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-3">
                    Remote monitoring flags abnormal voltage or cell imbalance, or you call our support line to log an issue.
                  </p>
                  <span className="inline-block text-[11px] text-[#5c5e63] font-medium font-mono bg-white px-2.5 py-1 rounded-md border border-[#dedfe5]">
                    Confirmed within minutes
                  </span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex lg:flex-col items-start gap-5 lg:gap-5 relative pl-16 lg:pl-0">
                <div className="absolute left-0 lg:relative lg:left-auto w-12 h-12 rounded-xl bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-xs z-10">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1.5">
                    Depot Inventory Pull
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-3">
                    Rather than sending a technician to solder components in your house, we pull a fresh unit directly from our local depot inventory.
                  </p>
                  <span className="inline-block text-[11px] text-[#5c5e63] font-medium font-mono bg-white px-2.5 py-1 rounded-md border border-[#dedfe5]">
                    Tested prior to dispatch
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex lg:flex-col items-start gap-5 lg:gap-5 relative pl-16 lg:pl-0">
                <div className="absolute left-0 lg:relative lg:left-auto w-12 h-12 rounded-xl bg-primary text-white border-2 border-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-sm z-10">
                  03
                </div>
                <div className="flex-1">
                  <div className="inline-block px-2 py-0.5 rounded-md bg-[#ffdbcf] text-primary text-[9px] font-bold uppercase tracking-wider mb-1">
                    NO REPAIR WAITING
                  </div>
                  <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1.5">
                    24-Hour Gate Swap
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-3">
                    Our field crew arrives at your gate, unmounts the faulty hardware, installs the replacement unit, and tests that power is restored.
                  </p>
                  <span className="inline-block text-[11px] text-primary font-bold font-mono bg-[#ffdbcf]/50 px-2.5 py-1 rounded-md border border-primary/30">
                    Within 24 hours
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex lg:flex-col items-start gap-5 lg:gap-5 relative pl-16 lg:pl-0">
                <div className="absolute left-0 lg:relative lg:left-auto w-12 h-12 rounded-xl bg-white border-2 border-primary text-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-xs z-10">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-1.5">
                    Depot Lab Analysis
                  </h3>
                  <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed mb-3">
                    The faulty unit goes back to our diagnostic facility. You keep the working unit in place with your original warranty intact.
                  </p>
                  <span className="inline-block text-[11px] text-[#5c5e63] font-medium font-mono bg-white px-2.5 py-1 rounded-md border border-[#dedfe5]">
                    Full warranty remains active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CLOSING DEPOT PHOTOGRAPHY SHOWCASE (NOT A DARK CTA BAND) */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 w-full">
        <div className="relative rounded-3xl overflow-hidden border border-[#dedfe5] shadow-sm bg-neutral-900">
          <div className="relative h-80 sm:h-96 w-full">
            <LazyImage
              src={IMAGES.commercialFacility}
              alt="SunGrid Regional Engineering Depot & Hardware Staging Facility"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white z-10">
              <div className="max-w-xl">
                <span className="font-label-caps text-[11px] text-[#ff8e4d] uppercase tracking-wider font-bold mb-1.5 block">
                  Visit Our Regional Engineering Centers
                </span>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-bold mb-2 text-white">
                  Inspect Our Hardware In Person.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  Walk into any of our depots in Lagos (Lekki), Abuja (Idu), Port Harcourt (Trans-Amadi),
                  or Ibadan (Ring Road) to test running inverters, inspect cell architecture, and meet our team.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => onOpenQuote()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule Depot Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
