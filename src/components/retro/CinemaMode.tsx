"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Section IDs and their pause durations
const SECTIONS = [
  { selector: "[data-ambient='section-hero']", pause: 3, label: "HERO" },
  { selector: "[data-ambient='section-matrix']", pause: 2, label: "MATRIX" },
  { selector: "[data-ambient='section-retrotv']", pause: 4, label: "SERVICES" },
  { selector: "[data-ambient='section-polaroid']", pause: 4, label: "WORK" },
  { selector: "[data-ambient='section-grendizer']", pause: 4, label: "PROCESS" },
  { selector: "[data-ambient='section-about']", pause: 3, label: "ABOUT" },
  { selector: "[data-ambient='section-newspaper']", pause: 3, label: "PRESS" },
  { selector: "[data-ambient='section-telegram']", pause: 3, label: "CONTACT" },
];

export default function CinemaMode() {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showFin, setShowFin] = useState(false);
  const [progress, setProgress] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(false);

  const startCinema = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    setActive(true);
    setShowTitle(true);
    setPaused(false);
    setProgress(0);

    // Show PRESENTING title for 2s, then start auto-scroll
    setTimeout(() => {
      setShowTitle(false);

      // Build scroll timeline using a scroll proxy object
      const sections = SECTIONS.map((s) => document.querySelector(s.selector)).filter(Boolean) as HTMLElement[];
      if (sections.length === 0) {
        stopCinema();
        return;
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProxy = { y: 0 };

      const tl = gsap.timeline({
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y);
          setProgress(tl.progress() * 100);
        },
        onComplete: () => {
          setShowFin(true);
          setTimeout(() => {
            stopCinema();
          }, 2500);
        },
      });

      // Scroll to top first
      window.scrollTo({ top: 0 });
      scrollProxy.y = 0;

      let currentTime = 0;

      sections.forEach((section, i) => {
        const sectionTop = section.offsetTop;
        const scrollDuration = Math.max(1, (sectionTop / totalHeight) * 15);
        const pauseDuration = SECTIONS[i].pause;

        // Scroll to section
        tl.to(scrollProxy, {
          y: sectionTop,
          duration: scrollDuration,
          ease: "power1.inOut",
        }, currentTime);

        currentTime += scrollDuration;

        // Pause at section
        tl.to({}, { duration: pauseDuration }, currentTime);
        currentTime += pauseDuration;
      });

      // Scroll to bottom
      tl.to(scrollProxy, {
        y: totalHeight,
        duration: 3,
        ease: "power1.inOut",
      }, currentTime);

      timelineRef.current = tl;
    }, 2500);
  }, []);

  const stopCinema = useCallback(() => {
    activeRef.current = false;
    setActive(false);
    setShowTitle(false);
    setShowFin(false);
    setPaused(false);
    setProgress(0);
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  const togglePause = useCallback(() => {
    if (!timelineRef.current) return;
    if (paused) {
      timelineRef.current.play();
      setPaused(false);
    } else {
      timelineRef.current.pause();
      setPaused(true);
    }
  }, [paused]);

  // Keyboard listeners
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "c" && !activeRef.current) {
        startCinema();
      } else if (e.key === "Escape" && activeRef.current) {
        stopCinema();
      } else if (e.key === " " && activeRef.current) {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [startCinema, stopCinema, togglePause]);

  return (
    <>
      {/* Film icon button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.4, type: "spring" }}
        onClick={active ? stopCinema : startCinema}
        aria-label={active ? "Exit cinema mode" : "Enter cinema mode (C)"}
        className="fixed bottom-6 right-[7.5rem] z-[999] w-10 h-10 rounded-full border border-white/20 bg-[#050508]/80 backdrop-blur-sm flex items-center justify-center hover:border-[#2CACE2]/50 transition-colors group"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-colors ${active ? "text-[#2CACE2]" : "text-white/40 group-hover:text-white/70"}`}
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
      </motion.button>

      {/* Cinema mode overlay */}
      <AnimatePresence>
        {active && (
          <>
            {/* Letterbox bars */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed top-0 left-0 right-0 z-[1001] bg-black"
              onClick={stopCinema}
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 z-[1001] bg-black"
              onClick={stopCinema}
            />

            {/* Film grain overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-[60px] left-0 right-0 z-[1002] h-[2px] bg-white/10"
            >
              <div
                className="h-full bg-[#2CACE2] transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 10px #2CACE2, 0 0 20px rgba(44,172,226,0.5)",
                }}
              />
            </motion.div>

            {/* Pause indicator */}
            <AnimatePresence>
              {paused && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1003] pointer-events-none"
                >
                  <div className="flex gap-3">
                    <div className="w-4 h-12 bg-white/80 rounded-sm" />
                    <div className="w-4 h-12 bg-white/80 rounded-sm" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PRESENTING title card */}
            <AnimatePresence>
              {showTitle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="fixed inset-0 z-[1003] flex items-center justify-center bg-black/80 pointer-events-none"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center"
                  >
                    <div
                      className="text-xs tracking-[0.5em] uppercase text-white/50 mb-4 font-mono"
                    >
                      Now Presenting
                    </div>
                    <div
                      className="text-5xl md:text-7xl font-bold tracking-wider"
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        background: "linear-gradient(135deg, #2CACE2, #0077B6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "none",
                      }}
                    >
                      BLUEDGE
                    </div>
                    <div className="text-xs tracking-[0.3em] uppercase text-white/30 mt-4 font-mono">
                      Press ESC to exit &bull; SPACE to pause
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FIN title card */}
            <AnimatePresence>
              {showFin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="fixed inset-0 z-[1003] flex items-center justify-center bg-black/80 pointer-events-none"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="text-6xl md:text-8xl font-bold italic text-white/80"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    FIN
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
