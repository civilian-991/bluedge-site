"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Users, Award, Rocket, Heart } from "lucide-react";
import Image from "next/image";
import { stats, teamRoles } from "@/data";
import type { Stat, TeamRole } from "@/types";

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
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left column - Text content */}
          <div ref={textRef}>
            {/* Eyebrow with animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(44, 172, 226, 0)",
                    "0 0 20px 5px rgba(44, 172, 226, 0.2)",
                    "0 0 0 0 rgba(44, 172, 226, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-accent" />
              </motion.div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-accent uppercase tracking-[0.3em] font-medium">
                  About BluEdge
                </span>
                <motion.span
                  className="h-px bg-gradient-to-r from-accent to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Title with character animation */}
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="section-title mb-10"
            >
              We chose <span className="text-gradient">the blue pill</span> —
              innovation over constraints
            </motion.h2>

            {/* Paragraphs with enhanced styling */}
            <p className="body-text mb-6 text-lg md:text-xl leading-relaxed">
              Founded in Lebanon, BluEdge is a full-service creative marketing
              agency with{" "}
              <strong className="text-accent">
                20+ years of executive experience
              </strong>
              . We serve clients across Lebanon and the GCC region with
              comprehensive solutions.
            </p>

            <p className="body-text mb-6 text-lg md:text-xl leading-relaxed">
              Our approach combines strategic thinking with creative execution.
              We use a{" "}
              <strong className="text-accent">
                360-degree assessment process
              </strong>{" "}
              to understand your business, identify opportunities, and deliver
              measurable results.
            </p>

            <p className="body-text text-lg md:text-xl leading-relaxed">
              From startups to established enterprises, we&apos;ve helped
              businesses elevate their digital presence through{" "}
              <strong className="text-accent">
                lead generation, conversion optimization, and reputation
                management
              </strong>
              .
            </p>

            {/* CTA with heavy animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <span className="text-xl text-accent font-medium">
                  Let&apos;s work together
                </span>
                <motion.span
                  className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center relative overflow-hidden"
                  whileHover={{
                    backgroundColor: "rgba(44, 172, 226, 0.1)",
                    borderColor: "rgba(44, 172, 226, 0.5)",
                  }}
                >
                  <motion.span
                    className="text-xl text-accent"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right column - Visual with BluEdge Logo */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              {/* Animated gradient border */}
              <motion.div
                className="absolute -inset-[2px] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #2CACE2, #0077B6, #023E8A, #2CACE2)",
                  backgroundSize: "300% 300%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner content */}
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden bg-[#050508]">
                {/* BluEdge Logo large */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.div
                      className="relative w-40 h-40 mx-auto mb-8"
                      animate={{
                        filter: [
                          "drop-shadow(0 0 20px rgba(44, 172, 226, 0.3))",
                          "drop-shadow(0 0 40px rgba(44, 172, 226, 0.5))",
                          "drop-shadow(0 0 20px rgba(44, 172, 226, 0.3))",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Image
                        src="/bluedge/Logo.svg"
                        alt="BluEdge"
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                    <h3 className="text-4xl font-bold text-gradient mb-3">
                      BluEdge
                    </h3>
                    <p className="text-accent/70 uppercase tracking-[0.4em] text-sm">
                      The Agency That Cares
                    </p>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 grid-bg opacity-20" />

                {/* Animated blobs */}
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#0077B6]/20 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />

                {/* Orbital rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute w-[220px] h-[220px] rounded-full border border-accent/15"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-[280px] h-[280px] rounded-full border border-accent/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-[340px] h-[340px] rounded-full border border-accent/5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -right-4 md:right-4 bottom-20"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-accent flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(44, 172, 226, 0)",
                        "0 0 20px 5px rgba(44, 172, 226, 0.4)",
                        "0 0 0 0 rgba(44, 172, 226, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold">Award</div>
                    <div className="text-white/50 text-sm">Winning Agency</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

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
