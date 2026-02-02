"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socialLinks, contactInfo, services } from "@/data";

const footerLinks = {
  services: services.map(s => ({ name: s.title, href: "#services" })),
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Work", href: "#work" },
    { name: "The Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      className="relative pt-32 pb-8 bg-[#030306] overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/20 to-transparent" />
        <div className="blob morph-blob absolute -top-40 left-1/3 w-[500px] h-[500px] bg-[#00AEEF] opacity-5" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="hero-title mb-8">
            Let&apos;s work{" "}
            <span className="text-gradient">together</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mb-10 text-lg">
            Ready to take your brand to the next level? Let&apos;s create something extraordinary.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 px-10 py-6 rounded-full border border-[#00AEEF]/30 hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-500"
          >
            <span className="text-xl font-semibold">Start a Project</span>
            <div className="w-12 h-12 rounded-full bg-[#00AEEF]/20 flex items-center justify-center group-hover:bg-[#00AEEF] transition-colors duration-300">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="be-logo w-12 h-12">
                <span className="text-xl">BE</span>
              </div>
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
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-[#00AEEF]/20 flex items-center justify-center hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-white/40 group-hover:text-[#00AEEF] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-[#00AEEF] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-[#00AEEF] text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6 text-white/70">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/40 hover:text-[#00AEEF] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white/40">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-white/40 text-sm mb-4">
                Subscribe for design tips & insights
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-[#00AEEF] text-white text-sm font-medium hover:bg-[#00AEEF]/80 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Blu Edge Agency. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/30 hover:text-white/50 text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>Crafted with</span>
            <span className="text-[#00AEEF]">♥</span>
            <span>in Beirut</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
