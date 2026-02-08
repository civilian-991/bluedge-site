"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/data";
import { useRetroSound } from "@/hooks/useRetroSound";
import GlitchText from "./GlitchText";

function ArcadeCounter({ target, suffix, onStart }: { target: number; suffix: string; onStart?: () => void }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    onStart?.();

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Step function for arcade feel
      const stepped = Math.floor(progress * target);
      setCount(stepped);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, target, onStart]);

  return (
    <span ref={ref}>
      {String(count).padStart(String(target).length, "0")}
      {suffix}
    </span>
  );
}

// Pac-Man dot row
function PacManDots() {
  return (
    <div className="flex items-center gap-2 justify-center my-6">
      {/* Pac-Man */}
      <motion.div
        animate={{ x: [0, 200] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div
          className="w-5 h-5 bg-[#F5D547] rounded-full"
          style={{
            clipPath: "polygon(100% 50%, 70% 0%, 0% 0%, 0% 100%, 70% 100%)",
          }}
        />
      </motion.div>
      {/* Dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/30"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default function ArcadeStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const { playSound } = useRetroSound();
  const soundPlayed = useRef(false);

  return (
    <div ref={sectionRef}>
      {/* Scoreboard header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <GlitchText
          as="span"
          intensity="intense"
          className="text-xs tracking-[0.3em] uppercase"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            color: "#F5D547",
            textShadow: "0 0 10px rgba(245,213,71,0.4)",
          }}
        >
          HIGH SCORES
        </GlitchText>
      </motion.div>

      {/* Arcade scoreboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden crt-glow"
        style={{
          background: "linear-gradient(180deg, #0a0a18 0%, #050510 100%)",
          border: "3px solid #222",
        }}
      >
        {/* Scan lines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          }}
        />

        <div className="relative z-[5] p-6 md:p-10">
          {/* Table header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-2">
            <span
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "#2CACE2" }}
            >
              RANK
            </span>
            <span
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "#2CACE2" }}
            >
              ACHIEVEMENT
            </span>
            <span
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", color: "#2CACE2" }}
            >
              SCORE
            </span>
          </div>

          {/* Stat rows */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex items-center justify-between px-4 py-4 border-b border-white/5 hover:bg-white/5 transition-colors group"
            >
              {/* Rank */}
              <span
                className="text-[#F5D547] min-w-[3rem]"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.7rem",
                  textShadow: "0 0 5px rgba(245,213,71,0.3)",
                }}
              >
                #{i + 1}
              </span>

              {/* Achievement name */}
              <div className="flex items-center gap-3 flex-1 px-4">
                <stat.icon className="w-5 h-5 text-[#2CACE2]" />
                <span
                  className="text-white/70 group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem" }}
                >
                  {stat.label}
                </span>
              </div>

              {/* Score */}
              <span
                className="text-white font-bold min-w-[5rem] text-right"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.9rem",
                  textShadow: "0 0 10px rgba(255,255,255,0.3)",
                }}
              >
                <ArcadeCounter
                  target={stat.number}
                  suffix={stat.suffix}
                  onStart={i === 0 ? () => {
                    if (!soundPlayed.current) {
                      soundPlayed.current = true;
                      playSound("arcadeCount");
                    }
                  } : undefined}
                />
              </span>
            </motion.div>
          ))}

          {/* Pac-Man dots */}
          <PacManDots />

          {/* INSERT COIN */}
          <div className="text-center">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "reverse" as const }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.55rem",
                color: "#F5D547",
              }}
            >
              INSERT COIN
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
