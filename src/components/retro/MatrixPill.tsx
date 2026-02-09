"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MatrixRain from "./shared/MatrixRain";
import { useRetroSound } from "@/hooks/useRetroSound";
import GlitchText from "./GlitchText";

gsap.registerPlugin(ScrollTrigger);

type PillChoice = null | "red" | "blue";
type Phase = "choice" | "blue-fake" | "rain" | "revealed";

export default function MatrixPill() {
  const [choice, setChoice] = useState<PillChoice>(null);
  const [phase, setPhase] = useState<Phase>("choice");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { playSound } = useRetroSound();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleBluePill = () => {
    playSound("pillClick");
    setChoice("blue");
    setPhase("blue-fake");
    // Show fake corporate content, then redirect to red pill content
    setTimeout(() => {
      setPhase("rain");
      setTimeout(() => setPhase("revealed"), 3000);
    }, 3000);
  };

  const handleRedPill = () => {
    playSound("pillClick");
    setChoice("red");
    setPhase("rain");
    setTimeout(() => setPhase("revealed"), 3500);
  };

  const handleReset = () => {
    setChoice(null);
    setPhase("choice");
  };

  return (
    <section
      ref={sectionRef}
      data-ambient="section-matrix"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        background: "linear-gradient(180deg, #050508 0%, #0a0a12 50%, #050508 100%)",
      }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Choice phase */}
        <AnimatePresence mode="wait">
          {phase === "choice" && (
            <motion.div
              key="choice"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div ref={titleRef}>
                {/* Morpheus quote */}
                <motion.p
                  className="text-lg md:text-xl text-white/60 mb-4 italic max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  &quot;This is your last chance. After this, there is no turning back.&quot;
                </motion.p>

                <motion.h2
                  className="text-3xl md:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Make Your <span className="text-gradient">Choice</span>
                </motion.h2>

                <motion.p
                  className="text-white/40 text-sm mb-16 max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  How deep does the rabbit hole go?
                </motion.p>
              </div>

              {/* Pills */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Blue pill */}
                <motion.button
                  onClick={handleBluePill}
                  onMouseEnter={() => playSound("pillHover")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center gap-4 cursor-pointer"
                >
                  <div
                    className="w-24 h-14 rounded-full relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                      boxShadow: "0 0 30px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.2), inset 0 2px 10px rgba(255,255,255,0.3)",
                    }}
                  >
                    {/* Pill shine */}
                    <div
                      className="absolute top-1 left-3 w-10 h-3 rounded-full bg-white/30 blur-sm"
                    />
                  </div>
                  <span className="text-blue-400 text-sm font-medium tracking-wider uppercase">
                    Blue Pill
                  </span>
                  <span className="text-white/30 text-xs max-w-[150px]">
                    Stay comfortable. Business as usual.
                  </span>
                </motion.button>

                {/* Divider */}
                <div className="text-white/20 text-2xl font-light hidden sm:block">or</div>

                {/* Red pill */}
                <motion.button
                  onClick={handleRedPill}
                  onMouseEnter={() => playSound("pillHover")}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center gap-4 cursor-pointer"
                >
                  <div
                    className="w-24 h-14 rounded-full relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                      boxShadow: "0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.2), inset 0 2px 10px rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="absolute top-1 left-3 w-10 h-3 rounded-full bg-white/30 blur-sm"
                    />
                  </div>
                  <span className="text-red-400 text-sm font-medium tracking-wider uppercase">
                    Red Pill
                  </span>
                  <span className="text-white/30 text-xs max-w-[150px]">
                    See how deep the rabbit hole goes.
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Blue pill fake corporate content */}
          {phase === "blue-fake" && (
            <motion.div
              key="blue-fake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div
                className="max-w-2xl mx-auto p-12 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  Q4 Synergy Report
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Leveraging cross-functional paradigms to optimize stakeholder bandwidth...
                </p>
                <p className="text-white/40 text-xs mb-8">
                  Achieving 110% YoY growth in collaborative thought leadership via agile methodologies
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <p
                    className="text-2xl font-bold text-[#F5D547] mb-2"
                    style={{ fontFamily: "'Bangers', cursive" }}
                  >
                    Just kidding.
                  </p>
                  <p className="text-white/60 text-sm">
                    You really thought we&apos;d be boring? Let&apos;s show you the truth...
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Matrix rain phase */}
          {phase === "rain" && (
            <motion.div
              key="rain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative min-h-[500px] rounded-2xl overflow-hidden"
            >
              <MatrixRain active={true} />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 1.5] }}
                  transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
                  className="text-3xl md:text-5xl font-bold text-white"
                  style={{
                    textShadow: "0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.3)",
                  }}
                >
                  Wake up, brand...
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Revealed content */}
          {phase === "revealed" && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  The truth is{" "}
                  <span className="text-gradient">your brand deserves better</span>
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Most agencies sell you templates. We build worlds.
                  Most agencies follow trends. We set them.
                  Most agencies care about deliverables. We care about <strong className="text-accent">your legacy</strong>.
                </p>
                <p className="text-white/40 text-sm mb-10">
                  You chose to see the truth. Now let&apos;s build something extraordinary together.
                </p>
                <motion.a
                  href="#contact"
                  className="btn-primary btn-shine inline-flex items-center gap-3 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Enter the Real World</span>
                  <span className="text-lg">→</span>
                </motion.a>

                {/* Reset link */}
                <div className="mt-8">
                  <button
                    onClick={handleReset}
                    className="text-white/30 text-xs hover:text-white/60 transition-colors underline"
                  >
                    Take the choice again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
