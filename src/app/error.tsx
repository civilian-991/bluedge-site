"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-[family-name:var(--font-geist-mono)]">
      <div className="max-w-xl w-full text-center">
        {/* Header bar */}
        <div className="bg-[#2CACE2] text-[#0a0a0a] px-4 py-2 text-sm font-bold tracking-widest">
          SYSTEM ERROR
        </div>

        {/* Terminal body */}
        <div className="border border-[#2CACE2]/40 bg-[#0a0a0a] p-6 text-left">
          <p className="text-[#2CACE2]/60 text-xs mb-4">
            C:\BLUEDGE\RUNTIME&gt; ERROR DETECTED
          </p>

          {/* Error message box */}
          <div className="border border-red-500/50 bg-red-500/5 p-4 mb-6">
            <p className="text-red-400 text-sm leading-relaxed break-words">
              {error.message || "An unexpected error occurred."}
            </p>
            {error.digest && (
              <p className="text-[#2CACE2]/30 text-xs mt-2">
                DIGEST: {error.digest}
              </p>
            )}
          </div>

          <p className="text-[#2CACE2]/40 text-xs mb-6">
            Press RETRY to attempt recovery or GO HOME to return to safety.
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="border border-[#2CACE2] text-[#2CACE2] px-6 py-2 text-sm tracking-wider hover:bg-[#2CACE2] hover:text-[#0a0a0a] transition-colors cursor-pointer"
            >
              [ RETRY ]
            </button>
            <a
              href="/"
              className="border border-[#2CACE2]/40 text-[#2CACE2]/60 px-6 py-2 text-sm tracking-wider hover:border-[#2CACE2] hover:text-[#2CACE2] transition-colors"
            >
              [ GO HOME ]
            </a>
          </div>
        </div>

        {/* Footer bar */}
        <div className="bg-[#2CACE2]/10 px-4 py-1 text-[#2CACE2]/30 text-xs text-right">
          BLUEDGE OS v1.0
        </div>
      </div>
    </div>
  );
}
