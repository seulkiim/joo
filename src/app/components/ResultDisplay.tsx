import { Section } from './hooks/useRoulette';

interface ResultDisplayProps {
  winner: Section | null;
}

export default function ResultDisplay({ winner }: ResultDisplayProps) {
  return (
    <div
      className={`
        transition-all duration-500
        ${winner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {winner && (
        <div className="flex items-center gap-4 bg-gray-800/80 border border-yellow-500/50 rounded-2xl px-8 py-4 shadow-lg backdrop-blur-sm">
          <div
            className="w-10 h-10 rounded-full flex-shrink-0 shadow-inner"
            style={{
              backgroundColor: winner.color,
              boxShadow: `0 0 16px ${winner.color}88`,
            }}
          />
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-medium">당첨</p>
            <p className="text-white text-3xl font-bold">{winner.label}</p>
          </div>
          <div className="text-4xl ml-2">🎉</div>
        </div>
      )}
    </div>
  );
}
