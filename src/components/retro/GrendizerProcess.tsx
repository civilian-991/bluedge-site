"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { processSteps } from "@/data";
import { CollectibleTrigger } from "./CollectibleItem";
import MagneticText from "./MagneticText";
import ScanLines from "./shared/ScanLines";
import { useRetroSound } from "@/hooks/useRetroSound";

gsap.registerPlugin(ScrollTrigger);

/* =============================================
   Spark burst — particles radiate from point
   ============================================= */
function SparkBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 60;
        const ty = Math.sin(rad) * 60;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
            style={{ background: "#2CACE2", boxShadow: "0 0 8px #2CACE2" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

/* =============================================
   Energy pulse — expanding ring
   ============================================= */
function EnergyPulse({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2CACE2] pointer-events-none z-10"
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ width: 120, height: 120, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    />
  );
}

/* =============================================
   HUD Step Card — with animated corner brackets
   ============================================= */
function HUDStepCard({
  step,
  index,
  isActive,
  isCompleted,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div
      className="process-step relative min-h-[50vh] flex items-center"
      data-step-index={index}
    >
      <div
        className="relative w-full p-6 md:p-8 rounded-lg transition-all duration-500"
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgba(44,172,226,0.08) 0%, rgba(0,119,182,0.04) 100%)"
            : isCompleted
              ? "rgba(255,255,255,0.01)"
              : "transparent",
          border: isActive
            ? "1px solid rgba(44,172,226,0.4)"
            : isCompleted
              ? "1px solid rgba(44,172,226,0.1)"
              : "1px solid rgba(255,255,255,0.03)",
          boxShadow: isActive ? "0 0 30px rgba(44,172,226,0.1)" : "none",
          opacity: isCompleted && !isActive ? 0.5 : 1,
        }}
      >
        {/* Corner brackets */}
        {isActive && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#2CACE2]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#2CACE2]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#2CACE2]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2CACE2]" />
          </>
        )}

        {/* Scan lines on active */}
        {isActive && <ScanLines opacity={0.04} />}

        {/* Phase badge + icon */}
        <div className="flex items-center gap-4 mb-4 relative z-[3]">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: isActive
                ? "linear-gradient(135deg, rgba(44,172,226,0.2), rgba(0,119,182,0.1))"
                : "rgba(255,255,255,0.03)",
              border: isActive
                ? "2px solid rgba(44,172,226,0.4)"
                : "2px solid rgba(255,255,255,0.05)",
            }}
          >
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.6rem",
                color: isActive ? "#F5D547" : isCompleted ? "#2CACE2" : "rgba(255,255,255,0.3)",
                textShadow: isActive ? "0 0 10px rgba(245,213,71,0.4)" : "none",
              }}
            >
              {isCompleted && !isActive ? "✓" : String(step.phase).padStart(2, "0")}
            </span>
          </div>
          <span className="text-2xl">{step.icon}</span>
        </div>

        {/* Title */}
        <h3
          className="mb-2 relative z-[3]"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: isActive ? "#F5D547" : isCompleted ? "rgba(255,255,255,0.5)" : "white",
            letterSpacing: "2px",
            textShadow: isActive ? "0 0 10px rgba(245,213,71,0.3)" : "none",
          }}
        >
          {step.title}
        </h3>

        {/* Subtitle */}
        <p
          className="mb-3 uppercase tracking-wider relative z-[3]"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.4rem",
            color: isActive ? "#2CACE2" : "rgba(255,255,255,0.2)",
          }}
        >
          {step.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed relative z-[3]"
          style={{
            color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* =============================================
   Mecha Parts — larger proportions
   ============================================= */
function MechaAssembly({
  activePhase,
  completedPhases,
  allComplete,
}: {
  activePhase: number;
  completedPhases: Set<number>;
  allComplete: boolean;
}) {
  const [sparkPhase, setSparkPhase] = useState<number | null>(null);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [exhaustIntense, setExhaustIntense] = useState(false);
  const mechaContainerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useRetroSound();

  // Trigger spark whenever a new phase completes
  useEffect(() => {
    if (completedPhases.size > 0) {
      const latest = Math.max(...completedPhases);
      setSparkPhase(latest);
      const timer = setTimeout(() => setSparkPhase(null), 700);
      return () => clearTimeout(timer);
    }
  }, [completedPhases.size]); // eslint-disable-line react-hooks/exhaustive-deps

  // Launch sequence: rumble → power up → flash → exhaust → blast off
  useEffect(() => {
    if (!allComplete || hasLaunched || !mechaContainerRef.current) return;
    // Skip on reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Mobile check (no pin = no completion trigger, but guard anyway)
    if (window.innerWidth < 1024) return;

    setHasLaunched(true);
    const el = mechaContainerRef.current;
    const tl = gsap.timeline();

    // 1. Rumble (0.6s)
    tl.to(el, {
      x: "random(-4, 4)",
      y: "random(-3, 3)",
      duration: 0.05,
      repeat: 11,
      yoyo: true,
      ease: "none",
    });

    // 2. Power up (0.3s)
    tl.to(el, {
      scale: 1.15,
      filter: "brightness(1.4) drop-shadow(0 0 20px #2CACE2)",
      duration: 0.3,
      ease: "power2.out",
    });

    // 3. Flash burst (0.15s)
    tl.call(() => setFlashActive(true));
    tl.to({}, { duration: 0.15 });
    tl.call(() => setFlashActive(false));

    // 4. Exhaust intensify
    tl.call(() => {
      setExhaustIntense(true);
      playSound("rocketLaunch");
    });
    tl.to({}, { duration: 0.2 });

    // 5. Blast off (0.8s)
    tl.to(el, {
      y: -700,
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
    });

    return () => {
      tl.kill();
    };
  }, [allComplete, hasLaunched, playSound]);

  const showPart = (phase: number) => completedPhases.has(phase) || activePhase >= phase;

  return (
    <div className="relative w-[280px] sm:w-[340px] lg:w-[420px] h-[400px] sm:h-[480px] lg:h-[560px] mx-auto">
      {/* Flash burst overlay */}
      <AnimatePresence>
        {flashActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.07 }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-20"
            style={{
              background: "radial-gradient(circle, white 0%, #2CACE2 40%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Glow flash on completion */}
      <AnimatePresence>
        {allComplete && !hasLaunched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(44,172,226,0.3), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Mecha container — ref for launch animation */}
      <div ref={mechaContainerRef}>

      {/* Phase 3: Head — top */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.5 }}
          animate={
            showPart(3)
              ? { y: 0, opacity: 1, scale: 1 }
              : { y: -40, opacity: 0, scale: 0.5 }
          }
          transition={{ type: "spring", stiffness: 180 }}
          className="relative w-20 h-20 sm:w-24 sm:h-24"
        >
          {/* Helmet */}
          <div
            className="absolute inset-0 rounded-t-full rounded-b-lg"
            style={{
              background: "linear-gradient(180deg, #F5D547, #e6c200)",
              border: "3px solid #F5D547",
              boxShadow: "0 0 20px rgba(245,213,71,0.3)",
            }}
          />
          {/* Visor */}
          <div
            className="absolute top-[35%] left-2 right-2 h-5 sm:h-6 rounded"
            style={{
              background: "linear-gradient(180deg, #ff4444, #cc0000)",
              boxShadow: "0 0 15px rgba(255,68,68,0.5)",
            }}
          />
          {/* Horn */}
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-7"
            style={{
              background: "#F5D547",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
          <SparkBurst active={sparkPhase === 3} />
          <EnergyPulse active={sparkPhase === 3} />
        </motion.div>
      </div>

      {/* Phase 1: Core/Torso — center */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            showPart(1) ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 200 }}
          className="relative w-28 h-36 sm:w-32 sm:h-40"
        >
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(180deg, #1a1a2e 0%, #0f3460 100%)",
              border: "3px solid #2CACE2",
              boxShadow: "0 0 25px rgba(44,172,226,0.3), inset 0 0 20px rgba(44,172,226,0.1)",
            }}
          />
          {/* Core energy */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2CACE2]"
            style={{ boxShadow: "0 0 25px #2CACE2, 0 0 50px rgba(44,172,226,0.5)" }}
          />
          <SparkBurst active={sparkPhase === 1} />
          <EnergyPulse active={sparkPhase === 1} />
        </motion.div>
      </div>

      {/* Phase 2: Arms — sides */}
      <div className="absolute top-[30%] left-0 right-0">
        <div className="relative flex items-center justify-between px-2 sm:px-4 lg:px-6">
          {/* Left arm */}
          <motion.div
            initial={{ x: -60, opacity: 0, rotate: -45 }}
            animate={
              showPart(2)
                ? { x: 0, opacity: 1, rotate: 0 }
                : { x: -60, opacity: 0, rotate: -45 }
            }
            transition={{ type: "spring", stiffness: 140 }}
            className="w-8 h-28 sm:w-10 sm:h-32 rounded-full"
            style={{
              background: "linear-gradient(180deg, #2CACE2, #0077B6)",
              border: "2px solid #2CACE2",
              boxShadow: "0 0 15px rgba(44,172,226,0.3)",
            }}
          />
          <div className="flex-1" />
          {/* Right arm */}
          <motion.div
            initial={{ x: 60, opacity: 0, rotate: 45 }}
            animate={
              showPart(2)
                ? { x: 0, opacity: 1, rotate: 0 }
                : { x: 60, opacity: 0, rotate: 45 }
            }
            transition={{ type: "spring", stiffness: 140, delay: 0.1 }}
            className="w-8 h-28 sm:w-10 sm:h-32 rounded-full"
            style={{
              background: "linear-gradient(180deg, #2CACE2, #0077B6)",
              border: "2px solid #2CACE2",
              boxShadow: "0 0 15px rgba(44,172,226,0.3)",
            }}
          />
        </div>
        <div className="relative">
          <SparkBurst active={sparkPhase === 2} />
          <EnergyPulse active={sparkPhase === 2} />
        </div>
      </div>

      {/* Phase 4: Wings + boosters — behind torso */}
      <div className="absolute top-[28%] left-0 right-0 flex justify-center">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            showPart(4) ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 140 }}
          className="flex items-center"
        >
          {/* Left wing */}
          <div
            className="w-20 h-12 sm:w-24 sm:h-14 lg:w-28 lg:h-16"
            style={{
              background: "linear-gradient(90deg, transparent, #2CACE2)",
              clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
              boxShadow: "0 0 20px rgba(44,172,226,0.3)",
            }}
          />
          <div className="w-24 sm:w-28 lg:w-32" />
          {/* Right wing */}
          <div
            className="w-20 h-12 sm:w-24 sm:h-14 lg:w-28 lg:h-16"
            style={{
              background: "linear-gradient(270deg, transparent, #2CACE2)",
              clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
              boxShadow: "0 0 20px rgba(44,172,226,0.3)",
            }}
          />
        </motion.div>
        {/* Booster flames */}
        {showPart(4) && (
          <motion.div
            animate={{
              scaleY: exhaustIntense ? [1.8, 2.4, 1.8] : [1, 1.4, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: exhaustIntense ? 0.12 : 0.3,
              repeat: Infinity,
            }}
            className="absolute bottom-[-50%] left-1/2 -translate-x-1/2"
            style={{
              width: exhaustIntense ? "2rem" : "3.5rem",
              height: exhaustIntense ? "3rem" : "4rem",
              background: "linear-gradient(to bottom, #F5D547, #ff6b35, transparent)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              filter: "blur(3px)",
            }}
          />
        )}
        <SparkBurst active={sparkPhase === 4} />
        <EnergyPulse active={sparkPhase === 4} />
      </div>

      </div>{/* end mechaContainerRef */}

      {/* Energy lines */}
      <motion.div
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2CACE2] to-transparent" />
        <div className="absolute top-[50%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5D547] to-transparent" />
        <div className="absolute top-[75%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2CACE2] to-transparent" />
      </motion.div>
    </div>
  );
}

/* =============================================
   Mobile Mecha Part — inline per step
   ============================================= */
function MobilePartPreview({ phase }: { phase: number }) {
  const parts: Record<number, React.ReactNode> = {
    1: (
      <div className="w-16 h-20 mx-auto relative">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(180deg, #1a1a2e, #0f3460)",
            border: "2px solid #2CACE2",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#2CACE2]" />
      </div>
    ),
    2: (
      <div className="flex justify-center gap-6">
        <div className="w-4 h-16 rounded-full" style={{ background: "linear-gradient(180deg, #2CACE2, #0077B6)" }} />
        <div className="w-4 h-16 rounded-full" style={{ background: "linear-gradient(180deg, #2CACE2, #0077B6)" }} />
      </div>
    ),
    3: (
      <div className="w-12 h-12 mx-auto relative">
        <div className="absolute inset-0 rounded-t-full rounded-b-lg" style={{ background: "linear-gradient(180deg, #F5D547, #e6c200)", border: "2px solid #F5D547" }} />
        <div className="absolute top-[35%] left-1 right-1 h-3 rounded" style={{ background: "linear-gradient(180deg, #ff4444, #cc0000)" }} />
      </div>
    ),
    4: (
      <div className="flex justify-center gap-2">
        <div className="w-10 h-6" style={{ background: "linear-gradient(90deg, transparent, #2CACE2)", clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)" }} />
        <div className="w-10 h-6" style={{ background: "linear-gradient(270deg, transparent, #2CACE2)", clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }} />
      </div>
    ),
  };
  return <div className="py-3">{parts[phase]}</div>;
}

/* =============================================
   Main Component
   ============================================= */
export default function GrendizerProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [allComplete, setAllComplete] = useState(false);
  const [boltFound, setBoltFound] = useState(false);
  const hoveredParts = useRef(new Set<number>());
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useRef(false);

  const handlePartHover = useCallback((index: number) => {
    hoveredParts.current.add(index);
    if (hoveredParts.current.size === 1 && !hoverTimer.current) {
      hoverTimer.current = setTimeout(() => {
        hoveredParts.current.clear();
        hoverTimer.current = null;
      }, 3000);
    }
    if (hoveredParts.current.size >= 4) {
      setBoltFound(true);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    }
  }, []);

  useEffect(() => {
    isMobile.current = window.innerWidth < 1024;
    if (isMobile.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress * 100;

          // Determine active phase (0-4)
          const phase = Math.min(4, Math.floor(p / 25) + 1);
          setActivePhase(phase);

          // Track completed phases
          setCompletedPhases((prev) => {
            const next = new Set(prev);
            for (let i = 1; i < phase; i++) next.add(i);
            if (p >= 100) next.add(4);
            return next;
          });

          setAllComplete(p >= 98);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-ambient="section-grendizer"
      className="relative overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Starburst background */}
      <div className="absolute inset-0 starburst opacity-30" />
      <div className="absolute inset-0 speed-lines opacity-20" />

      {/* Header — outside pin */}
      <div className="relative z-10 max-w-[1800px] mx-auto py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span
            className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              color: "#F5D547",
              textShadow: "0 0 10px rgba(245,213,71,0.4)",
            }}
          >
            Battle Plan
          </span>
          <MagneticText
            as="h2"
            className="text-4xl md:text-6xl font-black mb-4 glitch-text-medium"
            style={{
              fontFamily: "'Bangers', cursive",
              color: "white",
              letterSpacing: "3px",
              textShadow: "3px 3px 0 #2CACE2, 6px 6px 0 rgba(0,0,0,0.3)",
            }}
          >
            OUR PROCESS
          </MagneticText>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Assembling your brand&apos;s ultimate form — one phase at a time
          </p>
        </motion.div>
      </div>

      {/* ======= DESKTOP: Pinned layout ======= */}
      <div ref={pinContainerRef} className="hidden lg:block relative z-10">
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 gap-16 items-start min-h-screen">
          {/* Left: scrollable steps */}
          <div ref={stepsRef}>
            {processSteps.map((step, i) => (
              <div key={step.phase} onMouseEnter={() => handlePartHover(i)}>
                <HUDStepCard
                  step={step}
                  index={i}
                  isActive={activePhase === step.phase}
                  isCompleted={completedPhases.has(step.phase)}
                />
              </div>
            ))}
          </div>

          {/* Right: fixed mecha assembly */}
          <div className="sticky top-[10vh] self-start">
            <MechaAssembly
              activePhase={activePhase}
              completedPhases={completedPhases}
              allComplete={allComplete}
            />
            {/* Systems Online text */}
            <AnimatePresence>
              {allComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-center mt-6"
                >
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "clamp(0.45rem, 1vw, 0.65rem)",
                      color: "#F5D547",
                      textShadow: "0 0 15px rgba(245,213,71,0.5), 0 0 30px rgba(245,213,71,0.3)",
                    }}
                  >
                    SYSTEMS ONLINE — ALL PHASES COMPLETE
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {!allComplete && (
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mt-6"
              >
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.45rem",
                    color: "#2CACE2",
                    textShadow: "0 0 10px rgba(44,172,226,0.4)",
                  }}
                >
                  ASSEMBLING...
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ======= MOBILE: Stacked layout ======= */}
      <div className="lg:hidden relative z-10 max-w-[1800px] mx-auto pb-24">
        {/* Simple progress bar at top */}
        <MobileProgressBar />

        <div className="space-y-6">
          {processSteps.map((step, i) => (
            <MobileStepCard key={step.phase} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Collectible */}
      <CollectibleTrigger id="lightning-bolt" emoji="⚡" triggered={boltFound} />
    </section>
  );
}

/* =============================================
   Mobile step card with inline mecha preview
   ============================================= */
function MobileStepCard({ step, index }: { step: (typeof processSteps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative p-5 rounded-lg"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(44,172,226,0.15)",
      }}
    >
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#2CACE2]/40" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#2CACE2]/40" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#2CACE2]/40" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#2CACE2]/40" />

      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded flex items-center justify-center shrink-0"
          style={{
            background: "rgba(44,172,226,0.1)",
            border: "2px solid rgba(44,172,226,0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.5rem",
              color: "#F5D547",
            }}
          >
            {String(step.phase).padStart(2, "0")}
          </span>
        </div>
        <span className="text-xl">{step.icon}</span>
        <h3
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "1.3rem",
            color: "#F5D547",
            letterSpacing: "2px",
          }}
        >
          {step.title}
        </h3>
      </div>

      <p
        className="mb-2 uppercase tracking-wider"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.35rem",
          color: "#2CACE2",
        }}
      >
        {step.subtitle}
      </p>

      <p className="text-white/50 text-sm leading-relaxed mb-3">{step.description}</p>

      {/* Inline mecha preview */}
      <MobilePartPreview phase={step.phase} />
    </motion.div>
  );
}

/* =============================================
   Mobile simple progress bar
   ============================================= */
function MobileProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          ASSEMBLY PROGRESS
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #2CACE2, #0077B6)" }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1">
        {[1, 2, 3, 4].map((p) => (
          <span
            key={p}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.25rem",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            P{p}
          </span>
        ))}
      </div>
    </div>
  );
}
