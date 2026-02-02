"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { services } from "@/data";
import type { Service } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!cardRef.current || !isInView) return;

    const card = cardRef.current;

    // 3D tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card.querySelector(".card-inner"), {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      });

      // Move shine effect
      gsap.to(card.querySelector(".card-shine"), {
        x: x,
        y: y,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card.querySelector(".card-inner"), {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
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
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 100, rotateX: -15 }
      }
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div
        className="card-inner relative h-full rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 border border-white/5 bg-white/[0.02] hover:border-[#00AEEF]/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
        />

        {/* Shine effect */}
        <div
          className="card-shine absolute w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 174, 239, 0.15) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Number watermark */}
        <span className="absolute -top-4 -right-4 text-[150px] font-bold text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors duration-500">
          {service.number}
        </span>

        {/* Icon with animated background */}
        <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
          />
          <div className="absolute inset-0 bg-[#050508]/80" />
          <service.icon className="relative z-10 w-10 h-10 text-[#00AEEF] group-hover:scale-110 transition-transform duration-500" />

          {/* Pulse ring on hover */}
          <div className="absolute inset-0 rounded-2xl border border-[#00AEEF]/50 scale-100 opacity-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
        </div>

        {/* Service number badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
          />
          <span className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
            Service {service.number}
          </span>
        </div>

        {/* Title with reveal animation */}
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 transition-all duration-500">
          <span className="group-hover:text-gradient">{service.title}</span>
        </h3>

        {/* Description */}
        <p className="text-white/50 mb-8 leading-relaxed group-hover:text-white/70 transition-colors duration-500">
          {service.description}
        </p>

        {/* Features with staggered reveal */}
        <div className="flex flex-wrap gap-2 mb-8">
          {service.features.map((feature, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.15 + 0.3 + i * 0.1 }}
              className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-white/60 group-hover:border-[#00AEEF]/30 group-hover:bg-[#00AEEF]/5 transition-all duration-300"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Link with arrow animation */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider group/link text-[#00AEEF]"
        >
          <span className="relative">
            Learn More
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00AEEF] group-hover/link:w-full transition-all duration-300" />
          </span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </a>

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
        />

        {/* Corner glow */}
        <div
          className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title with split text effect
      const words = titleRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          {
            y: 120,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "top center",
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Parallax effect on background blobs
      gsap.to(".services-blob-1", {
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".services-blob-2", {
        y: -100,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["What", "We", "Do", "Best"];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Horizontal lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00AEEF]/10 to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00AEEF]/5 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00AEEF]/10 to-transparent" />

        {/* Animated blobs */}
        <div className="services-blob-1 blob morph-blob absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00AEEF] opacity-5" />
        <div className="services-blob-2 blob morph-blob absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#0077B6] opacity-5" />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header */}
        <div className="mb-20 max-w-3xl">
          {/* Eyebrow with animation */}
          <motion.span
            initial={{ opacity: 0, y: 20, x: -20 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Zap className="w-5 h-5 text-[#00AEEF]" />
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Our Services
            </span>
            <span className="w-8 h-px bg-gradient-to-r from-[#00AEEF] to-transparent" />
          </motion.span>

          {/* Title with 3D rotation */}
          <div
            ref={titleRef}
            className="section-title overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-6"
            style={{ perspective: "1000px" }}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="word inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word === "Best" ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </div>

          {/* Description with reveal */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="body-text text-lg"
          >
            A comprehensive suite of creative services designed to elevate your
            brand and drive meaningful results. We&apos;re your partners in digital
            transformation.
          </motion.p>
        </div>

        {/* Services grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA with reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <p className="text-xl text-white/70">
              Not sure what you need?{" "}
              <span className="text-white font-medium">
                Let&apos;s discuss your project.
              </span>
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary btn-shine whitespace-nowrap"
            >
              <span>Free Consultation</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
