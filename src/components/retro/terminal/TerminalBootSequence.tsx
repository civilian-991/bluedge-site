"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRetroSound } from "@/hooks/useRetroSound";

interface TerminalBootSequenceProps {
  serviceName: string;
  onComplete: () => void;
}

const bootLines = [
  "BLUEDGE BIOS v4.20.69",
  "Copyright (C) 2004-2024 BluEdge Agency",
  "",
  "Checking system memory... 640K OK",
  "Extended memory... 128MB OK",
  "Initializing creative drivers... OK",
  "Loading brand.sys... OK",
  "Loading design.sys... OK",
  "Loading strategy.sys... OK",
  "",
];

export default function TerminalBootSequence({
  serviceName,
  onComplete,
}: TerminalBootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { playSound } = useRetroSound();
  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const allLines = [
      ...bootLines,
      `Loading ${serviceName.toUpperCase()} module...`,
      "",
    ];

    let lineIndex = 0;

    const lineTimer = setInterval(() => {
      if (lineIndex < allLines.length) {
        setVisibleLines((prev) => [...prev, allLines[lineIndex]]);
        if (allLines[lineIndex].length > 0) {
          playSound("terminalKey");
        }
        lineIndex++;
        setProgress(Math.round((lineIndex / allLines.length) * 80));
      } else {
        clearInterval(lineTimer);
        // Progress bar phase
        let p = 80;
        const progressTimer = setInterval(() => {
          p += 4;
          setProgress(Math.min(p, 100));
          playSound("diskRead");
          if (p >= 100) {
            clearInterval(progressTimer);
            playSound("terminalBeep");
            setTimeout(() => {
              setDone(true);
              onComplete();
            }, 400);
          }
        }, 100);
      }
    }, 120);

    return () => clearInterval(lineTimer);
  }, [serviceName, onComplete, playSound]);

  // ASCII progress bar
  const barWidth = 30;
  const filled = Math.round((progress / 100) * barWidth);
  const bar = "[" + "█".repeat(filled) + "░".repeat(barWidth - filled) + "]";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center p-8"
        >
          <div className="font-mono text-green-400 text-xs md:text-sm max-w-2xl w-full space-y-0 leading-relaxed">
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={line === "" ? "h-4" : ""}
              >
                {line}
              </motion.div>
            ))}

            {visibleLines.length >= bootLines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <div className="text-accent">{bar} {progress}%</div>
                {progress >= 100 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-300 font-bold"
                  >
                    SYSTEM READY. PRESS ANY KEY TO CONTINUE...
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
