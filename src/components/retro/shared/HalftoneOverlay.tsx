"use client";

interface HalftoneOverlayProps {
  dotSize?: number;
  spacing?: number;
  opacity?: number;
  className?: string;
}

export default function HalftoneOverlay({
  dotSize = 1.5,
  spacing = 4,
  opacity = 0.3,
  className = "",
}: HalftoneOverlayProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="halftone-dots"
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r={dotSize}
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#halftone-dots)" />
    </svg>
  );
}
