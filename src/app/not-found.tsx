"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes glitch {
          0%, 100% { text-shadow: 2px 0 #2CACE2, -2px 0 #ff0040; transform: translate(0); }
          20% { text-shadow: -3px 2px #2CACE2, 3px -2px #ff0040; transform: translate(-2px, 1px); }
          40% { text-shadow: 3px -1px #2CACE2, -3px 1px #ff0040; transform: translate(2px, -1px); }
          60% { text-shadow: -1px 2px #2CACE2, 1px -2px #ff0040; transform: translate(-1px, 2px); }
          80% { text-shadow: 2px -2px #2CACE2, -2px 2px #ff0040; transform: translate(1px, -2px); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          33% { opacity: 0.95; }
          66% { opacity: 0.88; }
          78% { opacity: 0.96; }
          92% { opacity: 0.7; }
          94% { opacity: 0.98; }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .glitch-text {
          animation: glitch 2.5s infinite steps(6), flicker 4s infinite;
        }
        .signal-text {
          animation: drift 3s infinite ease-in-out, flicker 5s infinite;
        }
        .scan-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(255,255,255,0.015) 2px,
            rgba(255,255,255,0.015) 4px
          );
          pointer-events: none;
          z-index: 10;
        }
        .scan-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 10;
        }
        .home-link {
          border: 1px solid #2CACE2;
          color: #2CACE2;
          transition: all 0.2s;
        }
        .home-link:hover {
          background: #2CACE2;
          color: #0a0a0a;
          box-shadow: 0 0 20px rgba(44,172,226,0.4);
        }
      `}</style>

      <div
        className="scan-wrap"
        style={{
          position: "fixed",
          inset: 0,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          overflow: "hidden",
        }}
      >
        <p
          className="font-[family-name:var(--font-geist-mono)]"
          style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
        >
          ERR::CONNECTION_REFUSED
        </p>

        <h1
          className="glitch-text font-[family-name:var(--font-space-grotesk)]"
          style={{
            fontSize: "clamp(6rem, 18vw, 14rem)",
            fontWeight: 900,
            color: "#ededed",
            lineHeight: 1,
            margin: 0,
            userSelect: "none",
          }}
        >
          404
        </h1>

        <p
          className="signal-text font-[family-name:var(--font-geist-mono)]"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            color: "#2CACE2",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          SIGNAL LOST
        </p>

        <p
          className="font-[family-name:var(--font-space-grotesk)]"
          style={{ color: "#666", fontSize: "0.9rem", maxWidth: "28ch", textAlign: "center", lineHeight: 1.6 }}
        >
          The frequency you requested could not be found on this station.
        </p>

        <Link
          href="/"
          className="home-link font-[family-name:var(--font-geist-mono)]"
          style={{
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          <span style={{ animation: "blink 1s steps(1) infinite", marginRight: "0.5rem" }}>&#9608;</span>
          Return Home
        </Link>

        <p
          className="font-[family-name:var(--font-geist-mono)]"
          style={{ position: "absolute", bottom: "2rem", color: "#333", fontSize: "0.65rem", letterSpacing: "0.2em" }}
        >
          BLUEDGE BROADCAST SYSTEMS &mdash; NO CARRIER
        </p>
      </div>
    </>
  );
}
