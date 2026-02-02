"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    document.body.style.overflow = "hidden";

    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full";
        particle.style.width = `${Math.random() * 8 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 174, 239, ${Math.random() * 0.5 + 0.1})`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(particle);

        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Logo entrance with 3D rotation
    tl.fromTo(
      logoRef.current,
      {
        scale: 0,
        rotateY: -180,
        opacity: 0,
      },
      {
        scale: 1,
        rotateY: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      },
      0.2
    );

    // Animate the circular progress ring
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 45;
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      tl.to(
        circleRef.current,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Animate counter with easing
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value) + "%";
          }
        },
      },
      0
    );

    // Animate loading line with glow
    tl.to(
      lineRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      0
    );

    // Animate text characters with 3D effect
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      tl.fromTo(
        chars,
        {
          y: 80,
          opacity: 0,
          rotateX: -90,
          scale: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        0.6
      );
    }

    // Pulsing glow effect on logo
    tl.to(
      logoRef.current,
      {
        boxShadow: "0 0 60px rgba(0, 174, 239, 0.5), 0 0 120px rgba(0, 174, 239, 0.3)",
        duration: 0.6,
        yoyo: true,
        repeat: 2,
        ease: "power1.inOut",
      },
      1.5
    );

    // Exit animations
    tl.to(
      [logoRef.current, textRef.current],
      {
        y: -80,
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power3.in",
      },
      "+=0.3"
    );

    tl.to(
      counterRef.current,
      {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.4"
    );

    // Reveal animation - split screen
    const revealTop = revealRef.current?.querySelector(".reveal-top");
    const revealBottom = revealRef.current?.querySelector(".reveal-bottom");

    if (revealTop) {
      tl.to(revealTop, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    }

    if (revealBottom) {
      tl.to(
        revealBottom,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=1"
      );
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isComplete) return null;

  const logoText = "BLU EDGE";
  const chars = logoText.split("");

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050508]"
    >
      {/* Reveal overlays */}
      <div ref={revealRef} className="absolute inset-0 z-50 pointer-events-none">
        <div className="reveal-top absolute top-0 left-0 w-full h-1/2 bg-[#050508]" />
        <div className="reveal-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#050508]" />
      </div>

      {/* Animated particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="blob morph-blob absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#00AEEF]"
          style={{ opacity: 0.1 }}
        />
        <div
          className="blob morph-blob absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#0077B6]"
          style={{ animationDelay: "-3s", opacity: 0.1 }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Logo with animated ring */}
      <div
        ref={logoRef}
        className="relative z-10 mb-10"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(0, 174, 239, 0.1)"
            strokeWidth="1"
          />
          {/* Secondary ring */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(0, 174, 239, 0.05)"
            strokeWidth="0.5"
          />
          {/* Animated progress circle */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#preloaderGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 174, 239, 0.5))",
            }}
          />
          <defs>
            <linearGradient
              id="preloaderGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00AEEF" />
              <stop offset="50%" stopColor="#0077B6" />
              <stop offset="100%" stopColor="#00AEEF" />
            </linearGradient>
          </defs>
        </svg>

        {/* BE Logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-5xl font-bold"
            style={{
              background: "linear-gradient(135deg, #00AEEF 0%, #0077B6 50%, #00AEEF 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite",
            }}
          >
            BE
          </div>
        </div>

        {/* Orbiting dot */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00AEEF]"
            style={{
              boxShadow: "0 0 10px #00AEEF, 0 0 20px #00AEEF",
            }}
          />
        </div>
      </div>

      {/* Logo text with 3D animation */}
      <div
        ref={textRef}
        className="relative z-10 flex overflow-hidden mb-8"
        style={{ perspective: "1000px" }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="char inline-block text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #00AEEF, #0077B6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transformStyle: "preserve-3d",
              textShadow: "0 0 30px rgba(0, 174, 239, 0.3)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Loading line with glow */}
      <div className="relative z-10 w-64 h-[3px] bg-white/10 overflow-hidden rounded-full">
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #00AEEF, #0077B6, #00AEEF)",
            boxShadow: "0 0 20px #00AEEF, 0 0 40px rgba(0, 174, 239, 0.5)",
          }}
        />
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="relative z-10 mt-6 text-sm font-medium tracking-[0.4em] text-white/50 uppercase font-mono"
      >
        0%
      </span>

      {/* Tagline */}
      <p className="absolute bottom-16 text-xs tracking-[0.3em] text-white/30 uppercase">
        Creative Marketing Agency
      </p>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[#00AEEF]/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[#00AEEF]/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[#00AEEF]/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#00AEEF]/20" />
    </div>
  );
}
