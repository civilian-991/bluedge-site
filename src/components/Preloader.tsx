"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const orbitalRingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    document.body.style.overflow = "hidden";

    // Create floating particles with glow
    if (particlesRef.current) {
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full";
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `rgba(44, 172, 226, ${Math.random() * 0.6 + 0.2})`;
        particle.style.boxShadow = `0 0 ${size * 2}px rgba(44, 172, 226, 0.5)`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(particle);

        gsap.to(particle, {
          y: `random(-150, 150)`,
          x: `random(-80, 80)`,
          opacity: `random(0.2, 1)`,
          scale: `random(0.5, 1.5)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Animate orbital rings
    if (orbitalRingsRef.current) {
      const rings = orbitalRingsRef.current.querySelectorAll(".orbital-ring");
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 8 + i * 2,
          repeat: -1,
          ease: "none",
        });
      });
    }

    // Logo container entrance with 3D flip
    tl.fromTo(
      logoContainerRef.current,
      {
        scale: 0,
        rotateY: -180,
        rotateX: 30,
        opacity: 0,
      },
      {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.4,
        ease: "back.out(1.5)",
      },
      0.3
    );

    // Animate the circular progress ring
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 55;
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      tl.to(
        circleRef.current,
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
        },
        0
      );
    }

    // Animate counter with typewriter effect
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.value).toString().padStart(3, "0");
          }
        },
      },
      0
    );

    // Animate loading line with glow pulse
    tl.to(
      lineRef.current,
      {
        width: "100%",
        duration: 2.2,
        ease: "power2.inOut",
      },
      0
    );

    // Logo text characters with wave animation
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      tl.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
          scale: 0.5,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "back.out(1.7)",
        },
        0.5
      );
    }

    // Tagline reveal
    tl.fromTo(
      taglineRef.current,
      {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
      },
      1.2
    );

    // Pulsing glow effect on logo - multiple pulses
    tl.to(
      logoRef.current,
      {
        boxShadow: "0 0 80px rgba(44, 172, 226, 0.6), 0 0 150px rgba(44, 172, 226, 0.3)",
        duration: 0.4,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
      },
      1.8
    );

    // Electric effect on logo
    tl.to(
      logoRef.current,
      {
        filter: "brightness(1.5) hue-rotate(10deg)",
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
      },
      2.2
    );

    // Exit animations with stagger
    tl.to(
      logoContainerRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
        rotateX: 30,
        duration: 0.7,
        ease: "power3.in",
      },
      "+=0.3"
    );

    tl.to(
      textRef.current,
      {
        y: -60,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.5"
    );

    tl.to(
      taglineRef.current,
      {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.4"
    );

    tl.to(
      [counterRef.current, lineRef.current?.parentElement],
      {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.3"
    );

    // Reveal animation - diagonal split
    const revealLeft = revealRef.current?.querySelector(".reveal-left");
    const revealRight = revealRef.current?.querySelector(".reveal-right");

    if (revealLeft && revealRight) {
      tl.to(revealLeft, {
        xPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      });

      tl.to(
        revealRight,
        {
          xPercent: 100,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=1.2"
      );
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (isComplete) return null;

  const brandName = "BluEdge";

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050508]"
    >
      {/* Reveal overlays - diagonal */}
      <div ref={revealRef} className="absolute inset-0 z-50 pointer-events-none flex">
        <div className="reveal-left w-1/2 h-full bg-[#050508]" />
        <div className="reveal-right w-1/2 h-full bg-[#050508]" />
      </div>

      {/* Animated particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full blur-[150px] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(44, 172, 226, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(0, 119, 182, 0.15) 0%, transparent 70%)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(2, 62, 138, 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-40" />

      {/* Logo container with orbital rings */}
      <div
        ref={logoContainerRef}
        className="relative z-10 mb-12"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Orbital rings */}
        <div ref={orbitalRingsRef} className="absolute inset-[-40px] pointer-events-none">
          <div
            className="orbital-ring absolute inset-0 rounded-full border border-accent/20"
            style={{ transform: "rotateX(60deg)" }}
          />
          <div
            className="orbital-ring absolute inset-2 rounded-full border border-accent/15"
            style={{ transform: "rotateX(60deg) rotateY(45deg)" }}
          />
          <div
            className="orbital-ring absolute inset-4 rounded-full border border-accent/10"
            style={{ transform: "rotateX(60deg) rotateY(-45deg)" }}
          />
        </div>

        {/* Progress ring SVG */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 120 120"
          className="transform -rotate-90"
        >
          {/* Background circles */}
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="rgba(44, 172, 226, 0.1)"
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(44, 172, 226, 0.05)"
            strokeWidth="0.5"
          />
          {/* Animated progress circle */}
          <circle
            ref={circleRef}
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="url(#preloaderGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 15px rgba(44, 172, 226, 0.6))",
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
              <stop offset="0%" stopColor="#2CACE2" />
              <stop offset="50%" stopColor="#0077B6" />
              <stop offset="100%" stopColor="#023E8A" />
            </linearGradient>
          </defs>
        </svg>

        {/* BluEdge Logo in center */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{
            boxShadow: "0 0 40px rgba(44, 172, 226, 0.3)",
          }}
        >
          <Image
            src="/bluedge/Logo.svg"
            alt="BluEdge"
            width={90}
            height={90}
            className="drop-shadow-[0_0_20px_rgba(44,172,226,0.5)]"
          />
        </div>

        {/* Orbiting dots */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full bg-accent"
              style={{
                boxShadow: "0 0 15px #2CACE2, 0 0 30px rgba(44, 172, 226, 0.5)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full bg-[#0077B6]"
              style={{
                boxShadow: "0 0 10px #0077B6",
              }}
            />
          </div>
        </div>
      </div>

      {/* Logo text with 3D animation */}
      <div
        ref={textRef}
        className="relative z-10 flex overflow-hidden mb-6"
        style={{ perspective: "1000px" }}
      >
        {brandName.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block text-5xl md:text-6xl font-bold tracking-tight"
            style={{
              background: i < 3
                ? "linear-gradient(135deg, #2CACE2, #0077B6)"
                : "linear-gradient(135deg, #ffffff, #ffffff80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transformStyle: "preserve-3d",
              textShadow: i < 3 ? "0 0 40px rgba(44, 172, 226, 0.4)" : "none",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <div
        ref={taglineRef}
        className="relative z-10 mb-10 text-sm tracking-[0.4em] text-accent/70 uppercase font-medium"
      >
        The Agency That Cares
      </div>

      {/* Loading line with glow */}
      <div className="relative z-10 w-72 h-[3px] bg-white/10 overflow-hidden rounded-full">
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #2CACE2, #0077B6, #023E8A)",
            boxShadow: "0 0 25px rgba(44, 172, 226, 0.6), 0 0 50px rgba(44, 172, 226, 0.3)",
          }}
        />
      </div>

      {/* Counter */}
      <div className="relative z-10 mt-8 flex items-center gap-4">
        <span className="text-xs tracking-[0.3em] text-white/30 uppercase">Loading</span>
        <span
          ref={counterRef}
          className="text-2xl font-bold tracking-wider text-accent font-mono"
          style={{
            textShadow: "0 0 20px rgba(44, 172, 226, 0.5)",
          }}
        >
          000
        </span>
      </div>

      {/* Corner accents with animation */}
      <div className="absolute top-8 left-8 w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/40 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="absolute top-8 right-8 w-20 h-20">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-8 left-8 w-20 h-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-20">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-accent/40 to-transparent" />
      </div>

      {/* Bottom branding */}
      <p className="absolute bottom-8 text-[10px] tracking-[0.3em] text-white/20 uppercase">
        BluEdge Marketing Agency — Beirut, Lebanon
      </p>
    </div>
  );
}
