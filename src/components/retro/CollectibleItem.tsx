"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCollectibles } from "@/hooks/useCollectibles";
import { useRetroSound } from "@/hooks/useRetroSound";

interface CollectibleItemProps {
  id: string;
  children: React.ReactNode;
  onTrigger?: () => boolean; // Return true if the trigger condition is met
}

// Wrapper that reveals the collectible when triggered
// The actual trigger logic is handled by the parent component
export function CollectibleTrigger({
  id,
  emoji,
  triggered,
}: {
  id: string;
  emoji: string;
  triggered: boolean;
}) {
  const { collected, collect } = useCollectibles();
  const { playSound } = useRetroSound();
  const isCollected = collected.has(id);

  if (isCollected || !triggered) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] cursor-pointer"
        onClick={() => {
          collect(id);
          playSound("collectFound");
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255,215,0,0.6))",
          }}
        >
          {emoji}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
