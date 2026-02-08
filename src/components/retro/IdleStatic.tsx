"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIdleDetection } from "@/hooks/useIdleDetection";
import TVStatic from "./shared/TVStatic";
import ScanLines from "./shared/ScanLines";
import Image from "next/image";

export default function IdleStatic() {
  const { isIdle, isDeepIdle } = useIdleDetection(15000, 30000);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  if (reducedMotion.current) return null;

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isDeepIdle ? 0.85 : 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9990] pointer-events-none"
        >
          {/* VHS static canvas */}
          <TVStatic active={isIdle} intensity={isDeepIdle ? 0.7 : 0.3} glitch={isDeepIdle} />

          {/* Scan lines */}
          <ScanLines opacity={isDeepIdle ? 0.2 : 0.1} />

          {/* NO SIGNAL overlay for deep idle */}
          <AnimatePresence>
            {isDeepIdle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
              >
                <div className="text-center">
                  <div
                    className="text-6xl md:text-8xl font-bold tracking-widest mb-6"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                      color: "white",
                      textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
                    }}
                  >
                    NO SIGNAL
                  </div>
                  <div className="relative w-24 h-24 mx-auto mt-8 opacity-50">
                    <Image
                      src="/bluedge/Logo.svg"
                      alt="BluEdge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div
                    className="mt-6 text-white/40 text-xs tracking-[0.3em] uppercase"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem" }}
                  >
                    Move mouse to resume
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
