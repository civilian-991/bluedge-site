"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { Users, Award, Rocket } from "lucide-react";
import { stats, teamRoles } from "@/data";
import type { Stat, TeamRole } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function StatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(cardRef, { once: true });

  useEffect(() => {
    if (isInView && numberRef.current) {
      const target = stat.number;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2.5,
        delay: index * 0.2,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(obj.value).toString();
          }
        },
      });
    }
  }, [isInView, stat.number, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -30 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -30 }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div className="text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-[#00AEEF]/30 hover:bg-[#00AEEF]/5 transition-all duration-500 transform-gpu hover:-translate-y-2">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#00AEEF]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#00AEEF]/20 transition-all duration-500">
          <stat.icon className="w-8 h-8 text-[#00AEEF]" />
        </div>

        {/* Number with animated glow */}
        <div className="flex items-baseline justify-center gap-1 mb-3">
          <span
            ref={numberRef}
            className="text-5xl md:text-6xl font-bold text-gradient"
          >
            0
          </span>
          <span className="text-4xl md:text-5xl font-bold text-gradient">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <span className="text-white/50 text-sm uppercase tracking-wider">
          {stat.label}
        </span>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-3xl bg-[#00AEEF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
      </div>
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.9 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-[#00AEEF]/30 hover:bg-[#00AEEF]/5 transition-all duration-500 relative overflow-hidden"
    >
      {/* Animated icon */}
      <motion.span
        className="text-6xl mb-4 block"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {role.icon}
      </motion.span>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-gradient transition-all duration-500">
        {role.title}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-sm">{role.description}</p>

      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF] to-[#0077B6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#00AEEF]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the text paragraphs with stagger
      const paragraphs = textRef.current?.querySelectorAll("p");
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          {
            y: 60,
            opacity: 0,
            filter: "blur(5px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
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
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
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
            scrub: 2,
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
      className="relative py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="blob morph-blob absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00AEEF] opacity-5" />
        <div className="blob morph-blob absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#0077B6] opacity-5" />
        <div className="grid-bg absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left column - Text content */}
          <div ref={textRef}>
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 20, x: -20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Rocket className="w-5 h-5 text-[#00AEEF]" />
              <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
                About Blu Edge
              </span>
              <span className="w-8 h-px bg-gradient-to-r from-[#00AEEF] to-transparent" />
            </motion.span>

            {/* Title with character animation */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="section-title mb-8"
            >
              We chose <span className="text-gradient">the blue pill</span> —
              innovation over constraints
            </motion.h2>

            {/* Paragraphs */}
            <p className="body-text mb-6 text-lg">
              Founded in Lebanon, Blu Edge is a full-service creative marketing
              agency with{" "}
              <strong className="text-white">
                20+ years of executive experience
              </strong>
              . We serve clients across Lebanon and the GCC region with
              comprehensive solutions.
            </p>

            <p className="body-text mb-6 text-lg">
              Our approach combines strategic thinking with creative execution.
              We use a{" "}
              <strong className="text-white">
                360-degree assessment process
              </strong>{" "}
              to understand your business, identify opportunities, and deliver
              measurable results.
            </p>

            <p className="body-text text-lg">
              From startups to established enterprises, we&apos;ve helped
              businesses elevate their digital presence through{" "}
              <strong className="text-white">
                lead generation, conversion optimization, and reputation
                management
              </strong>
              .
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-3 text-[#00AEEF] font-medium group"
              >
                <span className="text-lg">Let&apos;s work together</span>
                <span className="w-10 h-10 rounded-full border border-[#00AEEF]/30 flex items-center justify-center group-hover:bg-[#00AEEF]/10 transition-colors">
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right column - Visual */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              {/* Animated gradient border */}
              <div
                className="absolute -inset-[2px] rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #00AEEF, #0077B6, #00AEEF)",
                  backgroundSize: "200% 200%",
                  animation: "gradientShift 4s ease infinite",
                }}
              />

              {/* Inner content */}
              <div className="absolute inset-[2px] rounded-3xl overflow-hidden bg-[#050508]">
                {/* BE Logo large */}
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
                    <div className="be-logo w-32 h-32 mx-auto mb-6">
                      <span className="text-5xl">BE</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gradient mb-2">
                      BLU EDGE
                    </h3>
                    <p className="text-white/50 uppercase tracking-[0.3em] text-sm">
                      Creative Agency
                    </p>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="blob morph-blob absolute -top-20 -right-20 w-64 h-64 bg-[#00AEEF] opacity-20" />
                <div className="blob morph-blob absolute -bottom-20 -left-20 w-48 h-48 bg-[#0077B6] opacity-20" />

                {/* Orbital rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="absolute w-[200px] h-[200px] rounded-full border border-[#00AEEF]/10 animate-spin"
                    style={{ animationDuration: "20s" }}
                  />
                  <div
                    className="absolute w-[250px] h-[250px] rounded-full border border-[#00AEEF]/5 animate-spin"
                    style={{
                      animationDuration: "30s",
                      animationDirection: "reverse",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              animate={{ y: [0, -10, 0] }}
              className="absolute -right-4 md:right-4 bottom-20 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00AEEF] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Award</div>
                  <div className="text-white/50 text-sm">Winning Agency</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Team section */}
        <div id="team">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-[#00AEEF]" />
              <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
                Our Team
              </span>
            </span>
            <h2 className="section-title">
              Meet the <span className="text-gradient">Squad</span>
            </h2>
          </motion.div>

          {/* Team roles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamRoles.map((role, index) => (
              <TeamCard key={role.title} role={role} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
