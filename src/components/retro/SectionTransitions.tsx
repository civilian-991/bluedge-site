"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each transition is a thin divider that animates on scroll
// Using CSS-only effects for performance

interface TransitionProps {
  type:
    | "digital-dissolve"
    | "tv-static"
    | "film-countdown"
    | "speed-lines"
    | "comic-wipe"
    | "ink-splash"
    | "paper-fold"
    | "telegram-tape";
}

function TransitionDivider({ type }: TransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const inner = el.querySelector(".transition-inner");
      if (!inner) return;

      gsap.fromTo(
        inner,
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1,
          scaleX: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            onLeave: () => gsap.to(inner, { opacity: 0, duration: 0.3 }),
            onEnterBack: () => gsap.to(inner, { opacity: 1, duration: 0.3 }),
            onLeaveBack: () => gsap.to(inner, { opacity: 0, duration: 0.3 }),
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const getContent = () => {
    switch (type) {
      case "digital-dissolve":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className="w-[10%] h-[20%]"
                  style={{
                    background: `rgba(0, 255, 65, ${Math.random() * 0.15})`,
                    animation: `pixelFlicker ${0.2 + Math.random() * 0.5}s steps(2) infinite`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
          </div>
        );

      case "tv-static":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                opacity: 0.4,
                animation: "staticJitter 0.1s steps(3) infinite",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
            {/* Horizontal wipe line */}
            <div
              className="absolute top-1/2 left-0 w-full h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, #2CACE2, white, #2CACE2, transparent)",
                boxShadow: "0 0 10px #2CACE2",
                animation: "horizontalSweep 2s ease-in-out infinite",
              }}
            />
          </div>
        );

      case "film-countdown":
        return (
          <div className="transition-inner w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
            {/* Film sprocket holes */}
            <div className="absolute left-2 top-0 h-full flex flex-col justify-around">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-4 rounded-sm border border-white/20" />
              ))}
            </div>
            <div className="absolute right-2 top-0 h-full flex flex-col justify-around">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-3 h-4 rounded-sm border border-white/20" />
              ))}
            </div>
            {/* Action bars */}
            <div className="flex gap-4 items-center">
              {[3, 2, 1].map((n) => (
                <div
                  key={n}
                  className="text-xl font-bold opacity-20"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#F5D547",
                    animation: `countdownPulse 3s ease-in-out infinite`,
                    animationDelay: `${(3 - n) * 0.6}s`,
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        );

      case "speed-lines":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-[1px]"
                style={{
                  top: `${5 + i * 5}%`,
                  left: "10%",
                  right: "10%",
                  background: `linear-gradient(90deg, transparent, rgba(44,172,226,${0.1 + Math.random() * 0.2}), transparent)`,
                  animation: `speedLineFlash ${0.3 + Math.random() * 0.4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
          </div>
        );

      case "comic-wipe":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                border: "3px solid #111",
                borderLeft: "none",
                borderRight: "none",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              }}
            />
            {/* Halftone dots */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)",
                backgroundSize: "6px 6px",
                opacity: 0.3,
              }}
            />
          </div>
        );

      case "ink-splash":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${8 + Math.random() * 20}px`,
                  height: `${8 + Math.random() * 20}px`,
                  left: `${10 + i * 11}%`,
                  top: `${20 + Math.random() * 60}%`,
                  background: `rgba(44, 172, 226, ${0.1 + Math.random() * 0.15})`,
                  filter: "blur(2px)",
                  animation: `inkDrop ${1 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
          </div>
        );

      case "paper-fold":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, rgba(245,240,225,0.03) 0%, rgba(245,240,225,0.08) 50%, rgba(245,240,225,0.03) 100%)",
              }}
            />
            {/* Fold crease lines */}
            <div
              className="absolute top-0 bottom-0 left-1/4 w-px"
              style={{ background: "rgba(139,90,43,0.15)" }}
            />
            <div
              className="absolute top-0 bottom-0 left-1/2 w-px"
              style={{ background: "rgba(139,90,43,0.2)" }}
            />
            <div
              className="absolute top-0 bottom-0 left-3/4 w-px"
              style={{ background: "rgba(139,90,43,0.15)" }}
            />
          </div>
        );

      case "telegram-tape":
        return (
          <div className="transition-inner w-full h-full relative overflow-hidden flex items-center">
            <div
              className="absolute left-0 w-full h-6"
              style={{
                background: "linear-gradient(180deg, transparent, rgba(205,127,50,0.08), rgba(205,127,50,0.12), rgba(205,127,50,0.08), transparent)",
              }}
            />
            {/* Tape text */}
            <div
              className="absolute whitespace-nowrap text-[8px] tracking-[0.3em] opacity-20"
              style={{
                fontFamily: "'Special Elite', monospace",
                color: "#CD7F32",
                animation: "tapeScroll 10s linear infinite",
              }}
            >
              --- INCOMING MESSAGE --- STOP --- INCOMING MESSAGE --- STOP --- INCOMING MESSAGE --- STOP ---
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden pointer-events-none"
      style={{ height: "60px" }}
    >
      {getContent()}
    </div>
  );
}

export default function SectionTransitions() {
  return null; // Individual dividers are placed between sections in page.tsx
}

// Export individual transition components
export function HeroToMatrixTransition() {
  return <TransitionDivider type="digital-dissolve" />;
}

export function MatrixToTVTransition() {
  return <TransitionDivider type="tv-static" />;
}

export function TVToWorkTransition() {
  return <TransitionDivider type="film-countdown" />;
}

export function WorkToGrendizerTransition() {
  return <TransitionDivider type="speed-lines" />;
}

export function GrendizerToAboutTransition() {
  return <TransitionDivider type="comic-wipe" />;
}

export function AboutToPartnershipsTransition() {
  return <TransitionDivider type="ink-splash" />;
}

export function PartnershipsToNewspaperTransition() {
  return <TransitionDivider type="paper-fold" />;
}

export function NewspaperToContactTransition() {
  return <TransitionDivider type="telegram-tape" />;
}
