"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, Zap } from "lucide-react";
import TintinRocket from "./retro/TintinRocket";
import ParticleConstellation from "./retro/ParticleConstellation";
import Image from "next/image";
import { useCollectibles } from "@/hooks/useCollectibles";
import { CollectibleTrigger } from "./retro/CollectibleItem";

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

// Explosion particles component
function ExplosionParticles({ trigger, count = 30 }: { trigger: boolean; count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full pointer-events-none";
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(44, 172, 226, ${Math.random() * 0.8 + 0.2})`;
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(44, 172, 226, 0.8)`;
      particle.style.left = "50%";
      particle.style.top = "50%";
      containerRef.current.appendChild(particle);
      particles.push(particle);

      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const velocity = 200 + Math.random() * 400;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      gsap.fromTo(
        particle,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        {
          x: tx,
          y: ty,
          scale: 0,
          opacity: 0,
          duration: 1 + Math.random() * 0.5,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        }
      );
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [trigger, count]);

  return <div ref={containerRef} className="absolute inset-0 overflow-visible pointer-events-none" />;
}

// Shockwave component
function Shockwave({ trigger, delay = 0 }: { trigger: boolean; delay?: number }) {
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !waveRef.current) return;

    const waves = waveRef.current.querySelectorAll(".wave-ring");
    waves.forEach((wave, i) => {
      gsap.fromTo(
        wave,
        { scale: 0, opacity: 1 },
        {
          scale: 4,
          opacity: 0,
          duration: 1.5,
          delay: delay + i * 0.15,
          ease: "power2.out",
        }
      );
    });
  }, [trigger, delay]);

  return (
    <div ref={waveRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="wave-ring absolute w-full h-full rounded-full border-2 border-[#2CACE2] opacity-0"
          style={{ borderWidth: `${4 - i}px` }}
        />
      ))}
    </div>
  );
}

// Lightning effect component
function LightningBolts({ trigger }: { trigger: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const bolts = containerRef.current.querySelectorAll(".lightning-bolt");
    bolts.forEach((bolt, i) => {
      gsap.fromTo(
        bolt,
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.1,
          delay: i * 0.05,
          yoyo: true,
          repeat: 2,
          ease: "power4.out",
        }
      );
    });
  }, [trigger]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="lightning-bolt absolute w-1 opacity-0"
          style={{
            height: `${150 + Math.random() * 200}px`,
            left: `${10 + i * 12}%`,
            top: 0,
            background: `linear-gradient(to bottom, transparent, #2CACE2, white, #2CACE2, transparent)`,
            filter: "blur(1px)",
            transformOrigin: "top center",
            transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
          }}
        />
      ))}
    </div>
  );
}

// Energy beam component
function EnergyBeams({ trigger }: { trigger: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const beams = containerRef.current.querySelectorAll(".energy-beam-line");
    beams.forEach((beam, i) => {
      gsap.fromTo(
        beam,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
          delay: 0.1 + i * 0.08,
          ease: "power4.out",
          onComplete: () => {
            gsap.to(beam, {
              opacity: 0,
              duration: 0.5,
              delay: 0.2,
            });
          },
        }
      );
    });
  }, [trigger]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="energy-beam-line absolute h-1 opacity-0"
          style={{
            width: "100%",
            top: `${15 + i * 15}%`,
            left: 0,
            background: `linear-gradient(90deg, transparent, #2CACE2, rgba(255,255,255,0.9), #2CACE2, transparent)`,
            filter: "blur(1px)",
            boxShadow: "0 0 20px #2CACE2, 0 0 40px rgba(44,172,226,0.5)",
            transformOrigin: "left center",
          }}
        />
      ))}
    </div>
  );
}

// Magnetic button component with rocket effect
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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
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
    <a
      ref={buttonRef}
      href={href}
      className={`${className} relative overflow-visible`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rocket flame effect on hover */}
      <div
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="relative">
          <div
            className="absolute w-full h-16 animate-pulse"
            style={{
              background: "linear-gradient(to bottom, rgba(44,172,226,0.8), rgba(2,62,138,0.4), transparent)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="absolute w-3/4 h-12 left-1/2 -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(44,172,226,0.6), transparent)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>
      {children}
    </a>
  );
}

