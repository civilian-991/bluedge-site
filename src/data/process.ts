import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    phase: 1,
    title: "BRIEF",
    subtitle: "Mission Received",
    description:
      "Every great mission starts with intel. We deep-dive into your brand, market, competitors, and ambitions. The mecha's core is forged.",
    icon: "📡",
  },
  {
    phase: 2,
    title: "STRATEGY",
    subtitle: "Systems Online",
    description:
      "We map the battlefield. Target audiences, channels, messaging — every circuit is connected with precision and purpose.",
    icon: "⚡",
  },
  {
    phase: 3,
    title: "DESIGN",
    subtitle: "Armor Equipped",
    description:
      "Visual identity, UX flows, creative concepts — the outer shell that makes your brand unmistakable and unforgettable.",
    icon: "🛡️",
  },
  {
    phase: 4,
    title: "LAUNCH",
    subtitle: "Full Power!",
    description:
      "Execution at maximum output. Campaigns go live, sites deploy, content flows. Your brand takes flight across every channel.",
    icon: "🚀",
  },
];
