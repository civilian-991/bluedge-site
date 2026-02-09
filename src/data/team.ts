import type { TeamRole, Stat } from "@/types";
import { Users, Award, Target, Globe } from "lucide-react";

export const stats: Stat[] = [
  { number: 20, suffix: "+", label: "Years Experience", icon: Award },
  { number: 150, suffix: "+", label: "Projects Completed", icon: Target },
  { number: 50, suffix: "+", label: "Happy Clients", icon: Users },
  { number: 5, suffix: "", label: "Countries Served", icon: Globe },
];

export const teamRoles: TeamRole[] = [
  {
    title: "The Strategist Grendizer",
    icon: "🤖",
    description: "Master strategists plotting your brand's conquest",
    shortName: "STRATEGIST",
    stats: { atk: 70, def: 85, spd: 60, int: 95 },
    specialMove: "MASTER PLAN",
  },
  {
    title: "The Marketing Gurus",
    icon: "🧘",
    description: "Zen masters of digital enlightenment",
    shortName: "MARKETING",
    stats: { atk: 80, def: 60, spd: 90, int: 75 },
    specialMove: "VIRAL STORM",
  },
  {
    title: "The Design Senseis",
    icon: "⚔️",
    description: "Creative warriors wielding pixels & vectors",
    shortName: "DESIGN",
    stats: { atk: 90, def: 70, spd: 85, int: 80 },
    specialMove: "PIXEL PERFECT",
  },
  {
    title: "The Research Masters",
    icon: "🔬",
    description: "Data detectives uncovering insights",
    shortName: "RESEARCH",
    stats: { atk: 50, def: 90, spd: 55, int: 99 },
    specialMove: "DATA MINE",
  },
  {
    title: "The SEO Experts",
    icon: "⚙️",
    description: "Algorithm whisperers boosting visibility",
    shortName: "SEO",
    stats: { atk: 65, def: 75, spd: 95, int: 85 },
    specialMove: "ALGORITHM HACK",
  },
  {
    title: "The Grammar Freaks",
    icon: "📚",
    description: "Perfectionists polishing every word",
    shortName: "GRAMMAR",
    stats: { atk: 60, def: 95, spd: 50, int: 90 },
    specialMove: "CRITICAL EDIT",
  },
];
