"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =============================================
   Catmull-Rom spline interpolation
   ============================================= */
function catmullRom(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function interpolatePath(
  points: { x: number; y: number }[],
  t: number
): { x: number; y: number } {
  const n = points.length;
  const totalSegments = n - 1;
  const scaledT = t * totalSegments;
  const segment = Math.min(Math.floor(scaledT), totalSegments - 1);
  const localT = scaledT - segment;

  const p0 = points[Math.max(0, segment - 1)];
  const p1 = points[segment];
  const p2 = points[Math.min(n - 1, segment + 1)];
  const p3 = points[Math.min(n - 1, segment + 2)];

  return {
    x: catmullRom(p0.x, p1.x, p2.x, p3.x, localT),
    y: catmullRom(p0.y, p1.y, p2.y, p3.y, localT),
  };
}

/* =============================================
   Control points along the right edge
   ============================================= */
const controlPoints = [
  { x: 90, y: 3 },
  { x: 86, y: 12 },
  { x: 93, y: 22 },
  { x: 85, y: 34 },
  { x: 91, y: 45 },
  { x: 84, y: 55 },
  { x: 92, y: 65 },
  { x: 86, y: 75 },
  { x: 90, y: 85 },
  { x: 87, y: 92 },
];

/* =============================================
   Section center Y percentages for opacity fading
   ============================================= */
const sectionCenters = [0.08, 0.18, 0.28, 0.38, 0.48, 0.58, 0.68, 0.78, 0.88];

function getOpacityForProgress(t: number): number {
  let minDist = 1;
  for (const center of sectionCenters) {
    const dist = Math.abs(t - center);
    if (dist < minDist) minDist = dist;
  }
  // Near section centers (dist < 0.03) → 0.3, in transition gaps → 1.0
  return 0.3 + 0.7 * Math.min(1, minDist / 0.06);
}

const TRAIL_COUNT = 6;

export default function ScrollMascot() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const positionsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Desktop only
    if (window.innerWidth < 1024) return;
    // Reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    // Initialize trail positions
    positionsRef.current = Array(TRAIL_COUNT + 1).fill({ x: 90, y: 3 });

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        const t = self.progress;
        const pos = interpolatePath(controlPoints, t);
        const rocket = rocketRef.current;
        if (!rocket) return;

        // Calculate tilt from tangent
        const dt = 0.002;
        const tNext = Math.min(1, t + dt);
        const tPrev = Math.max(0, t - dt);
        const posNext = interpolatePath(controlPoints, tNext);
        const posPrev = interpolatePath(controlPoints, tPrev);
        const dx = posNext.x - posPrev.x;
        const dy = posNext.y - posPrev.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;

        const opacity = getOpacityForProgress(t);

        gsap.set(rocket, {
          left: `${pos.x}%`,
          top: `${pos.y}vh`,
          rotation: angle,
          opacity,
        });

        // Update trail positions with delay effect
        const newPositions = [{ x: pos.x, y: pos.y }, ...positionsRef.current.slice(0, TRAIL_COUNT)];
        positionsRef.current = newPositions;

        trailRefs.current.forEach((trail, i) => {
          if (!trail) return;
          const trailPos = newPositions[i + 1] || newPositions[newPositions.length - 1];
          const trailOpacity = opacity * (1 - (i + 1) / (TRAIL_COUNT + 1)) * 0.6;
          const trailScale = 1 - (i + 1) / (TRAIL_COUNT + 1) * 0.6;
          gsap.set(trail, {
            left: `${trailPos.x}%`,
            top: `${trailPos.y}vh`,
            opacity: trailOpacity,
            scale: trailScale,
          });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="scroll-mascot fixed inset-0 pointer-events-none z-[5]">
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0 }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${Math.max(3, 8 - i * 1.2)}px`,
              height: `${Math.max(3, 8 - i * 1.2)}px`,
              background: "#2CACE2",
              boxShadow: "0 0 4px #2CACE2",
            }}
          />
        </div>
      ))}

      {/* Mini Tintin rocket */}
      <div
        ref={rocketRef}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <div className="relative" style={{ width: 24, height: 36 }}>
          {/* Rocket body - checkerboard red/white */}
          <div
            className="absolute inset-x-[3px] top-0 bottom-[6px] rounded-t-full"
            style={{
              background:
                "linear-gradient(180deg, #0EA5E9 0%, #0EA5E9 33%, white 33%, white 66%, #0EA5E9 66%, #0EA5E9 100%)",
              boxShadow: "inset -1px 0 2px rgba(0,0,0,0.2)",
            }}
          />
          {/* Nose cone */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 8,
              height: 10,
              background: "#0EA5E9",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
          {/* Fins */}
          <div
            className="absolute bottom-[3px] -left-[2px]"
            style={{
              width: 7,
              height: 9,
              background: "#0EA5E9",
              clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <div
            className="absolute bottom-[3px] -right-[2px]"
            style={{
              width: 7,
              height: 9,
              background: "#0EA5E9",
              clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
            }}
          />
          {/* Window */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              top: 11,
              width: 7,
              height: 7,
              background: "#2CACE2",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          />
          {/* Mini exhaust */}
          <div
            className="absolute -bottom-[6px] left-1/2 -translate-x-1/2"
            style={{
              width: 8,
              height: 10,
              background:
                "linear-gradient(to bottom, #38BDF8, #0EA5E9, rgba(14,165,233,0))",
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
              filter: "blur(1px)",
              animation: "mascotFlicker 0.2s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}
