"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data";

gsap.registerPlugin(ScrollTrigger);

// Magnetic cursor effect for project cards
function useMagneticEffect(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);
}

// Animated counter for stats
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
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

// Enhanced floating particles in background
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Glowing particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`,
            background: i % 3 === 0 ? "#2CACE2" : i % 3 === 1 ? "#0077B6" : "white",
            boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
          }}
          animate={{
            y: [0, -200 - Math.random() * 100, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Lightning streaks */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute w-px"
          style={{
            left: `${20 + i * 15}%`,
            top: 0,
            height: "100%",
            background: "linear-gradient(to bottom, transparent, rgba(44,172,226,0.3), transparent)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Project card with heavy animations
function ProjectCard({
  project,
  index,
  isActive,
  setActive,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
  setActive: (index: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card.querySelector(".card-transform"), {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: "power2.out",
      });

      // Parallax image - reduced movement to prevent cropping
      gsap.to(imageRef.current, {
        x: (x - centerX) / 20,
        y: (y - centerY) / 20,
        duration: 0.4,
      });

      // Move spotlight
      gsap.to(card.querySelector(".spotlight"), {
        x: x,
        y: y,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector(".card-transform"), {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[50vw] h-[75vh] relative group"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(null)}
    >
      <div
        className="card-transform relative h-full rounded-3xl overflow-hidden cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image with parallax and zoom */}
        <div
          ref={imageRef}
          className="absolute inset-[-10%] transition-transform duration-700"
        >
          <motion.div
            className="w-full h-full relative"
            animate={{
              scale: isActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 85vw, (max-width: 1200px) 65vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Spotlight effect following cursor */}
        <div
          className="spotlight absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(40px)",
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent opacity-90" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, transparent 60%)`,
          }}
        />

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ borderColor: `${project.color}40` }}
          animate={{
            boxShadow: isActive
              ? `0 0 60px ${project.color}30, inset 0 0 60px ${project.color}10`
              : "none",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated accent line at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 h-1.5 rounded-full"
          style={{ background: project.color }}
          initial={{ width: 0 }}
          animate={{ width: isActive ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Floating number with glitch */}
        <motion.div
          className="absolute top-8 left-8 text-[180px] font-bold leading-none select-none pointer-events-none"
          style={{
            WebkitTextStroke: `2px ${project.color}30`,
            color: "transparent",
          }}
          animate={{
            opacity: isActive ? [0.2, 0.3, 0.2] : 0.1,
            x: isActive ? [0, 3, -3, 0] : 0,
          }}
          transition={{
            duration: 0.2,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 2,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          {/* Year badge */}
          <motion.div
            className="absolute top-8 right-8 px-5 py-2.5 rounded-full backdrop-blur-md border"
            style={{
              backgroundColor: `${project.color}15`,
              borderColor: `${project.color}30`,
            }}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : -20,
              scale: isActive ? 1 : 0.8,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-sm font-medium" style={{ color: project.color }}>
              {project.year}
            </span>
          </motion.div>

          {/* Tags with staggered reveal */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 rounded-full text-xs border backdrop-blur-sm"
                style={{
                  borderColor: `${project.color}40`,
                  backgroundColor: `${project.color}10`,
                }}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 20,
                  scale: isActive ? 1 : 0.8,
                }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Category with animated line */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="h-[2px] rounded-full"
              style={{ background: project.color }}
              animate={{ width: isActive ? 40 : 20 }}
              transition={{ duration: 0.3 }}
            />
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Title with character reveal */}
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 overflow-hidden">
            {project.title.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  y: isActive ? [0, -5, 0] : 0,
                  color: isActive ? "#ffffff" : "#ffffff",
                  textShadow: isActive
                    ? `0 0 30px ${project.color}50`
                    : "none",
                }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.02,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h3>

          {/* Description */}
          <motion.p
            className="text-white/60 text-lg md:text-xl max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isActive ? 1 : 0.5,
              y: isActive ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.description}
          </motion.p>

          {/* View project button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 30,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="group/btn inline-flex items-center gap-4 px-8 py-4 rounded-full border backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: `${project.color}50`,
                backgroundColor: `${project.color}10`,
              }}
              whileHover={{
                backgroundColor: project.color,
                scale: 1.05,
                boxShadow: `0 0 40px ${project.color}50`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider">
                View Project
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${project.color}15 50%)`,
          }}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Sparkle effects */}
        <AnimatePresence>
          {isActive && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: project.color,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with 3D effect
      const words = titleRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          {
            y: 150,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "top center",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Horizontal scroll animation
      const horizontalSection = horizontalRef.current;
      if (horizontalSection) {
        const totalWidth = horizontalSection.scrollWidth - window.innerWidth;

        // Main horizontal scroll
        const horizontalTween = gsap.to(horizontalSection, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${totalWidth * 1.2}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Update progress bar with glow effect
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                });
              }
            },
          },
        });

        // Parallax effect on cards
        const cards = horizontalSection.querySelectorAll(".project-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0.4,
              scale: 0.85,
              rotateY: -10,
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 85%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Selected", "Works"];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#030306] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Large blobs */}
        <motion.div
          className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0077B6]/5 blur-[80px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay opacity-40" />
      </div>

      {/* Section header - outside pinned area */}
      <div
        className="relative z-10 py-32 md:py-40"
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <div className="max-w-[1800px] mx-auto">
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
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Layers className="w-6 h-6 text-accent" />
            </motion.div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-accent uppercase tracking-[0.3em] font-medium">
                Portfolio
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

          {/* Title with 3D animation */}
          <div
            ref={titleRef}
            className="section-title overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-8"
            style={{ perspective: "1000px" }}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="word inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word === "Works" ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="body-text max-w-2xl text-lg md:text-xl"
          >
            A showcase of our finest work across branding, digital, and marketing
            projects for clients across Lebanon and the GCC region —{" "}
            <span className="text-accent">crafted with care</span>.
          </motion.p>

          {/* Scroll hint with animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 mt-12"
          >
            <motion.div
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/30"
              animate={{
                x: [0, 10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm uppercase tracking-wider text-accent font-medium">
                Scroll to explore
              </span>
              <ArrowRight className="w-5 h-5 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll trigger area */}
      <div ref={triggerRef} className="relative">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <motion.div
            ref={progressRef}
            className="h-full origin-left"
            style={{
              background: "linear-gradient(90deg, #2CACE2, #0077B6, #023E8A)",
              transform: "scaleX(0)",
              boxShadow: "0 0 20px rgba(44, 172, 226, 0.5)",
            }}
          />
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={horizontalRef}
          className="flex gap-10 pl-[5%] pr-[30%]"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isActive={activeCard === index}
              setActive={setActiveCard}
            />
          ))}

          {/* End card - CTA with heavy animation */}
          <div className="project-card flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[50vw] h-[75vh] flex items-center justify-center">
            <motion.div
              className="text-center max-w-lg p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="text-8xl md:text-9xl font-bold text-gradient mb-6"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(44, 172, 226, 0.3)",
                      "0 0 40px rgba(44, 172, 226, 0.5)",
                      "0 0 20px rgba(44, 172, 226, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AnimatedCounter target={150} suffix="+" />
                </motion.div>

                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Projects Completed
                </h3>

                <p className="text-white/50 text-lg mb-10">
                  Ready to be our next success story?
                </p>

                <motion.a
                  href="#contact"
                  className="btn-primary btn-shine inline-flex items-center gap-4 text-lg px-10 py-5"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(44, 172, 226, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Your Project</span>
                  <motion.span
                    animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.span>
                </motion.a>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#0077B6]/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-32" />
    </section>
  );
}
