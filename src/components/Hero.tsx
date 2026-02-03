"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles, Play } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Text scramble effect
function useTextScramble(text: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return displayText;
}

// Magnetic button component
function MagneticButton({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a ref={buttonRef} href={href} className={className}>
      {children}
    </a>
  );
}

// Particle system component
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#2CACE2]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Video modal component
function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/bluedge/blue edge gif 3.mp4" type="video/mp4" />
            </video>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const parallaxLayersRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const scrambledText = useTextScramble("The Agency That Cares", animationStarted);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for hero entrance
      const tl = gsap.timeline({
        delay: 2.8,
        onStart: () => setAnimationStarted(true),
      });

      // Logo reveal with electric pulse
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          {
            scale: 0,
            opacity: 0,
            rotate: -180,
            filter: "blur(20px)",
          },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          },
          0
        );
      }

      // Animate first line characters with 3D rotation
      const line1Chars = line1Ref.current?.querySelectorAll(".char");
      if (line1Chars) {
        tl.fromTo(
          line1Chars,
          {
            y: 200,
            rotateX: -90,
            rotateY: 10,
            opacity: 0,
            scale: 0.5,
          },
          {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: {
              each: 0.03,
              from: "start",
            },
            ease: "power4.out",
          },
          0.5
        );
      }

      // Animate second line with different effect
      const line2Chars = line2Ref.current?.querySelectorAll(".char");
      if (line2Chars) {
        tl.fromTo(
          line2Chars,
          {
            y: 150,
            rotateX: -60,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: {
              each: 0.025,
              from: "start",
            },
            ease: "power3.out",
          },
          "-=1"
        );
      }

      // Animate subtitle with split reveal
      tl.fromTo(
        subtitleRef.current,
        {
          y: 80,
          opacity: 0,
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Animate CTA buttons with elastic effect
      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren) {
        tl.fromTo(
          ctaChildren,
          {
            y: 60,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "elastic.out(1, 0.75)",
          },
          "-=0.6"
        );
      }

      // Animate scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      );

      // Parallax layers animation on scroll
      const layers = parallaxLayersRef.current?.querySelectorAll(".parallax-layer");
      if (layers) {
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 0.2;
          gsap.to(layer, {
            y: () => window.innerHeight * depth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      }

      // Title parallax and fade on scroll
      gsap.to(titleRef.current, {
        y: -300,
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1.5,
        },
      });

      // Logo parallax on scroll
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -150,
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
        });
      }

      // Scroll indicator bounce
      const arrow = scrollIndicatorRef.current?.querySelector(".arrow");
      if (arrow) {
        gsap.to(arrow, {
          y: 15,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "power1.inOut",
        });
      }

      // Floating orbs animation
      gsap.utils.toArray(".floating-orb").forEach((orb) => {
        const el = orb as HTMLElement;
        gsap.to(el, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          rotation: "random(-15, 15)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Continuous logo glow pulse
      if (logoRef.current) {
        gsap.to(logoRef.current.querySelector(".logo-glow"), {
          opacity: 0.8,
          scale: 1.2,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Where Ideas";
  const line2 = "Take Flight";

  return (
    <>
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "140px",
          paddingBottom: "80px",
        }}
      >
        {/* Multi-layer parallax background */}
        <div ref={parallaxLayersRef} className="absolute inset-0 overflow-hidden">
          {/* Layer 1 - Animated grid */}
          <div className="parallax-layer absolute inset-0">
            <div className="grid-bg-dense absolute inset-0" />
          </div>

          {/* Layer 2 - Animated blobs */}
          <div className="parallax-layer absolute inset-0">
            <div
              className="floating-orb blob morph-blob absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#2CACE2]"
              style={{ opacity: 0.15 }}
            />
            <div
              className="floating-orb blob liquid-blob absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-[#0077B6]"
              style={{ animationDelay: "-4s", opacity: 0.12 }}
            />
            <div
              className="floating-orb blob morph-blob absolute bottom-[20%] left-[40%] w-[400px] h-[400px] bg-[#2CACE2]"
              style={{ animationDelay: "-8s", opacity: 0.1 }}
            />
          </div>

          {/* Layer 3 - Floating particles */}
          <div className="parallax-layer absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="floating-orb absolute rounded-full bg-[#2CACE2]"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "blur(1px)",
                  opacity: 0.4,
                }}
              />
            ))}
          </div>

          {/* Layer 4 - Geometric shapes & orbital rings */}
          <div className="parallax-layer absolute inset-0 pointer-events-none">
            {/* Multiple rotating rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit" style={{ animationDuration: "60s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="url(#heroGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="10 20"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2CACE2" />
                    <stop offset="100%" stopColor="#0077B6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit-reverse" style={{ animationDuration: "45s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="160"
                  fill="none"
                  stroke="#2CACE2"
                  strokeWidth="0.3"
                  strokeDasharray="5 15"
                  opacity="0.2"
                />
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit" style={{ animationDuration: "30s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="140"
                  fill="none"
                  stroke="#2CACE2"
                  strokeWidth="0.2"
                  strokeDasharray="3 10"
                  opacity="0.15"
                />
              </svg>
            </div>

            {/* Corner accents */}
            <div className="absolute top-20 left-20 w-40 h-40 border-l-2 border-t-2 border-[#2CACE2]/20 rounded-tl-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 border-r-2 border-b-2 border-[#2CACE2]/20 rounded-br-3xl" />

            {/* Diagonal lines */}
            <div className="absolute top-0 right-1/4 w-px h-[40%] bg-gradient-to-b from-transparent via-[#2CACE2]/10 to-transparent" />
            <div className="absolute bottom-0 left-1/4 w-px h-[40%] bg-gradient-to-t from-transparent via-[#2CACE2]/10 to-transparent" />
          </div>

          {/* Layer 5 - Noise texture */}
          <div className="parallax-layer absolute inset-0 opacity-[0.02]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        {/* Particle field */}
        <ParticleField />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto">
          {/* BluEdge Logo */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, scale: 0 }}
            className="mb-12 relative"
          >
            <div className="logo-glow absolute -inset-8 bg-[#2CACE2]/20 rounded-full blur-3xl opacity-50" />
            <div className="relative w-48 h-auto electric-pulse">
              <Image
                src="/bluedge/Logo.svg"
                alt="BluEdge Logo"
                width={192}
                height={136}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Eyebrow with scramble effect */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#2CACE2]/20 bg-[#2CACE2]/5 backdrop-blur-sm electric-border">
              <Sparkles className="w-4 h-4 text-[#2CACE2] animate-pulse" />
              <span className="text-sm text-white/70 tracking-wide font-mono">
                {scrambledText || "The Agency That Cares"} — Lebanon & GCC
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2CACE2] animate-pulse" />
            </span>
          </motion.div>

          {/* Main title with 3D character animation */}
          <h1
            ref={titleRef}
            className="hero-title mb-10"
            style={{ perspective: "1000px" }}
          >
            {/* Line 1 */}
            <span ref={line1Ref} className="block overflow-hidden mb-2">
              {line1.split("").map((char, i) => (
                <span
                  key={`l1-${i}`}
                  className="char inline-block will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>

            {/* Line 2 with gradient */}
            <span ref={line2Ref} className="block overflow-hidden">
              {line2.split("").map((char, i) => (
                <span
                  key={`l2-${i}`}
                  className="char inline-block text-gradient will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle with reveal animation */}
          <p ref={subtitleRef} className="body-text max-w-2xl mb-14 text-xl">
            We&apos;re a creative powerhouse transforming brands across Lebanon and
            the GCC. From bold identities to immersive digital experiences, we make
            your vision soar.
          </p>

          {/* Magnetic CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-5 items-center">
            <MagneticButton
              href="#contact"
              className="btn-primary btn-shine group inline-flex items-center gap-3"
            >
              <span>Start Your Project</span>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowDown className="w-4 h-4 text-white rotate-[-90deg]" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="#work"
              className="magnetic-btn btn-shine rounded-full inline-flex items-center gap-3"
            >
              <span>View Our Work</span>
            </MagneticButton>

            {/* Play reel button */}
            <motion.button
              onClick={() => setVideoModalOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <span className="w-14 h-14 rounded-full border border-[#2CACE2]/30 flex items-center justify-center relative overflow-hidden group-hover:border-[#2CACE2] transition-colors">
                <span className="absolute inset-0 bg-[#2CACE2]/0 group-hover:bg-[#2CACE2]/20 transition-colors" />
                <Play className="w-5 h-5 text-[#2CACE2] relative z-10 ml-0.5" />
              </span>
              <span className="text-sm uppercase tracking-wider">Watch Reel</span>
            </motion.button>
          </div>

          {/* Animated stats row */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 1, ease: "easeOut" }}
            className="flex flex-wrap gap-12 mt-20 pt-10 border-t border-white/10"
          >
            {[
              { number: "20+", label: "Years Experience" },
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5", label: "Countries Served" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 + i * 0.15, duration: 0.8 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-4xl md:text-5xl font-bold text-gradient mb-1"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator with animated path */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs text-white/40 uppercase tracking-[0.3em]">
            Scroll to explore
          </span>
          <div className="arrow w-8 h-14 rounded-full border border-[#2CACE2]/30 flex items-start justify-center pt-3 relative overflow-hidden">
            <div className="w-1.5 h-3 rounded-full bg-[#2CACE2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2CACE2]/10 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Side decoration - Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#2CACE2]/50 to-transparent" />
          <span
            className="text-xs tracking-[0.3em] text-white/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Est. 2004
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#2CACE2]/50 to-transparent" />
        </motion.div>

        {/* Left side decoration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#2CACE2]/30 to-transparent" />
          <div className="w-3 h-3 rounded-full border border-[#2CACE2]/30 pulse-ring" />
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#2CACE2]/30 to-transparent" />
        </motion.div>

        {/* Bottom right floating video preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          className="absolute bottom-32 right-[5%] hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-48 h-28 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setVideoModalOpen(true)}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/bluedge/blue edge gif 1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#2CACE2]/80 flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
            </div>
            <div className="absolute inset-0 border border-[#2CACE2]/30 rounded-xl group-hover:border-[#2CACE2]/60 transition-colors" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
