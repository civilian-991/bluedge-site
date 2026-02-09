"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

interface FilmCountdownProps {
  onComplete: () => void;
}

// Pre-generate sparkle data at module level to avoid Math.random() in render
const SPARKLE_DATA = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360;
  const rad = (angle * Math.PI) / 180;
  const distance = 60 + Math.random() * 40;
  return {
    id: i,
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance,
    delay: i * 0.03,
    size: 3 + Math.random() * 4,
  };
});

// Sparkle particles for the collectible celebration
function SparkleEffect() {

  return (
    <div className="absolute inset-0 pointer-events-none">
      {SPARKLE_DATA.map((s) => (
        <motion.div
          key={s.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-sky-300"
          style={{ width: s.size, height: s.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.x, y: s.y, opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: s.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function FilmCountdown({ onComplete }: FilmCountdownProps) {
  const [count, setCount] = useState(5);
  const [done, setDone] = useState(false);
  const [showSnap, setShowSnap] = useState(false);
  const [collectibleFound, setCollectibleFound] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const { playSound } = useRetroSound();
  const started = useRef(false);

  // Handle the secret "3" click
  const handleThreeClick = useCallback(() => {
    if (collectibleFound) return;
    setCollectibleFound(true);
    setShowSparkles(true);
    playSound("filmSnap");

    // Show toast after a brief flash
    setTimeout(() => setShowToast(true), 200);

    // Hide toast after 2.5s
    setTimeout(() => setShowToast(false), 2700);
  }, [collectibleFound, playSound]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Respect reduced motion — use microtask to avoid sync setState in effect
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => {
        setDone(true);
        onComplete();
      });
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
        className="fixed inset-0 z-[200] bg-[#0a0e1a] flex items-center justify-center"
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
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-sky-200/60">
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

            {/* Number — "3" is the secret clickable collectible */}
            <motion.span
              className={`absolute inset-0 flex items-center justify-center text-7xl font-bold font-mono ${
                count === 3
                  ? "text-sky-100 cursor-pointer select-none"
                  : "text-sky-100"
              }`}
              style={{
                textShadow:
                  count === 3 && collectibleFound
                    ? "0 0 50px rgba(44,172,226,0.9), 0 0 80px rgba(44,172,226,0.5)"
                    : "0 0 30px rgba(44,172,226,0.5)",
              }}
              onClick={count === 3 ? handleThreeClick : undefined}
              // Brief flash when collectible is triggered
              animate={
                count === 3 && collectibleFound
                  ? {
                      scale: [1, 1.3, 1],
                      color: [
                        "rgb(224, 242, 254)",
                        "rgb(44, 172, 226)",
                        "rgb(224, 242, 254)",
                      ],
                    }
                  : {}
              }
              transition={
                count === 3 && collectibleFound
                  ? { duration: 0.4, ease: "easeOut" }
                  : undefined
              }
            >
              {count}
            </motion.span>

            {/* Sparkle burst when collectible found on "3" */}
            {count === 3 && showSparkles && <SparkleEffect />}
          </motion.div>
        )}

        {/* Director's Cut toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[210] px-6 py-3 rounded-lg border border-sky-400/30 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6,8,15,0.95) 0%, rgba(10,14,26,0.95) 100%)",
                boxShadow:
                  "0 0 30px rgba(44,172,226,0.15), inset 0 1px 0 rgba(44,172,226,0.1)",
              }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  🎬
                </motion.span>
                <div>
                  <p
                    className="text-sky-400 font-bold text-xs tracking-wider"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.55rem" }}
                  >
                    DIRECTOR&apos;S CUT UNLOCKED!
                  </p>
                  <p className="text-sky-200/50 text-[10px] mt-1">
                    You caught the magic frame
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