// Particle system component with enhanced effects
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            background: i % 3 === 0 ? "#2CACE2" : i % 3 === 1 ? "#0077B6" : "rgba(255,255,255,0.8)",
            boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
          }}
          animate={{
            y: [0, -150 - Math.random() * 100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
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
            initial={{ scale: 0.5, opacity: 0, rotateX: -30, y: 100 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 30, y: -100 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden"
            style={{ perspective: "1000px" }}
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

// Floating orb with trail
function FloatingOrb({ delay = 0, size = 100, color = "#2CACE2" }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: `blur(${size / 3}px)`,
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 40, 0],
        scale: [1, 1.2, 0.9, 1],
        opacity: [0.3, 0.5, 0.3, 0.3],
      }}
      transition={{
        duration: 15 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
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
  const [explosionTrigger, setExplosionTrigger] = useState(false);
  const [shockwaveTrigger, setShockwaveTrigger] = useState(false);
  const [lightningTrigger, setLightningTrigger] = useState(false);
  const [energyBeamTrigger, setEnergyBeamTrigger] = useState(false);
  const [starFound, setStarFound] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrambledText = useTextScramble("The Agency That Cares", animationStarted);

  // Trigger all explosive effects
  const triggerExplosion = useCallback(() => {
    setExplosionTrigger(true);
    setTimeout(() => setShockwaveTrigger(true), 100);
    setTimeout(() => setLightningTrigger(true), 200);
    setTimeout(() => setEnergyBeamTrigger(true), 300);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for hero entrance
      const tl = gsap.timeline({
        delay: 2.8,
        onStart: () => {
          setAnimationStarted(true);
          // Trigger explosion effects
          setTimeout(triggerExplosion, 500);
        },
      });

      // Nuclear flash effect at start
      const flashOverlay = document.createElement("div");
      flashOverlay.className = "fixed inset-0 bg-white pointer-events-none z-[9999]";
      flashOverlay.style.opacity = "0";
      document.body.appendChild(flashOverlay);

      tl.to(flashOverlay, {
        opacity: 0.6,
        duration: 0.1,
        ease: "power4.out",
      }, 0);

      tl.to(flashOverlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => flashOverlay.remove(),
      }, 0.1);

      // Logo reveal with explosive entrance
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          {
            scale: 0,
            opacity: 0,
            rotate: -540,
            filter: "blur(40px) brightness(3)",
          },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            filter: "blur(0px) brightness(1)",
            duration: 1.8,
            ease: "elastic.out(1, 0.4)",
          },
          0.2
        );

        // Power surge effect
        tl.to(logoRef.current, {
          filter: "brightness(2) drop-shadow(0 0 60px rgba(44,172,226,1))",
          duration: 0.15,
          yoyo: true,
          repeat: 3,
          ease: "power4.inOut",
        }, 0.5);
      }

      // Animate first line characters with explosive 3D rotation
      const line1Chars = line1Ref.current?.querySelectorAll(".char");
      if (line1Chars) {
        tl.fromTo(
          line1Chars,
          {
            y: 300,
            rotateX: -180,
            rotateY: 45,
            rotateZ: -20,
            opacity: 0,
            scale: 0,
            filter: "blur(20px)",
          },
          {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: {
              each: 0.04,
              from: "center",
            },
            ease: "back.out(2)",
          },
          0.6
        );

        // Glitch shake on each character - keeping blue tones
        line1Chars.forEach((char, i) => {
          tl.to(char, {
            x: "random(-3, 3)",
            textShadow: "0 0 20px rgba(44,172,226,0.8)",
            duration: 0.05,
            yoyo: true,
            repeat: 2,
          }, 1 + i * 0.02);
        });
      }

      // Animate second line with different explosive effect
      const line2Chars = line2Ref.current?.querySelectorAll(".char");
      if (line2Chars) {
        tl.fromTo(
          line2Chars,
          {
            y: -200,
            rotateX: 180,
            opacity: 0,
            scale: 2,
            filter: "blur(30px) brightness(3)",
          },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 1.4,
            stagger: {
              each: 0.03,
              from: "random",
            },
            ease: "elastic.out(1, 0.5)",
          },
          0.8
        );
      }

      // Animate subtitle with split reveal and boom
      tl.fromTo(
        subtitleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.5,
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
        },
        1.2
      );

      // Animate CTA buttons with rocket launch effect
      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren) {
        Array.from(ctaChildren).forEach((child, i) => {
          tl.fromTo(
            child,
            {
              y: 150,
              opacity: 0,
              scale: 0.3,
              rotateX: -60,
              filter: "blur(10px)",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "back.out(2)",
            },
            1.4 + i * 0.15
          );

          // Bounce effect
          tl.to(child, {
            y: -15,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          }, 1.6 + i * 0.15);
        });
      }

      // Animate scroll indicator with pulse
      tl.fromTo(
        scrollIndicatorRef.current,
        { y: 80, opacity: 0, scale: 0 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        1.8
      );

      // Parallax layers animation on scroll
      const layers = parallaxLayersRef.current?.querySelectorAll(".parallax-layer");
      if (layers) {
        layers.forEach((layer, i) => {
          const depth = (i + 1) * 0.25;
          gsap.to(layer, {
            y: () => window.innerHeight * depth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        });
      }

      // Title parallax and fade on scroll with rotation
      gsap.to(titleRef.current, {
        y: -400,
        opacity: 0,
        scale: 0.7,
        rotateX: 20,
        filter: "blur(20px)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: 2,
        },
      });

      // Logo parallax on scroll with spin
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          y: -200,
          scale: 0.5,
          opacity: 0,
          rotate: 180,
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1.5,
          },
        });
      }

      // Scroll indicator continuous animation
      const arrow = scrollIndicatorRef.current?.querySelector(".arrow");
      if (arrow) {
        gsap.to(arrow, {
          y: 20,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: "power1.inOut",
        });
      }

      // Floating orbs animation with more intensity
      gsap.utils.toArray(".floating-orb").forEach((orb) => {
        const el = orb as HTMLElement;
        gsap.to(el, {
          y: "random(-80, 80)",
          x: "random(-60, 60)",
          rotation: "random(-30, 30)",
          scale: "random(0.8, 1.3)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Continuous logo glow pulse with more intensity
      if (logoRef.current) {
        gsap.to(logoRef.current.querySelector(".logo-glow"), {
          opacity: 0.9,
          scale: 1.4,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerExplosion]);

  const line1 = "Where Ideas";
  const line2 = "Take Flight";

  return (
    <>
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />

      <section
        ref={sectionRef}
        data-ambient="section-hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "140px",
          paddingBottom: "80px",
        }}
      >
        {/* Explosion effects layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <ExplosionParticles trigger={explosionTrigger} count={50} />
          <Shockwave trigger={shockwaveTrigger} />
          <LightningBolts trigger={lightningTrigger} />
          <EnergyBeams trigger={energyBeamTrigger} />
        </div>

        {/* Multi-layer parallax background */}
        <div ref={parallaxLayersRef} className="absolute inset-0 overflow-hidden">
          {/* Layer 1 - Animated grid with glow */}
          <div className="parallax-layer absolute inset-0">
            <div className="grid-bg-dense absolute inset-0" />
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(44,172,226,0.05) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Layer 2 - Animated blobs with enhanced glow */}
          <div className="parallax-layer absolute inset-0">
            <FloatingOrb delay={0} size={700} color="#2CACE2" />
            <FloatingOrb delay={2} size={500} color="#0077B6" />
            <FloatingOrb delay={4} size={400} color="#023E8A" />
            <div
              className="floating-orb blob morph-blob absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[#2CACE2]"
              style={{ opacity: 0.2, filter: "blur(80px)" }}
            />
            <div
              className="floating-orb blob liquid-blob absolute top-[60%] right-[10%] w-[500px] h-[500px] bg-[#0077B6]"
              style={{ animationDelay: "-4s", opacity: 0.15, filter: "blur(70px)" }}
            />
            <div
              className="floating-orb blob morph-blob absolute bottom-[20%] left-[40%] w-[400px] h-[400px] bg-[#2CACE2]"
              style={{ animationDelay: "-8s", opacity: 0.12, filter: "blur(60px)" }}
            />
          </div>

          {/* Layer 3 - Floating particles with trails */}
          <div className="parallax-layer absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-orb absolute rounded-full bg-[#2CACE2]"
                style={{
                  width: `${4 + Math.random() * 10}px`,
                  height: `${4 + Math.random() * 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: `0 0 20px rgba(44,172,226,0.8), 0 0 40px rgba(44,172,226,0.4)`,
                }}
                animate={{
                  y: [0, -200, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Layer 4 - Geometric shapes & orbital rings */}
          <div className="parallax-layer absolute inset-0 pointer-events-none">
            {/* Multiple rotating rings with glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit" style={{ animationDuration: "80s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  fill="none"
                  stroke="url(#heroGradient)"
                  strokeWidth="0.5"
                  strokeDasharray="5 15"
                  opacity="0.4"
                  style={{ filter: "drop-shadow(0 0 10px rgba(44,172,226,0.5))" }}
                />
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2CACE2" />
                    <stop offset="100%" stopColor="#0077B6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit-reverse" style={{ animationDuration: "60s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="170"
                  fill="none"
                  stroke="#2CACE2"
                  strokeWidth="0.3"
                  strokeDasharray="10 20"
                  opacity="0.3"
                />
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
              <svg viewBox="0 0 400 400" className="w-full h-full orbit" style={{ animationDuration: "40s" }}>
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="#2CACE2"
                  strokeWidth="0.2"
                  strokeDasharray="3 12"
                  opacity="0.2"
                />
              </svg>
            </div>

            {/* Corner accents with glow */}
            <div className="absolute top-20 left-20 w-48 h-48 border-l-2 border-t-2 border-[#2CACE2]/30 rounded-tl-3xl"
                 style={{ boxShadow: "inset 10px 10px 30px rgba(44,172,226,0.1)" }} />
            <div className="absolute bottom-20 right-20 w-48 h-48 border-r-2 border-b-2 border-[#2CACE2]/30 rounded-br-3xl"
                 style={{ boxShadow: "inset -10px -10px 30px rgba(44,172,226,0.1)" }} />

            {/* Diagonal lines with glow */}
            <div className="absolute top-0 right-1/4 w-px h-[45%] bg-gradient-to-b from-transparent via-[#2CACE2]/20 to-transparent"
                 style={{ boxShadow: "0 0 20px rgba(44,172,226,0.3)" }} />
            <div className="absolute bottom-0 left-1/4 w-px h-[45%] bg-gradient-to-t from-transparent via-[#2CACE2]/20 to-transparent"
                 style={{ boxShadow: "0 0 20px rgba(44,172,226,0.3)" }} />
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

        {/* Interactive Particle Constellation (Feature 19 — replaces ParticleField) */}
        <ParticleConstellation />

        {/* Content — parallax depth container */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto" data-parallax-container>
          {/* BluEdge Logo with enhanced effects */}
          <motion.div
            ref={logoRef}
            initial={{ opacity: 0, scale: 0 }}
            className="mb-12 relative"
            data-depth="3"
          >
            <div className="logo-glow absolute -inset-12 bg-[#2CACE2]/30 rounded-full blur-3xl opacity-50" />
            <div className="absolute -inset-8 rounded-full animate-pulse"
                 style={{
                   background: "conic-gradient(from 0deg, transparent, #2CACE2, transparent, #0077B6, transparent)",
                   filter: "blur(20px)",
                   opacity: 0.3,
                 }} />
            <div
              className="relative w-52 h-auto electric-pulse plasma-glow cursor-pointer"
              onClick={() => {
                clickCountRef.current++;
                if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
                if (clickCountRef.current >= 3) {
                  setStarFound(true);
                  clickCountRef.current = 0;
                } else {
                  clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 600);
                }
              }}
            >
              <Image
                src="/bluedge/Logo.svg"
                alt="BluEdge Logo"
                width={208}
                height={148}
                className="w-full h-auto"
                priority
              />
            </div>
            <CollectibleTrigger id="golden-star" emoji="⭐" triggered={starFound} />
          </motion.div>

          {/* Eyebrow with scramble effect */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#2CACE2]/30 bg-[#2CACE2]/10 backdrop-blur-md electric-border relative overflow-hidden">
              <Zap className="w-4 h-4 text-[#2CACE2] animate-pulse" />
              <span className="text-sm text-white/80 tracking-wide font-mono">
                {scrambledText || "The Agency That Cares"} — Lebanon & GCC
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#2CACE2] animate-pulse"
                    style={{ boxShadow: "0 0 10px #2CACE2, 0 0 20px rgba(44,172,226,0.5)" }} />
            </span>
          </motion.div>

          {/* Main title with 3D character animation */}
          <h1
            ref={titleRef}
            className="hero-title mb-10"
            data-depth="2"
            style={{ perspective: "1500px" }}
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
                    textShadow: "0 0 40px rgba(255,255,255,0.3)",
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
                    filter: "drop-shadow(0 0 30px rgba(44,172,226,0.5))",
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

          {/* Magnetic CTA Buttons with rocket effects */}
          <div ref={ctaRef} className="flex flex-wrap gap-6 items-center" style={{ perspective: "1000px" }}>
            <TintinRocket />

            <MagneticButton
              href="#work"
              className="magnetic-btn btn-shine rounded-full inline-flex items-center gap-3"
            >
              <span>View Our Work</span>
              <Sparkles className="w-4 h-4 text-[#2CACE2]" />
            </MagneticButton>

            {/* Play reel button with enhanced hover */}
            <motion.button
              onClick={() => setVideoModalOpen(true)}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <span className="w-16 h-16 rounded-full border-2 border-[#2CACE2]/40 flex items-center justify-center relative overflow-hidden group-hover:border-[#2CACE2] transition-all duration-300">
                <span className="absolute inset-0 bg-[#2CACE2]/0 group-hover:bg-[#2CACE2]/20 transition-colors" />
                <span className="absolute inset-0 group-hover:animate-pulse"
                      style={{ background: "radial-gradient(circle, rgba(44,172,226,0.2) 0%, transparent 70%)" }} />
                <Play className="w-6 h-6 text-[#2CACE2] relative z-10 ml-1 group-hover:scale-110 transition-transform" />
              </span>
              <span className="text-sm uppercase tracking-wider font-medium">Watch Reel</span>
            </motion.button>
          </div>

          {/* Animated stats row with counters */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 1.2, type: "spring" }}
            className="flex flex-wrap gap-14 mt-24 pt-12 border-t border-white/10 relative"
          >
            <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-[#2CACE2]/50 to-transparent" />
            {[
              { number: "20+", label: "Years Experience" },
              { number: "150+", label: "Projects Delivered" },
              { number: "50+", label: "Happy Clients" },
              { number: "5", label: "Countries Served" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 4 + i * 0.15, duration: 0.8, type: "spring" }}
                className="group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.2, y: -10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="text-5xl md:text-6xl font-bold text-gradient mb-2 relative"
                  style={{ filter: "drop-shadow(0 0 20px rgba(44,172,226,0.4))" }}
                >
                  {stat.number}
                  <span className="absolute -inset-4 bg-[#2CACE2]/0 group-hover:bg-[#2CACE2]/10 rounded-xl transition-colors blur-xl" />
                </motion.div>
                <div className="text-sm text-white/50 uppercase tracking-wider group-hover:text-white/70 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator with animated path */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-xs text-white/50 uppercase tracking-[0.4em] font-medium">
            Scroll to explore
          </span>
          <div className="arrow w-10 h-16 rounded-full border-2 border-[#2CACE2]/40 flex items-start justify-center pt-4 relative overflow-hidden group hover:border-[#2CACE2] transition-colors">
            <div className="w-2 h-4 rounded-full bg-[#2CACE2]"
                 style={{ boxShadow: "0 0 10px #2CACE2, 0 0 20px rgba(44,172,226,0.5)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2CACE2]/20 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Side decoration - Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-5"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#2CACE2]/60 to-transparent"
               style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
          <span
            className="text-xs tracking-[0.4em] text-white/40 uppercase font-medium"
            style={{ writingMode: "vertical-rl" }}
          >
            Est. 2004
          </span>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#2CACE2]/60 to-transparent"
               style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
        </motion.div>

        {/* Left side decoration */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-5"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#2CACE2]/40 to-transparent" />
          <div className="w-4 h-4 rounded-full border-2 border-[#2CACE2]/40 pulse-ring relative">
            <div className="absolute inset-1 rounded-full bg-[#2CACE2]/50 animate-pulse" />
          </div>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#2CACE2]/40 to-transparent" />
        </motion.div>

        {/* Bottom right floating video preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.7, rotateY: -20 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
          transition={{ delay: 4.5, duration: 1.2, type: "spring" }}
          className="absolute bottom-32 right-[5%] hidden lg:block"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotateY: 5 }}
            className="relative w-52 h-32 rounded-2xl overflow-hidden cursor-pointer group"
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
              <motion.div
                className="w-12 h-12 rounded-full bg-[#2CACE2]/90 flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                style={{ boxShadow: "0 0 30px rgba(44,172,226,0.6)" }}
              >
                <Play className="w-5 h-5 text-white ml-1" />
              </motion.div>
            </div>
            <div className="absolute inset-0 border-2 border-[#2CACE2]/30 rounded-2xl group-hover:border-[#2CACE2]/70 transition-colors" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
