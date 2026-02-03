"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { services } from "@/data";
import type { Service } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// Floating particles around cards
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(44, 172, 226, ${Math.random() * 0.15 + 0.05}) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated SVG Icon component
function AnimatedServiceIcon({ src, isHovered }: { src: string; isHovered: boolean }) {
  return (
    <motion.div
      className="relative w-24 h-24"
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, -5, 5, 0] : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(44, 172, 226, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? [1, 1.5, 1.2] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.6] : 0.3,
        }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
      />

      {/* Orbiting dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-accent"
        style={{
          top: "50%",
          left: "50%",
          marginTop: -6,
          marginLeft: -6,
        }}
        animate={{
          rotate: isHovered ? 360 : 0,
          x: isHovered ? [0, 40, 0, -40, 0] : 0,
          y: isHovered ? [-40, 0, 40, 0, -40] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* The actual SVG icon */}
      <Image
        src={src}
        alt="Service icon"
        fill
        className="object-contain drop-shadow-[0_0_20px_rgba(44,172,226,0.5)]"
      />
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  activeIndex,
  setActiveIndex,
}: {
  service: Service;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isHovered = activeIndex === index;

  useEffect(() => {
    if (!cardRef.current || !isInView) return;

    const card = cardRef.current;
    const cardInner = card.querySelector(".card-inner") as HTMLElement;

    // 3D tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      gsap.to(cardInner, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: "power2.out",
      });

      // Move shine effect
      gsap.to(card.querySelector(".card-shine"), {
        x: x,
        y: y,
        opacity: 1,
        duration: 0.3,
      });

      // Move glow
      gsap.to(card.querySelector(".card-glow"), {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardInner, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(card.querySelector(".card-shine"), {
        opacity: 0,
        duration: 0.3,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 150, rotateX: -30, scale: 0.8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
          : { opacity: 0, y: 150, rotateX: -30, scale: 0.8 }
      }
      transition={{
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div
        className="card-inner relative h-full rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-700 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-accent/40"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated mesh gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-1000`}
        />

        {/* Electric border effect on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-3xl electric-border" />
        </div>

        {/* Moving shine effect */}
        <div
          className="card-shine absolute w-[300px] h-[300px] rounded-full opacity-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(44, 172, 226, 0.25) 0%, transparent 60%)",
            transform: "translate(-50%, -50%)",
            filter: "blur(20px)",
          }}
        />

        {/* Floating glow */}
        <div
          className="card-glow absolute w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle, rgba(44, 172, 226, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Number watermark with glitch effect */}
        <motion.span
          className="absolute -top-8 -right-4 text-[180px] font-bold select-none pointer-events-none"
          style={{
            WebkitTextStroke: "1px rgba(44, 172, 226, 0.1)",
            color: "transparent",
          }}
          animate={{
            opacity: isHovered ? [0.1, 0.2, 0.1] : 0.05,
            x: isHovered ? [0, 2, -2, 0] : 0,
          }}
          transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
        >
          {service.number}
        </motion.span>

        {/* Animated service icon */}
        <div className="relative mb-8 flex items-center justify-start">
          <AnimatedServiceIcon src={service.iconSvg} isHovered={isHovered} />
        </div>

        {/* Service number badge */}
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="w-8 h-[2px] bg-gradient-to-r from-accent to-accent/50"
            animate={{ width: isHovered ? 48 : 32 }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">
            Service {service.number}
          </span>
        </motion.div>

        {/* Title with character animation */}
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 overflow-hidden">
          <motion.span
            className="inline-block"
            animate={{
              y: isHovered ? [0, -5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {service.title.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  color: isHovered ? "#2CACE2" : "#ffffff",
                  textShadow: isHovered
                    ? "0 0 20px rgba(44, 172, 226, 0.5)"
                    : "none",
                }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </h3>

        {/* Description */}
        <motion.p
          className="text-white/50 mb-8 leading-relaxed"
          animate={{
            color: isHovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.5 }}
        >
          {service.description}
        </motion.p>

        {/* Features with staggered wave reveal */}
        <div className="flex flex-wrap gap-2 mb-8">
          {service.features.map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.5, y: 20 }
              }
              transition={{
                delay: index * 0.2 + 0.5 + i * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(44, 172, 226, 0.2)",
                borderColor: "rgba(44, 172, 226, 0.5)",
              }}
              className="px-4 py-2 rounded-full text-xs bg-white/5 border border-white/10 text-white/60 cursor-default transition-colors duration-300"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Link with arrow animation */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-accent group/link"
          whileHover={{ x: 5 }}
        >
          <span className="relative">
            Explore Service
            <motion.span
              className="absolute bottom-0 left-0 h-px bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </span>
          <motion.span
            animate={{
              x: isHovered ? [0, 5, 0] : 0,
              y: isHovered ? [0, -5, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.span>
        </motion.a>

        {/* Animated bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-accent/80 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Corner accent */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(44, 172, 226, 0.3) 0%, transparent 70%)`,
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.4 : 0,
          }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </motion.div>
  );
}

// Animated section title
function AnimatedTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const words = ["What", "We", "Do", "Best"];

  return (
    <div
      ref={titleRef}
      className="section-title overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-6"
      style={{ perspective: "1000px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="word inline-block"
          initial={{ y: 150, opacity: 0, rotateX: -90 }}
          animate={
            isInView
              ? { y: 0, opacity: 1, rotateX: 0 }
              : { y: 150, opacity: 0, rotateX: -90 }
          }
          transition={{
            duration: 1,
            delay: i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {word === "Best" ? (
            <span className="text-gradient">{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on background elements
      gsap.to(".services-blob-1", {
        y: -250,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".services-blob-2", {
        y: -150,
        x: 100,
        rotation: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".services-blob-3", {
        y: -100,
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Animate horizontal lines
      gsap.fromTo(
        ".service-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Horizontal accent lines */}
        <div className="service-line absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />
        <div className="service-line absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent origin-left" />
        <div className="service-line absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent origin-left" />

        {/* Animated blobs */}
        <div className="services-blob-1 absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="services-blob-2 absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0077B6]/5 blur-3xl" />
        <div className="services-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-[100px]" />

        {/* Floating orbs */}
        <FloatingOrbs />

        {/* Noise texture */}
        <div className="absolute inset-0 noise-overlay opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header */}
        <div className="mb-24 max-w-3xl">
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
                  "0 0 20px 5px rgba(44, 172, 226, 0.3)",
                  "0 0 0 0 rgba(44, 172, 226, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Image
                src="/bluedge/Logo.svg"
                alt="BluEdge"
                width={24}
                height={24}
                className="opacity-80"
              />
            </motion.div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-accent uppercase tracking-[0.3em] font-medium">
                Our Services
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

          {/* Animated title */}
          <AnimatedTitle />

          {/* Description with reveal */}
          <motion.p
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="body-text text-lg md:text-xl leading-relaxed"
          >
            A comprehensive suite of creative services designed to elevate your
            brand and drive meaningful results. We&apos;re your partners in digital
            transformation — <span className="text-accent">the agency that cares</span>.
          </motion.p>
        </div>

        {/* Services grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence>
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA with heavy animation */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          className="mt-24 text-center"
        >
          <motion.div
            className="relative inline-flex flex-col md:flex-row items-center gap-8 p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden"
            whileHover={{
              borderColor: "rgba(44, 172, 226, 0.3)",
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <p className="relative text-xl md:text-2xl text-white/70">
              Not sure what you need?{" "}
              <span className="text-white font-medium">
                Let&apos;s discuss your project.
              </span>
            </p>

            <motion.a
              href="#contact"
              className="relative btn-primary btn-shine whitespace-nowrap text-lg px-8 py-4"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(44, 172, 226, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Free Consultation</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
