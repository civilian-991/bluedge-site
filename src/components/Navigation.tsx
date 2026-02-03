"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#work" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

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
    const ctx = gsap.context(() => {
      // Nav slides in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
      );

      // Logo magnetic effect
      const logo = logoRef.current;
      if (logo) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = logo.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(logo, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(logo, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        };

        logo.addEventListener("mousemove", handleMouseMove);
        logo.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          logo.removeEventListener("mousemove", handleMouseMove);
          logo.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, navRef);

    return () => ctx.revert();
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
            ? "py-3 bg-[#050508]/95 backdrop-blur-xl border-b border-accent/10 shadow-lg shadow-accent/5"
            : "py-6"
        }`}
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          {/* Logo with BluEdge branding */}
          <Link href="/" className="relative z-[110] group">
            <div ref={logoRef} className="flex items-center gap-4">
              {/* Animated logo container */}
              <motion.div
                className="relative w-12 h-12 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(44, 172, 226, 0)",
                      "0 0 20px 5px rgba(44, 172, 226, 0.3)",
                      "0 0 0 0 rgba(44, 172, 226, 0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Logo background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl" />

                {/* BluEdge Logo SVG */}
                <Image
                  src="/bluedge/Logo.svg"
                  alt="BluEdge"
                  fill
                  className="object-contain p-2"
                />

                {/* Orbiting dot */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-accent"
                  style={{ top: -4, left: "50%", marginLeft: -4 }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Text logo */}
              <div className="hidden sm:flex flex-col">
                <motion.span
                  className="text-xl font-bold tracking-tight leading-none"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-gradient">Blu</span>
                  <span className="text-white">Edge</span>
                </motion.span>
                <motion.span
                  className="text-[10px] tracking-[0.25em] text-white/40 uppercase"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3 }}
                >
                  Marketing Agency
                </motion.span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                className="relative"
                onHoverStart={() => setActiveLink(link.name)}
                onHoverEnd={() => setActiveLink(null)}
              >
                <Link
                  href={link.href}
                  className="relative px-5 py-3 text-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {link.name}

                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-1 left-5 right-5 h-px bg-gradient-to-r from-accent to-accent/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeLink === link.name ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Hover glow */}
                  <AnimatePresence>
                    {activeLink === link.name && (
                      <motion.span
                        className="absolute inset-0 rounded-lg bg-accent/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button with animation */}
          <div className="hidden lg:flex items-center gap-6">
            <motion.a
              href="tel:+9611234567"
              className="text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-2"
              whileHover={{ x: 3 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-accent"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              +961 1 234 567
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#contact"
                className="btn-primary btn-shine text-xs py-3 px-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Get a Quote</span>

                {/* Shine effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button with animation */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[110] lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 hover:border-accent/30 transition-colors bg-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 6 : 0,
                backgroundColor: isMenuOpen ? "#2CACE2" : "#ffffff",
              }}
              className="w-5 h-0.5 bg-white block origin-center"
            />
            <motion.span
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                scaleX: isMenuOpen ? 0 : 1,
              }}
              className="w-5 h-0.5 bg-white block"
            />
            <motion.span
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -6 : 0,
                backgroundColor: isMenuOpen ? "#2CACE2" : "#ffffff",
              }}
              className="w-5 h-0.5 bg-white block origin-center"
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu with heavy animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[105] bg-[#050508] flex items-center justify-center"
          >
            {/* Animated background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px]"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#0077B6]/10 blur-[80px]"
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [0, -30, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 noise-overlay opacity-30" />
            </div>

            {/* Menu content */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* BluEdge Logo at top */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Image
                  src="/bluedge/Logo.svg"
                  alt="BluEdge"
                  width={80}
                  height={80}
                  className="opacity-80"
                />
              </motion.div>

              {/* Navigation links */}
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative block text-5xl md:text-7xl font-bold tracking-tighter"
                  >
                    {/* Text with character animation */}
                    <span className="relative inline-block">
                      {link.name.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          className="inline-block"
                          whileHover={{
                            color: "#2CACE2",
                            y: -5,
                            textShadow: "0 0 20px rgba(44, 172, 226, 0.5)",
                          }}
                          transition={{ duration: 0.2, delay: charIndex * 0.02 }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>

                    {/* Animated underline on hover */}
                    <motion.span
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-accent to-transparent"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Number indicator */}
                    <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm text-accent/50 font-normal">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary btn-shine text-base px-10 py-5"
                  >
                    Start a Project
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Contact info at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-12 left-0 right-0 px-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/40">
                <motion.a
                  href="mailto:hello@bluedge.me"
                  className="hover:text-accent transition-colors flex items-center gap-2"
                  whileHover={{ x: 3 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  hello@bluedge.me
                </motion.a>
                <span className="hidden md:block text-white/20">|</span>
                <motion.a
                  href="tel:+9611234567"
                  className="hover:text-accent transition-colors flex items-center gap-2"
                  whileHover={{ x: 3 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  +961 1 234 567
                </motion.a>
                <span className="hidden md:block text-white/20">|</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Beirut, Lebanon
                </span>
              </div>

              {/* Social links with hover effects */}
              <div className="flex justify-center gap-8 mt-6">
                {["Instagram", "LinkedIn", "Behance"].map((social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-xs text-white/30 hover:text-accent transition-colors uppercase tracking-widest"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
