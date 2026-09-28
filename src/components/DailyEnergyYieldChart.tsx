import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  Sun01Icon, 
  Moon02Icon, 
  FlashIcon, 
  ArrowRight01Icon,
  CheckmarkCircle02Icon
} from 'hugeicons-react';

interface HourlyDataPoint {
  hour: number;
  label: string;
  solarYieldKw: number;
  homeConsumptionKw: number;
  batteryStatus: 'charging' | 'discharging' | 'idle' | 'full';
  batterySoCPercent: number;
  description: string;
}

// 24-hour typical Nigerian household curve (Duplex with 10kVA Hybrid + 12x 580W panels)
const HOURLY_ENERGY_DATA: HourlyDataPoint[] = [
  { hour: 0, label: '12 AM', solarYieldKw: 0, homeConsumptionKw: 1.8, batteryStatus: 'discharging', batterySoCPercent: 68, description: 'ACs running quietly on battery power without generator exhaust or sound.' },
  { hour: 1, label: '1 AM', solarYieldKw: 0, homeConsumptionKw: 1.7, batteryStatus: 'discharging', batterySoCPercent: 64, description: 'Stable bedroom temperature maintained.' },
  { hour: 2, label: '2 AM', solarYieldKw: 0, homeConsumptionKw: 1.6, batteryStatus: 'discharging', batterySoCPercent: 60, description: 'Silent inverter operation throughout the night.' },
  { hour: 3, label: '3 AM', solarYieldKw: 0, homeConsumptionKw: 1.6, batteryStatus: 'discharging', batterySoCPercent: 56, description: 'Refrigerator & freezer on eco-cycles.' },
  { hour: 4, label: '4 AM', solarYieldKw: 0, homeConsumptionKw: 1.5, batteryStatus: 'discharging', batterySoCPercent: 52, description: 'Autonomous security lighting active.' },
  { hour: 5, label: '5 AM', solarYieldKw: 0.1, homeConsumptionKw: 1.9, batteryStatus: 'discharging', batterySoCPercent: 48, description: 'Morning prep, bathroom water heater cycle starts.' },
  { hour: 6, label: '6 AM', solarYieldKw: 0.6, homeConsumptionKw: 2.2, batteryStatus: 'discharging', batterySoCPercent: 46, description: 'Dawn breaks in Lagos/Abuja. First solar photons harvested.' },
  { hour: 7, label: '7 AM', solarYieldKw: 1.8, homeConsumptionKw: 2.4, batteryStatus: 'discharging', batterySoCPercent: 45, description: 'Borehole water pumping into overhead tanks.' },
  { hour: 8, label: '8 AM', solarYieldKw: 3.4, homeConsumptionKw: 2.0, batteryStatus: 'charging', batterySoCPercent: 48, description: 'Solar yield overtakes home load. Battery begins fast charging.' },
  { hour: 9, label: '9 AM', solarYieldKw: 5.2, homeConsumptionKw: 2.1, batteryStatus: 'charging', batterySoCPercent: 56, description: 'Strong tropical irradiance. Home runs directly off free sunshine.' },
  { hour: 10, label: '10 AM', solarYieldKw: 6.5, homeConsumptionKw: 2.3, batteryStatus: 'charging', batterySoCPercent: 68, description: 'Washing machines and kitchen refrigeration running simultaneously.' },
  { hour: 11, label: '11 AM', solarYieldKw: 7.2, homeConsumptionKw: 2.5, batteryStatus: 'charging', batterySoCPercent: 82, description: 'Near-peak generation across all bifacial panels.' },
  { hour: 12, label: '12 PM', solarYieldKw: 7.8, homeConsumptionKw: 2.8, batteryStatus: 'charging', batterySoCPercent: 94, description: 'Midday solar peak! Excess power fully saturates lithium bank.' },
  { hour: 13, label: '1 PM', solarYieldKw: 7.6, homeConsumptionKw: 2.9, batteryStatus: 'full', batterySoCPercent: 100, description: 'Battery bank 100% full. Maximum clean energy surplus.' },
  { hour: 14, label: '2 PM', solarYieldKw: 7.0, homeConsumptionKw: 3.0, batteryStatus: 'full', batterySoCPercent: 100, description: 'Living room ACs running 100% on free solar power.' },
  { hour: 15, label: '3 PM', solarYieldKw: 5.8, homeConsumptionKw: 2.8, batteryStatus: 'full', batterySoCPercent: 100, description: 'High efficiency sustained during afternoon heat.' },
  { hour: 16, label: '4 PM', solarYieldKw: 4.2, homeConsumptionKw: 2.6, batteryStatus: 'full', batterySoCPercent: 100, description: 'Sun angles lower; solar still covers all daytime household appliances.' },
  { hour: 17, label: '5 PM', solarYieldKw: 2.3, homeConsumptionKw: 2.7, batteryStatus: 'idle', batterySoCPercent: 99, description: 'Household arrival time. Smooth transition to battery reserve as the sun sets.' },
  { hour: 18, label: '6 PM', solarYieldKw: 0.8, homeConsumptionKw: 3.2, batteryStatus: 'discharging', batterySoCPercent: 97, description: 'Sunset. Automatic sub-4ms handoff to fully charged battery reserve.' },
  { hour: 19, label: '7 PM', solarYieldKw: 0, homeConsumptionKw: 3.8, batteryStatus: 'discharging', batterySoCPercent: 92, description: 'Family dinner, multiple TVs, lighting & home office in full swing.' },
  { hour: 20, label: '8 PM', solarYieldKw: 0, homeConsumptionKw: 3.6, batteryStatus: 'discharging', batterySoCPercent: 86, description: 'Neighborhood generators start roaring; your home remains dead silent.' },
  { hour: 21, label: '9 PM', solarYieldKw: 0, homeConsumptionKw: 3.2, batteryStatus: 'discharging', batterySoCPercent: 80, description: 'Children’s bedrooms cooled down.' },
  { hour: 22, label: '10 PM', solarYieldKw: 0, homeConsumptionKw: 2.4, batteryStatus: 'discharging', batterySoCPercent: 75, description: 'Late evening entertainment & perimeter lights.' },
  { hour: 23, label: '11 PM', solarYieldKw: 0, homeConsumptionKw: 2.0, batteryStatus: 'discharging', batterySoCPercent: 71, description: 'Bedtime transition with over 70% battery reserve intact.' },
];

