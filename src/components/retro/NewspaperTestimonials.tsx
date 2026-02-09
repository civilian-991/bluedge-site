"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data";
import HalftoneOverlay from "./shared/HalftoneOverlay";
import { CollectibleTrigger } from "./CollectibleItem";
import { useRetroSound } from "@/hooks/useRetroSound";
import GlitchText from "./GlitchText";

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-sky-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function NewspaperTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [gemFound, setGemFound] = useState(false);
  const volClickCount = useRef(0);
  const volClickTimer = useRef<NodeJS.Timeout | null>(null);
  const { playSound } = useRetroSound();
  const soundPlayed = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (paperRef.current) {
        gsap.fromTo(
          paperRef.current,
          {
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            scale: 0.8,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              onEnter: () => {
                if (!soundPlayed.current) {
                  soundPlayed.current = true;
                  playSound("newspaperUnfold");
                }
              },
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [playSound]);

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-ambient="section-newspaper"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div
          ref={paperRef}
          className="relative paper-texture rounded-sm shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)",
          }}
        >
          {/* Halftone overlay */}
          <HalftoneOverlay opacity={0.05} dotSize={1} spacing={6} className="text-black" />

          {/* Newspaper content */}
          <div className="relative z-10 px-6 md:px-12 py-8 md:py-12">
            {/* Masthead */}
            <div className="text-center border-b-4 border-double border-black/80 pb-6 mb-6">
              {/* Top line */}
              <div className="flex items-center justify-between text-[10px] text-black/40 mb-3 px-2">
                <span
                  className="cursor-pointer select-none"
                  onClick={() => {
                    volClickCount.current++;
                    if (volClickTimer.current) clearTimeout(volClickTimer.current);
                    if (volClickCount.current >= 3) {
                      setGemFound(true);
                      volClickCount.current = 0;
                    } else {
                      volClickTimer.current = setTimeout(() => { volClickCount.current = 0; }, 800);
                    }
                  }}
                >Vol. XX, No. 150</span>
                <span>{dateStr}</span>
                <span>Late Edition</span>
              </div>

              {/* Masthead title */}
              <GlitchText
                as="h2"
                intensity="subtle"
                className="text-4xl md:text-7xl font-black text-black tracking-tight leading-none mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                THE BLUEDGE TIMES
              </GlitchText>

              {/* Subtitle line */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-black/50">
                <span className="h-px flex-1 bg-black/20" />
                <span className="uppercase tracking-[0.3em]">&quot;All the news that&apos;s fit to print&quot;</span>
                <span className="h-px flex-1 bg-black/20" />
              </div>
            </div>

            {/* LATE EDITION stamp */}
            <motion.div
              initial={{ rotate: -15, scale: 0, opacity: 0 }}
              animate={isInView ? { rotate: -12, scale: 1, opacity: 0.6 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-16 right-8 md:right-16 pointer-events-none"
            >
              <div
                className="px-4 py-2 border-4 border-red-700 text-red-700 font-bold tracking-wider"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.6rem",
                }}
              >
                LATE EDITION
              </div>
            </motion.div>

            {/* Main headline */}
            <div className="border-b-2 border-black/20 pb-6 mb-6">
              <h3
                className="text-2xl md:text-4xl font-black text-black leading-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Clients Report Overwhelming Satisfaction With Creative Agency
              </h3>
              <p
                className="text-sm text-black/60 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &quot;They exceeded every expectation,&quot; reports regional survey of BluEdge partners
              </p>
            </div>

            {/* Testimonials in newspaper columns */}
            <div className="newspaper-columns">
              {testimonials.map((testimonial, i) => (
                <div
                  key={testimonial.name}
                  className="break-inside-avoid mb-6"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    {/* Quote */}
                    <p
                      className="text-sm text-black/80 leading-relaxed mb-3 first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1 first-letter:mt-0.5"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {/* Author line */}
                    <div className="flex items-center gap-3 mb-2">
                      {/* Halftone-style avatar */}
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden relative grayscale contrast-125"
                        style={{
                          backgroundImage: `url(${testimonial.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.4) 1px, transparent 1px)",
                            backgroundSize: "3px 3px",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </div>
                      <div>
                        <div
                          className="text-xs font-bold text-black"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {testimonial.name}
                        </div>
                        <div className="text-[10px] text-black/50">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>

                    <StarRating rating={testimonial.rating} />

                    {/* Separator */}
                    {i < testimonials.length - 1 && (
                      <div className="mt-4 border-b border-black/10" />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom ad-style CTA */}
            <div className="mt-8 pt-6 border-t-2 border-black/20 text-center">
              <div
                className="inline-block border-2 border-black/70 px-8 py-4"
              >
                <p
                  className="text-lg font-bold text-black mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Want YOUR story in our next edition?
                </p>
                <p className="text-xs text-black/50 uppercase tracking-wider">
                  Contact BluEdge — hello@bluedge.me
                </p>
              </div>
            </div>
          </div>

          {/* Yellowed edge effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 100px rgba(139, 90, 43, 0.1)",
            }}
          />
        </div>
      </div>

      {/* Collectible: Blue Gem (click "Vol. XX" 3 times) */}
      <CollectibleTrigger id="blue-gem" emoji="💎" triggered={gemFound} />
    </section>
  );
}
