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
  const explosionRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    document.body.style.overflow = "hidden";

    // Create floating particles with glow and trails
    if (particlesRef.current) {
      for (let i = 0; i < 60; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full";
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const colors = ["rgba(44, 172, 226, 0.8)", "rgba(0, 119, 182, 0.8)", "rgba(255, 255, 255, 0.6)"];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.background}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesRef.current.appendChild(particle);

        gsap.to(particle, {
          y: `random(-200, 200)`,
          x: `random(-100, 100)`,
          opacity: `random(0.2, 1)`,
          scale: `random(0.5, 2)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Create lightning bolts
    if (lightningRef.current) {
      for (let i = 0; i < 6; i++) {
        const bolt = document.createElement("div");
        bolt.className = "absolute opacity-0";
        bolt.style.width = "2px";
        bolt.style.height = `${100 + Math.random() * 200}px`;
        bolt.style.left = `${15 + i * 15}%`;
        bolt.style.top = "0";
        bolt.style.background = "linear-gradient(to bottom, transparent, #2CACE2, white, #2CACE2, transparent)";
        bolt.style.filter = "blur(1px)";
        bolt.style.transformOrigin = "top center";
        bolt.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;
        lightningRef.current.appendChild(bolt);
      }
    }

    // Animate orbital rings with staggered rotation
    if (orbitalRingsRef.current) {
      const rings = orbitalRingsRef.current.querySelectorAll(".orbital-ring");
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 6 + i * 1.5,
          repeat: -1,
          ease: "none",
        });
      });
    }

    // Initial nuclear flash
    const flashOverlay = document.createElement("div");
    flashOverlay.className = "fixed inset-0 bg-[#2CACE2] pointer-events-none";
    flashOverlay.style.opacity = "0";
    flashOverlay.style.zIndex = "100000";
    preloaderRef.current?.appendChild(flashOverlay);

    tl.to(flashOverlay, {
      opacity: 0.3,
      duration: 0.05,
    }, 0);

    tl.to(flashOverlay, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => flashOverlay.remove(),
    }, 0.05);

    // Logo container entrance with explosive 3D flip
    tl.fromTo(
      logoContainerRef.current,
      {
        scale: 0,
        rotateY: -360,
        rotateX: 60,
        rotateZ: 30,
        opacity: 0,
        filter: "blur(30px) brightness(3)",
      },
      {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        rotateZ: 0,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        duration: 1.8,
        ease: "back.out(1.2)",
      },
      0.2
    );

    // Shockwave rings on logo entrance
    if (explosionRef.current) {
      const rings = explosionRef.current.querySelectorAll(".shock-ring");
      rings.forEach((ring, i) => {
        tl.fromTo(
          ring,
          { scale: 0, opacity: 1 },
          {
            scale: 5,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          },
          0.4 + i * 0.1
        );
      });
    }

    // Lightning strike sequence
    if (lightningRef.current) {
      const bolts = lightningRef.current.querySelectorAll("div");
      bolts.forEach((bolt, i) => {
        tl.to(bolt, {
          opacity: 1,
          scaleY: 1,
          duration: 0.08,
          yoyo: true,
          repeat: 3,
          ease: "power4.out",
        }, 0.5 + i * 0.03);
      });
    }

    // Animate the circular progress ring with glow pulse
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 55;
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;

      tl.to(
        circleRef.current,
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
        },
        0.3
      );
    }

    // Animate counter with glitch effect
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            const val = Math.round(counter.value);
            counterRef.current.textContent = val.toString().padStart(3, "0");
            // Random glitch effect
            if (Math.random() > 0.9) {
              counterRef.current.style.transform = `translateX(${(Math.random() - 0.5) * 5}px)`;
              counterRef.current.style.filter = `hue-rotate(${Math.random() * 60 - 30}deg)`;
              setTimeout(() => {
                if (counterRef.current) {
                  counterRef.current.style.transform = "translateX(0)";
                  counterRef.current.style.filter = "none";
                }
              }, 50);
            }
          }
        },
      },
      0.3
    );

    // Animate loading line with energy pulse
    tl.to(
      lineRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      },
      0.3
    );

    // Add energy pulses along the loading line
    if (lineRef.current) {
      for (let i = 0; i < 3; i++) {
        const pulse = document.createElement("div");
        pulse.className = "absolute top-0 w-4 h-full rounded-full";
        pulse.style.background = "rgba(255, 255, 255, 0.8)";
        pulse.style.filter = "blur(4px)";
        pulse.style.left = "0";
        lineRef.current.appendChild(pulse);

        tl.to(pulse, {
          left: "100%",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => pulse.remove(),
        }, 0.5 + i * 0.3);
      }
    }

    // Logo text characters with explosive wave animation
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      tl.fromTo(
        chars,
        {
          y: 200,
          opacity: 0,
          rotateX: -180,
          rotateY: 45,
          scale: 0,
          filter: "blur(20px)",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: {
            each: 0.06,
            from: "center",
          },
          ease: "elastic.out(1, 0.5)",
        },
        0.6
      );

      // Chromatic aberration glitch on each character
      chars.forEach((char, i) => {
        tl.to(char, {
          textShadow: "3px 0 0 #ff0000, -3px 0 0 #00ffff",
          duration: 0.05,
          yoyo: true,
          repeat: 1,
        }, 1.2 + i * 0.03);
      });
    }

    // Tagline reveal with power-up effect
    tl.fromTo(
      taglineRef.current,
      {
        y: 50,
        opacity: 0,
        filter: "blur(15px) brightness(0)",
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px) brightness(1)",
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      1.4
    );

    // Intense pulsing glow effect on logo
    tl.to(
      logoRef.current,
      {
        boxShadow: "0 0 100px rgba(44, 172, 226, 0.9), 0 0 200px rgba(44, 172, 226, 0.5), 0 0 300px rgba(44, 172, 226, 0.3)",
        duration: 0.3,
        yoyo: true,
        repeat: 5,
        ease: "power2.inOut",
      },
      1.6
    );

    // Electric surge effect on logo
    tl.to(
      logoRef.current,
      {
        filter: "brightness(2) saturate(1.5) hue-rotate(20deg)",
        duration: 0.08,
        yoyo: true,
        repeat: 7,
        ease: "power4.inOut",
      },
      2.0
    );

    // Screen shake before exit
    tl.to(preloaderRef.current, {
      x: "random(-8, 8)",
      y: "random(-8, 8)",
      duration: 0.05,
      repeat: 8,
      yoyo: true,
      ease: "power1.inOut",
    }, 2.2);

    // Exit animations with dramatic effect
    // Particle explosion outward
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll("div");
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 500 + Math.random() * 500;
        tl.to(particle, {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power2.out",
        }, 2.4);
      });
    }

    tl.to(
      logoContainerRef.current,
      {
        y: -150,
        opacity: 0,
        scale: 0.5,
        rotateX: 60,
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power3.in",
      },
      2.5
    );

    tl.to(
      textRef.current,
      {
        y: -100,
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.5,
        ease: "power2.in",
      },
      2.5
    );

    tl.to(
      taglineRef.current,
      {
        y: -60,
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
      },
      2.55
    );

    tl.to(
      [counterRef.current, lineRef.current?.parentElement],
      {
        y: -40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      },
      2.6
    );

    // Final flash before reveal
    const finalFlash = document.createElement("div");
    finalFlash.className = "fixed inset-0 bg-white pointer-events-none";
    finalFlash.style.opacity = "0";
    finalFlash.style.zIndex = "100";
    preloaderRef.current?.appendChild(finalFlash);

    tl.to(finalFlash, {
      opacity: 0.8,
      duration: 0.1,
      ease: "power4.out",
    }, 2.8);

    tl.to(finalFlash, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => finalFlash.remove(),
    }, 2.9);

    // Reveal animation - explosive diagonal split
    const revealLeft = revealRef.current?.querySelector(".reveal-left");
    const revealRight = revealRef.current?.querySelector(".reveal-right");

    if (revealLeft && revealRight) {
      tl.to(revealLeft, {
        xPercent: -105,
        skewX: 5,
        duration: 1,
        ease: "power4.inOut",
      }, 2.9);

      tl.to(
        revealRight,
        {
          xPercent: 105,
          skewX: -5,
          duration: 1,
          ease: "power4.inOut",
        },
        2.9
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
      {/* Reveal overlays - diagonal with gradient */}
      <div ref={revealRef} className="absolute inset-0 z-50 pointer-events-none flex">
        <div className="reveal-left w-1/2 h-full bg-gradient-to-r from-[#050508] to-[#0a0a10]" />
        <div className="reveal-right w-1/2 h-full bg-gradient-to-l from-[#050508] to-[#0a0a10]" />
      </div>

      {/* Animated particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Lightning bolts container */}
      <div ref={lightningRef} className="absolute inset-0 overflow-hidden pointer-events-none" />

      {/* Explosion shockwave rings */}
      <div ref={explosionRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shock-ring absolute w-40 h-40 rounded-full border-2 border-[#2CACE2] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: "50%",
              top: "50%",
              borderWidth: `${4 - i * 0.5}px`,
              filter: `blur(${i * 0.5}px)`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient blobs with more intensity */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/3 w-[900px] h-[900px] rounded-full blur-[180px] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(44, 172, 226, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[700px] h-[700px] rounded-full blur-[150px] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(0, 119, 182, 0.2) 0%, transparent 70%)",
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(2, 62, 138, 0.15) 0%, transparent 70%)",
          }}
        />
        {/* Rotating conic gradient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[80px] animate-spin"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(44,172,226,0.15), transparent, rgba(0,119,182,0.15), transparent)",
            animationDuration: "10s",
          }}
        />
      </div>

      {/* Animated grid with glow */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay opacity-30" />

      {/* Logo container with orbital rings */}
      <div
        ref={logoContainerRef}
        className="relative z-10 mb-14"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {/* Orbital rings with enhanced glow */}
        <div ref={orbitalRingsRef} className="absolute inset-[-50px] pointer-events-none">
          <div
            className="orbital-ring absolute inset-0 rounded-full border-2 border-accent/30"
            style={{
              transform: "rotateX(70deg)",
              boxShadow: "0 0 20px rgba(44,172,226,0.3)",
            }}
          />
          <div
            className="orbital-ring absolute inset-2 rounded-full border border-accent/20"
            style={{
              transform: "rotateX(70deg) rotateY(45deg)",
              boxShadow: "0 0 15px rgba(44,172,226,0.2)",
            }}
          />
          <div
            className="orbital-ring absolute inset-4 rounded-full border border-accent/15"
            style={{
              transform: "rotateX(70deg) rotateY(-45deg)",
              boxShadow: "0 0 10px rgba(44,172,226,0.15)",
            }}
          />
          <div
            className="orbital-ring absolute inset-[-10px] rounded-full border border-accent/10"
            style={{
              transform: "rotateX(70deg) rotateZ(45deg)",
            }}
          />
        </div>

        {/* Progress ring SVG with glow */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 120 120"
          className="transform -rotate-90"
          style={{ filter: "drop-shadow(0 0 20px rgba(44,172,226,0.5))" }}
        >
          {/* Background circles */}
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="rgba(44, 172, 226, 0.15)"
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="rgba(44, 172, 226, 0.08)"
            strokeWidth="0.5"
          />
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="none"
            stroke="rgba(44, 172, 226, 0.05)"
            strokeWidth="0.3"
          />
          {/* Animated progress circle */}
          <circle
            ref={circleRef}
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="url(#preloaderGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 20px rgba(44, 172, 226, 0.8))",
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

        {/* BluEdge Logo in center with enhanced glow */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center rounded-full"
          style={{
            boxShadow: "0 0 60px rgba(44, 172, 226, 0.4), 0 0 100px rgba(44, 172, 226, 0.2)",
          }}
        >
          <Image
            src="/bluedge/Logo.svg"
            alt="BluEdge"
            width={100}
            height={100}
            className="drop-shadow-[0_0_30px_rgba(44,172,226,0.7)]"
          />
        </div>

        {/* Multiple orbiting dots */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 rounded-full bg-accent"
              style={{
                boxShadow: "0 0 20px #2CACE2, 0 0 40px rgba(44, 172, 226, 0.6), 0 0 60px rgba(44, 172, 226, 0.3)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 rounded-full bg-[#0077B6]"
              style={{
                boxShadow: "0 0 15px #0077B6, 0 0 30px rgba(0, 119, 182, 0.5)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white"
              style={{
                boxShadow: "0 0 15px white, 0 0 30px rgba(255, 255, 255, 0.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Logo text with 3D animation */}
      <div
        ref={textRef}
        className="relative z-10 flex overflow-hidden mb-8"
        style={{ perspective: "1200px" }}
      >
        {brandName.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block text-6xl md:text-7xl font-bold tracking-tight"
            style={{
              background: i < 3
                ? "linear-gradient(135deg, #2CACE2, #0077B6)"
                : "linear-gradient(135deg, #ffffff, #ffffff80)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transformStyle: "preserve-3d",
              textShadow: i < 3 ? "0 0 50px rgba(44, 172, 226, 0.5)" : "none",
              filter: i < 3 ? "drop-shadow(0 0 10px rgba(44,172,226,0.5))" : "none",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Tagline with glow */}
      <div
        ref={taglineRef}
        className="relative z-10 mb-12 text-base tracking-[0.5em] text-accent/80 uppercase font-medium"
        style={{ textShadow: "0 0 20px rgba(44,172,226,0.4)" }}
      >
        The Agency That Cares
      </div>

      {/* Loading line with energy glow */}
      <div className="relative z-10 w-80 h-[4px] bg-white/10 overflow-hidden rounded-full"
           style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)" }}>
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-0 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #2CACE2, #0077B6, #023E8A)",
            boxShadow: "0 0 30px rgba(44, 172, 226, 0.8), 0 0 60px rgba(44, 172, 226, 0.4)",
          }}
        />
      </div>

      {/* Counter with enhanced styling */}
      <div className="relative z-10 mt-10 flex items-center gap-5">
        <span className="text-xs tracking-[0.4em] text-white/40 uppercase font-medium">Loading</span>
        <span
          ref={counterRef}
          className="text-3xl font-bold tracking-wider text-accent font-mono"
          style={{
            textShadow: "0 0 30px rgba(44, 172, 226, 0.7)",
          }}
        >
          000
        </span>
        <span className="text-xs tracking-[0.4em] text-white/40 uppercase font-medium">%</span>
      </div>

      {/* Corner accents with animation */}
      <div className="absolute top-8 left-8 w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
      </div>
      <div className="absolute top-8 right-8 w-24 h-24">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
      </div>
      <div className="absolute bottom-8 left-8 w-24 h-24">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
      </div>
      <div className="absolute bottom-8 right-8 w-24 h-24">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-accent/50 to-transparent"
             style={{ boxShadow: "0 0 10px rgba(44,172,226,0.5)" }} />
      </div>

      {/* Bottom branding with glow */}
      <p className="absolute bottom-8 text-[11px] tracking-[0.4em] text-white/30 uppercase"
         style={{ textShadow: "0 0 10px rgba(44,172,226,0.2)" }}>
        BluEdge Marketing Agency — Beirut, Lebanon
      </p>
    </div>
  );
}
