"use client";

import { motion } from "framer-motion";

interface TerminalPromptProps {
  path?: string;
  children?: React.ReactNode;
}

export function TerminalPrompt({ path = "C:\\BLUEDGE", children }: TerminalPromptProps) {
  return (
    <div className="flex items-start gap-0 flex-wrap">
      <span className="text-accent shrink-0">{path}&gt;</span>
      <span className="ml-1">{children}</span>
    </div>
  );
}

export function TerminalCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className="inline-block w-2.5 h-5 bg-green-400 ml-0.5 align-middle"
    />
  );
}

interface TypewriterLineProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterLine({
  text,
  delay = 0,
  speed = 30,
  className = "",
  onComplete,
}: TypewriterLineProps) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * (speed / 1000) }}
          onAnimationComplete={i === text.length - 1 ? onComplete : undefined}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
