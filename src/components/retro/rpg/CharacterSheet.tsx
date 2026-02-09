"use client";

import { motion } from "framer-motion";
import type { TeamProfile } from "@/types";

interface CharacterSheetProps {
  profile: TeamProfile;
}

const statLabels: Record<string, string> = {
  atk: "ATK",
  def: "DEF",
  spd: "SPD",
  int: "INT",
  cre: "CRE",
  wit: "WIT",
};

const statColors: Record<string, string> = {
  atk: "#EF4444",
  def: "#3B82F6",
  spd: "#10B981",
  int: "#A855F7",
  cre: "#F59E0B",
  wit: "#EC4899",
};

export default function CharacterSheet({ profile }: CharacterSheetProps) {
  const stats = Object.entries(profile.stats) as [string, number][];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-2 border-accent/20 bg-[#0a0a18]/80 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-accent/10 px-6 py-4 border-b border-accent/20">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{profile.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{profile.title}</h3>
            <div className="text-accent/60 text-xs font-mono tracking-wider uppercase">
              {profile.shortName} &middot; LVL 99
            </div>
          </div>
          <div className="ml-auto px-3 py-1 border border-accent/30 rounded text-accent text-xs font-mono">
            {profile.specialMove}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Backstory */}
        <p className="text-white/60 text-sm leading-relaxed italic">
          &ldquo;{profile.backstory}&rdquo;
        </p>

        {/* Stats */}
        <div>
          <h4 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-3">
            Stats
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {stats.map(([key, value], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span
                  className="text-xs font-mono font-bold w-8"
                  style={{ color: statColors[key] || "#fff" }}
                >
                  {statLabels[key] || key.toUpperCase()}
                </span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: statColors[key] || "#2CACE2" }}
                  />
                </div>
                <span className="text-xs font-mono text-white/40 w-6 text-right">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-3">
            Skills
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {profile.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-2 p-2 bg-white/[0.02] border border-white/5 rounded"
              >
                <span className="text-lg">{skill.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/80 truncate">{skill.name}</div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: skill.maxLevel }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 h-1 rounded-sm ${
                          j < skill.level ? "bg-accent" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <h4 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-3">
            Equipment
          </h4>
          <div className="space-y-2">
            {profile.equipment.map((item, i) => {
              const rarityColors: Record<string, string> = {
                common: "text-white/50 border-white/20",
                uncommon: "text-green-400 border-green-400/20",
                rare: "text-blue-400 border-blue-400/20",
                epic: "text-purple-400 border-purple-400/20",
                legendary: "text-amber-400 border-amber-400/20",
              };
              const colorClass = rarityColors[item.rarity] || rarityColors.common;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className={`flex items-center gap-3 p-3 border rounded bg-white/[0.01] ${colorClass}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[10px] opacity-60">{item.description}</div>
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider opacity-60">
                    {item.rarity}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
