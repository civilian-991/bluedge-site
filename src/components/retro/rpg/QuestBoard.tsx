"use client";

import { motion } from "framer-motion";
import type { RPGQuest } from "@/types";

interface QuestBoardProps {
  quests: RPGQuest[];
  title?: string;
}

const statusConfig = {
  completed: { label: "COMPLETED", color: "text-green-400 border-green-400/30 bg-green-400/5" },
  active: { label: "ACTIVE", color: "text-amber-400 border-amber-400/30 bg-amber-400/5" },
  legendary: { label: "LEGENDARY", color: "text-purple-400 border-purple-400/30 bg-purple-400/5" },
};

export default function QuestBoard({ quests, title = "Quest Log" }: QuestBoardProps) {
  return (
    <div>
      <h4 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-4">
        {title}
      </h4>
      <div className="space-y-3">
        {quests.map((quest, i) => {
          const status = statusConfig[quest.status];

          return (
            <motion.div
              key={quest.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 border border-white/10 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-white/90">{quest.title}</h5>
                    <span className={`text-[9px] font-mono px-2 py-0.5 border rounded ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="text-xs text-white/40 mt-1">
                    Client: {quest.client}
                  </div>
                  <p className="text-xs text-white/50 mt-2">{quest.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono text-accent/60">
                    +{quest.xpReward} XP
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
