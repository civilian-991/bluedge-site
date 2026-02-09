import type { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  features: string[];
  number: string;
  gradient: string;
  iconSvg: string;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  tags: string[];
  year: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

export interface CharacterStats {
  atk: number;
  def: number;
  spd: number;
  int: number;
}

export interface TeamRole {
  title: string;
  icon: string;
  description: string;
  stats: CharacterStats;
  specialMove: string;
  shortName: string;
}

export interface Stat {
  number: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface Partnership {
  name: string;
  logo: string;
  url?: string;
}

export interface TVChannel {
  id: number;
  name: string;
  serviceIndex: number;
}

export interface ProcessStep {
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface ComicPanel {
  id: number;
  text: string;
  speaker?: string;
  type: 'narration' | 'dialogue' | 'action' | 'thought' | 'shout';
  bgColor?: string;
}

export interface SpeechBubble {
  text: string;
  type: 'speech' | 'thought' | 'shout';
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface ManifestoSection {
  title: string;
  body: string;
}

export interface ManifestoContent {
  headline: string;
  date: string;
  sections: ManifestoSection[];
  signature: string;
}
