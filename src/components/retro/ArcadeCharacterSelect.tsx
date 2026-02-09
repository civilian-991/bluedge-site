"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { teamRoles } from "@/data";
import type { TeamRole } from "@/types";
import ScanLines from "./shared/ScanLines";
import AnimatedCharacter from "./AnimatedCharacter";

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const color =
    value >= 90
      ? "#38BDF8"
      : value >= 75
        ? "#2CACE2"
        : value >= 60
          ? "#0077B6"
          : "rgba(255,255,255,0.4)";

  return (
    <div className="flex items-center gap-2">
      <span
        className="w-8 text-right shrink-0"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.35rem",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {label}
      </span>
      <div className="flex-1 h-3 bg-white/10 rounded-sm overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-sm relative stat-bar-shimmer"
          style={{ background: color }}
        />
      </div>
      <span
        className="w-6 text-right shrink-0"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.35rem",
          color,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function CharacterSlot({
  role,
  index,
  isSelected,
  onSelect,
}: {
  role: TeamRole;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="relative aspect-square rounded-lg p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
      style={{
        background: isSelected
          ? "linear-gradient(180deg, rgba(44,172,226,0.25) 0%, rgba(0,119,182,0.15) 100%)"
          : "rgba(255,255,255,0.03)",
        border: isSelected ? "2px solid #2CACE2" : "2px solid rgba(255,255,255,0.08)",
        boxShadow: isSelected
          ? "0 0 20px rgba(44,172,226,0.3), inset 0 0 20px rgba(44,172,226,0.1)"
          : "none",
        animation: isSelected ? "charSelectPulse 2s ease-in-out infinite" : "none",
      }}
    >
      {/* P1 indicator */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded"
          style={{
            background: "#38BDF8",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            color: "#000",
          }}
        >
          P1
        </motion.div>
      )}

      {/* Portrait emoji with idle animation */}
      <AnimatedCharacter
        icon={role.icon}
        characterType={role.shortName}
        isSelected={isSelected}
        size="sm"
      />

      {/* Name */}
      <span
        className="text-center leading-tight"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "0.4rem",
          color: isSelected ? "#38BDF8" : "rgba(255,255,255,0.5)",
          textShadow: isSelected ? "0 0 8px rgba(56,189,248,0.4)" : "none",
        }}
      >
        {role.shortName}
      </span>
    </motion.button>
  );
}

function DetailPanel({ role }: { role: TeamRole }) {
  return (
    <motion.div
      key={role.shortName}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 p-4 sm:p-5 rounded-lg h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(44,172,226,0.2)",
      }}
    >
      {/* Large portrait with animation */}
      <div className="text-center">
        <div className="mb-2 flex justify-center">
          <AnimatedCharacter
            icon={role.icon}
            characterType={role.shortName}
            isSelected={true}
            size="lg"
          />
        </div>
        <h3
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.6rem",
            color: "#38BDF8",
            textShadow: "0 0 10px rgba(56,189,248,0.4)",
          }}
        >
          {role.shortName}
        </h3>
      </div>

      {/* Stat bars */}
      <div className="space-y-2">
        <StatBar label="ATK" value={role.stats.atk} delay={0.1} />
        <StatBar label="DEF" value={role.stats.def} delay={0.2} />
        <StatBar label="SPD" value={role.stats.spd} delay={0.3} />
        <StatBar label="INT" value={role.stats.int} delay={0.4} />
      </div>

      {/* Special move */}
      <div
        className="text-center px-3 py-2 rounded"
        style={{
          background: "rgba(56,189,248,0.1)",
          border: "1px solid rgba(56,189,248,0.3)",
        }}
      >
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.35rem",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          SPECIAL MOVE
        </span>
        <div
          className="mt-1"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.5rem",
            color: "#38BDF8",
            textShadow: "0 0 8px rgba(56,189,248,0.4)",
          }}
        >
          {role.specialMove}
        </div>
      </div>

      {/* Description */}
      <p
        className="text-white/40 text-center leading-relaxed"
        style={{ fontSize: "0.7rem" }}
      >
        {role.description}
      </p>

      {/* READY? */}
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-center mt-auto"
      >
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.6rem",
            color: "#2CACE2",
            textShadow: "0 0 10px rgba(44,172,226,0.5)",
          }}
        >
          READY?
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ArcadeCharacterSelect() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div id="team">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden crt-curve"
        style={{
          background: "linear-gradient(180deg, #0a0a12 0%, #050508 50%, #0a0a12 100%)",
          border: "3px solid rgba(44,172,226,0.15)",
        }}
      >
        <ScanLines opacity={0.08} />

        {/* CRT vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative z-[4] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Title */}
          <div className="text-center mb-8">
            <h2
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(0.6rem, 2vw, 0.9rem)",
                color: "#38BDF8",
                textShadow: "0 0 15px rgba(56,189,248,0.4)",
                letterSpacing: "0.15em",
              }}
            >
              SELECT YOUR SQUAD
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-1"
                style={{ color: "#38BDF8" }}
              >
                _
              </motion.span>
            </h2>
          </div>

          {/* Main: grid + detail */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Character grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {teamRoles.map((role, i) => (
                  <CharacterSlot
                    key={role.shortName}
                    role={role}
                    index={i}
                    isSelected={selectedIndex === i}
                    onSelect={() => handleSelect(i)}
                  />
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:w-[320px] min-h-[320px]">
              <AnimatePresence mode="wait">
                <DetailPanel role={teamRoles[selectedIndex]} />
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom insert coin + View Full Party link */}
          <div className="text-center mt-8 space-y-3">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.2em",
                }}
              >
                INSERT COIN TO CONTINUE
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-accent/60 hover:text-accent transition-colors"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.45rem",
                }}
              >
                VIEW FULL PARTY →
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
