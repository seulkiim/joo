interface SectionConfigProps {
  value: number;
  onChange: (n: number) => void;
  disabled: boolean;
}

export default function SectionConfig({ value, onChange, disabled }: SectionConfigProps) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-3">
      <label className="text-gray-300 text-sm font-medium whitespace-nowrap">
        조각 수
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(value - 1)}
          disabled={disabled || value <= 2}
          className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-colors flex items-center justify-center"
        >
          −
        </button>
        <input
          type="number"
          min={2}
          max={36}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v)) onChange(v);
          }}
          className="w-14 text-center bg-gray-900 border border-gray-600 rounded-lg px-2 py-1 text-white font-bold text-lg focus:outline-none focus:border-yellow-500 disabled:opacity-50"
        />
        <button
          onClick={() => onChange(value + 1)}
          disabled={disabled || value >= 36}
          className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold transition-colors flex items-center justify-center"
        >
          +
        </button>
      </div>
      <span className="text-gray-500 text-xs">(2~36)</span>
    </div>
  );
}
