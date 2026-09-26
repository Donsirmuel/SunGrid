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
    simpleSummary: 'Ideal for 2–3 bedroom flats: keeps your fridge cold, WiFi alive, and 1 bedroom AC cool all night.',
    highlights: [
      'Powers 1 Inverter AC (1.0HP) throughout the night',
      '5.12kWh Long-Life Lithium Battery (10+ years lifespan)',
      '6 Rooftop Solar Panels (550W High-Efficiency Monocrystalline)',
      'Runs surface water pump (0.5HP) for overhead tanks',
      'Keeps double-door fridge, TV, Wi-Fi & LED lights on 24/7'
    ],
    specs: {
      inverter: '3.5kVA Pure Sine Wave Hybrid',
      battery: '5.12kWh Grade-A LiFePO4 (6,000 cycles)',
      solarArray: '6x 550W Monocrystalline Panels',
      transferSpeed: '< 4ms (Instant switch: laptops & TV stay on)',
      surgeTolerance: '7.5kVA Inrush Surge Absorption',
      protection: 'Type-2 Surge Protector & Dual DC Safety Switches',
      plainMeaning: {
        inverterExplanation: 'The brain that turns stored solar power into smooth home electricity without flickering lights.',
        batteryExplanation: 'Stores enough clean power to run your essentials for 10–14 hours overnight without generator noise.',
        solarExplanation: '6 rooftop panels that generate free electricity even during hazy or cloudy days.',
        switchExplanation: 'Switches faster than an eye blink (4ms). Your Zoom calls, TV, and fridge will never restart.',
        protectionExplanation: 'Built-in electrical shields guarding your expensive appliances against NEPA power surges.'
      }
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
    simpleSummary: 'Best for standard 3–4 bedroom duplexes: run up to 3 bedroom ACs overnight, pump your borehole water, and freeze food 24/7.',
    highlights: [
      'Runs 2–3 Inverter ACs (1.5HP) overnight silently',
      '10.24kWh Blade Lithium Dual Pack (EV-grade safety cells)',
      '12x 580W Tier-1 Bifacial Solar Panels (catches sunlight on both sides)',
      'Effortless 1.0HP borehole water pumping anytime',
      'Keeps large chest freezer, kitchen fridge & home theater running'
    ],
    specs: {
      inverter: '8kVA–10kVA Low-Frequency Hybrid',
      battery: '10.24kWh Blade LiFePO4 (6,000 cycles)',
      solarArray: '12x 580W Bifacial Glass PVs',
      transferSpeed: '< 4ms (Instant transfer: continuous power changeover)',
      surgeTolerance: '18.5kVA Inductive Surge Absorption (Handles motor kicks)',
      protection: '4-Point Chemical Copper Earthing Array & Surge Arrestors',
      plainMeaning: {
        inverterExplanation: 'Heavy-duty inverter built to absorb heavy motor kicks when water pumps or large AC compressors kick on.',
        batteryExplanation: 'Blade lithium pack providing 14–18 hours of overnight backup without exhaust or fumes.',
        solarExplanation: '12 bifacial glass panels that produce electricity from direct sunlight and reflected light from your roof tiles.',
        switchExplanation: 'Instant handover under 4ms: your AC, television, and WiFi continue without restarting.',
        protectionExplanation: 'Dedicated deep copper chemical grounding rod absorbing lightning and grid voltage spikes.'
      }
    }
  },
  {
    id: 'estate-mansion',
    name: 'Mansion & Clinic',
    tagline: '5+ Bedroom Estates & Executive Clinics',
    badge: '15kVA 3-Phase',
    category: 'mansions',
    powerKva: '15kVA',
    priceNgn: 14900000,
    monthlyInstallment: 490000,
    image: IMAGES.industrialRackRoom,
    description: 'Enterprise microgrid built for expansive residences, medical clinics, and commercial premises demanding non-stop load balancing.',
    simpleSummary: 'For large detached homes & medical facilities: powers 5–7 air conditioners, water heaters, and electric gates across all 3 phases.',
    highlights: [
      'Powers 5 to 7 ACs simultaneously across all building wings',
      '20.48kWh High-Capacity Server Rack Lithium Storage',
      '20x 600W Ultra-High Efficiency Solar Panels',
      '2.0HP Heavy-Duty Submersible Borehole Pump',
      'Microwave, electric cooker, elevator & motorized compound gate'
    ],
    specs: {
      inverter: '15kVA 3-Phase Synchronous Array',
      battery: '20.48kWh High-Voltage Rackmount LFP',
      solarArray: '20x 600W N-Type Bifacial PVs',
      transferSpeed: '< 4ms (Unbroken pure sine wave across all 3 phases)',
      surgeTolerance: '32kVA Heavy Motor Peak Surge Absorption',
      protection: 'Class-1 Lightning Arrestor & 24/7 4G Cloud Telemetry',
      plainMeaning: {
        inverterExplanation: 'Balanced 3-phase commercial system providing smooth, equal voltage to all wings of large properties.',
        batteryExplanation: 'Server-rack style modular lithium bank giving multi-day autonomy even during heavy rainy seasons.',
        solarExplanation: '20 high-output panels producing massive free daytime energy to run multiple ACs and large pumps at once.',
        switchExplanation: 'Completely uninterrupted current suitable for surgical equipment, servers, and sensitive smart home gear.',
        protectionExplanation: 'Commercial-grade lightning shield and automated 4G cellular alerts sent directly to SunGrid engineers.'
      }
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
    simpleSummary: 'Plug-and-play desktop power station: no roof mounting or landlord permission required. Just plug in for quiet backup power.',
    highlights: [
      'Compact Desktop Unit with Sturdy Chrome Handle',
      'Dual Universal AC Sockets & Clear Digital Screen',
      'Powers Work Laptops, Monitors, TV & Starlink Wi-Fi',
      'Runs Tabletop Fridge & Home Standing Fans for hours',
      'Fast 84-minute wall recharge or plug into balcony solar panels'
    ],
    specs: {
      inverter: '2.4kW Pure Sine Wave Inverter',
      battery: '2,048Wh EV-Grade LiFePO4',
      solarArray: '800W Foldable Balcony Panels',
      transferSpeed: '< 8ms UPS Switchover (Keeps PCs on)',
      protection: 'Integrated Smart BMS with Automatic Overload Defense',
      plainMeaning: {
        inverterExplanation: 'Silent built-in power engine delivering clean wall-socket electricity anywhere in your house or office.',
        batteryExplanation: 'Long-lasting lithium battery good for 10 years of daily recharges without losing power capacity.',
        solarExplanation: 'Lightweight foldable panels you can hang on your apartment balcony or lay in the compound sun.',
        switchExplanation: 'Acts as an automatic backup box (UPS) so your computer or television stays on when grid power cuts out.',
        protectionExplanation: 'Internal computer sensor that automatically shuts off safely if you plug in too heavy an appliance.'
      }
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
    image: IMAGES.commercialFacility,
    description: 'Full facility commercial microgrid engineered for three-phase inductive balancing, elevators, cold rooms, and surgical theater uninterrupted operation.',
    simpleSummary: 'For corporate offices, factories & cold rooms: eliminate diesel bills permanently while keeping machines and chillers running 24/7.',
    highlights: [
      'Powers entire commercial premises across all three phases',
      '40.96kWh High-Capacity Server-Rack Lithium Bank',
      '36x 650W Tier-1 TopCon High-Density Solar Panels',
      'Commercial elevators, cold rooms, HVAC chillers & server rooms',
      'Automatic generator synchronizer (starts generator only as emergency last resort)'
    ],
    specs: {
      inverter: '25kVA Parallel Dual Industrial Inverters',
      battery: '40.96kWh Modular Server-Rack LiFePO4',
      solarArray: '36x 650W TopCon High-Density PVs',
      transferSpeed: '< 4ms (0ms Perceived Continuous Sine Wave)',
      surgeTolerance: '55kVA Commercial Inrush Capability',
      protection: 'Class T Fused Busbar & On-Site Engineering Sign-Off',
      plainMeaning: {
        inverterExplanation: 'Twin industrial inverters sharing heavy workplace loads so your production line never stops.',
        batteryExplanation: 'Modular server-rack batteries storing enough energy to run critical business machinery through the night.',
        solarExplanation: 'Commercial rooftop array slashing your business electricity costs by over 85% every month.',
        switchExplanation: 'Uninterrupted changeover under 4ms that keeps computers running, machinery protected, and production active.',
        protectionExplanation: 'Industrial circuit breakers and physical fuses certified on-site by registered electrical engineers.'
      }
    }
  }
];
