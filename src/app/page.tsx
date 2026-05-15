'use client';

import { useRoulette } from './components/hooks/useRoulette';
import RouletteWheel from './components/RouletteWheel';
import WheelPointer from './components/WheelPointer';
import SpinButton from './components/SpinButton';
import SectionConfig from './components/SectionConfig';
import ResultDisplay from './components/ResultDisplay';

export default function Home() {
  const { sections, rotation, isSpinning, winner, spin, onSpinEnd, sectionCount, setSectionCount } = useRoulette();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center justify-center px-4 py-12 gap-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-tight mb-1">
          ROULETTE
        </h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Casino Spinner</p>
      </div>

      {/* Wheel container */}
      <div className="relative flex items-center justify-center">
        {/* Glow behind wheel */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Outer decorative border */}
        <div
          className="relative rounded-full p-2"
          style={{
            background: 'linear-gradient(145deg, #3a2a00, #7a5c00, #3a2a00)',
            boxShadow: '0 0 40px rgba(255,215,0,0.15), inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          <div className="relative rounded-full overflow-visible">
            <WheelPointer />
            <RouletteWheel
              sections={sections}
              rotation={rotation}
              isSpinning={isSpinning}
              onSpinEnd={onSpinEnd}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <SpinButton onClick={spin} disabled={isSpinning} />
        <SectionConfig value={sectionCount} onChange={setSectionCount} disabled={isSpinning} />
      </div>

      {/* Result */}
      <ResultDisplay winner={winner} />
    </main>
  );
}
