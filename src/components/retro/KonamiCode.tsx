"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useRetroSound } from "@/hooks/useRetroSound";

const pixelTeam = [
  { name: "Strategist", color: "#2CACE2", emoji: "🤖" },
  { name: "Marketer", color: "#0077B6", emoji: "🧘" },
  { name: "Designer", color: "#38BDF8", emoji: "⚔️" },
  { name: "Researcher", color: "#7DD3FC", emoji: "🔬" },
  { name: "SEO Pro", color: "#0EA5E9", emoji: "⚙️" },
  { name: "Writer", color: "#0284C7", emoji: "📚" },
];

export default function KonamiCode() {
  const { isActivated, reset } = useKonamiCode();
  const { playSound } = useRetroSound();

  useEffect(() => {
    if (!isActivated) return;
    playSound("konamiVictory");
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isActivated, reset]);

  return (
    <AnimatePresence>
      {isActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-0 z-[9995] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          {/* Arcade cabinet frame */}
          <div className="relative w-full max-w-3xl mx-4">
            {/* Cabinet top */}
            <div
              className="text-center py-4 rounded-t-2xl"
              style={{
                background: "linear-gradient(180deg, #1a1a2e 0%, #0a0a1a 100%)",
                border: "3px solid #333",
                borderBottom: "none",
              }}
            >
              <h2
                className="text-2xl md:text-3xl tracking-wider"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  color: "#38BDF8",
                  textShadow: "0 0 10px rgba(56,189,248,0.5)",
                }}
              >
                BLUEDGE ARCADE
              </h2>
            </div>

            {/* Screen area */}
            <div
              className="relative crt-curve overflow-hidden"
              style={{
                background: "#0a0a12",
                border: "3px solid #333",
                borderTop: "none",
                borderBottom: "none",
                minHeight: "400px",
              }}
            >
              {/* CRT scan lines */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)",
                }}
              />

              {/* Pixel grid background */}
              <div className="absolute inset-0 pixel-grid" />

              {/* SELECT YOUR HERO header */}
              <div className="pt-8 pb-4 text-center">
                <motion.p
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#2CACE2",
                    textShadow: "0 0 10px rgba(44,172,226,0.5)",
                  }}
                >
                  SELECT YOUR HERO
                </motion.p>
              </div>

              {/* 8-bit team characters */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-6 py-6">
                {pixelTeam.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                  >
                    {/* Pixel character */}
                    <motion.div
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${member.color}33, ${member.color}11)`,
                        border: `2px solid ${member.color}66`,
                        boxShadow: `0 0 15px ${member.color}33`,
                      }}
                    >
                      <span className="text-3xl md:text-4xl">{member.emoji}</span>
                      {/* Health bar */}
                      <div className="absolute -bottom-2 left-1 right-1 h-1.5 rounded-full bg-black/50">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: member.color }}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                    {/* Name */}
                    <span
                      className="text-center"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "0.45rem",
                        color: member.color,
                        textShadow: `0 0 5px ${member.color}55`,
                      }}
                    >
                      {member.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Score display */}
              <div className="flex justify-center gap-8 py-4">
                <div className="text-center">
                  <span
                    className="block text-xs"
                    style={{ fontFamily: "'Press Start 2P', monospace", color: "#38BDF8" }}
                  >
                    HIGH SCORE
                  </span>
                  <motion.span
                    className="block text-lg mt-1"
                    style={{ fontFamily: "'Press Start 2P', monospace", color: "#fff" }}
                    animate={{ textShadow: ["0 0 5px #fff", "0 0 15px #2CACE2", "0 0 5px #fff"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    150,000
                  </motion.span>
                </div>
                <div className="text-center">
                  <span
                    className="block text-xs"
                    style={{ fontFamily: "'Press Start 2P', monospace", color: "#38BDF8" }}
                  >
                    LEVEL
                  </span>
                  <span
                    className="block text-lg mt-1"
                    style={{ fontFamily: "'Press Start 2P', monospace", color: "#fff" }}
                  >
                    20+
                  </span>
                </div>
              </div>

              {/* INSERT COIN blink */}
              <div className="pb-6 text-center">
                <motion.p
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "reverse" as const }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.65rem",
                    color: "#38BDF8",
                  }}
                >
                  INSERT COIN TO PLAY
                </motion.p>
              </div>
            </div>

            {/* Cabinet bottom */}
            <div
              className="text-center py-3 rounded-b-2xl"
              style={{
                background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)",
                border: "3px solid #333",
                borderTop: "none",
              }}
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-white/40 tracking-wider"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem" }}
              >
                PRESS ESC TO EXIT
              </motion.p>
            </div>
          </div>

          {/* Decorative arcade dots */}
          <div className="absolute top-10 left-10 flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#38BDF8]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <div className="absolute bottom-10 right-10 flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#2CACE2]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
