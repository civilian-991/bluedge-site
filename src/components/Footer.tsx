"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { socialLinks, contactInfo, services } from "@/data";
import { CollectibleTrigger } from "./retro/CollectibleItem";

const serviceSlugs = ["branding", "web-design", "mobile-apps", "project-development", "traditional-media"];
const footerLinks = {
  services: services.map((s, i) => ({ name: s.title, href: `/services/${serviceSlugs[i]}` })),
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Our Work", href: "/work" },
    { name: "The Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Manifesto", href: "/manifesto" },
    { name: "Contact", href: "/#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [trophyFound, setTrophyFound] = useState(false);
  const trophyClickCount = useRef(0);
  const trophyClickTimer = useRef<NodeJS.Timeout | null>(null);

  return (
    <footer
      ref={footerRef}
      className="relative pt-32 pb-8 bg-[#030306] overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Enhanced background with energy effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/30 to-transparent" />
        <div className="blob morph-blob absolute -top-40 left-1/3 w-[500px] h-[500px] bg-[#00AEEF] opacity-8" />
        {/* Floating energy particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: "#2CACE2",
              boxShadow: "0 0 10px #2CACE2, 0 0 20px #00AEEF",
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        {/* Energy waves */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full border border-[#00AEEF]/10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* CTA Section with explosive entrance */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="text-center mb-24"
        >
          <motion.h2
            className="hero-title mb-8"
            initial={{ opacity: 0, rotateX: -30 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ perspective: "1000px" }}
          >
            Let&apos;s work{" "}
            <motion.span
              className="text-gradient inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,174,239,0.5)",
                  "0 0 50px rgba(0,174,239,0.8)",
                  "0 0 20px rgba(0,174,239,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              together
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="body-text max-w-xl mx-auto mb-10 text-lg"
          >
            Ready to take your brand to the next level? Let&apos;s create something extraordinary.
          </motion.p>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(0,174,239,0.4), 0 0 100px rgba(0,174,239,0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-4 px-10 py-6 rounded-full border border-[#00AEEF]/30 hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-500 relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="text-xl font-semibold relative z-10">Start a Project</span>
            <motion.div
              className="w-12 h-12 rounded-full bg-[#00AEEF]/20 flex items-center justify-center group-hover:bg-[#00AEEF] transition-colors duration-300 relative z-10"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Footer grid with staggered animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16"
        >
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="col-span-2"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <motion.div
                className="be-logo w-12 h-12"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-xl">BE</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none">
                  <span className="text-gradient">BLU</span>
                  <span className="text-white"> EDGE</span>
                </span>
                <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                  Creative Agency
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              A creative marketing agency crafting digital experiences that captivate
              and convert. Serving Lebanon & the GCC region since 2004.
            </p>
            {/* Social links with explosive hover */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    boxShadow: "0 0 25px rgba(0,174,239,0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-[#00AEEF]/20 flex items-center justify-center hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#00AEEF]/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon className="w-4 h-4 text-white/40 group-hover:text-[#00AEEF] transition-colors relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#00AEEF" }}
                    className="text-white/40 hover:text-[#00AEEF] text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "#00AEEF" }}
                    className="text-white/40 hover:text-[#00AEEF] text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="col-span-2"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75 + i * 0.05 }}
                >
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      whileHover={{ x: 5, color: "#00AEEF" }}
                      className="text-white/40 hover:text-[#00AEEF] transition-colors inline-block"
                    >
                      {item.value}
                    </motion.a>
                  ) : (
                    <span className="text-white/40">{item.value}</span>
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Newsletter with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85 }}
              className="mt-8"
            >
              <p className="text-white/40 text-sm mb-4">
                Subscribe for design tips & insights
              </p>
              <form className="flex gap-2">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  whileFocus={{ boxShadow: "0 0 20px rgba(0,174,239,0.3)" }}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0,174,239,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 rounded-lg bg-[#00AEEF] text-white text-sm font-medium hover:bg-[#00AEEF]/80 transition-colors relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative z-10">Join</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom bar with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Blu Edge Agency. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ scale: 1.1, color: "rgba(255,255,255,0.6)" }}
                className="text-white/30 hover:text-white/50 text-sm transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div
            className="flex items-center gap-2 text-white/30 text-sm cursor-pointer select-none"
            onClick={() => {
              trophyClickCount.current++;
              if (trophyClickTimer.current) clearTimeout(trophyClickTimer.current);
              if (trophyClickCount.current >= 3) {
                setTrophyFound(true);
                trophyClickCount.current = 0;
              } else {
                trophyClickTimer.current = setTimeout(() => { trophyClickCount.current = 0; }, 800);
              }
            }}
          >
            <span>Crafted with</span>
            <motion.span
              className="text-[#00AEEF]"
              animate={{
                scale: [1, 1.3, 1],
                textShadow: [
                  "0 0 5px rgba(0,174,239,0.5)",
                  "0 0 20px rgba(0,174,239,0.8)",
                  "0 0 5px rgba(0,174,239,0.5)",
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <span>in Beirut</span>
          </div>
        </motion.div>
      </div>

      {/* Collectible: Trophy (click "Crafted with ♥" 3 times) */}
      <CollectibleTrigger id="trophy" emoji="🏆" triggered={trophyFound} />
    </footer>
  );
}
