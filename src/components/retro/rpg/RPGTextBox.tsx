"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

interface RPGTextBoxProps {
  text: string;
  speaker?: string;
  speed?: number;
  onComplete?: () => void;
  autoAdvance?: boolean;
}

export default function RPGTextBox({
  text,
  speaker,
  speed = 30,
  onComplete,
  autoAdvance = false,
}: RPGTextBoxProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { playSound } = useRetroSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedChars(0);
    setIsComplete(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedChars(text.length);
      setIsComplete(true);
      return;
    }

    let charIdx = 0;
    intervalRef.current = setInterval(() => {
      charIdx++;
      setDisplayedChars(charIdx);
      if (charIdx % 3 === 0) playSound("rpgMenuSelect");
      if (charIdx >= text.length) {
        clearInterval(intervalRef.current!);
        setIsComplete(true);
        if (autoAdvance && onComplete) {
          setTimeout(onComplete, 1500);
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, autoAdvance, onComplete, playSound]);

  const handleClick = () => {
    if (!isComplete) {
      // Skip to end
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedChars(text.length);
      setIsComplete(true);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="relative max-w-2xl mx-auto cursor-pointer"
    >
      {/* RPG dialog box frame */}
      <div className="border-2 border-white/30 bg-[#0a0a20]/95 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(44,172,226,0.1)]">
        {/* Inner border */}
        <div className="absolute inset-2 border border-white/10 rounded-md pointer-events-none" />

        {speaker && (
          <div className="absolute -top-3 left-6 px-3 bg-[#0a0a20] text-accent text-xs font-mono tracking-wider uppercase">
            {speaker}
          </div>
        )}

        <p className="text-white/90 font-mono text-sm md:text-base leading-relaxed min-h-[3em]">
          {text.slice(0, displayedChars)}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-white/80 ml-0.5 align-middle"
            />
          )}
        </p>

        {/* Continue indicator */}
        {isComplete && (
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute bottom-2 right-4 text-accent/60 text-xs font-mono"
          >
            ▼
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
