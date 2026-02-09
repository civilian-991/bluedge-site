"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { ServiceDetail } from "@/types";
import { useRetroSound } from "@/hooks/useRetroSound";
import TerminalWindow from "./TerminalWindow";
import TerminalBootSequence from "./TerminalBootSequence";
import { TerminalPrompt, TerminalCursor, TypewriterLine } from "./TerminalPrompt";
import { caseStudies } from "@/data/caseStudies";
import { serviceDetails } from "@/data/serviceDetails";

interface TerminalServiceDetailProps {
  service: ServiceDetail;
}

type Section = "title" | "desc" | "features" | "process" | "projects" | "faq" | "cta";

export default function TerminalServiceDetail({ service }: TerminalServiceDetailProps) {
  const [booted, setBooted] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>("title");
  const [sectionsRevealed, setSectionsRevealed] = useState<Set<Section>>(new Set());
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [commandInput, setCommandInput] = useState("");
  const [secretFound, setSecretFound] = useState(false);
  const { playSound } = useRetroSound();
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const revealSection = useCallback((section: Section) => {
    setSectionsRevealed((prev) => new Set([...prev, section]));
    setCurrentSection(section);
  }, []);

  // Auto-reveal sections with delay
  useEffect(() => {
    if (!booted) return;
    if (reducedMotion) {
      // Show everything immediately
      setSectionsRevealed(new Set(["title", "desc", "features", "process", "projects", "faq", "cta"]));
      return;
    }

    const timers = [
      setTimeout(() => revealSection("title"), 200),
      setTimeout(() => revealSection("desc"), 1500),
      setTimeout(() => revealSection("features"), 3000),
      setTimeout(() => revealSection("process"), 4500),
      setTimeout(() => revealSection("projects"), 6000),
      setTimeout(() => revealSection("faq"), 7200),
      setTimeout(() => revealSection("cta"), 8400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [booted, revealSection, reducedMotion]);

  const handleBoot = useCallback(() => {
    setBooted(true);
  }, []);

  // Related projects from case studies
  const relatedProjects = caseStudies.slice(0, 4);

  // Adjacent services for nav
  const currentIdx = serviceDetails.findIndex((s) => s.slug === service.slug);
  const prevService = currentIdx > 0 ? serviceDetails[currentIdx - 1] : null;
  const nextService = currentIdx < serviceDetails.length - 1 ? serviceDetails[currentIdx + 1] : null;

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = commandInput.trim().toUpperCase();
      if (cmd === "HELP /SECRET" || cmd === "HELP/SECRET") {
        setSecretFound(true);
        playSound("collectFound");
      }
      playSound("terminalBeep");
      setCommandInput("");
    } else {
      playSound("terminalKey");
    }
  };

  if (!booted && !reducedMotion) {
    return <TerminalBootSequence serviceName={service.title} onComplete={handleBoot} />;
  }

  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <TerminalWindow title={`${service.title.toUpperCase()}.EXE`}>

        {/* ASCII Art Title */}
        <AnimatePresence>
          {sectionsRevealed.has("title") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <pre className="text-accent text-[10px] md:text-xs leading-tight overflow-x-auto whitespace-pre">
                {service.asciiArt}
              </pre>
              <div className="mt-4 text-accent/60 text-xs">
                ═══════════════════════════════════════════════════════
              </div>
              <div className="mt-2 text-yellow-400/80">
                <TerminalPrompt path="C:\BLUEDGE\SERVICES">
                  <TypewriterLine text={`TYPE ${service.title.toUpperCase()}`} delay={0.3} speed={40} />
                </TerminalPrompt>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service tagline + description */}
        <AnimatePresence>
          {sectionsRevealed.has("desc") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent font-bold mb-2">&gt; {service.tagline}</div>
              <div className="text-green-400/80 leading-relaxed max-w-3xl">
                {service.description}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features as numbered menu */}
        <AnimatePresence>
          {sectionsRevealed.has("features") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent/60 mb-2">
                ──────────── CAPABILITIES ────────────
              </div>
              <TerminalPrompt path="C:\BLUEDGE\SERVICES">
                <span className="text-yellow-400">DIR /FEATURES</span>
              </TerminalPrompt>
              <div className="mt-3 space-y-2">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <span className="text-accent">[{i + 1}]</span>{" "}
                    <span className="text-white/90 font-bold">{feature.name}</span>
                    <div className="ml-8 text-green-400/60 text-xs md:text-sm">
                      {feature.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Process as timestamped logs */}
        <AnimatePresence>
          {sectionsRevealed.has("process") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent/60 mb-2">
                ──────────── PROCESS LOG ────────────
              </div>
              <TerminalPrompt path="C:\BLUEDGE\SERVICES">
                <span className="text-yellow-400">RUN /PROCESS</span>
              </TerminalPrompt>
              <div className="mt-3 space-y-3">
                {service.process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex gap-3"
                  >
                    <span className="text-accent/40 shrink-0 text-xs mt-0.5">
                      [{String(i + 1).padStart(2, "0")}:00:00]
                    </span>
                    <div>
                      <span className="text-accent font-bold">PHASE {step.step}: {step.title}</span>
                      <div className="text-green-400/70 text-sm">{step.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related projects as DIR listing */}
        <AnimatePresence>
          {sectionsRevealed.has("projects") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent/60 mb-2">
                ──────────── RELATED PROJECTS ────────────
              </div>
              <TerminalPrompt path="C:\BLUEDGE\SERVICES">
                <span className="text-yellow-400">DIR /PROJECTS</span>
              </TerminalPrompt>
              <div className="mt-3 text-xs md:text-sm">
                <div className="text-white/40 mb-2">
                  {" "}Directory of C:\BLUEDGE\PROJECTS
                </div>
                {relatedProjects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-accent transition-colors inline-flex gap-4 items-baseline group"
                    >
                      <span className="text-white/30">{project.year}/01/01</span>
                      <span className="text-white/30">{"<DIR>"}</span>
                      <span className="text-green-400 group-hover:text-accent uppercase">
                        {project.title.replace(/\s/g, "_").toUpperCase()}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <div className="text-white/30 mt-2">
                  {"  "}{relatedProjects.length} Dir(s){"     "}42,069 bytes free
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ section */}
        <AnimatePresence>
          {sectionsRevealed.has("faq") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent/60 mb-2">
                ──────────── FAQ.TXT ────────────
              </div>
              <TerminalPrompt path="C:\BLUEDGE\SERVICES">
                <span className="text-yellow-400">HELP /FAQ</span>
              </TerminalPrompt>
              <div className="mt-3 space-y-2">
                {service.faq.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setSelectedFaq(selectedFaq === i ? null : i);
                        playSound("terminalKey");
                      }}
                      className="text-left hover:text-accent transition-colors w-full"
                    >
                      <span className="text-accent">[?]</span>{" "}
                      <span className="text-yellow-400/80">{item.question}</span>
                    </button>
                    <AnimatePresence>
                      {selectedFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden ml-8 text-green-400/70"
                        >
                          <div className="py-1">&gt; {item.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {sectionsRevealed.has("cta") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="text-accent/60 mb-4">
                ═══════════════════════════════════════════════════════
              </div>
              <div className="text-center py-6">
                <div className="text-xl md:text-2xl text-accent font-bold mb-4">
                  READY TO EXECUTE? [Y/N]
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/#contact"
                    className="px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-all font-mono text-sm tracking-wider"
                  >
                    [Y] START PROJECT
                  </Link>
                  <Link
                    href={isHomepageHash("#services")}
                    className="px-8 py-3 border border-white/20 text-white/50 hover:border-accent/50 hover:text-accent transition-all font-mono text-sm tracking-wider"
                  >
                    [N] BACK TO SERVICES
                  </Link>
                </div>
              </div>

              {/* Service navigation */}
              <div className="flex justify-between mt-8 text-xs">
                {prevService ? (
                  <Link
                    href={`/services/${prevService.slug}`}
                    className="text-accent/50 hover:text-accent transition-colors"
                  >
                    {"<<<"} PREV: {prevService.title.toUpperCase()}
                  </Link>
                ) : (
                  <span />
                )}
                {nextService ? (
                  <Link
                    href={`/services/${nextService.slug}`}
                    className="text-accent/50 hover:text-accent transition-colors"
                  >
                    NEXT: {nextService.title.toUpperCase()} {">>>"}
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Command input for secret */}
        <AnimatePresence>
          {sectionsRevealed.has("cta") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-0"
            >
              <span className="text-accent shrink-0">C:\BLUEDGE&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono ml-1 caret-green-400"
                placeholder=""
                autoComplete="off"
                spellCheck={false}
              />
              <TerminalCursor />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secret collectible */}
        <AnimatePresence>
          {secretFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 border border-accent/30 bg-accent/5 text-center"
            >
              <div className="text-2xl mb-2">💾</div>
              <div className="text-accent font-bold">SECRET FOUND: Floppy Disk Collectible!</div>
              <div className="text-green-400/60 text-xs mt-1">
                You typed HELP /SECRET — a true DOS wizard!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TerminalWindow>
    </div>
  );
}

function isHomepageHash(hash: string): string {
  return `/${hash}`;
}
