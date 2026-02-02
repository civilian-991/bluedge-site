"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const parallaxLayersRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  const scrambledText = useTextScramble("Creative Marketing Agency", animationStarted);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for hero entrance
      const tl = gsap.timeline({
        delay: 2.8,
        onStart: () => setAnimationStarted(true),
      });

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
          }
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Where Ideas";
  const line2 = "Take Flight";

  return (
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
        {/* Layer 1 - Deepest */}
        <div className="parallax-layer absolute inset-0">
          <div className="grid-bg absolute inset-0" />
        </div>

        {/* Layer 2 - Animated blobs */}
        <div className="parallax-layer absolute inset-0">
          <div
            className="floating-orb blob morph-blob absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#00AEEF]"
            style={{ opacity: 0.2 }}
          />
          <div
            className="floating-orb blob morph-blob absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-[#0077B6]"
            style={{ animationDelay: "-4s", opacity: 0.15 }}
          />
        </div>

        {/* Layer 3 - Middle depth */}
        <div className="parallax-layer absolute inset-0">
          <div
            className="floating-orb absolute top-[20%] right-[20%] w-4 h-4 rounded-full bg-[#00AEEF]"
            style={{ filter: "blur(1px)" }}
          />
          <div
            className="floating-orb absolute top-[70%] left-[15%] w-3 h-3 rounded-full bg-[#0077B6]"
            style={{ filter: "blur(1px)" }}
          />
          <div
            className="floating-orb absolute top-[40%] left-[40%] w-2 h-2 rounded-full bg-white/30"
          />
        </div>

        {/* Layer 4 - Geometric shapes */}
        <div className="parallax-layer absolute inset-0 pointer-events-none">
          {/* Rotating ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full animate-spin"
              style={{ animationDuration: "60s" }}
            >
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
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="url(#heroGradient)"
                strokeWidth="0.3"
                strokeDasharray="5 15"
                opacity="0.2"
              />
              <defs>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00AEEF" />
                  <stop offset="100%" stopColor="#0077B6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Corner accents */}
          <div className="absolute top-20 left-20 w-32 h-32 border-l border-t border-[#00AEEF]/20" />
          <div className="absolute bottom-20 right-20 w-32 h-32 border-r border-b border-[#00AEEF]/20" />
        </div>

        {/* Layer 5 - Noise texture */}
        <div className="parallax-layer absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto">
        {/* Eyebrow with scramble effect */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#00AEEF]/20 bg-[#00AEEF]/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#00AEEF] animate-pulse" />
            <span className="text-sm text-white/70 tracking-wide font-mono">
              {scrambledText || "Creative Marketing Agency"} in Lebanon & GCC
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
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
        <div ref={ctaRef} className="flex flex-wrap gap-5">
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
        <div className="arrow w-8 h-14 rounded-full border border-[#00AEEF]/30 flex items-start justify-center pt-3 relative overflow-hidden">
          <div className="w-1.5 h-3 rounded-full bg-[#00AEEF]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00AEEF]/10 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Side decoration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#00AEEF]/50 to-transparent" />
        <span
          className="text-xs tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2004
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#00AEEF]/50 to-transparent" />
      </motion.div>

      {/* Left side decoration */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00AEEF]/30 to-transparent" />
        <div className="w-3 h-3 rounded-full border border-[#00AEEF]/30 animate-pulse" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00AEEF]/30 to-transparent" />
      </motion.div>
    </section>
  );
}
