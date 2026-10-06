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
    description: 'Bedroom air conditioning (~950W when cooling)'
  },
  {
    id: 'ac15',
    name: '1.5 HP Inverter AC',
    category: 'cooling',
    nominalWatts: 1350,
    surgeWatts: 2900,
    defaultQty: 2,
    description: 'Night cooling draw (~1,350W running power)'
  },
  {
    id: 'ac20',
    name: '2.0 HP Inverter AC',
    category: 'cooling',
    nominalWatts: 1850,
    surgeWatts: 3800,
    defaultQty: 0,
    description: 'Living room air conditioning (~1,850W running power)'
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
    description: 'Compressor startup surge (~200W steady draw)'
  },
  {
    id: 'fridge',
    name: 'Inverter Double-Door Refrigerator',
    category: 'kitchen',
    nominalWatts: 180,
    surgeWatts: 600,
    defaultQty: 1,
    description: 'Inverter compressor (~180W steady draw)'
  },
  {
    id: 'microwave',
    name: 'Microwave / Air Fryer',
    category: 'kitchen',
    nominalWatts: 1500,
    surgeWatts: 1600,
    defaultQty: 1,
    description: 'Short heating cycles (~1,500W)'
  },
  {
    id: 'kettle',
    name: 'Electric Kettle (Fast Boil)',
    category: 'kitchen',
    nominalWatts: 2000,
    surgeWatts: 2000,
    defaultQty: 0,
    description: 'Boiling element (~2,000W momentary draw)'
  },

  // Water Pumping & Heating
  {
    id: 'pump',
    name: '1.0 HP Borehole Submersible Pump',
    category: 'water',
    nominalWatts: 850,
    surgeWatts: 3400,
    defaultQty: 1,
    description: 'Submersible water pump with 4x startup motor surge'
  },
  {
    id: 'waterheater',
    name: 'Storage / Instant Water Heater',
    category: 'water',
    nominalWatts: 2000,
    surgeWatts: 2000,
    defaultQty: 0,
    description: 'Water heating cylinder (~2,000W)'
  },

  // Work, Connectivity & Security
  {
    id: 'tv',
    name: '55"–75" Smart OLED/QLED TV',
    category: 'work',
    nominalWatts: 120,
    surgeWatts: 150,
    defaultQty: 2,
    description: 'Television and soundbar draw (~120W)'
  },
  {
    id: 'starlink',
    name: 'Starlink Dish & Mesh WiFi',
    category: 'work',
    nominalWatts: 75,
    surgeWatts: 100,
    defaultQty: 1,
    description: 'Always-on Wi-Fi router and satellite dish (~75W)'
  },
  {
    id: 'laptops',
    name: 'Workstations & MacBooks',
    category: 'work',
    nominalWatts: 90,
    surgeWatts: 110,
    defaultQty: 3,
    description: 'Laptops, monitors, and chargers (~90W each)'
  },
  {
    id: 'security',
    name: 'Perimeter CCTV & LED Floodlights',
    category: 'work',
    nominalWatts: 180,
    surgeWatts: 200,
    defaultQty: 1,
    description: 'Security cameras and outdoor lights (~180W)'
  }
];
