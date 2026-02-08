"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Users, Award, Rocket, Heart } from "lucide-react";
import Image from "next/image";
import { stats, teamRoles } from "@/data";
import type { Stat, TeamRole } from "@/types";
import ArcadeStats from "./retro/ArcadeStats";
import ComicStripAbout from "./retro/ComicStripAbout";

gsap.registerPlugin(ScrollTrigger);

// Animated counter component
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2500;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 120, rotateX: -60, scale: 0.6, filter: "blur(15px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 120, rotateX: -60, scale: 0.6, filter: "blur(15px)" }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="group relative"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="text-center p-8 md:p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-500"
        whileHover={{
          borderColor: "rgba(44, 172, 226, 0.4)",
          y: -5,
        }}
      >
        {/* Icon with glow */}
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center relative"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <stat.icon className="w-8 h-8 text-accent" />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-accent/20 blur-xl"
            animate={{
              scale: isHovered ? 1.5 : 1,
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Number with animated glow */}
        <div className="flex items-baseline justify-center gap-1 mb-4">
          <motion.span
            className="text-5xl md:text-6xl font-bold text-gradient"
            animate={{
              textShadow: isHovered
                ? "0 0 30px rgba(44, 172, 226, 0.5)"
                : "0 0 0px transparent",
            }}
          >
            <AnimatedCounter target={stat.number} suffix={stat.suffix} />
          </motion.span>
        </div>

        {/* Label */}
        <motion.span
          className="text-white/50 text-sm uppercase tracking-wider"
          animate={{
            color: isHovered ? "rgba(44, 172, 226, 0.8)" : "rgba(255,255,255,0.5)",
          }}
        >
          {stat.label}
        </motion.span>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 60px rgba(44, 172, 226, 0.1)"
              : "inset 0 0 0px transparent",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function TeamCard({
  role,
  index,
}: {
  role: TeamRole;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 100, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="p-8 md:p-10 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-500 h-full"
        whileHover={{
          borderColor: "rgba(44, 172, 226, 0.4)",
          y: -8,
        }}
      >
        {/* Animated emoji icon */}
        <motion.span
          className="text-6xl mb-6 block"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, -10, 10, -5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {role.icon}
        </motion.span>

        {/* Title with gradient on hover */}
        <h3 className="text-xl md:text-2xl font-semibold mb-3">
          {role.title.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{
                color: isHovered ? "#2CACE2" : "#ffffff",
              }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h3>

        {/* Description */}
        <motion.p
          className="text-white/50 text-sm leading-relaxed"
          animate={{
            color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
          }}
        >
          {role.description}
        </motion.p>

        {/* Gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-[#0077B6] to-accent/50"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Background decoration */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Enhanced floating elements with energy effects
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large glowing orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 150,
            height: Math.random() * 300 + 150,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(44,172,226,${0.1 + Math.random() * 0.1}) 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Energy particles rising */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 5}px`,
            height: `${2 + Math.random() * 5}px`,
            background: i % 2 === 0 ? "#2CACE2" : "#0077B6",
            boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`,
          }}
          animate={{
            y: [0, -250, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Horizontal energy lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute h-px w-full"
          style={{
            top: `${25 + i * 20}%`,
            background: "linear-gradient(90deg, transparent, rgba(44,172,226,0.2), transparent)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the text paragraphs with stagger
      const paragraphs = textRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          {
            y: 80,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Parallax effect on visual element
      gsap.to(visualRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // 3D rotation effect on visual
      gsap.fromTo(
        visualRef.current,
        { rotateY: -15, rotateX: 10 },
        {
          rotateY: 15,
          rotateX: -10,
          ease: "none",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <FloatingElements />
        <div className="absolute inset-0 noise-overlay opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Comic Strip Origin Story */}
        <ComicStripAbout />

        {/* Arcade Stats Scoreboard */}
        <div className="mb-32">
          <ArcadeStats />
        </div>

        {/* Team section */}
        <div id="team">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-8">
              <motion.div
                className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Users className="w-6 h-6 text-accent" />
              </motion.div>
              <span className="text-sm text-accent uppercase tracking-[0.3em] font-medium">
                Our Team
              </span>
            </motion.div>
            <h2 className="section-title">
              Meet the <span className="text-gradient">Squad</span>
            </h2>
          </motion.div>

          {/* Team roles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamRoles.map((role, index) => (
              <TeamCard key={role.title} role={role} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
