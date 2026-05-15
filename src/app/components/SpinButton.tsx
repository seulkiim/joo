interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function SpinButton({ onClick, disabled }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-12 py-4 text-xl font-bold rounded-full
        transition-all duration-200
        ${disabled
          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-gray-900 shadow-lg hover:from-yellow-300 hover:to-yellow-500 hover:scale-105 active:scale-95 cursor-pointer'
        }
      `}
      style={
        disabled
          ? {}
          : {
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.4), 0 4px 15px rgba(0,0,0,0.5)',
            }
      }
    >
      {disabled ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
          돌리는 중...
        </span>
      ) : (
        '🎰 돌리기'
      )}
    </button>
  );
}
