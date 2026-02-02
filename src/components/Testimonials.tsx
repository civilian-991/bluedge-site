"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Star, Quote, MessageCircle } from "lucide-react";
import { testimonials } from "@/data";
import type { Testimonial } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// Duplicate for seamless loop
const allTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="flex-shrink-0 w-[380px] md:w-[450px] p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#00AEEF]/30 transition-all duration-500 group relative overflow-hidden"
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Quote icon with animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <Quote className="w-10 h-10 text-[#00AEEF]/20 mb-6 group-hover:text-[#00AEEF]/40 transition-colors" />
      </motion.div>

      {/* Content */}
      <p className="relative text-lg text-white/70 mb-8 leading-relaxed group-hover:text-white/90 transition-colors">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Rating with stagger animation */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
          >
            <Star className="w-5 h-5 text-[#00AEEF] fill-[#00AEEF]" />
          </motion.div>
        ))}
      </div>

      {/* Author */}
      <div className="relative flex items-center gap-4">
        <motion.div
          className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#00AEEF]/30 group-hover:border-[#00AEEF] transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${testimonial.image})` }}
          />
        </motion.div>
        <div>
          <div className="font-semibold group-hover:text-gradient transition-all">
            {testimonial.name}
          </div>
          <div className="text-sm text-white/40">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF] to-[#0077B6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate marquee rows with scroll-linked speed
      if (marqueeRef1.current && marqueeRef2.current) {
        // First row - normal speed
        gsap.to(marqueeRef1.current, {
          x: "-50%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Second row - reverse direction
        gsap.to(marqueeRef2.current, {
          x: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#030306]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050508] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent" />
        <div className="blob morph-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00AEEF] opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div
          className="max-w-[1800px] mx-auto mb-16"
          style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <MessageCircle className="w-5 h-5 text-[#00AEEF]" />
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Testimonials
            </span>
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            What our <span className="text-gradient">clients</span> say
          </motion.h2>
        </div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030306] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030306] to-transparent z-10" />

          {/* First row - scrolling with parallax */}
          <div className="overflow-hidden mb-6">
            <div
              ref={marqueeRef1}
              className="flex gap-6"
              style={{ transform: "translateX(0)" }}
            >
              {allTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`row1-${index}`}
                  testimonial={testimonial}
                  index={index % testimonials.length}
                />
              ))}
            </div>
          </div>

          {/* Second row - reverse parallax */}
          <div className="overflow-hidden">
            <div
              ref={marqueeRef2}
              className="flex gap-6"
              style={{ transform: "translateX(-50%)" }}
            >
              {allTestimonials
                .slice()
                .reverse()
                .map((testimonial, index) => (
                  <TestimonialCard
                    key={`row2-${index}`}
                    testimonial={testimonial}
                    index={index % testimonials.length}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 px-6"
        >
          <p className="text-xl text-white/60 mb-6">
            Ready to join our satisfied clients?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/30 hover:border-[#00AEEF] hover:bg-[#00AEEF]/20 transition-all duration-300"
          >
            <span className="font-medium">Start Your Project</span>
            <span className="text-[#00AEEF]">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
