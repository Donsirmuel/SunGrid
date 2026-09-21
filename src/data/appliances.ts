import { ApplianceItem } from '../types';

export const APPLIANCE_CATALOG: ApplianceItem[] = [
  // Cooling & Air conditioning
  {
    id: 'ac10',
    name: '1.0 HP Inverter AC',
    category: 'cooling',
    nominalWatts: 950,
    surgeWatts: 2200,
    defaultQty: 0,
    description: 'Master/kids bedroom cooling (~950W nominal)'
  },
  {
    id: 'ac15',
    name: '1.5 HP Inverter AC',
    category: 'cooling',
    nominalWatts: 1350,
    surgeWatts: 2900,
    defaultQty: 2,
    description: 'Night-optimized sleep draw (~1,350W)'
  },
  {
    id: 'ac20',
    name: '2.0 HP Inverter AC',
    category: 'cooling',
    nominalWatts: 1850,
    surgeWatts: 3800,
    defaultQty: 0,
    description: 'High capacity living room cooling'
  },
  {
    id: 'fans',
    name: 'Standing & Ceiling Fans',
    category: 'cooling',
    nominalWatts: 65,
    surgeWatts: 90,
    defaultQty: 4,
    description: 'Low continuous draw (~65W each)'
  },

  // Kitchen & Refrigeration
  {
    id: 'freezer',
    name: 'Deep Chest Freezer (250L+)',
    category: 'kitchen',
    nominalWatts: 200,
    surgeWatts: 850,
    defaultQty: 1,
    description: 'Compressor startup surge (~200W cycle)'
  },
  {
    id: 'fridge',
    name: 'Inverter Double-Door Refrigerator',
    category: 'kitchen',
    nominalWatts: 180,
    surgeWatts: 600,
    defaultQty: 1,
    description: 'Linear inverter compressor (~180W)'
  },
  {
    id: 'microwave',
    name: 'Microwave / Air Fryer',
    category: 'kitchen',
    nominalWatts: 1500,
    surgeWatts: 1600,
    defaultQty: 1,
    description: 'Intermittent heavy heating load'
  },
  {
    id: 'kettle',
    name: 'Electric Kettle (Fast Boil)',
    category: 'kitchen',
    nominalWatts: 2000,
    surgeWatts: 2000,
    defaultQty: 0,
    description: 'Momentary pure resistive draw'
  },

  // Water Pumping & Heating
  {
    id: 'pump',
    name: '1.0 HP Borehole Submersible Pump',
    category: 'water',
    nominalWatts: 850,
    surgeWatts: 3400,
    defaultQty: 1,
    description: 'High 4x induction motor startup surge'
  },
  {
    id: 'waterheater',
    name: 'Storage / Instant Water Heater',
    category: 'water',
    nominalWatts: 2000,
    surgeWatts: 2000,
    defaultQty: 0,
    description: 'Scheduled water warming (~2kW)'
  },

  // Work, Connectivity & Security
  {
    id: 'tv',
    name: '55"–75" Smart OLED/QLED TV',
    category: 'work',
    nominalWatts: 120,
    surgeWatts: 150,
    defaultQty: 2,
    description: 'Screen + soundbar family entertainment'
  },
  {
    id: 'starlink',
    name: 'Starlink Dish & Mesh WiFi',
    category: 'work',
    nominalWatts: 75,
    surgeWatts: 100,
    defaultQty: 1,
    description: 'Always-on home internet backbone'
  },
  {
    id: 'laptops',
    name: 'Workstations & MacBooks',
    category: 'work',
    nominalWatts: 90,
    surgeWatts: 110,
    defaultQty: 3,
    description: 'Fast-charging & dual external monitors'
  },
  {
    id: 'security',
    name: 'Perimeter CCTV & LED Floodlights',
    category: 'work',
    nominalWatts: 180,
    surgeWatts: 200,
    defaultQty: 1,
    description: 'Dusk-to-dawn security cameras & LED array'
  }
];
