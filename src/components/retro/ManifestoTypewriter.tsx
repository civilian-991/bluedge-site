"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { manifesto } from "@/data";

export default function ManifestoTypewriter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showCoffeeRing, setShowCoffeeRing] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Type out current section
  useEffect(() => {
    if (currentSection >= manifesto.sections.length) {
      // Show signature and coffee ring
      setTimeout(() => setShowCoffeeRing(true), 500);
      setTimeout(() => setShowSignature(true), 1000);
      setTimeout(() => setAllDone(true), 2500);
      return;
    }

    const section = manifesto.sections[currentSection];
    const fullText = `${section.title}\n\n${section.body}`;
    let charIndex = 0;
    setIsTyping(true);
    setTypedText("");

    const typeChar = () => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
        const delay = fullText[charIndex - 1] === "\n" ? 200 : 40;
        typingRef.current = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
        // Move to next section after a pause
        typingRef.current = setTimeout(() => {
          setCurrentSection((prev) => prev + 1);
        }, 1500);
      }
    };

    typingRef.current = setTimeout(typeChar, 500);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentSection]);

  // Paper entrance animation
  useEffect(() => {
    if (!paperRef.current) return;
    gsap.fromTo(
      paperRef.current,
      { y: 100, opacity: 0, rotate: -2 },
      { y: 0, opacity: 1, rotate: -1.5, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Skip to end
  const skipToEnd = () => {
    if (typingRef.current) clearTimeout(typingRef.current);
    setCurrentSection(manifesto.sections.length);
    setTypedText("");
    setIsTyping(false);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20 px-4"
      style={{ paddingTop: "120px" }}
    >
      {/* Dark oak desk background */}
      <div className="fixed inset-0 wood-grain z-0" />

      {/* Paper */}
      <div
        ref={paperRef}
        className="relative z-10 w-full max-w-2xl mx-auto"
        style={{
          transform: "rotate(-1.5deg)",
        }}
      >
        <div
          className="relative bg-[#F5F0E1] rounded-sm shadow-2xl overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.1)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.06'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Paper content */}
          <div className="px-10 md:px-16 py-12 md:py-16">
            {/* Header */}
            <div className="text-center mb-10 border-b-2 border-black/10 pb-8">
              <h1
                className="text-2xl md:text-3xl font-bold text-black/80 mb-3 tracking-wider"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                {manifesto.headline}
              </h1>
              <p
                className="text-sm text-black/40 italic"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                {manifesto.date}
              </p>
            </div>

            {/* Completed sections */}
            {manifesto.sections.slice(0, currentSection).map((section, i) => (
              <div key={i} className="mb-8">
                <h3
                  className="text-lg font-bold text-black/80 mb-2"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  {section.title}
                </h3>
                <p
                  className="text-sm text-black/60 leading-relaxed"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  {section.body}
                </p>
              </div>
            ))}

            {/* Currently typing section */}
            {currentSection < manifesto.sections.length && (
              <div className="mb-8">
                <p
                  className="text-sm text-black/60 leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  {typedText}
                  {isTyping && (
                    <span className="typewriter-cursor text-black/80">|</span>
                  )}
                </p>
              </div>
            )}

            {/* Coffee ring stain */}
            <AnimatePresence>
              {showCoffeeRing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-24 right-12 w-20 h-20 coffee-ring pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Signature */}
            <AnimatePresence>
              {showSignature && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-12 pt-8 border-t border-black/10"
                >
                  <p
                    className="text-lg text-black/60 italic"
                    style={{
                      fontFamily: "'Special Elite', monospace",
                      transform: "rotate(-2deg)",
                    }}
                  >
                    {manifesto.signature}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Yellowed edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 60px rgba(139, 90, 43, 0.1)",
            }}
          />
        </div>

        {/* Skip button */}
        {!allDone && (
          <button
            onClick={skipToEnd}
            className="absolute -bottom-12 right-0 text-white/30 text-xs hover:text-white/60 transition-colors"
          >
            Skip typing →
          </button>
        )}

        {/* Paper pulls up when done */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <motion.a
                href="/"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
                whileHover={{ x: -5 }}
              >
                ← Back to BluEdge
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
