"use client";

interface ScanLinesProps {
  opacity?: number;
  className?: string;
}

export default function ScanLines({ opacity = 0.15, className = "" }: ScanLinesProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-[2] ${className}`}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, ${opacity}) 2px,
          rgba(0, 0, 0, ${opacity}) 4px
        )`,
      }}
    />
  );
}
