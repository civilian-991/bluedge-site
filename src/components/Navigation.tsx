"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Animate nav on mount
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
    );
  }, []);

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 40,
      },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: {
        type: "spring" as const,
        stiffness: 50,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[#050508]/90 backdrop-blur-xl border-b border-[#00AEEF]/10"
            : "py-6"
        }`}
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-[110] group flex items-center gap-3">
            {/* BE Circle Logo */}
            <div className="be-logo group-hover:scale-110 transition-transform duration-300">
              <span>BE</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none">
                <span className="text-gradient">BLU</span>
                <span className="text-white"> EDGE</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                Creative Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+9611234567"
              className="text-sm text-white/60 hover:text-[#00AEEF] transition-colors"
            >
              +961 1 234 567
            </a>
            <Link href="#contact" className="btn-primary btn-shine text-xs py-3 px-6">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[110] lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 hover:border-[#00AEEF]/30 transition-colors"
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
                backgroundColor: isMenuOpen ? "#00AEEF" : "#ffffff",
              }}
              className="w-5 h-0.5 bg-white block origin-center"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                x: isMenuOpen ? 20 : 0,
              }}
              className="w-5 h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
                backgroundColor: isMenuOpen ? "#00AEEF" : "#ffffff",
              }}
              className="w-5 h-0.5 bg-white block origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[105] bg-[#050508] flex items-center justify-center"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="blob morph-blob absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00AEEF] opacity-10" />
              <div className="blob morph-blob absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#0077B6] opacity-10" />
              <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-6xl font-bold tracking-tighter hover:text-gradient transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8"
              >
                <Link
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary btn-shine text-sm"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-16 left-0 right-0 px-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-white/50">
                <a href="mailto:hello@bluedge.me" className="hover:text-[#00AEEF] transition-colors">
                  hello@bluedge.me
                </a>
                <span className="hidden md:block">|</span>
                <a href="tel:+9611234567" className="hover:text-[#00AEEF] transition-colors">
                  +961 1 234 567
                </a>
                <span className="hidden md:block">|</span>
                <span>Beirut, Lebanon</span>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-6 mt-6">
                {["Instagram", "LinkedIn", "Behance"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs text-white/40 hover:text-[#00AEEF] transition-colors uppercase tracking-wider"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
