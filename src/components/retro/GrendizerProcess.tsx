"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { processSteps } from "@/data";

gsap.registerPlugin(ScrollTrigger);

// Mecha body part for each phase
function MechaPart({ phase, isActive }: { phase: number; isActive: boolean }) {
  const parts = [
    // Phase 1: Core/Torso
    <div key="core" className="relative">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-20 h-24 mx-auto relative"
      >
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(180deg, #1a1a2e 0%, #0f3460 100%)",
            border: "3px solid #2CACE2",
            boxShadow: "0 0 20px rgba(44,172,226,0.3), inset 0 0 15px rgba(44,172,226,0.1)",
          }}
        />
        {/* Core energy */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2CACE2]"
          style={{ boxShadow: "0 0 20px #2CACE2, 0 0 40px rgba(44,172,226,0.5)" }}
        />
      </motion.div>
    </div>,
    // Phase 2: Arms
    <div key="arms" className="relative flex items-center justify-center gap-16">
      <motion.div
        initial={{ x: -50, opacity: 0, rotate: -45 }}
        animate={isActive ? { x: 0, opacity: 1, rotate: 0 } : { x: -50, opacity: 0, rotate: -45 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="w-6 h-20 rounded-full"
        style={{
          background: "linear-gradient(180deg, #2CACE2, #0077B6)",
          border: "2px solid #2CACE2",
          boxShadow: "0 0 15px rgba(44,172,226,0.3)",
        }}
      />
      <div className="w-16" /> {/* Spacer for torso */}
      <motion.div
        initial={{ x: 50, opacity: 0, rotate: 45 }}
        animate={isActive ? { x: 0, opacity: 1, rotate: 0 } : { x: 50, opacity: 0, rotate: 45 }}
        transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
        className="w-6 h-20 rounded-full"
        style={{
          background: "linear-gradient(180deg, #2CACE2, #0077B6)",
          border: "2px solid #2CACE2",
          boxShadow: "0 0 15px rgba(44,172,226,0.3)",
        }}
      />
    </div>,
    // Phase 3: Head/Helmet
    <div key="head" className="relative">
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.5 }}
        animate={isActive ? { y: 0, opacity: 1, scale: 1 } : { y: -30, opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-16 h-16 mx-auto relative"
      >
        {/* Helmet */}
        <div
          className="absolute inset-0 rounded-t-full rounded-b-lg"
          style={{
            background: "linear-gradient(180deg, #F5D547, #e6c200)",
            border: "3px solid #F5D547",
            boxShadow: "0 0 15px rgba(245,213,71,0.3)",
          }}
        />
        {/* Visor */}
        <div
          className="absolute top-5 left-2 right-2 h-5 rounded"
          style={{
            background: "linear-gradient(180deg, #ff4444, #cc0000)",
            boxShadow: "0 0 10px rgba(255,68,68,0.5)",
          }}
        />
        {/* Horn */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-6"
          style={{
            background: "#F5D547",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </motion.div>
    </div>,
    // Phase 4: Wings/Boosters
    <div key="wings" className="relative flex items-center justify-center">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="flex items-center gap-4"
      >
        {/* Left wing */}
        <div
          className="w-16 h-10"
          style={{
            background: "linear-gradient(90deg, transparent, #2CACE2)",
            clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
            boxShadow: "0 0 20px rgba(44,172,226,0.3)",
          }}
        />
        <div className="w-20" /> {/* Spacer */}
        {/* Right wing */}
        <div
          className="w-16 h-10"
          style={{
            background: "linear-gradient(270deg, transparent, #2CACE2)",
            clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            boxShadow: "0 0 20px rgba(44,172,226,0.3)",
          }}
        />
      </motion.div>
      {/* Booster flames */}
      {isActive && (
        <motion.div
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.3, repeat: Infinity }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 h-12"
          style={{
            background: "linear-gradient(to bottom, #F5D547, #ff6b35, transparent)",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
            filter: "blur(2px)",
          }}
        />
      )}
    </div>,
  ];

  return parts[phase - 1] || null;
}

export default function GrendizerProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each step on scroll
      const steps = containerRef.current?.querySelectorAll(".process-step");
      if (steps) {
        steps.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Starburst background */}
      <div className="absolute inset-0 starburst opacity-30" />

      {/* Speed lines */}
      <div className="absolute inset-0 speed-lines opacity-20" />

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
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
          <h2
            className="text-4xl md:text-6xl font-black mb-4"
            style={{
              fontFamily: "'Bangers', cursive",
              color: "white",
              letterSpacing: "3px",
              textShadow: "3px 3px 0 #2CACE2, 6px 6px 0 rgba(0,0,0,0.3)",
            }}
          >
            OUR PROCESS
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Assembling your brand&apos;s ultimate form — one phase at a time
          </p>
        </motion.div>

        {/* Process steps + Mecha assembly */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Process steps */}
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <div
                key={step.phase}
                className="process-step relative flex gap-6"
              >
                {/* Phase number */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-xl flex items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, rgba(44,172,226,0.2), rgba(0,119,182,0.1))",
                      border: "2px solid rgba(44,172,226,0.3)",
                    }}
                  >
                    <span
                      className="text-lg"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        color: "#F5D547",
                        textShadow: "0 0 10px rgba(245,213,71,0.3)",
                      }}
                    >
                      {String(step.phase).padStart(2, "0")}
                    </span>
                  </motion.div>
                  {/* Connecting line */}
                  {i < processSteps.length - 1 && (
                    <div className="w-0.5 h-8 mx-auto bg-gradient-to-b from-[#2CACE2]/30 to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{
                        fontFamily: "'Bangers', cursive",
                        color: "#F5D547",
                        letterSpacing: "2px",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-[#2CACE2] text-sm mb-2 uppercase tracking-wider"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem" }}
                  >
                    {step.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Mecha assembly visualization */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-96">
              {/* Assembly layers stacked */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <MechaPart phase={3} isActive={isInView} />
              </div>
              <div className="absolute top-14 left-0 right-0">
                <MechaPart phase={2} isActive={isInView} />
              </div>
              <div className="absolute top-20 left-0 right-0 flex justify-center">
                <MechaPart phase={1} isActive={isInView} />
              </div>
              <div className="absolute top-32 left-0 right-0 flex justify-center">
                <MechaPart phase={4} isActive={isInView} />
              </div>

              {/* Energy charge lines between phases */}
              <motion.div
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2CACE2] to-transparent" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5D547] to-transparent" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2CACE2] to-transparent" />
              </motion.div>
            </div>

            {/* Status text */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-center"
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.55rem",
                  color: "#2CACE2",
                  textShadow: "0 0 10px rgba(44,172,226,0.5)",
                }}
              >
                ASSEMBLY COMPLETE
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
