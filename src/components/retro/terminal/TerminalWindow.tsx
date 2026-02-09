"use client";

import { motion } from "framer-motion";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  title = "BLUEDGE.EXE",
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full max-w-5xl mx-auto ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a2e] border border-b-0 border-accent/20 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs font-mono text-accent/60 tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-white/30">
          <span>BLUEDGE DOS v4.20</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="relative bg-[#0a0a12] border border-accent/20 rounded-b-lg overflow-hidden">
        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(44,172,226,0.1) 2px, rgba(44,172,226,0.1) 4px)",
          }}
        />
        {/* CRT glow */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-accent/[0.02] to-transparent" />

        <div className="relative z-0 p-6 md:p-8 font-mono text-sm md:text-base text-green-400 leading-relaxed min-h-[60vh] overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
