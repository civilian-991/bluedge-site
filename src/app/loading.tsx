export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-[family-name:var(--font-geist-mono)]">
      <div className="text-center">
        <p className="text-[#2CACE2] text-lg tracking-[0.3em] animate-pulse">
          LOADING
          <span className="inline-block w-[3ch] text-left animate-[dots_1.5s_steps(4,end)_infinite]">
            ...
          </span>
        </p>
        <div className="mt-4 flex justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#2CACE2] animate-[barPulse_1s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Inline keyframes — no external deps */}
      <style>{`
        @keyframes dots {
          0%  { content: ""; width: 0ch; }
          25% { width: 1ch; }
          50% { width: 2ch; }
          75% { width: 3ch; }
        }
        @keyframes barPulse {
          0%, 100% { opacity: 0.15; transform: scaleY(1); }
          50%      { opacity: 1;    transform: scaleY(2.2); }
        }
      `}</style>
    </div>
  );
}
