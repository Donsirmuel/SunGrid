import { SolarPackage } from '../types';
import { IMAGES } from './assets';

export const SOLAR_PACKAGES: SolarPackage[] = [
  {
    id: 'urban-flat',
    name: 'Small Flat & Work',
    tagline: 'Apartments & 2-3 Bedroom Homes',
    badge: '3.5kVA Hybrid',
    category: 'apartments',
    powerKva: '3.5kVA',
    priceNgn: 4250000,
    monthlyInstallment: 145000,
    image: IMAGES.compactApartment,
    description: 'Powers your remote workstation, double-door fridge, Starlink, fans, and smart television uninterrupted.',
    highlights: [
      'Supports 1 Inverter AC (1.0HP)',
      '5.12kWh Tier-1 LiFePO4 Battery',
      '6x 550W Monocrystalline PVs',
      '0.5HP Surface Water Pump',
      'Fridge, TV, Wi-Fi & LED Lighting'
    ],
    specs: {
      inverter: '3.5kVA Pure Sine Wave Hybrid',
      battery: '5.12kWh Grade-A LiFePO4 (6,000 cycles)',
      solarArray: '6x 550W Monocrystalline Panels',
      transferSpeed: '< 4ms (Zero Flicker)',
      surgeTolerance: '7.5kVA Inrush Surge Absorption',
      protection: 'Type-2 SPD & Dual DC Disconnects'
    }
  },
  {
    id: 'duplex-executive',
    name: 'Duplex Family Comfort',
    tagline: '3–4 Bedroom Family Residences',
    badge: "Nigeria's #1 Most Selected",
    category: 'duplex',
    powerKva: '8kVA–10kVA',
    priceNgn: 8850000,
    monthlyInstallment: 285000,
    image: IMAGES.modernDuplexExterior,
    description: 'Effortlessly run 2 to 3 Inverter Air Conditioners through the night, a large chest freezer, and automated borehole pumping.',
    highlights: [
      '2–3 Inverter ACs (1.5HP) Overnight',
      '10.24kWh Blade LiFePO4 Dual Pack',
      '12x 580W Tier-1 Bifacial Solar',
      '1.0HP Deep Well / Borehole Pumping',
      'Deep Freezer, Refrigerator, Audio'
    ],
    specs: {
      inverter: '8kVA–10kVA Low-Frequency Hybrid',
      battery: '10.24kWh Blade LiFePO4 (6,000 cycles)',
      solarArray: '12x 580W Bifacial Glass PVs',
      transferSpeed: '< 4ms (Zero Flicker)',
      surgeTolerance: '18.5kVA Inductive Surge Absorption',
      protection: '4-Point Chemical Copper Earthing Array'
    }
  },
  {
    id: 'estate-mansion',
    name: 'Mansion & Clinic',
    tagline: '5+ Bedroom Estates & Executive Clinics',
    badge: '15kVA 3-Phase',
    category: 'mansions',
    powerKva: '15kVA',
    priceNgn: 1490000,
    monthlyInstallment: 490000,
    image: IMAGES.industrialRackRoom,
    description: 'Enterprise microgrid built for expansive residences, medical clinics, and commercial premises demanding non-stop load balancing.',
    highlights: [
      'Powers 5 to 7 ACs simultaneously',
      '20.48kWh High-C Modular Bank',
      '20x 600W High Efficiency Solar',
      '2HP Heavy Duty Submersible Pump',
      'Microwave, Induction Cooker & Gate Motor'
    ],
    specs: {
      inverter: '15kVA 3-Phase Synchronous Array',
      battery: '20.48kWh High-Voltage Rackmount LFP',
      solarArray: '20x 600W N-Type Bifacial PVs',
      transferSpeed: '< 4ms (Continuous Unbroken Sine)',
      surgeTolerance: '32kVA Heavy Motor Peak Surge',
      protection: 'Class-1 Lightning Arrestor & 4G Cloud Telemetry'
    }
  },
  {
    id: 'nomad-portable',
    name: 'SunGrid Nomad Station',
    tagline: 'Renters & Portable Power',
    badge: 'Renter Friendly',
    category: 'portable',
    powerKva: '2.4kW',
    priceNgn: 1850000,
    image: IMAGES.nomadStation,
    description: 'Plug & play portable generator replacement. Move house whenever you want without landlord approval or roof drilling.',
    highlights: [
      'Work Laptops, Monitors & Wi-Fi',
      'Tabletop Fridge & Home Standing Fans',
      '100% Mobile — Pack & Relocate Anytime',
      'Fast 84-min wall recharge or balcony solar',
      'Zero installation cost, instant setup'
    ],
    specs: {
      inverter: '2.4kW Pure Sine Wave Inverter',
      battery: '2,048Wh EV-Grade LiFePO4',
      solarArray: '800W Foldable Balcony Panels',
      transferSpeed: '< 8ms UPS Switchover',
      protection: 'Integrated Smart BMS with Overload Defense'
    }
  },
  {
    id: 'commercial-industrial',
    name: 'Commercial & Industrial Facility',
    tagline: 'Offices, Diagnostic Labs & Cold Chains',
    badge: '25kVA+ Tri-Phase',
    category: 'mansions',
    powerKva: '25kVA+',
    priceNgn: 24500000,
    image: IMAGES.medicalClinicVI,
    description: 'Full facility commercial microgrid engineered for three-phase inductive balancing, elevators, cold rooms, and surgical theater uninterrupted operation.',
    highlights: [
      'Full Facility / All Three Phases',
      '40.96kWh Rackmount Server LiFePO4',
      '36x 650W Tier-1 TopCon Modules',
      'Server racks, cold rooms & elevators',
      'Auto generator synchronizer integration'
    ],
    specs: {
      inverter: '25kVA Parallel Dual Industrial Inverters',
      battery: '40.96kWh Modular Server-Rack LiFePO4',
      solarArray: '36x 650W TopCon High-Density PVs',
      transferSpeed: '< 4ms (0ms Perceived Continuous)',
      surgeTolerance: '55kVA Commercial Inrush Capability',
      protection: 'Class T Fused Busbar & On-Site Engineering Sign-Off'
    }
  }
];
