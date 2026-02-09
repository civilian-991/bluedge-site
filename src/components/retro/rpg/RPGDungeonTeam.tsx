"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { teamProfiles } from "@/data/teamProfiles";
import { stats } from "@/data/team";
import { useRetroSound } from "@/hooks/useRetroSound";
import RPGTextBox from "./RPGTextBox";
import CharacterSheet from "./CharacterSheet";
import QuestBoard from "./QuestBoard";

type Phase = "intro" | "guild";

export default function RPGDungeonTeam() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [introStep, setIntroStep] = useState(0);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const { playSound } = useRetroSound();
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const introLines = [
    "In the year 2004, in the ancient city of Beirut...",
    "A guild of creative warriors was forged in the fires of ambition.",
    "They called themselves... BluEdge.",
    "With 20+ years of battle experience and 150+ quests completed, they became legends across 5 kingdoms.",
    "Welcome, adventurer. You have found the Guild Hall.",
  ];

  const handleIntroAdvance = useCallback(() => {
    if (introStep < introLines.length - 1) {
      setIntroStep((prev) => prev + 1);
      playSound("rpgMenuSelect");
    } else {
      setPhase("guild");
      playSound("rpgLevelUp");
    }
  }, [introStep, introLines.length, playSound]);

  const selectedProfile = selectedMember
    ? teamProfiles.find((tp) => tp.slug === selectedMember)
    : null;

  // Inventory: compile all equipment from all members
  const allEquipment = teamProfiles.flatMap((tp) => tp.equipment);

  // All quests
  const allQuests = teamProfiles.flatMap((tp) => tp.questLog);

  return (
    <div className="pt-28 pb-20 min-h-screen" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* RPG Intro Sequence */}
        <AnimatePresence mode="wait">
          {phase === "intro" && !reducedMotion && (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              <div className="w-full">
                {/* Starfield background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{ opacity: [0.1, 0.6, 0.1] }}
                      transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <RPGTextBox
                  key={introStep}
                  text={introLines[introStep]}
                  speaker={introStep === 0 ? "Narrator" : undefined}
                  onComplete={handleIntroAdvance}
                  speed={40}
                />

                <div className="text-center mt-6 text-white/30 text-xs font-mono">
                  Click to continue... ({introStep + 1}/{introLines.length})
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guild Hall */}
        {(phase === "guild" || reducedMotion) && (
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Guild Hall Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="text-accent/40 text-xs font-mono tracking-[0.4em] uppercase mb-3">
                BluEdge Guild Hall
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Meet The{" "}
                <span className="text-accent" style={{ textShadow: "0 0 30px rgba(44,172,226,0.3)" }}>
                  Party
                </span>
              </h1>
              <p className="text-white/50 max-w-xl mx-auto">
                Each member brings unique skills to the guild. Select a character to view their full stats, equipment, and quest log.
              </p>
            </motion.div>

            {/* Guild Stats Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 border border-accent/10 rounded-lg bg-accent/[0.02]"
                >
                  <div className="text-2xl md:text-3xl font-bold text-accent font-mono">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-xs text-white/40 font-mono mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Character Select Grid */}
            <div className="mb-12">
              <h2 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-6 text-center">
                ─── Select Your Hero ───
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {teamProfiles.map((member, i) => (
                  <motion.button
                    key={member.slug}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                    onClick={() => {
                      setSelectedMember(selectedMember === member.slug ? null : member.slug);
                      playSound("rpgMenuSelect");
                    }}
                    className={`relative p-4 border-2 rounded-lg text-center transition-all ${
                      selectedMember === member.slug
                        ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(44,172,226,0.2)]"
                        : "border-white/10 bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5"
                    }`}
                  >
                    <motion.div
                      className="text-4xl mb-2"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {member.icon}
                    </motion.div>
                    <div className="text-xs font-mono font-bold text-white/80 uppercase tracking-wider">
                      {member.shortName}
                    </div>
                    <div className="text-[9px] text-white/30 font-mono mt-1">LVL 99</div>

                    {/* Selection indicator */}
                    {selectedMember === member.slug && (
                      <motion.div
                        layoutId="rpg-selector"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-accent"
                        style={{ transform: "translateX(-50%) rotate(180deg)" }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Selected Character Sheet */}
            <AnimatePresence mode="wait">
              {selectedProfile && (
                <motion.div
                  key={selectedProfile.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-16"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CharacterSheet profile={selectedProfile} />
                    <div className="space-y-8">
                      <QuestBoard quests={selectedProfile.questLog} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Guild Inventory */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-6 text-center">
                ─── Guild Inventory ───
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allEquipment.map((item, i) => {
                  const rarityBg: Record<string, string> = {
                    common: "border-white/10",
                    uncommon: "border-green-400/20",
                    rare: "border-blue-400/20",
                    epic: "border-purple-400/20",
                    legendary: "border-amber-400/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
                  };

                  return (
                    <motion.div
                      key={`${item.name}-${i}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className={`relative p-3 border rounded-lg bg-white/[0.01] text-center ${
                        rarityBg[item.rarity] || rarityBg.common
                      }`}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-[10px] text-white/70 font-mono leading-tight">
                        {item.name}
                      </div>
                      <div className="text-[8px] text-white/30 font-mono uppercase mt-1">
                        {item.type}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Quest Board — All Quests */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-6 text-center">
                ─── Quest Board ───
              </h2>
              <div className="max-w-3xl mx-auto">
                <QuestBoard quests={allQuests} title="" />
              </div>
            </motion.section>

            {/* CTA as Quest Posting */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="max-w-lg mx-auto border-2 border-accent/20 rounded-lg p-8 bg-accent/[0.02]">
                <div className="text-accent/40 text-xs font-mono tracking-[0.3em] uppercase mb-2">
                  New Quest Available!
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Join Forces?
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  Our guild is always looking for new quests. Tell us about your project and let&apos;s embark on an adventure together.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/#contact"
                    className="px-8 py-3 bg-accent text-black font-bold font-mono text-sm tracking-wider rounded hover:bg-accent/80 transition-colors"
                  >
                    ACCEPT QUEST
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-3 border border-white/20 text-white/50 font-mono text-sm tracking-wider rounded hover:border-accent/30 hover:text-accent transition-colors"
                  >
                    RETURN TO TOWN
                  </Link>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
