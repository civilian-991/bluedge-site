"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/types";
import { caseStudies } from "@/data/caseStudies";
import FilmCountdown from "./FilmCountdown";
import CreditsRoll from "./CreditsRoll";

interface CinemaReelCaseStudyProps {
  study: CaseStudy;
}

export default function CinemaReelCaseStudy({ study }: CinemaReelCaseStudyProps) {
  const [showContent, setShowContent] = useState(false);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const handleCountdownComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  // Adjacent case studies
  const currentIdx = caseStudies.findIndex((cs) => cs.slug === study.slug);
  const prevStudy = currentIdx > 0 ? caseStudies[currentIdx - 1] : null;
  const nextStudy = currentIdx < caseStudies.length - 1 ? caseStudies[currentIdx + 1] : null;

  // Collect all images for film strip
  const filmImages = [study.image];

  return (
    <>
      {/* Countdown */}
      {!showContent && !reducedMotion && (
        <FilmCountdown onComplete={handleCountdownComplete} />
      )}

      <div
        className={`min-h-screen transition-opacity duration-500 ${
          showContent || reducedMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Sprocket holes - left margin */}
        <div className="fixed left-0 top-0 bottom-0 w-8 z-[50] hidden lg:flex flex-col items-center justify-start gap-6 pt-24 pb-24 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm bg-[#0a0804] border border-amber-900/20 shrink-0"
            />
          ))}
        </div>

        {/* Sprocket holes - right margin */}
        <div className="fixed right-0 top-0 bottom-0 w-8 z-[50] hidden lg:flex flex-col items-center justify-start gap-6 pt-24 pb-24 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm bg-[#0a0804] border border-amber-900/20 shrink-0"
            />
          ))}
        </div>

        <div
          className="pt-32 pb-0 lg:px-12"
          style={{ paddingLeft: "max(5%, 40px)", paddingRight: "max(5%, 40px)" }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Hero image with film frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mb-12"
            >
              <div className="relative aspect-video overflow-hidden border-2 border-amber-900/20 bg-[#1a1208]">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 960px"
                  priority
                />
                {/* Film grain overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0804]/60 to-transparent" />

                {/* Frame markers */}
                <div className="absolute top-2 left-3 text-[10px] font-mono text-amber-400/30">
                  35mm &middot; FR:001
                </div>
                <div className="absolute top-2 right-3 text-[10px] font-mono text-amber-400/30">
                  {study.year}
                </div>
              </div>
            </motion.div>

            {/* Title card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="text-amber-400/40 text-xs font-mono tracking-[0.3em] uppercase mb-3">
                A BluEdge Production &middot; {study.year}
              </div>
              <h1
                className="text-4xl md:text-6xl font-bold text-amber-100 font-serif"
                style={{ textShadow: "0 0 30px rgba(255,200,100,0.2)" }}
              >
                {study.title}
              </h1>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="text-amber-400/50 text-sm font-mono">{study.category}</span>
                <span className="text-amber-400/20">&middot;</span>
                <span className="px-2 py-0.5 border border-amber-400/20 text-amber-400/50 text-xs font-mono uppercase">
                  {study.genre}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-3 py-1 border border-amber-900/30 text-amber-400/40 font-mono uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 3 Acts Structure */}
            <div className="space-y-16">
              {/* ACT I: Challenge */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-amber-400/10" />
                  <h2 className="text-xs font-mono tracking-[0.4em] text-amber-400/60 uppercase">
                    Act I &mdash; The Challenge
                  </h2>
                  <div className="h-px flex-1 bg-amber-400/10" />
                </div>
                <p className="text-amber-100/80 text-lg leading-relaxed max-w-3xl mx-auto text-center">
                  {study.challenge}
                </p>
              </motion.section>

              {/* ACT II: Approach */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-amber-400/10" />
                  <h2 className="text-xs font-mono tracking-[0.4em] text-amber-400/60 uppercase">
                    Act II &mdash; The Approach
                  </h2>
                  <div className="h-px flex-1 bg-amber-400/10" />
                </div>
                <p className="text-amber-100/80 text-lg leading-relaxed max-w-3xl mx-auto text-center">
                  {study.approach}
                </p>
              </motion.section>

              {/* ACT III: Results — "Box Office Numbers" */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-amber-400/10" />
                  <h2 className="text-xs font-mono tracking-[0.4em] text-amber-400/60 uppercase">
                    Act III &mdash; Box Office Numbers
                  </h2>
                  <div className="h-px flex-1 bg-amber-400/10" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {study.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className="text-center p-6 border border-amber-900/20 bg-amber-400/[0.02]"
                    >
                      <BoxOfficeCounter
                        value={result.value}
                        suffix={result.suffix}
                      />
                      <div className="text-amber-400/50 text-xs font-mono mt-2 tracking-wider uppercase">
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Testimonial quote */}
              {study.testimonial && (
                <motion.section
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl text-amber-400/20 mb-4">&ldquo;</div>
                  <blockquote className="text-xl md:text-2xl text-amber-100/70 italic font-serif max-w-2xl mx-auto leading-relaxed">
                    {study.testimonial}
                  </blockquote>
                  {study.testimonialAuthor && (
                    <div className="text-amber-400/40 text-sm font-mono mt-4">
                      &mdash; {study.testimonialAuthor}
                    </div>
                  )}
                </motion.section>
              )}
            </div>

            {/* Navigation between case studies */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-amber-900/20">
              {prevStudy ? (
                <Link
                  href={`/work/${prevStudy.slug}`}
                  className="group flex items-center gap-3 text-amber-400/40 hover:text-amber-300 transition-colors"
                >
                  <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
                  <div className="text-left">
                    <div className="text-[10px] font-mono tracking-wider uppercase opacity-60">
                      Previous
                    </div>
                    <div className="text-sm">{prevStudy.title}</div>
                  </div>
                </Link>
              ) : (
                <span />
              )}

              <Link
                href="/work"
                className="text-amber-400/30 hover:text-amber-300 transition-colors font-mono text-xs tracking-wider uppercase"
              >
                All Films
              </Link>

              {nextStudy ? (
                <Link
                  href={`/work/${nextStudy.slug}`}
                  className="group flex items-center gap-3 text-amber-400/40 hover:text-amber-300 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-[10px] font-mono tracking-wider uppercase opacity-60">
                      Next
                    </div>
                    <div className="text-sm">{nextStudy.title}</div>
                  </div>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>

        {/* Credits Roll */}
        <CreditsRoll
          projectTitle={study.title}
          client={study.client}
          year={study.year}
        />
      </div>
    </>
  );
}

// Animated counter for box office numbers
function BoxOfficeCounter({ value, suffix }: { value: string; suffix?: string }) {
  return (
    <motion.div
      className="text-3xl md:text-4xl font-bold text-amber-200 font-mono"
      style={{ textShadow: "0 0 20px rgba(255,200,100,0.3)" }}
    >
      <CountUp target={value} />
      {suffix && <span className="text-amber-400/60">{suffix}</span>}
    </motion.div>
  );
}

function CountUp({ target }: { target: string }) {
  const numericValue = parseFloat(target);
  const isFloat = target.includes(".");
  const [display, setDisplay] = useState("0");
  const animated = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (animated.current) return;
        animated.current = true;
        const duration = 1500;
        const start = performance.now();

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numericValue * eased;
          setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toString());
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      {display}
    </motion.span>
  );
}
