import { RegionalHub } from '../types';

export const REGIONAL_HUBS: RegionalHub[] = [
  {
    id: 'lagos',
    name: 'Lagos Central Operations Hub',
    role: 'Southwest Super-Hub & Lab',
    city: 'Lagos',
    state: 'Lagos',
    address: 'Plot 14, Commercial Avenue, Lekki Phase 1 & Sanusi Fafunwa, Victoria Island, Lagos.',
    phone: '0800 786 4743',
    whatsapp: '2348007864743',
    sla: '< 4 Hours',
    responseTime: '2-Hour Priority Response',
    techCount: 18,
    activeCrews: 8,
    coverage: ['Victoria Island', 'Ikoyi', 'Lekki Phase 1 & 2', 'Ikeja GRA', 'Magodo Phase 2', 'Surulere', 'Ajah / Sangotedo'],
    inventory: {
      panels: '650+',
      inverters: '42 Units',
      batteries: '84 Packs'
    },
    coordinates: { x: 120, y: 180 }
  },
  {
    id: 'abuja',
    name: 'Abuja Federal Capital Depot',
    role: 'North-Central Experience Center',
    city: 'Abuja',
    state: 'FCT',
    address: 'Suite 4, Aguiyi Ironsi Way, Maitama Energy Corridor & Idu Industrial Phase 3, Abuja FCT.',
    phone: '0800 786 4743',
    whatsapp: '2348007864743',
    sla: '< 6 Hours',
    responseTime: '3-Hour Response Window',
    techCount: 12,
    activeCrews: 5,
    coverage: ['Maitama', 'Asokoro', 'Wuse II', 'Gwarinpa', 'Guzape', 'Jabi', 'Airport Road Corridor'],
    inventory: {
      panels: '420+',
      inverters: '28 Units',
      batteries: '56 Packs'
    },
    coordinates: { x: 300, y: 80 }
  },
  {
    id: 'ph',
    name: 'Port Harcourt Niger Delta Hub',
    role: 'South-South Regional Base',
    city: 'Port Harcourt',
    state: 'Rivers',
    address: 'Trans-Amadi Industrial Layout, Near Ordinance Junction, Port Harcourt, Rivers State.',
    phone: '0800 786 4743',
    whatsapp: '2348007864743',
    sla: '< 6 Hours',
    responseTime: '3-Hour Response Window',
    techCount: 10,
    activeCrews: 4,
    coverage: ['Old GRA', 'GRA Phase 1–3', 'Peter Odili Road', 'Woji', 'Ada George', 'Trans-Amadi'],
    inventory: {
      panels: '340+',
      inverters: '22 Units',
      batteries: '44 Packs'
    },
    coordinates: { x: 380, y: 190 }
  },
  {
    id: 'ibadan',
    name: 'Ibadan Southwest Engineering Base',
    role: 'Oyo Field Support Unit',
    city: 'Ibadan',
    state: 'Oyo',
    address: 'Ring Road Commercial Corridor, Near Bodija Estate Link Road, Ibadan, Oyo State.',
    phone: '0800 786 4743',
    whatsapp: '2348007864743',
    sla: '< 8 Hours',
    responseTime: '4-Hour Response Window',
    techCount: 8,
    activeCrews: 3,
    coverage: ['Bodija', 'Jericho', 'Oluyole Estate', 'Iyaganku GRA', 'Alalubosa', 'Samonda'],
    inventory: {
      panels: '260+',
      inverters: '18 Units',
      batteries: '32 Packs'
    },
    coordinates: { x: 160, y: 140 }
  }
];
