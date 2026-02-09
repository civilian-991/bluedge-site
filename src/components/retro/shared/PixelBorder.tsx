"use client";

import { type ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

interface PixelBorderProps {
  children: ReactNode;
  className?: string;
  color?: string;
  thickness?: number;
  animate?: boolean;
}

function generatePixelShadow(color: string, thickness: number): string {
  const shadows: string[] = [];

  for (let t = 1; t <= thickness; t++) {
    // Cardinal directions
    shadows.push(`${-t}px 0 0 0 ${color}`);
    shadows.push(`${t}px 0 0 0 ${color}`);
    shadows.push(`0 ${-t}px 0 0 ${color}`);
    shadows.push(`0 ${t}px 0 0 ${color}`);
    // Diagonals (corners)
    shadows.push(`${-t}px ${-t}px 0 0 ${color}`);
    shadows.push(`${t}px ${-t}px 0 0 ${color}`);
    shadows.push(`${-t}px ${t}px 0 0 ${color}`);
    shadows.push(`${t}px ${t}px 0 0 ${color}`);
  }

  return shadows.join(", ");
}

export default function PixelBorder({
  children,
  className = "",
  color = "#2CACE2",
  thickness = 2,
  animate = false,
}: PixelBorderProps) {
  const boxShadow = useMemo(
    () => generatePixelShadow(color, thickness),
    [color, thickness]
  );

  if (animate) {
    const dimShadow = generatePixelShadow(`${color}cc`, thickness);

    return (
      <motion.div
        className={`relative ${className}`}
        style={{ boxShadow }}
        animate={{
          boxShadow: [boxShadow, dimShadow, boxShadow],
          filter: [
            `drop-shadow(0 0 0px ${color}00)`,
            `drop-shadow(0 0 6px ${color}88)`,
            `drop-shadow(0 0 0px ${color}00)`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ boxShadow }}>
      {children}
    </div>
  );
}
