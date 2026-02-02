import {
  Palette,
  Globe,
  Smartphone,
  Megaphone,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    icon: Palette,
    title: "Branding",
    description:
      "Reputation best captures the essence of a brand. We help you create an emotional attachment with your consumers while also focusing on the totality of the customer experience.",
    features: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Rebranding"],
    number: "01",
    gradient: "from-[#FF6B6B] to-[#FF8E53]",
  },
  {
    icon: Globe,
    title: "Web Design & Development",
    description:
      "Building custom websites from the ground up or uplifting existing sites. We focus on your unique brand story while meeting expectations and driving engagement.",
    features: ["Custom Websites", "E-commerce", "CMS Solutions", "Website Redesign"],
    number: "02",
    gradient: "from-[#00AEEF] to-[#0077B6]",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Development using the latest technologies with our technical, customer-oriented and creative team. From concept to launch, we create mobile experiences that drive engagement.",
    features: ["iOS Development", "Android Development", "Cross-Platform", "App Strategy"],
    number: "03",
    gradient: "from-[#A855F7] to-[#6366F1]",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Strategic marketing campaigns that focus on building and protecting a positive brand image, creating loyalty among fans, and driving new leads.",
    features: ["Social Media", "PPC Advertising", "SEO", "Lead Generation"],
    number: "04",
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
  {
    icon: TrendingUp,
    title: "Traditional Media",
    description:
      "Impactful traditional advertising that complements your digital presence. Print, broadcast, direct mail, outdoor advertising, newspapers, and radio campaigns.",
    features: ["TV Commercials", "Radio Spots", "Print Advertising", "Outdoor/Billboard"],
    number: "05",
    gradient: "from-[#10B981] to-[#059669]",
  },
  {
    icon: Lightbulb,
    title: "Business Consultancy",
    description:
      "A 360-degree approach to business consultancy with complete overarching administration and development of operational strategies for sustainable growth.",
    features: ["Market Research", "Strategy Development", "Process Optimization", "Growth Planning"],
    number: "06",
    gradient: "from-[#EC4899] to-[#8B5CF6]",
  },
];
