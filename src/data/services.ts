import type { Service } from "@/types";

// BluEdge service icons are now SVG files in /public/bluedge/
export const services: Service[] = [
  {
    title: "Branding",
    description:
      "Reputation best captures the essence of a brand. We help you create an emotional attachment with your consumers while also focusing on the totality of the customer experience.",
    features: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Rebranding"],
    number: "01",
    gradient: "from-[#2CACE2] to-[#0077B6]",
    iconSvg: "/bluedge/Branding.svg",
  },
  {
    title: "Web Design & Development",
    description:
      "Building custom websites from the ground up or uplifting existing sites. We focus on your unique brand story while meeting expectations and driving engagement.",
    features: ["Custom Websites", "E-commerce", "CMS Solutions", "Website Redesign"],
    number: "02",
    gradient: "from-[#2CACE2] to-[#023E8A]",
    iconSvg: "/bluedge/Web-icon.svg",
  },
  {
    title: "Mobile Apps",
    description:
      "Development using the latest technologies with our technical, customer-oriented and creative team. From concept to launch, we create mobile experiences that drive engagement.",
    features: ["iOS Development", "Android Development", "Cross-Platform", "App Strategy"],
    number: "03",
    gradient: "from-[#0077B6] to-[#2CACE2]",
    iconSvg: "/bluedge/Mobile.svg",
  },
  {
    title: "Project Development",
    description:
      "End-to-end project management and development services. From ideation to execution, we bring your vision to life with strategic planning and expert implementation.",
    features: ["Project Strategy", "Execution Planning", "Resource Management", "Delivery"],
    number: "04",
    gradient: "from-[#2CACE2] to-[#5D5D5D]",
    iconSvg: "/bluedge/Project-Development.svg",
  },
  {
    title: "Traditional Media",
    description:
      "Impactful traditional advertising that complements your digital presence. Print, broadcast, direct mail, outdoor advertising, newspapers, and radio campaigns.",
    features: ["TV Commercials", "Radio Spots", "Print Advertising", "Outdoor/Billboard"],
    number: "05",
    gradient: "from-[#023E8A] to-[#2CACE2]",
    iconSvg: "/bluedge/Traditional-Media.svg",
  },
];
