import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  number: string;
  gradient: string;
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

export interface TeamRole {
  title: string;
  icon: string;
  description: string;
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
