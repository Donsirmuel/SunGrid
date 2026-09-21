import React, { useState } from 'react';
import { NavTab, RegionalHub } from '../types';
import { REGIONAL_HUBS } from '../data/depots';
import { IMAGES } from '../data/assets';
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
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffdbcf] text-primary font-label-caps text-xs uppercase tracking-wider mb-4 font-bold">
            <Building2 className="w-3.5 h-3.5" />
            Field Infrastructure Across Nigeria
          </span>

          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-[#1a1c1c] tracking-tight font-bold mb-4">
            Regional Engineering Depots & Rapid Response.
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#5c4037] max-w-2xl leading-relaxed">
            Unlike virtual distributors with no local inventory, SunGrid operates fully staffed engineering
            hubs with pre-tested replacement inverters, genuine lithium batteries, and certified field teams ready to deploy.
          </p>

          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-10">
            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">4</span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                Regional Hubs
              </span>
              <span className="text-[11px] text-[#5c4037]">Lagos, Abuja, PH & Ibadan</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">24h</span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                Gate Swap SLA
              </span>
              <span className="text-[11px] text-[#5c4037]">Pre-tested units on standby</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">100%</span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                NERC Certified
              </span>
              <span className="text-[11px] text-[#5c4037]">Full-time internal engineers</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#dedfe5] shadow-xs text-center">
              <span className="font-metric-counter text-3xl font-bold text-primary block">4,200+</span>
              <span className="font-label-caps text-xs text-[#1a1c1c] font-bold mt-1 block">
                Homes Powered
              </span>
              <span className="text-[11px] text-[#5c4037]">Across 14 Nigerian states</span>
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
                className={`px-6 py-3 rounded-full font-label-ui text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md'
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
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
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
                      className="px-3 py-1 rounded-full bg-white text-[#1a1c1c] text-xs font-medium border border-[#dedfe5] shadow-2xs hover:border-primary/40 transition-colors"
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
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {activeHub.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${activeHub.whatsapp}?text=${encodeURIComponent(`Hello SunGrid ${activeHub.city} Hub, I would like to inquire about inventory and site audit availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#eeeeed] hover:bg-[#e2e2e2] text-[#1a1c1c] font-label-ui text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>WhatsApp Hub Dispatch</span>
                </a>
              </div>
            </div>

            {/* Right: Hub Facility Visual & Live Dispatch Feed */}
            <div className="lg:col-span-6 space-y-4">
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-sm border border-[#dedfe5] group">
                <img
                  src={IMAGES.industrialRackRoom}
                  alt={`${activeHub.name} Facility`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
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
                    <p className="text-[11px] text-[#5c4037]">Zero client logistics fees</p>
                  </div>
                </div>
              </div>

              {/* Live Field Telemetry Stream */}
              <div className="p-3 bg-[#12161a] rounded-xl text-neutral-300 text-xs border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] text-white">HUB DISPATCH:</span>
                  <span className="text-[11px] text-neutral-300 truncate max-w-[210px] sm:max-w-[280px]">
                    Van 03 completed zero-tripping audit in {activeHub.coverage[0]}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500 shrink-0">4m ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 24-HOUR GATE SWAP PROTOCOL */}
      <section className="w-full bg-[#f3f4f3] py-16 lg:py-20 border-t border-[#dedfe5]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-label-caps text-[11px] text-primary uppercase tracking-widest font-bold">
              Unrivaled Uptime Guarantee
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-[#1a1c1c] font-bold tracking-tight mt-1">
              The 24-Hour Gate Swap Protocol
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5c4037] mt-2">
              Why our customers never sleep in darkness when equipment needs warranty attention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#dedfe5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ffdbcf] text-primary flex items-center justify-center font-bold text-sm mb-4">
                  01
                </div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-2">
                  Cloud Telemetry Alert
                </h3>
                <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
                  Our remote monitoring system detects abnormal voltage or temperature spikes, or you notify our 24/7 priority line.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#dedfe5] text-[11px] text-[#5c5e63] font-medium">
                Average diagnosis: 8 mins
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#dedfe5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ffdbcf] text-primary flex items-center justify-center font-bold text-sm mb-4">
                  02
                </div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-2">
                  Warehouse Unit Pull
                </h3>
                <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
                  Rather than dispatching a repair technician to solder chips in your living room, we pull a certified new unit directly from the regional hub buffer.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#dedfe5] text-[11px] text-[#5c5e63] font-medium">
                Tested to 100% capacity
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-primary shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider">
                NO REPAIR WAITING
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm mb-4">
                  03
                </div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-2">
                  24-Hour Gate Swap
                </h3>
                <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
                  Our mobile engineer arrives at your residence, safely replaces the hardware, verifies inverter synchronization, and restores full solar autonomy.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-primary/20 text-[11px] text-primary font-bold">
                Maximum 24 hours
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#dedfe5] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ffdbcf] text-primary flex items-center justify-center font-bold text-sm mb-4">
                  04
                </div>
                <h3 className="font-headline-sm text-base font-bold text-[#1a1c1c] mb-2">
                  Manufacturer Lab Audit
                </h3>
                <p className="font-body-sm text-xs text-[#5c4037] leading-relaxed">
                  The original unit is returned to our Tier-1 manufacturer diagnostic lab. You never bear the risk or downtime of repair cycles.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#dedfe5] text-[11px] text-[#5c5e63] font-medium">
                Full 10-year warranty intact
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BOOK A VISIT / SCHEDULE CONSULTATION */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-16 w-full">
        <div className="rounded-3xl bg-[#12161a] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="font-label-caps text-[11px] text-[#ff8e4d] uppercase tracking-wider font-bold mb-1 block">
              Visit Our Regional Engineering Centers
            </span>
            <h3 className="font-headline-xl text-2xl sm:text-3xl font-bold mb-2 text-white">
              Inspect Our Hardware In Person.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300">
              Walk into any of our depots in Lagos (Lekki), Abuja (Idu), Port Harcourt (Trans-Amadi),
              or Ibadan (Ring Road) to test running inverters, inspect cell architecture, and meet our team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenQuote()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary hover:bg-primary-container text-white font-label-ui text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule Depot Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
