"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const serviceSubLinks = [
  { name: "Branding", href: "/services/branding" },
  { name: "Web Design", href: "/services/web-design" },
  { name: "Mobile Apps", href: "/services/mobile-apps" },
  { name: "Project Dev", href: "/services/project-development" },
  { name: "Traditional Media", href: "/services/traditional-media" },
];

interface NavLink {
  name: string;
  href: string;
  homeHref?: string; // hash link for homepage
  children?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Services", href: "/services/branding", homeHref: "#services", children: serviceSubLinks },
  { name: "Work", href: "/work", homeHref: "#work" },
  { name: "Team", href: "/team", homeHref: "#about" },
  { name: "Blog", href: "/blog" },
  { name: "Manifesto", href: "/manifesto" },
  { name: "Contact", href: "/#contact", homeHref: "#contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  function resolveHref(link: NavLink): string {
    if (isHomepage && link.homeHref) return link.homeHref;
    return link.href;
  }

  function isActive(link: NavLink): boolean {
    if (link.children) {
      return link.children.some((c) => pathname.startsWith(c.href));
    }
    // Hash-only links (like /#contact) have no dedicated page — never "active"
    if (link.href.includes("#")) return false;
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  }

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setMobileAccordion(null);
  }, []);

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
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Keyboard: Escape closes dropdown & mobile menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (dropdownOpen) setDropdownOpen(null);
        if (isMenuOpen) closeMenu();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen, isMenuOpen, closeMenu]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", trapFocus);
    requestAnimationFrame(() => first.focus());
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isMenuOpen]);

  // Animate nav on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: isHomepage ? 2.5 : 0.3, ease: "power3.out" }
      );

      const logo = logoRef.current;
      if (logo) {
        const quickX = gsap.quickTo(logo, "x", { duration: 0.3, ease: "power2.out" });
        const quickY = gsap.quickTo(logo, "y", { duration: 0.3, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = logo.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          quickX(x * 0.2);
          quickY(y * 0.2);
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
  }, [isHomepage]);

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

  function handleDropdownEnter(name: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(name);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200);
  }

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <nav
        ref={navRef}
        aria-label="Main navigation"
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
              <motion.div
                className="relative w-12 h-12 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl" />
                <Image
                  src="/bluedge/Logo.svg"
                  alt="BluEdge"
                  fill
                  className="object-contain p-2"
                />
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-accent"
                  style={{ top: -4, left: "50%", marginLeft: -4 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

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
                  transition={{ delay: isHomepage ? 3 : 0.5 }}
                >
                  Marketing Agency
                </motion.span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && handleDropdownEnter(link.name)}
                  onMouseLeave={() => link.children && handleDropdownLeave()}
                >
                  <Link
                    href={resolveHref(link)}
                    className={`relative px-5 py-3 text-sm font-medium transition-colors uppercase tracking-wider inline-flex items-center gap-1 group/link ${
                      active ? "text-accent" : "text-white/60 hover:text-white"
                    }`}
                    {...(active ? { "aria-current": "page" as const } : {})}
                    {...(link.children ? {
                      "aria-haspopup": "true" as const,
                      "aria-expanded": dropdownOpen === link.name,
                    } : {})}
                  >
                    {link.name}
                    {link.children && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          dropdownOpen === link.name ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    <span
                      className="absolute bottom-1 left-5 right-5 h-px bg-gradient-to-r from-accent to-accent/50 origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"
                    />

                    <span
                      className="absolute inset-0 rounded-lg bg-accent/5 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                    />
                  </Link>

                  {/* Services dropdown */}
                  <AnimatePresence>
                    {link.children && dropdownOpen === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        role="menu"
                        className="absolute top-full left-0 mt-1 min-w-[220px] bg-[#0a0a12]/95 backdrop-blur-xl border border-accent/10 rounded-xl overflow-hidden shadow-xl shadow-black/30"
                        onMouseEnter={() => handleDropdownEnter(link.name)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {link.children.map((child, ci) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            role="menuitem"
                            className={`block px-5 py-3 text-sm transition-all hover:bg-accent/10 hover:text-accent border-b border-white/5 last:border-b-0 ${
                              pathname === child.href
                                ? "text-accent bg-accent/5"
                                : "text-white/60"
                            }`}
                            {...(pathname === child.href ? { "aria-current": "page" as const } : {})}
                          >
                            <motion.span
                              initial={{ x: -5, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: ci * 0.04 }}
                              className="flex items-center gap-3"
                            >
                              <span className="text-accent/40 text-xs font-mono">0{ci + 1}</span>
                              {child.name}
                            </motion.span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
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
                href={isHomepage ? "#contact" : "/#contact"}
                className="btn-primary btn-shine text-xs py-3 px-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Get a Quote</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[105] bg-[#050508] flex items-center justify-center"
          >
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

            <div className="relative z-10 flex flex-col items-center gap-4 w-full px-8 max-h-[80vh] overflow-y-auto">
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

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="overflow-hidden w-full text-center"
                >
                  {link.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileAccordion(
                            mobileAccordion === link.name ? null : link.name
                          )
                        }
                        aria-expanded={mobileAccordion === link.name}
                        className="group relative inline-flex items-center gap-3 text-4xl md:text-5xl font-bold tracking-tighter"
                      >
                        <span className="relative inline-block">
                          {link.name.split("").map((char, ci) => (
                            <motion.span
                              key={ci}
                              className="inline-block"
                              whileHover={{
                                color: "#2CACE2",
                                y: -5,
                                textShadow: "0 0 20px rgba(44, 172, 226, 0.5)",
                              }}
                              transition={{ duration: 0.2, delay: ci * 0.02 }}
                            >
                              {char}
                            </motion.span>
                          ))}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 text-accent/50 transition-transform ${
                            mobileAccordion === link.name ? "rotate-180" : ""
                          }`}
                        />
                        <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm text-accent/50 font-normal">
                          0{i + 1}
                        </span>
                      </button>

                      <AnimatePresence>
                        {mobileAccordion === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col items-center gap-3 py-4">
                              {link.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="text-lg text-white/50 hover:text-accent transition-colors"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={resolveHref(link)}
                      onClick={closeMenu}
                      className="group relative block text-4xl md:text-5xl font-bold tracking-tighter"
                    >
                      <span className="relative inline-block">
                        {link.name.split("").map((char, ci) => (
                          <motion.span
                            key={ci}
                            className="inline-block"
                            whileHover={{
                              color: "#2CACE2",
                              y: -5,
                              textShadow: "0 0 20px rgba(44, 172, 226, 0.5)",
                            }}
                            transition={{ duration: 0.2, delay: ci * 0.02 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-accent to-transparent"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-sm text-accent/50 font-normal">
                        0{i + 1}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}

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
                    href={isHomepage ? "#contact" : "/#contact"}
                    onClick={closeMenu}
                    className="btn-primary btn-shine text-base px-10 py-5"
                  >
                    Start a Project
                  </Link>
                </motion.div>
              </motion.div>
            </div>

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
