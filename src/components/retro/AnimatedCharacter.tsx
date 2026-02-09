"use client";

import { motion, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

/* =============================================
   Per-character idle animation configs
   ============================================= */
interface IdleConfig {
  animate: Record<string, number[]>;
  transition: Transition;
}

const idleAnimations: Record<string, IdleConfig> = {
  STRATEGIST: {
    animate: { rotate: [0, 15, -15, 0], y: [0, -4, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  MARKETING: {
    animate: { y: [0, -8, 0], scale: [1, 1.08, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  DESIGN: {
    animate: { rotate: [0, 12, -12, 0], x: [0, 3, -3, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  RESEARCH: {
    animate: { rotate: [0, 8, -4, 0], scale: [1, 1.05, 1] },
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
  SEO: {
    animate: { rotate: [0, 360] },
    transition: { duration: 4, repeat: Infinity, ease: "linear" },
  },
  GRAMMAR: {
    animate: { rotate: [0, -5, 5, 0], y: [0, -3, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* =============================================
   Orbiting particles for selected state
   ============================================= */
function OrbitingParticles({ size }: { size: number }) {
  const count = 5;
  const radius = size === 0 ? 20 : 38; // sm vs lg

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: "#2CACE2",
            boxShadow: "0 0 6px #2CACE2",
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: [
              Math.cos(((i / count) * Math.PI * 2)) * radius,
              Math.cos(((i / count) * Math.PI * 2) + Math.PI) * radius,
              Math.cos(((i / count) * Math.PI * 2) + Math.PI * 2) * radius,
            ],
            y: [
              Math.sin(((i / count) * Math.PI * 2)) * radius,
              Math.sin(((i / count) * Math.PI * 2) + Math.PI) * radius,
              Math.sin(((i / count) * Math.PI * 2) + Math.PI * 2) * radius,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: (i / count) * 2,
          }}
        />
      ))}
    </div>
  );
}

/* =============================================
   AnimatedCharacter — idle + selected animations
   ============================================= */
export default function AnimatedCharacter({
  icon,
  characterType,
  isSelected,
  size = "sm",
}: {
  icon: string;
  characterType: string;
  isSelected: boolean;
  size?: "sm" | "lg";
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Reduced motion: static emoji
  if (reducedMotion) {
    return (
      <span className={`animated-character ${size === "lg" ? "text-6xl" : "text-3xl sm:text-4xl"}`}>
        {icon}
      </span>
    );
  }

  const config = idleAnimations[characterType];
  if (!config) {
    return (
      <span className={size === "lg" ? "text-6xl" : "text-3xl sm:text-4xl"}>
        {icon}
      </span>
    );
  }

  // Build animation configs based on selection state
  const baseAnimate = config.animate;
  const amplifiedAnimate = Object.fromEntries(
    Object.entries(baseAnimate).map(([key, vals]) => [
      key,
      vals.map((v) => {
        if (key === "rotate" && characterType === "SEO") return v;
        if (key === "scale") return 1 + (v - 1) * 2;
        return v * 2;
      }),
    ])
  );

  // Determine final animate/transition
  let finalAnimate: Record<string, number[]>;
  let finalTransition: Transition;

  if (isMobile) {
    finalAnimate = { y: [0, -3, 0] };
    finalTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" };
  } else if (isSelected) {
    finalAnimate = amplifiedAnimate;
    // 60% duration for selected (extract duration from transition)
    const baseDuration = (config.transition as { duration?: number }).duration ?? 2;
    finalTransition = {
      ...config.transition,
      duration: baseDuration * 0.6,
    };
  } else {
    finalAnimate = baseAnimate;
    finalTransition = config.transition;
  }

  const sizeNum = size === "lg" ? 1 : 0;

  return (
    <div className="animated-character relative inline-flex items-center justify-center">
      <motion.span
        className={size === "lg" ? "text-6xl block" : "text-3xl sm:text-4xl"}
        animate={finalAnimate}
        transition={finalTransition}
      >
        {icon}
      </motion.span>
      {isSelected && !isMobile && <OrbitingParticles size={sizeNum} />}
    </div>
  );
}
