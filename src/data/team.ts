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
  },
  {
    title: "The Marketing Gurus",
    icon: "🧘",
    description: "Zen masters of digital enlightenment",
  },
  {
    title: "The Design Senseis",
    icon: "⚔️",
    description: "Creative warriors wielding pixels & vectors",
  },
  {
    title: "The Research Masters",
    icon: "🔬",
    description: "Data detectives uncovering insights",
  },
  {
    title: "The SEO Experts",
    icon: "⚙️",
    description: "Algorithm whisperers boosting visibility",
  },
  {
    title: "The Grammar Freaks",
    icon: "📚",
    description: "Perfectionists polishing every word",
  },
];