interface DailyEnergyYieldChartProps {
  onSelectPackage?: (packageName: string) => void;
}

export const DailyEnergyYieldChart: React.FC<DailyEnergyYieldChartProps> = ({ onSelectPackage }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [activeWeather, setActiveWeather] = useState<'sunny' | 'harmattan' | 'rainy'>('sunny');

  // Weather modifier factor for Nigerian climates
  const weatherMultiplier = activeWeather === 'sunny' ? 1.0 : activeWeather === 'harmattan' ? 0.82 : 0.65;

  const currentPoint = HOURLY_ENERGY_DATA[selectedHour];
  const adjustedSolarKw = Number((currentPoint.solarYieldKw * weatherMultiplier).toFixed(1));

  // D3 Chart rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = Math.min(380, Math.max(280, width * 0.42));

    const margin = { top: 28, right: 24, bottom: 44, left: 44 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear prior SVG elements
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 23])
      .range([0, innerWidth]);

    const maxSolar = d3.max(HOURLY_ENERGY_DATA, (d) => d.solarYieldKw * weatherMultiplier) || 8;
    const maxDemand = d3.max(HOURLY_ENERGY_DATA, (d) => d.homeConsumptionKw) || 4;
    const yMax = Math.ceil(Math.max(maxSolar, maxDemand) + 1);

    const yScale = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]);

    // Grid lines (subtle)
    const yAxisGrid = d3
      .axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickFormat(() => '')
      .ticks(5);

    g.append('g')
      .attr('class', 'y-grid')
      .call(yAxisGrid)
      .selectAll('line')
      .attr('stroke', '#e6e7eb')
      .attr('stroke-dasharray', '3,3');

    g.select('.y-grid .domain').remove();

    // Gradient definitions
    const defs = svg.append('defs');

    // Solar area gradient (SunGrid Warm Orange)
    const solarGradient = defs
      .append('linearGradient')
      .attr('id', 'solarAreaGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    solarGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ff5722').attr('stop-opacity', 0.55);
    solarGradient.append('stop').attr('offset', '100%').attr('stop-color', '#ff8e4d').attr('stop-opacity', 0.02);

    // Consumption area gradient (Warm Neutral/Slate)
    const demandGradient = defs
      .append('linearGradient')
      .attr('id', 'demandAreaGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    demandGradient.append('stop').attr('offset', '0%').attr('stop-color', '#334155').attr('stop-opacity', 0.25);
    demandGradient.append('stop').attr('offset', '100%').attr('stop-color', '#64748b').attr('stop-opacity', 0.02);

    // Area Generators
    const solarArea = d3
      .area<HourlyDataPoint>()
      .x((d) => xScale(d.hour))
      .y0(innerHeight)
      .y1((d) => yScale(d.solarYieldKw * weatherMultiplier))
      .curve(d3.curveMonotoneX);

    const demandArea = d3
      .area<HourlyDataPoint>()
      .x((d) => xScale(d.hour))
      .y0(innerHeight)
      .y1((d) => yScale(d.homeConsumptionKw))
      .curve(d3.curveMonotoneX);

    // Line Generators
    const solarLine = d3
      .line<HourlyDataPoint>()
      .x((d) => xScale(d.hour))
      .y((d) => yScale(d.solarYieldKw * weatherMultiplier))
      .curve(d3.curveMonotoneX);

    const demandLine = d3
      .line<HourlyDataPoint>()
      .x((d) => xScale(d.hour))
      .y((d) => yScale(d.homeConsumptionKw))
      .curve(d3.curveMonotoneX);

    // Render Area Paths
    g.append('path')
      .datum(HOURLY_ENERGY_DATA)
      .attr('fill', 'url(#solarAreaGradient)')
      .attr('d', solarArea);

    g.append('path')
      .datum(HOURLY_ENERGY_DATA)
      .attr('fill', 'url(#demandAreaGradient)')
      .attr('d', demandArea);

    // Render Line Paths
    g.append('path')
      .datum(HOURLY_ENERGY_DATA)
      .attr('fill', 'none')
      .attr('stroke', '#a73400')
      .attr('stroke-width', 2.5)
      .attr('d', solarLine);

    g.append('path')
      .datum(HOURLY_ENERGY_DATA)
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,4')
      .attr('d', demandLine);

    // Solar Surplus Region Fill (Highlighting daylight charging period)
    const surplusHours = HOURLY_ENERGY_DATA.filter((d) => d.solarYieldKw * weatherMultiplier > d.homeConsumptionKw);
    if (surplusHours.length > 0) {
      const firstSurplus = surplusHours[0].hour;
      const lastSurplus = surplusHours[surplusHours.length - 1].hour;

      g.append('rect')
        .attr('x', xScale(firstSurplus))
        .attr('y', 0)
        .attr('width', xScale(lastSurplus) - xScale(firstSurplus))
        .attr('height', innerHeight)
        .attr('fill', '#10b981')
        .attr('opacity', 0.05)
        .attr('rx', 6);

      g.append('text')
        .attr('x', (xScale(firstSurplus) + xScale(lastSurplus)) / 2)
        .attr('y', 14)
        .attr('text-anchor', 'middle')
        .attr('fill', '#059669')
        .attr('font-size', '10px')
        .attr('font-weight', '700')
        .attr('letter-spacing', '0.05em')
        .text('SURPLUS SOLAR → CHARGES BATTERY (100% FREE)');
    }

    // X Axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickValues([0, 4, 8, 12, 16, 20, 23])
      .tickFormat((d) => {
        const val = d as number;
        if (val === 0) return '12 AM';
        if (val === 12) return '12 PM';
        return val < 12 ? `${val} AM` : `${val - 12} PM`;
      });

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#5c5e63')
      .attr('font-size', '11px')
      .attr('dy', '1em');

    g.select('.domain').attr('stroke', '#dedfe5');
    g.selectAll('.tick line').attr('stroke', '#dedfe5');

    // Y Axis
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickFormat((d) => `${d} kW`);

    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#5c5e63')
      .attr('font-size', '11px');

    // Vertical Cursor Indicator for selected hour
    const cursorX = xScale(selectedHour);
    const cursorG = g.append('g').attr('class', 'cursor-indicator');

    cursorG
      .append('line')
      .attr('x1', cursorX)
      .attr('x2', cursorX)
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#a73400')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '3,3');

    // Dot on Solar
    cursorG
      .append('circle')
      .attr('cx', cursorX)
      .attr('cy', yScale(adjustedSolarKw))
      .attr('r', 5)
      .attr('fill', '#a73400')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Dot on Demand
    cursorG
      .append('circle')
      .attr('cx', cursorX)
      .attr('cy', yScale(currentPoint.homeConsumptionKw))
      .attr('r', 4.5)
      .attr('fill', '#1e293b')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // Interactive Overlay for touch/mouse scrub
    svg
      .append('rect')
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('mousemove touchmove', function (event) {
        const [mx] = d3.pointer(event);
        const relativeX = mx - margin.left;
        const clampedX = Math.max(0, Math.min(innerWidth, relativeX));
        const hour = Math.round(xScale.invert(clampedX));
        if (hour >= 0 && hour <= 23) {
          setSelectedHour(hour);
        }
      });
  }, [selectedHour, activeWeather, weatherMultiplier, adjustedSolarKw, currentPoint.homeConsumptionKw]);

  return (
    <div className="w-full">
      {/* Narrative & Mode Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#dedfe5]">
        <div>
          <span className="font-label-caps text-[11px] uppercase tracking-wider text-primary font-bold">
            Real-World Nigerian Generation Curve
          </span>
          <h3 className="font-headline-md text-2xl font-bold text-[#1a1c1c] tracking-tight mt-0.5">
            24-Hour Solar Production vs. Home Demand
          </h3>
          <p className="text-xs text-[#5c4037] mt-1 max-w-xl">
            Watch how a SunGrid 10kVA Hybrid + 12-Panel Bifacial array powers your air conditioners directly with midday sunshine while fully recharging your lithium battery bank before 1:00 PM.
          </p>
        </div>

        {/* Weather Season Selector */}
        <div className="flex items-center gap-1 p-1 bg-[#eeeeed] rounded-xl border border-[#dedfe5] shrink-0">
          <button
            onClick={() => setActiveWeather('sunny')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeWeather === 'sunny' ? 'bg-white text-primary shadow-xs font-bold' : 'text-[#5c5e63] hover:text-[#1a1c1c]'
            }`}
          >
            <Sun01Icon className="w-3.5 h-3.5" />
            <span>Bright Dry Season</span>
          </button>
          <button
            onClick={() => setActiveWeather('harmattan')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeWeather === 'harmattan' ? 'bg-white text-primary shadow-xs font-bold' : 'text-[#5c5e63] hover:text-[#1a1c1c]'
            }`}
          >
            <span>Harmattan Haze</span>
          </button>
          <button
            onClick={() => setActiveWeather('rainy')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeWeather === 'rainy' ? 'bg-white text-primary shadow-xs font-bold' : 'text-[#5c5e63] hover:text-[#1a1c1c]'
            }`}
          >
            <span>Overcast / Wet Season</span>
          </button>
        </div>
      </div>

      {/* Main Visualizer Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: D3 Render Stage */}
        <div className="lg:col-span-8 bg-[#f9f9f8] rounded-3xl p-5 sm:p-7 border border-[#dedfe5] shadow-xs flex flex-col justify-between">
          <div>
            {/* Chart Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary" />
                  <span className="text-[#1a1c1c]">Solar Generation (kW)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-0.5 border-t-2 border-dashed border-slate-800" />
                  <span className="text-[#5c5e63]">Household Consumption (kW)</span>
                </div>
              </div>
              <span className="text-[11px] text-[#5c5e63] font-mono">
                Click or drag across hours (0–23h)
              </span>
            </div>

            {/* D3 Canvas Container */}
            <div ref={containerRef} className="w-full relative select-none">
              <svg ref={svgRef} className="overflow-visible" />
            </div>
          </div>

          {/* Time Scrubber Slider Controls */}
          <div className="mt-4 pt-4 border-t border-[#dedfe5]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1a1c1c] mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Selected Timeline: <strong>{currentPoint.label}</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#5c5e63]">
                {currentPoint.hour >= 6 && currentPoint.hour <= 18 ? (
                  <>
                    <Sun01Icon className="w-4 h-4 text-amber-600" />
                    <span>Daylight Hours</span>
                  </>
                ) : (
                  <>
                    <Moon02Icon className="w-4 h-4 text-indigo-500" />
                    <span>Night Battery Mode</span>
                  </>
                )}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={23}
              step={1}
              value={selectedHour}
              onChange={(e) => setSelectedHour(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#dedfe5] rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-xs text-[#5c5e63] font-mono mt-1.5 font-semibold">
              <span>12 AM</span>
              <span>6 AM (Dawn)</span>
              <span>12 PM (Peak Solar)</span>
              <span>6 PM (Dusk)</span>
              <span>11 PM</span>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry State Inspector Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-7 border border-[#dedfe5] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#dedfe5] mb-4">
              <span className="font-label-caps text-xs sm:text-sm text-[#5c5e63] uppercase font-bold">
                Hour {selectedHour}:00 Telemetry
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#ffdbcf] text-primary">
                {currentPoint.batteryStatus === 'charging' ? (
                  <>
                    <FlashIcon className="w-3.5 h-3.5 text-primary" />
                    <span>Battery Fast Charging</span>
                  </>
                ) : currentPoint.batteryStatus === 'full' ? (
                  <>
                    <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Bank 100% Saturated</span>
                  </>
                ) : (
                  <span>Lithium Discharge</span>
                )}
              </span>
            </div>

            {/* Instant Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-2xl bg-[#ffdbcf]/30 border border-primary/20">
                <span className="text-xs uppercase font-bold text-primary font-label-caps">Solar Harvest</span>
                <p className="font-metric-counter text-2xl font-bold text-primary mt-0.5">
                  {adjustedSolarKw} <span className="text-xs font-normal">kW</span>
                </p>
                <span className="text-xs text-[#5c4037] font-medium">Pure sunshine from roof</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f3f4f3] border border-[#dedfe5]">
                <span className="text-xs uppercase font-bold text-[#5c5e63] font-label-caps">Home Draw</span>
                <p className="font-metric-counter text-2xl font-bold text-[#1a1c1c] mt-0.5">
                  {currentPoint.homeConsumptionKw} <span className="text-xs font-normal">kW</span>
                </p>
                <span className="text-xs text-[#5c4037] font-medium">Appliances & AC load</span>
              </div>
            </div>

            {/* Net Energy Status Callout */}
            <div className="p-4 rounded-2xl bg-[#f9f9f8] border border-[#dedfe5] mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#1a1c1c]">
                  Blade LiFePO4 Reserve
                </span>
                <span className="font-mono text-sm font-bold text-emerald-700">
                  {currentPoint.batterySoCPercent}%
                </span>
              </div>
              
              {/* Battery Meter */}
              <div className="w-full h-2.5 bg-[#dedfe5] rounded-sm overflow-hidden p-0.5">
                <div
                  className="h-full bg-emerald-500 rounded-xs transition-all duration-300"
                  style={{ width: `${currentPoint.batterySoCPercent}%` }}
                />
              </div>

              <p className="text-xs text-[#5c4037] mt-3 leading-relaxed">
                {currentPoint.description}
              </p>
            </div>
          </div>

          {/* Action Callout */}
          <div className="pt-4 border-t border-[#dedfe5]">
            <button
              onClick={() => onSelectPackage ? onSelectPackage('Duplex Family Comfort (10kVA)') : null}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-label-ui text-sm sm:text-base font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer min-h-[48px] touch-manipulation"
            >
              <span>Explore 10kVA Complete Package</span>
              <ArrowRight01Icon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
