"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VUMeterProps {
  bars?: number;
  active?: boolean;
}

export default function VUMeter({ bars = 12, active = true }: VUMeterProps) {
  const [levels, setLevels] = useState<number[]>(Array(bars).fill(0));

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLevels(Array(bars).fill(0.4));
      return;
    }

    const interval = setInterval(() => {
      setLevels(
        Array(bars)
          .fill(0)
          .map(() => Math.random() * 0.8 + 0.2)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [bars, active]);

  return (
    <div className="flex items-end gap-0.5 h-8">
      {levels.map((level, i) => {
        const height = Math.round(level * 100);
        const isHot = height > 75;
        const isWarm = height > 50;

        return (
          <motion.div
            key={i}
            className="w-1.5 rounded-sm origin-bottom"
            animate={{ scaleY: level }}
            transition={{ duration: 0.1 }}
            style={{
              height: "100%",
              backgroundColor: isHot
                ? "#EF4444"
                : isWarm
                ? "#F59E0B"
                : "#10B981",
            }}
          />
        );
      })}
    </div>
  );
}
