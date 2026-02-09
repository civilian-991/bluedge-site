"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

interface FilmCountdownProps {
  onComplete: () => void;
}

export default function FilmCountdown({ onComplete }: FilmCountdownProps) {
  const [count, setCount] = useState(5);
  const [done, setDone] = useState(false);
  const [showSnap, setShowSnap] = useState(false);
  const { playSound } = useRetroSound();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playSound("filmSnap");
          setShowSnap(true);
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 600);
          return 0;
        }
        playSound("filmProjector");
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete, playSound]);

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-[#1a1208] flex items-center justify-center"
      >
        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Countdown circle */}
        {count > 0 && !showSnap && (
          <motion.div
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Crosshair circle */}
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-amber-200/60">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              {/* Crosshair lines */}
              <line x1="100" y1="10" x2="100" y2="40" stroke="currentColor" strokeWidth="1" />
              <line x1="100" y1="160" x2="100" y2="190" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="100" x2="40" y2="100" stroke="currentColor" strokeWidth="1" />
              <line x1="160" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Number */}
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-amber-100 font-mono"
              style={{
                textShadow: "0 0 30px rgba(255,200,100,0.5)",
              }}
            >
              {count}
            </motion.span>
          </motion.div>
        )}

        {/* Clapperboard snap */}
        {showSnap && (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-8xl"
          >
            🎬
          </motion.div>
        )}

        {/* Flicker effect */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{ opacity: [0, 0.03, 0, 0.02, 0] }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
