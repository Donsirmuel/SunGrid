/**
 * Centralized Shared Company Metrics & Statistics
 * Single source of truth for audited figures, performance metrics, and operational capabilities across all views.
 */

export interface MetricItem {
  readonly count: number;
  readonly suffix: string;
  readonly formatted: string;
  readonly label: string;
  readonly shortLabel?: string;
  readonly subtext?: string;
  readonly description?: string;
}

export const SHARED_METRICS = {
  // Audited homes and commercial facilities powered
  homesAndIndustries: {
    count: 150,
    suffix: '+',
    formatted: '150+',
    label: 'Homes and businesses installed',
    shortLabel: 'Homes & businesses',
    subtext: 'Across 14 Nigerian states',
    description: 'From residential duplexes in Victoria Island and Maitama to diagnostics clinics and commercial processing facilities.'
  },

  // System continuous operation & uptime
  uptime: {
    percentage: 99.98,
    suffix: '%',
    formatted: '99.98%',
    switchSpeedMs: 4,
    switchSpeedFormatted: '< 4ms',
    label: 'Continuous power during outages',
    description: 'Sub-4ms transfer time. Your air conditioners, TVs, and Wi-Fi keep running without restarting when the public grid drops.'
  },

  // Monthly fuel diesel displaced
  dieselSavings: {
    averageLitersMonthly: 950,
    suffix: 'L+',
    formatted: '950L+',
    label: 'Average monthly generator fuel saved',
    description: 'Eliminate noisy generators, midnight fuel queues, and fumes from your home.'
  },

  // Rapid unit replacement warranty turnaround
  gateSwapSla: {
    hours: 24,
    formatted: '24h',
    label: 'Equipment replacement window',
    subtext: 'Tested swap from local depot'
  },

  // Engineering certification
  nercEngineers: {
    percentage: 100,
    formatted: '100%',
    label: 'Certified electricians',
    subtext: 'In-house installation teams'
  },

  // Geographical coverage
  geographicReach: {
    statesCount: 14,
    formattedStates: '14 States',
    depotsCount: 4,
    formattedDepots: '4',
    depotsLabel: 'Regional engineering depots',
    hubCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan']
  }
} as const;

export type SharedMetrics = typeof SHARED_METRICS;
