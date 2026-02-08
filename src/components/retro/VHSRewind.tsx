"use client";

import { useEffect, useRef, useState } from "react";

export default function VHSRewind() {
  const [intensity, setIntensity] = useState(0);
  const [isRewinding, setIsRewinding] = useState(false);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);
  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastTime = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      lastTime = now;

      const currentY = window.scrollY;
      const rawVelocity = (currentY - lastScrollY.current) / dt;
      lastScrollY.current = currentY;

      // Smooth velocity
      velocityRef.current = velocityRef.current * 0.7 + rawVelocity * 0.3;

      // Negative velocity = scrolling up = rewind
      if (velocityRef.current < -0.3) {
        const power = Math.min(Math.abs(velocityRef.current) / 3, 1);
        setIntensity(power);
        setIsRewinding(true);

        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
        fadeTimeout.current = setTimeout(() => {
          setIsRewinding(false);
          setIntensity(0);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  if (!isRewinding || intensity < 0.05) return null;

  const trackingLineCount = Math.floor(3 + intensity * 10);

  return (
    <div className="vhs-rewind-overlay" style={{ opacity: intensity }}>
      {/* Tracking lines */}
      {[...Array(trackingLineCount)].map((_, i) => (
        <div
          key={i}
          className="vhs-tracking-line"
          style={{
            top: `${(i / trackingLineCount) * 100 + Math.random() * 5}%`,
            opacity: 0.15 + intensity * 0.2,
            height: `${1 + intensity * 2}px`,
          }}
        />
      ))}

      {/* Color channel separation */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: `inset ${intensity * 3}px 0 0 rgba(255,0,0,${intensity * 0.08}), inset ${-intensity * 3}px 0 0 rgba(0,255,255,${intensity * 0.08})`,
        }}
      />

      {/* REWIND text */}
      {intensity > 0.3 && (
        <div
          className="absolute top-8 right-8"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.6rem",
            color: `rgba(255,255,255,${intensity * 0.5})`,
            textShadow: `0 0 10px rgba(255,255,255,${intensity * 0.3})`,
            animation: "arcade-blink 0.5s step-end infinite",
          }}
        >
          ◀◀ REWIND
        </div>
      )}

      {/* Screen wobble via subtle transform */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(${Math.sin(Date.now() / 50) * intensity * 2}px)`,
        }}
      />
    </div>
  );
}
