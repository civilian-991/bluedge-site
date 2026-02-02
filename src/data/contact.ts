import { Mail, Phone, MapPin, Instagram, Linkedin, ExternalLink } from "lucide-react";
import type { ContactInfo, SocialLink } from "@/types";

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "ziad@bluedge.me",
    href: "mailto:ziad@bluedge.me",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+961 3 823 344",
    href: "tel:+9613823344",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hazmieh, Beirut, Lebanon",
    href: "https://maps.google.com/?q=Hazmieh+Beirut+Lebanon",
  },
];

export const socialLinks: SocialLink[] = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/bluedge.me" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/bluedge" },
  { name: "Behance", icon: ExternalLink, href: "https://behance.net/bluedge" },
];

export const officeHours = {
  weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
  saturday: "Saturday: 10:00 AM - 2:00 PM",
  sunday: "Sunday: Closed",
  timezone: "GMT+3 (Beirut)",
};
