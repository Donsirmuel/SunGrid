import React, { useEffect, useRef } from 'react';

interface OscilloscopeProps {
  loadKw: number;
  surgeKva: number;
  activeCount: number;
}

export const OscilloscopeWaveform: React.FC<OscilloscopeProps> = ({
  loadKw,
  surgeKva,
  activeCount,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw faint oscilloscope background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      const gridSpacingX = 24;
      const gridSpacingY = 16;
      for (let x = 0; x < w; x += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw center reference axis
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Sine wave calculation
      // Frequency: 50.0 Hz simulation
      // Amplitude scales with loadKw slightly while maintaining clean pure sine wave
      const baseAmp = Math.min(24, Math.max(14, 14 + (loadKw / 10) * 10));
      const freq = 0.038;

      // Glow pass
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff5400';
      ctx.strokeStyle = '#ff8e4d';
      ctx.lineWidth = 2.2;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        // Pure sinusoidal formula y = sin(kx - wt)
        const y = h / 2 + Math.sin(x * freq - phase) * baseAmp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary crisp core line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * freq - phase) * baseAmp;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Advancing phase for 50Hz smooth wave movement
      phase += 0.065;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [loadKw, surgeKva, activeCount]);

  return (
    <div className="w-full bg-[#0a0d10] rounded-2xl p-3 border border-neutral-800 shadow-inner relative overflow-hidden">
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5 px-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white font-semibold">OSCILLOSCOPE: 50.00 Hz</span>
        </div>
        <div className="flex items-center gap-3 text-neutral-400">
          <span>THD: &lt;1.6%</span>
          <span className="text-[#ff8e4d] font-bold">PURE SINE</span>
        </div>
      </div>

      <div className="w-full h-20 relative">
        <canvas
          ref={canvasRef}
          width={360}
          height={80}
          className="w-full h-full block rounded-lg"
        />
        {/* Subtle grid CRT scanline simulation */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 mt-1 px-1">
        <span>V_RMS: 230.2V ±0.5%</span>
        <span>AC TRANSFER: 3.8ms</span>
        <span>INVERTER: ACTIVE</span>
      </div>
    </div>
  );
};
