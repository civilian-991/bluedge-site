"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectibles, COLLECTIBLES } from "@/hooks/useCollectibles";
import { useRetroSound } from "@/hooks/useRetroSound";

function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#FFD700", "#2CACE2", "#ff6b6b", "#00ff88", "#ff9f43", "#c084fc"];
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      rotation: number;
      rv: number;
      life: number;
    }[] = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 5,
        w: 4 + Math.random() * 8,
        h: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rv: (Math.random() - 0.5) * 10,
        life: 1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rotation += p.rv;
        p.life -= 0.003;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (alive) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1001] pointer-events-none"
    />
  );
}

const funFacts = [
  "We once designed an entire campaign during a power outage (candles help creativity!)",
  "Our team consumes roughly 47 cups of coffee per day",
  "The BluEdge logo has been subtly refined 12 times since 2004",
  "We've worked with clients in 5 countries without leaving Beirut once (thanks, Zoom!)",
  "Our first-ever project was a flyer for a local bakery — we still have it framed",
];

export default function CollectibleCelebration() {
  const { allFound, setAllFound, resetAll } = useCollectibles();
  const { playSound } = useRetroSound();

  useEffect(() => {
    if (allFound) {
      playSound("konamiVictory");
    }
  }, [allFound, playSound]);

  return (
    <>
      <ConfettiCanvas active={allFound} />

      <AnimatePresence>
        {allFound && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1002] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setAllFound(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 100, rotateX: -30 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative max-w-lg w-[90%] p-8 rounded-2xl text-center"
              style={{
                background: "linear-gradient(180deg, #1a1a30 0%, #0a0a18 100%)",
                border: "3px solid rgba(255,215,0,0.4)",
                boxShadow: "0 0 60px rgba(255,215,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Banner */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="px-6 py-2 rounded-full inline-block mb-6"
                style={{
                  background: "linear-gradient(90deg, #FFD700, #FFA500)",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.65rem",
                  color: "#1a1a30",
                }}
              >
                ACHIEVEMENT UNLOCKED
              </motion.div>

              {/* Collectibles display */}
              <div className="flex justify-center gap-4 mb-6">
                {COLLECTIBLES.map((item, i) => (
                  <motion.span
                    key={item.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    className="text-3xl"
                    title={item.name}
                  >
                    {item.emoji}
                  </motion.span>
                ))}
              </div>

              <h3
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.8rem",
                  color: "#FFD700",
                  lineHeight: 1.6,
                }}
              >
                ALL 5 COLLECTIBLES FOUND!
              </h3>

              {/* Fun fact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="p-4 rounded-lg border border-white/10 bg-white/[0.02] mb-6"
              >
                <p className="text-[10px] uppercase tracking-wider text-[#FFD700] mb-2"
                   style={{ fontFamily: "'Press Start 2P', monospace" }}>
                  Fun Fact
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {funFacts[Math.floor(Math.random() * funFacts.length)]}
                </p>
              </motion.div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setAllFound(false)}
                  className="px-6 py-2 rounded-lg border border-white/20 text-white/60 text-sm hover:border-white/40 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={resetAll}
                  className="px-6 py-2 rounded-lg text-sm"
                  style={{
                    background: "linear-gradient(90deg, #FFD700, #FFA500)",
                    color: "#1a1a30",
                    fontWeight: 600,
                  }}
                >
                  Hunt Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
