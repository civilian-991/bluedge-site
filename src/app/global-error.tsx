"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0a0a0a",
          color: "#2CACE2",
          fontFamily: "monospace",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
          <div
            style={{
              background: "#ff3333",
              color: "#0a0a0a",
              padding: "8px 16px",
              fontWeight: "bold",
              letterSpacing: "0.15em",
              fontSize: "14px",
            }}
          >
            CRITICAL SYSTEM FAILURE
          </div>

          <div
            style={{
              border: "1px solid rgba(44,172,226,0.3)",
              padding: "2rem",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "rgba(44,172,226,0.6)",
            }}
          >
            <p style={{ margin: "0 0 1rem" }}>
              A fatal error has occurred. The application could not recover.
            </p>
            {error?.digest && (
              <p style={{ margin: "0 0 1rem", fontSize: "11px", opacity: 0.4 }}>
                DIGEST: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                background: "none",
                border: "1px solid #2CACE2",
                color: "#2CACE2",
                padding: "8px 24px",
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              [ RETRY ]
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
