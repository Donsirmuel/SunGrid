export type NavTab = 'home' | 'packages' | 'pricing' | 'calculator' | 'about' | 'depots';

export interface SolarPackage {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  category: 'apartments' | 'duplex' | 'mansions' | 'portable';
  powerKva: string;
  priceNgn: number;
  monthlyInstallment?: number;
  image: string;
  description: string;
  simpleSummary?: string;
  highlights: string[];
  specs: {
    inverter: string;
    battery: string;
    solarArray: string;
    transferSpeed: string;
    surgeTolerance?: string;
    protection?: string;
    plainMeaning?: {
      inverterExplanation?: string;
      batteryExplanation?: string;
      solarExplanation?: string;
      switchExplanation?: string;
      protectionExplanation?: string;
    };
  };
}

export interface ApplianceItem {
  id: string;
  name: string;
  category: 'cooling' | 'kitchen' | 'water' | 'work';
  nominalWatts: number;
  surgeWatts: number;
  defaultQty: number;
  description: string;
}

export interface RegionalHub {
  id: string;
  name: string;
  role: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  whatsapp: string;
  sla: string;
  responseTime: string;
  techCount: number;
  activeCrews: number;
  coverage: string[];
  inventory: {
    panels: string;
    inverters: string;
    batteries: string;
  };
  coordinates: { x: number; y: number };
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  roleOrTitle?: string;
  location: string;
  propertyType: string;
  systemSize: string;
  installedYear: string;
  avatarText?: string;
  avatarUrl?: string;
  rating: number;
  highlightMetric: string;
  metricLabel: string;
  quote: string;
  verifiedCustomer: boolean;
  packageUsed: string;
}
