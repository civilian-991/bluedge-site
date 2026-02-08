"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

export default function TintinRocket() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const { playSound } = useRetroSound();

  const handleLaunch = useCallback(() => {
    if (isLaunching) return;
    setIsLaunching(true);
    playSound("rocketCountdown");

    // Countdown sequence
    let count = 3;
    setCountdown(count);

    const countInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countInterval);
        setCountdown(0); // "GO!"
        playSound("rocketLaunch");

        // Scroll to contact after brief delay
        setTimeout(() => {
          const contactEl = document.getElementById("contact");
          if (contactEl) {
            contactEl.scrollIntoView({ behavior: "smooth" });
          }
          // Reset after scroll
          setTimeout(() => {
            setIsLaunching(false);
            setCountdown(null);
          }, 2000);
        }, 800);
      }
    }, 700);
  }, [isLaunching]);

  return (
    <motion.button
      onClick={handleLaunch}
      className="group relative inline-flex items-center gap-4 cursor-pointer"
      whileHover={!isLaunching ? { scale: 1.05 } : {}}
      whileTap={!isLaunching ? { scale: 0.95 } : {}}
    >
      {/* Button background */}
      <div
        className="relative flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2CACE2, #0077B6)",
          boxShadow: "0 0 20px rgba(44,172,226,0.3), 0 4px 15px rgba(0,0,0,0.3)",
        }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />

        {/* Countdown overlay */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-full z-20"
            >
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  color: countdown === 0 ? "#F5D547" : "#fff",
                  textShadow: "0 0 15px rgba(255,255,255,0.5)",
                }}
              >
                {countdown === 0 ? "GO!" : countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rocket icon */}
        <div ref={rocketRef} className="relative z-10">
          <motion.div
            animate={
              isLaunching && countdown === 0
                ? { y: -200, opacity: 0, scale: 0.5 }
                : isLaunching
                ? { y: [0, -2, 0], rotate: [0, -2, 2, 0] }
                : {}
            }
            transition={
              isLaunching && countdown === 0
                ? { duration: 0.6, ease: "easeIn" }
                : { duration: 0.3, repeat: Infinity }
            }
          >
            {/* CSS Rocket */}
            <div className="relative w-8 h-12">
              {/* Rocket body - checkerboard red/white */}
              <div
                className="absolute inset-x-1 top-0 bottom-2 rounded-t-full"
                style={{
                  background: "linear-gradient(180deg, #ff4444 0%, #ff4444 33%, white 33%, white 66%, #ff4444 66%, #ff4444 100%)",
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
                }}
              />
              {/* Nose cone */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4"
                style={{
                  background: "#ff4444",
                  clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                }}
              />
              {/* Fins */}
              <div
                className="absolute bottom-1 -left-1 w-3 h-4"
                style={{
                  background: "#ff4444",
                  clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
                }}
              />
              <div
                className="absolute bottom-1 -right-1 w-3 h-4"
                style={{
                  background: "#ff4444",
                  clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
                }}
              />
              {/* Window */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#2CACE2] border border-white/50" />
            </div>

            {/* Exhaust flames - visible during launch */}
            <AnimatePresence>
              {isLaunching && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                >
                  <motion.div
                    animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    className="w-4 h-8"
                    style={{
                      background: "linear-gradient(to bottom, #F5D547, #ff6b35, rgba(255,100,50,0))",
                      clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
                      filter: "blur(1px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Text */}
        <span className="relative z-10 text-white font-bold text-sm uppercase tracking-wider">
          {isLaunching ? "Launching..." : "Start Your Project"}
        </span>

        {/* Arrow */}
        <motion.span
          className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
          animate={!isLaunching ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 0.7 }}
        >
          <svg className="w-4 h-4 text-white -rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5l7 7-7 7M5 12h14" />
          </svg>
        </motion.span>
      </div>

      {/* Halftone exhaust trail (visible during launch) */}
      <AnimatePresence>
        {isLaunching && countdown === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 0.5, height: 100 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-12"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(245,213,71,0.3) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
