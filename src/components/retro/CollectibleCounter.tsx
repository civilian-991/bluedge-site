"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCollectibles, COLLECTIBLES } from "@/hooks/useCollectibles";

export default function CollectibleCounter() {
  const { count, total, justFound } = useCollectibles();

  const foundItem = justFound
    ? COLLECTIBLES.find((c) => c.id === justFound)
    : null;

  return (
    <>
      {/* Counter badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5, type: "spring" }}
        className="fixed bottom-6 left-6 z-[999] flex items-center gap-2"
      >
        <motion.div
          className="px-3 py-1.5 rounded-full border flex items-center gap-2"
          style={{
            background: "rgba(5,5,8,0.85)",
            backdropFilter: "blur(8px)",
            borderColor:
              count === total
                ? "rgba(255,215,0,0.5)"
                : "rgba(255,255,255,0.1)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.55rem",
          }}
          animate={
            count > 0 && count < total
              ? { boxShadow: ["0 0 5px rgba(255,215,0,0.2)", "0 0 15px rgba(255,215,0,0.4)", "0 0 5px rgba(255,215,0,0.2)"] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>🔍</span>
          <span className="text-white/60">
            {count}/{total}
          </span>
        </motion.div>
      </motion.div>

      {/* Found notification toast */}
      <AnimatePresence>
        {foundItem && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed bottom-20 left-1/2 z-[1000] px-6 py-3 rounded-xl"
            style={{
              background: "rgba(5,5,8,0.95)",
              border: "2px solid rgba(255,215,0,0.4)",
              boxShadow: "0 0 30px rgba(255,215,0,0.2)",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.6rem",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{foundItem.emoji}</span>
              <div>
                <div className="text-[#FFD700] mb-1">FOUND!</div>
                <div className="text-white/60">{foundItem.name}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
