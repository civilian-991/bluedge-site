"use client";

import { useTimeTheme } from "@/hooks/useTimeTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TimeThemeProvider() {
  const { theme, config, isOverride, cycleTheme } = useTimeTheme();
  const [showLabel, setShowLabel] = useState(false);

  return (
    <>
      {/* Background tint overlay — transitions smoothly between themes */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: config.bgTint,
          transition: "background 2s ease",
        }}
      />

      {/* Clock icon toggle — positioned near SoundToggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.2, type: "spring" }}
        onClick={cycleTheme}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        aria-label={`Current theme: ${config.label}. Click to cycle.`}
        className="fixed bottom-6 right-[4.5rem] z-[999] w-10 h-10 rounded-full border border-white/20 bg-[#050508]/80 backdrop-blur-sm flex items-center justify-center hover:border-[#2CACE2]/50 transition-colors group"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors"
          style={{ color: config.accent }}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>

        {/* Override dot indicator */}
        {isOverride && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ background: config.accent }}
          />
        )}

        {/* Theme label tooltip */}
        <AnimatePresence>
          {showLabel && (
            <motion.span
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap bg-[#050508]/90 border border-white/10"
              style={{ color: config.accent }}
            >
              {config.label} {isOverride ? "(manual)" : ""}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
