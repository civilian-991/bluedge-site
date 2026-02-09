"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data";
import TVStatic from "./shared/TVStatic";
import ScanLines from "./shared/ScanLines";
import { useCollectibles } from "@/hooks/useCollectibles";
import { CollectibleTrigger } from "./CollectibleItem";
import { useRetroSound } from "@/hooks/useRetroSound";
import GlitchText from "./GlitchText";
import MagneticText from "./MagneticText";

gsap.registerPlugin(ScrollTrigger);

const channels = services.map((s, i) => ({
  id: i + 1,
  name: s.title,
  serviceIndex: i,
}));

export default function RetroTVServices() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mushroomFound, setMushroomFound] = useState(false);
  const keyBuffer = useRef("");
  const { playSound } = useRetroSound();

  const switchChannel = useCallback((index: number) => {
    if (index === activeChannel || isChanging) return;
    setIsChanging(true);
    playSound("channelSwitch");
    setTimeout(() => {
      setActiveChannel(index);
      setTimeout(() => setIsChanging(false), 300);
    }, 300);
  }, [activeChannel, isChanging, playSound]);

  // Listen for "99" typed while in this section
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      keyBuffer.current += e.key;
      if (keyBuffer.current.length > 5) keyBuffer.current = keyBuffer.current.slice(-5);
      if (keyBuffer.current.includes("99")) {
        setMushroomFound(true);
        keyBuffer.current = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const activeService = services[activeChannel];

  return (
    <section
      ref={sectionRef}
      id="services"
      data-ambient="section-retrotv"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]">
        <div className="absolute inset-0 pixel-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: "#F5D547",
                textShadow: "0 0 10px rgba(245,213,71,0.4)",
              }}
            >
              Cable TV Guide
            </span>
          </div>
          <MagneticText
            as="h2"
            className="text-4xl md:text-6xl font-bold mb-4 glitch-text-intense"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(1rem, 4vw, 2.5rem)",
              color: "#F5D547",
              textShadow: "0 0 20px rgba(245,213,71,0.4), 3px 3px 0 #0077B6",
            }}
          >
            {"WHAT'S ON TONIGHT"}
          </MagneticText>
          <p className="text-white/40 text-sm max-w-md mx-auto" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.55rem" }}>
            Tune in to our channel lineup
          </p>
        </div>

        {/* TV Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Channel list sidebar */}
          <div className="lg:w-72 shrink-0">
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #1a1a30 0%, #0a0a18 100%)",
                border: "2px solid #333",
              }}
            >
              <div
                className="px-4 py-3 border-b border-white/10"
                style={{
                  background: "linear-gradient(90deg, #2CACE2, #0077B6)",
                }}
              >
                <span
                  className="text-xs tracking-wider font-bold text-white"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem" }}
                >
                  CHANNELS
                </span>
              </div>

              {/* Horizontal scroll on mobile, vertical list on desktop */}
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible scrollbar-hide">
                {channels.map((channel, i) => (
                  <button
                    key={channel.id}
                    onClick={() => switchChannel(i)}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 min-w-[200px] lg:min-w-0 w-full border-b border-white/5 ${
                      activeChannel === i
                        ? "bg-[#2CACE2]/20 border-l-2 border-l-[#F5D547]"
                        : "hover:bg-white/5 border-l-2 border-l-transparent"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold min-w-[2rem] ${
                        activeChannel === i ? "text-[#F5D547]" : "text-white/30"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem" }}
                    >
                      {String(channel.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs truncate ${
                        activeChannel === i ? "text-white" : "text-white/50"
                      }`}
                      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem" }}
                    >
                      {channel.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TV Screen */}
          <div className="flex-1">
            <div
              className="relative rounded-2xl overflow-hidden crt-curve"
              style={{
                background: "#0a0a12",
                border: "4px solid #222",
                boxShadow: "0 0 40px rgba(44,172,226,0.1), inset 0 0 80px rgba(0,0,0,0.5)",
                minHeight: "400px",
              }}
            >
              {/* CRT scan lines */}
              <ScanLines opacity={0.1} />

              {/* Channel number display */}
              <div className="absolute top-4 right-4 z-20">
                <span
                  className="text-lg"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#F5D547",
                    textShadow: "0 0 10px rgba(245,213,71,0.5)",
                  }}
                >
                  CH-{String(activeChannel + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Static burst during channel change */}
              <AnimatePresence>
                {isChanging && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 z-30"
                  >
                    <TVStatic active={true} intensity={1} glitch={true} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service content */}
              <AnimatePresence mode="wait">
                {!isChanging && (
                  <motion.div
                    key={activeChannel}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-center"
                  >
                    {/* Service number watermark */}
                    <div
                      className="absolute top-4 left-6 text-[8rem] md:text-[12rem] font-bold leading-none opacity-[0.04] pointer-events-none"
                      style={{ fontFamily: "'Press Start 2P', monospace", color: "#2CACE2" }}
                    >
                      {activeService.number}
                    </div>

                    {/* Service icon area */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(44,172,226,0.2), rgba(0,119,182,0.1))",
                        border: "2px solid rgba(44,172,226,0.3)",
                        boxShadow: "0 0 20px rgba(44,172,226,0.2)",
                      }}
                    >
                      <div
                        className="w-10 h-10"
                        dangerouslySetInnerHTML={{
                          __html: `<img src="${activeService.iconSvg}" alt="" class="w-full h-full" style="filter: brightness(0) invert(1)" />`,
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-2xl md:text-4xl font-bold mb-4"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "clamp(0.8rem, 2.5vw, 1.4rem)",
                        color: "#F5D547",
                        textShadow: "0 0 10px rgba(245,213,71,0.3)",
                      }}
                    >
                      {activeService.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-2xl"
                    >
                      {activeService.description}
                    </motion.p>

                    {/* Feature tags */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2"
                    >
                      {activeService.features.map((feature, i) => (
                        <motion.span
                          key={feature}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.35 + i * 0.05, type: "spring" }}
                          className="px-3 py-1.5 rounded text-xs"
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: "0.45rem",
                            background: "rgba(44,172,226,0.15)",
                            border: "1px solid rgba(44,172,226,0.3)",
                            color: "#2CACE2",
                          }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* NOW PLAYING indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-8 flex items-center gap-2"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-red-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span
                        className="text-white/30"
                        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.4rem" }}
                      >
                        NOW PLAYING
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CRT screen edge vignette */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
                }}
              />
            </div>

            {/* TV Stand / Controls */}
            <div className="flex justify-center mt-4 gap-4">
              {channels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => switchChannel(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeChannel === i
                      ? "bg-[#F5D547] shadow-[0_0_10px_rgba(245,213,71,0.5)]"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collectible: Power Mushroom (type "99" on keyboard) */}
      <CollectibleTrigger id="power-mushroom" emoji="🍄" triggered={mushroomFound} />
    </section>
  );
}
