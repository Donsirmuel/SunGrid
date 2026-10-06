import { SolarPackage } from '../types';
import { IMAGES } from './assets';

export const SOLAR_PACKAGES: SolarPackage[] = [
  {
    id: 'urban-flat',
    name: 'Small flat and apartment setup',
    tagline: 'Apartments and 2-3 bedroom homes',
    badge: '3.5kVA hybrid',
    category: 'apartments',
    powerKva: '3.5kVA',
    priceNgn: 4250000,
    monthlyInstallment: 145000,
    image: IMAGES.compactApartment,
    description: 'Runs your work computer, refrigerator, Starlink, fans, and smart television when grid power cuts out.',
    simpleSummary: 'Best for 2-3 bedroom flats. Keeps your fridge cold, Wi-Fi connected, and 1 bedroom AC cool through the night.',
    highlights: [
      'Powers 1 inverter AC (1.0 HP) overnight in the bedroom',
      '5.12 kWh lithium iron phosphate battery (lasts 10+ years)',
      '6 rooftop solar panels (550W monocrystalline)',
      'Runs a 0.5 HP surface water pump for overhead tanks',
      'Keeps double-door fridge, TV, Wi-Fi, and lights running 24/7'
    ],
    specs: {
      inverter: '3.5kVA pure sine wave hybrid inverter',
      battery: '5.12kWh Grade-A LiFePO4 (6,000 cycles)',
      solarArray: '6x 550W monocrystalline panels',
      transferSpeed: '<4ms automatic transfer (laptops and TV stay on)',
      surgeTolerance: '7.5kVA surge capacity for motor startup',
      protection: 'Type-2 surge protector and dual DC circuit breakers',
      plainMeaning: {
        inverterExplanation: 'The unit that turns stored battery power into standard wall-socket electricity without flicker.',
        batteryExplanation: 'Stores enough energy to run your essential appliances for 10 to 14 hours overnight without starting a generator.',
        solarExplanation: '6 rooftop panels that generate electricity during the day, even in cloudy or harmattan weather.',
        switchExplanation: 'Switches faster than a screen refresh (under 4 milliseconds). Your computer, TV, and fridge will not reset.',
        protectionExplanation: 'Circuit breakers that divert sudden voltage spikes into the ground before they reach your appliances.'
      }
    }
  },
  {
    id: 'duplex-executive',
    name: 'Duplex family comfort setup',
    tagline: '3-4 bedroom family houses',
    badge: 'Most selected package',
    category: 'duplex',
    powerKva: '8kVA–10kVA',
    priceNgn: 8850000,
    monthlyInstallment: 285000,
    image: IMAGES.modernDuplexExterior,
    description: 'Runs 2 to 3 inverter air conditioners through the night, a large chest freezer, and your borehole water pump.',
    simpleSummary: 'Best for standard 3-4 bedroom duplexes. Run up to 3 bedroom ACs overnight, pump borehole water, and keep food frozen.',
    highlights: [
      'Runs 2-3 inverter ACs (1.5 HP each) overnight without noise',
      '10.24 kWh blade lithium battery bank (Grade-A cells)',
      '12x 580W bifacial solar panels (absorb light from both sides)',
      'Pumps water from standard 1.0 HP borehole wells',
      'Runs large chest freezer, refrigerator, and home entertainment'
    ],
    specs: {
      inverter: '8kVA–10kVA low-frequency hybrid inverter',
      battery: '10.24kWh Blade LiFePO4 (6,000 cycles)',
      solarArray: '12x 580W bifacial glass solar panels',
      transferSpeed: '<4ms automatic transfer (uninterrupted changeover)',
      surgeTolerance: '18.5kVA peak motor surge absorption',
      protection: '4-point chemical copper earthing and surge arrestors',
      plainMeaning: {
        inverterExplanation: 'Heavy-duty inverter built to absorb the initial kick when water pumps or air conditioners turn on.',
        batteryExplanation: 'Blade lithium battery giving 14 to 18 hours of overnight power without noise or fumes.',
        solarExplanation: '12 bifacial panels that generate electricity from overhead sun and light reflected off your roof tiles.',
        switchExplanation: 'Instant handover under 4 milliseconds. Your AC, television, and Wi-Fi continue running without a break.',
        protectionExplanation: 'Deep copper grounding rod driven into the soil to absorb lightning strikes and high grid voltage.'
      }
    }
  },
  {
    id: 'estate-mansion',
    name: 'Mansion and clinic setup',
    tagline: '5+ bedroom homes and private clinics',
    badge: '15kVA 3-phase',
    category: 'mansions',
    powerKva: '15kVA',
    priceNgn: 14900000,
    monthlyInstallment: 490000,
    image: IMAGES.industrialRackRoom,
    description: 'Three-phase system for large residences, medical facilities, and multi-unit offices that need balanced power across all wings.',
    simpleSummary: 'For large detached homes and clinics. Powers 5 to 7 air conditioners, water heaters, and compound gates across 3 phases.',
    highlights: [
      'Powers 5 to 7 ACs across all rooms and building wings',
      '20.48 kWh server-rack lithium battery bank',
      '20x 600W high-output solar panels',
      'Pumps water from 2.0 HP deep borehole wells',
      'Runs microwave, induction cooker, and compound gate motor'
    ],
    specs: {
      inverter: '15kVA 3-phase balanced array',
      battery: '20.48kWh high-voltage rackmount LiFePO4',
      solarArray: '20x 600W N-Type bifacial solar panels',
      transferSpeed: '<4ms automatic transfer across all 3 phases',
      surgeTolerance: '32kVA motor startup surge absorption',
      protection: 'Class-1 lightning arrestor and cellular remote monitoring',
      plainMeaning: {
        inverterExplanation: 'Three-phase commercial inverter that delivers equal voltage to every wing of a large building.',
        batteryExplanation: 'Server-rack modular lithium bank providing multi-day backup during overcast wet season days.',
        solarExplanation: '20 high-output panels producing enough daytime electricity to run multiple ACs and borehole pumps together.',
        switchExplanation: 'Completely smooth power transfer safe for medical lab analyzers, computer servers, and smart electronics.',
        protectionExplanation: 'Commercial lightning arrestors and cellular monitoring that alerts our engineering depot if voltage drifts.'
      }
    }
  },
  {
    id: 'nomad-portable',
    name: 'SunGrid Nomad power station',
    tagline: 'Portable power for tenants and apartments',
    badge: 'For tenants',
    category: 'portable',
    powerKva: '2.4kW',
    priceNgn: 1850000,
    image: IMAGES.nomadStation,
    description: 'Portable generator replacement. No roof installation, no drilling, and no landlord permission needed.',
    simpleSummary: 'Desktop power box with sockets on the front. Plug into a wall socket or balcony panel to charge, then run your essentials quietly.',
    highlights: [
      'Compact desktop unit with built-in carry handle',
      'Standard wall sockets and clear digital battery display',
      'Runs work laptops, monitors, TV, and Starlink Wi-Fi',
      'Powers tabletop fridge and standing fans for hours',
      'Charges from any wall socket in 84 minutes, or plugs into balcony panels'
    ],
    specs: {
      inverter: '2.4kW pure sine wave inverter',
      battery: '2,048Wh long-life LiFePO4 battery',
      solarArray: '800W foldable balcony solar panels',
      transferSpeed: '<8ms UPS switchover (keeps computers running)',
      protection: 'Smart battery management system with overload protection',
      plainMeaning: {
        inverterExplanation: 'Quiet built-in inverter providing clean wall-socket electricity anywhere in your apartment.',
        batteryExplanation: 'Lithium battery rated for 10 years of daily recharges without losing useful capacity.',
        solarExplanation: 'Foldable panels you can hang over an apartment balcony or set up in a courtyard.',
        switchExplanation: 'Works as a battery backup box (UPS). Your computer stays on when grid power cuts out.',
        protectionExplanation: 'Internal safety circuit that shuts off automatically if you plug in an appliance that draws too much power.'
      }
    }
  },
  {
    id: 'commercial-industrial',
    name: 'Commercial and industrial setup',
    tagline: 'Offices, diagnostic labs, and processing facilities',
    badge: '25kVA+ 3-phase',
    category: 'mansions',
    powerKva: '25kVA+',
    priceNgn: 24500000,
    image: IMAGES.commercialFacility,
    description: 'Commercial microgrid engineered for three-phase balance, passenger elevators, cold rooms, and continuous lab equipment.',
    simpleSummary: 'For offices, factories, and cold storage. Eliminates daily diesel costs while keeping machinery and chillers running.',
    highlights: [
      'Powers entire commercial premises across all three phases',
      '40.96 kWh server-rack lithium battery bank',
      '36x 650W commercial high-density solar panels',
      'Runs elevators, cold rooms, HVAC chillers, and server rooms',
      'Automatic generator starter (runs the generator only as a rare backup)'
    ],
    specs: {
      inverter: '25kVA parallel industrial dual inverters',
      battery: '40.96kWh modular server-rack LiFePO4',
      solarArray: '36x 650W high-density solar panels',
      transferSpeed: '<4ms continuous transfer',
      surgeTolerance: '55kVA commercial inrush capability',
      protection: 'Class T fused busbar and on-site engineering certification',
      plainMeaning: {
        inverterExplanation: 'Twin industrial inverters sharing heavy workplace loads so work never stops if one unit is serviced.',
        batteryExplanation: 'Server-rack batteries storing enough energy to run critical business equipment through the night.',
        solarExplanation: 'Commercial rooftop array that cuts your monthly utility and fuel bills by over 80%.',
        switchExplanation: 'Sub-4ms transfer that keeps servers alive, protects machines, and avoids production downtime.',
        protectionExplanation: 'Industrial circuit breakers and physical fuses tested on site by registered electrical engineers.'
      }
    }
  }
];
