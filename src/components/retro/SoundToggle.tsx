"use client";

import { motion } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

export default function SoundToggle() {
  const { muted, toggleMute } = useRetroSound();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, type: "spring" }}
      onClick={toggleMute}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      className="fixed bottom-6 right-6 z-[999] w-10 h-10 rounded-full border border-white/20 bg-[#050508]/80 backdrop-blur-sm flex items-center justify-center hover:border-[#2CACE2]/50 transition-colors group"
    >
      {muted ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40 group-hover:text-white/70 transition-colors"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#2CACE2]/70 group-hover:text-[#2CACE2] transition-colors"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </motion.button>
  );
}
