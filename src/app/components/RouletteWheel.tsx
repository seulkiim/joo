'use client';

import { useEffect, useRef } from 'react';
import { Section } from './hooks/useRoulette';

interface RouletteWheelProps {
  sections: Section[];
  rotation: number;
  isSpinning: boolean;
  onSpinEnd: () => void;
}

const SIZE = 480;

function drawWheel(canvas: HTMLCanvasElement, sections: Section[]) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  canvas.style.width = `${SIZE}px`;
  canvas.style.height = `${SIZE}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const radius = SIZE / 2 - 10;
  const n = sections.length;
  const sliceAngle = (2 * Math.PI) / n;

  // Outer decorative ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 6, 0, 2 * Math.PI);
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius + 10, 0, 2 * Math.PI);
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw slices
  for (let i = 0; i < n; i++) {
    const startAngle = sliceAngle * i - Math.PI / 2;
    const endAngle = sliceAngle * (i + 1) - Math.PI / 2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = sections[i].color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Labels
  const fontSize = n <= 8 ? 20 : n <= 16 ? 14 : 10;
  ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < n; i++) {
    const midAngle = sliceAngle * i - Math.PI / 2 + sliceAngle / 2;
    const labelRadius = radius * 0.68;
    const x = cx + labelRadius * Math.cos(midAngle);
    const y = cy + labelRadius * Math.sin(midAngle);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(midAngle + Math.PI / 2);

    // Text shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(sections[i].label, 1.5, 1.5);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(sections[i].label, 0, 0);
    ctx.restore();
  }

  // Spoke lines
  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    const angle = sliceAngle * i - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();
  }

  // Center cap
  const capRadius = radius * 0.1;
  const grad = ctx.createRadialGradient(cx - capRadius * 0.3, cy - capRadius * 0.3, capRadius * 0.1, cx, cy, capRadius);
  grad.addColorStop(0, '#ffe066');
  grad.addColorStop(0.5, '#d4a017');
  grad.addColorStop(1, '#7a5c00');

  ctx.beginPath();
  ctx.arc(cx, cy, capRadius, 0, 2 * Math.PI);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#5a4000';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export default function RouletteWheel({ sections, rotation, isSpinning, onSpinEnd }: RouletteWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawWheel(canvasRef.current, sections);
    }
  }, [sections]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (isSpinning) {
      wrapper.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    } else {
      wrapper.style.transition = 'none';
    }
    wrapper.style.transform = `rotate(${rotation}deg)`;
  }, [rotation, isSpinning]);

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      <div
        ref={wrapperRef}
        className="origin-center"
        style={{ width: SIZE, height: SIZE }}
        onTransitionEnd={onSpinEnd}
      >
        <canvas
          ref={canvasRef}
          style={{
            filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
