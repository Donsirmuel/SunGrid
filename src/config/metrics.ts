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
    label: 'Homes & Industries Powered',
    shortLabel: 'Homes & Industries',
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
    label: 'Continuous Power (No Blackouts)',
    description: 'Instant 4ms switchover: faster than the blink of an eye. Your air conditioners, TVs, and Wi-Fi keep running without flickering or restarting when NEPA trips.'
  },

  // Monthly fuel diesel displaced
  dieselSavings: {
    averageLitersMonthly: 950,
    suffix: 'L+',
    formatted: '950L+',
    label: 'Average Monthly Diesel Saved',
    description: 'Eliminate noisy gen sets, midnight fuel hunting, and toxic fumes from your residence.'
  },

  // Rapid unit replacement warranty turnaround
  gateSwapSla: {
    hours: 24,
    formatted: '24h',
    label: 'Replacement SLA',
    subtext: 'Direct component replacement'
  },

  // Engineering certification
  nercEngineers: {
    percentage: 100,
    formatted: '100%',
    label: 'NERC Certified',
    subtext: 'Full-time internal engineers'
  },

  // Geographical coverage
  geographicReach: {
    statesCount: 14,
    formattedStates: '14 States',
    depotsCount: 4,
    formattedDepots: '4',
    depotsLabel: 'Regional Engineering Depots',
    hubCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan']
  }
} as const;

export type SharedMetrics = typeof SHARED_METRICS;
