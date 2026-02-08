"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const tvGlowRef = useRef<HTMLDivElement>(null);
  const channelNumRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const antennaLeftRef = useRef<HTMLDivElement>(null);
  const antennaRightRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const staticIntensityRef = useRef(1);
  const glitchActiveRef = useRef(false);

  // Procedural TV static noise rendered on canvas
  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const intensity = staticIntensityRef.current;

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255 * intensity;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255;   // A
    }

    // Horizontal glitch tear — random horizontal offset bands
    if (glitchActiveRef.current && Math.random() > 0.4) {
      const tearY = Math.floor(Math.random() * h);
      const tearH = Math.floor(Math.random() * 30) + 5;
      const shift = Math.floor((Math.random() - 0.5) * 40);

      for (let y = tearY; y < Math.min(tearY + tearH, h); y++) {
        for (let x = 0; x < w; x++) {
          const srcX = ((x + shift) % w + w) % w;
          const dstIdx = (y * w + x) * 4;
          const srcIdx = (y * w + srcX) * 4;
          data[dstIdx] = data[srcIdx];
          data[dstIdx + 1] = data[srcIdx + 1];
          data[dstIdx + 2] = data[srcIdx + 2];
        }
      }
    }

    // Occasional black horizontal bars (signal loss)
    if (Math.random() > 0.85) {
      const barY = Math.floor(Math.random() * h);
      const barH = Math.floor(Math.random() * 8) + 2;
      for (let y = barY; y < Math.min(barY + barH, h); y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          data[idx] = 0;
          data[idx + 1] = 0;
          data[idx + 2] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Rolling scan band (bright horizontal band moving down)
    const time = Date.now() * 0.001;
    const scanY = ((time * 80) % (h + 60)) - 30;
    const gradient = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, `rgba(255,255,255,${0.06 * intensity})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 30, w, 60);

    animFrameRef.current = requestAnimationFrame(drawStatic);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 320;
      canvas.height = 240;
    }

    // Start the static animation loop
    animFrameRef.current = requestAnimationFrame(drawStatic);

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animFrameRef.current);
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    document.body.style.overflow = "hidden";

    // ============================
    // PHASE 1: Dark room, TV power on (0s - 1.2s)
    // ============================

    // TV starts scaled down, slightly below, invisible
    gsap.set(tvRef.current, {
      scale: 0.9,
      opacity: 0,
      y: 20,
    });

    gsap.set(logoOverlayRef.current, { opacity: 0 });
    gsap.set(channelNumRef.current, { opacity: 0 });

    // Ambient glow starts dim
    gsap.set(ambientGlowRef.current, { opacity: 0 });
    gsap.set(tvGlowRef.current, { opacity: 0 });

    // TV fades in with subtle flicker
    tl.to(tvRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, 0.3);

    // Screen powers on — ambient glow builds
    tl.to(ambientGlowRef.current, {
      opacity: 0.6,
      duration: 1,
      ease: "power1.inOut",
    }, 0.5);

    tl.to(tvGlowRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    }, 0.5);

    // Enable glitch tears after a moment
    tl.call(() => {
      glitchActiveRef.current = true;
    }, [], 0.8);

    // Channel number appears (like old TV)
    tl.to(channelNumRef.current, {
      opacity: 1,
      duration: 0.1,
    }, 1.0);

    // Flicker the channel number
    tl.to(channelNumRef.current, {
      opacity: 0,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
    }, 1.2);

    // ============================
    // PHASE 2: Static plays, tension builds (1.2s - 2.8s)
    // ============================

    // Brief screen blackout (signal loss)
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.06,
      yoyo: true,
      repeat: 1,
    }, 1.6);

    // Another blackout
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.04,
      yoyo: true,
      repeat: 1,
    }, 2.1);

    // Quick horizontal screen shift (tracking error)
    tl.to(canvasRef.current, {
      x: -15,
      duration: 0.05,
    }, 2.15);
    tl.to(canvasRef.current, {
      x: 8,
      duration: 0.04,
    }, 2.2);
    tl.to(canvasRef.current, {
      x: 0,
      duration: 0.06,
    }, 2.24);

    // ============================
    // PHASE 3: Logo flashes through static (2.8s - 4.2s)
    // ============================

    // First flash — very brief, distorted
    tl.to(logoOverlayRef.current, {
      opacity: 0.4,
      duration: 0.08,
    }, 2.8);

    tl.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.05,
    }, 2.88);

    // Screen distortion on flash
    tl.to(screenRef.current, {
      filter: "brightness(1.8) contrast(1.5)",
      duration: 0.08,
    }, 2.8);
    tl.to(screenRef.current, {
      filter: "brightness(1) contrast(1)",
      duration: 0.1,
    }, 2.88);

    // Second flash — longer, with chromatic aberration
    tl.to(logoOverlayRef.current, {
      opacity: 0.7,
      filter: "blur(0px)",
      duration: 0.12,
    }, 3.2);

    // Chromatic aberration effect on the logo
    tl.to(logoOverlayRef.current, {
      textShadow: "3px 0 #ff0000, -3px 0 #00ffff",
      duration: 0.05,
    }, 3.2);

    tl.to(logoOverlayRef.current, {
      textShadow: "0 0 transparent",
      duration: 0.05,
    }, 3.3);

    tl.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.08,
    }, 3.35);

    // Intense screen distortion
    tl.to(screenRef.current, {
      filter: "brightness(2) contrast(2) saturate(0.5)",
      duration: 0.06,
    }, 3.2);
    tl.to(screenRef.current, {
      filter: "brightness(0.3)",
      duration: 0.08,
    }, 3.28);
    tl.to(screenRef.current, {
      filter: "brightness(1) contrast(1) saturate(1)",
      duration: 0.15,
    }, 3.36);

    // Third flash — logo is clear, holds
    tl.to(logoOverlayRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.15,
    }, 3.7);

    // Reduce static intensity as logo takes over
    tl.to(staticIntensityRef, {
      current: 0.3,
      duration: 0.5,
      ease: "power2.in",
    }, 3.8);

    // Screen brightens
    tl.to(screenRef.current, {
      filter: "brightness(1.3)",
      duration: 0.3,
    }, 3.9);

    // ============================
    // PHASE 4: TV screen goes white, zoom to fill viewport (4.2s - 5.2s)
    // ============================

    // Static fades out completely
    tl.to(staticIntensityRef, {
      current: 0,
      duration: 0.3,
    }, 4.2);

    // Screen goes white
    tl.to(screenRef.current, {
      filter: "brightness(3) contrast(0.5)",
      duration: 0.3,
      ease: "power2.in",
    }, 4.3);

    // Hide logo overlay as screen goes white
    tl.to(logoOverlayRef.current, {
      opacity: 0,
      filter: "brightness(3)",
      duration: 0.2,
    }, 4.35);

    // Channel number disappears
    tl.to(channelNumRef.current, {
      opacity: 0,
      duration: 0.1,
    }, 4.2);

    // Disable glitches
    tl.call(() => {
      glitchActiveRef.current = false;
    }, [], 4.2);

    // TV zoom — fills the viewport
    tl.to(tvRef.current, {
      scale: 12,
      duration: 0.8,
      ease: "power3.in",
    }, 4.4);

    // Ambient glow intensifies
    tl.to(ambientGlowRef.current, {
      opacity: 1,
      scale: 3,
      duration: 0.6,
    }, 4.4);

    // Everything goes white
    tl.to(preloaderRef.current, {
      backgroundColor: "#ffffff",
      duration: 0.3,
    }, 4.8);

    // Final fade out
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 5.0);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = "auto";
    };
  }, [drawStatic]);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0c 0%, #020203 50%, #000000 100%)",
      }}
    >
      {/* Film grain overlay on entire screen */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette overlay */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Ambient glow from TV onto the "floor" */}
      <div
        ref={ambientGlowRef}
        className="absolute pointer-events-none z-0"
        style={{
          width: "600px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          background: "radial-gradient(ellipse at center, rgba(140,160,180,0.12) 0%, rgba(100,120,140,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ==================== THE TV ==================== */}
      <div
        ref={tvRef}
        className="relative z-10 flex flex-col items-center"
        style={{ perspective: "1200px" }}
      >
        {/* Antennas */}
        <div className="relative w-[340px] md:w-[420px] h-[60px] flex items-end justify-center mb-[-2px]">
          {/* Left antenna */}
          <div
            ref={antennaLeftRef}
            className="absolute bottom-0"
            style={{
              left: "38%",
              width: "3px",
              height: "55px",
              background: "linear-gradient(to top, #3a3a3a, #5a5a5a, #4a4a4a)",
              transform: "rotate(-25deg)",
              transformOrigin: "bottom center",
              borderRadius: "2px 2px 0 0",
              boxShadow: "1px 0 3px rgba(0,0,0,0.5)",
            }}
          >
            {/* Antenna tip */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{ background: "#6a6a6a" }}
            />
          </div>
          {/* Right antenna */}
          <div
            ref={antennaRightRef}
            className="absolute bottom-0"
            style={{
              right: "38%",
              width: "3px",
              height: "55px",
              background: "linear-gradient(to top, #3a3a3a, #5a5a5a, #4a4a4a)",
              transform: "rotate(25deg)",
              transformOrigin: "bottom center",
              borderRadius: "2px 2px 0 0",
              boxShadow: "-1px 0 3px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{ background: "#6a6a6a" }}
            />
          </div>
        </div>

        {/* TV Body */}
        <div
          className="relative"
          style={{
            width: "clamp(320px, 50vw, 440px)",
            aspectRatio: "4/3.4",
            background: "linear-gradient(145deg, #2c2a28 0%, #1e1c1a 30%, #161412 60%, #1a1816 100%)",
            borderRadius: "18px",
            padding: "clamp(22px, 3vw, 35px) clamp(22px, 3vw, 35px) clamp(30px, 4vw, 45px)",
            boxShadow: `
              0 8px 40px rgba(0,0,0,0.8),
              0 2px 10px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.06),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* TV brand embossing */}
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] uppercase font-mono"
            style={{ color: "rgba(255,255,255,0.08)" }}
          >
            BluEdge
          </div>

          {/* Subtle wood texture strip at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[18px] rounded-b-[18px]"
            style={{
              background: "linear-gradient(to right, #2a2118, #3a3028, #2a2118, #352a20, #2a2118)",
              borderTop: "1px solid rgba(255,255,255,0.03)",
            }}
          />

          {/* The CRT Screen */}
          <div
            ref={screenRef}
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: "12px / 14px",
              background: "#000",
              boxShadow: `
                inset 0 0 30px rgba(0,0,0,0.9),
                inset 0 0 60px rgba(0,0,0,0.5),
                0 0 2px rgba(140,160,180,0.15)
              `,
              /* Barrel distortion approximation */
              border: "3px solid #0a0a0a",
            }}
          >
            {/* Canvas for real-time static noise */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{
                imageRendering: "pixelated",
                borderRadius: "9px / 11px",
              }}
            />

            {/* CRT scan lines overlay */}
            <div
              ref={scanlineRef}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* CRT curvature highlight */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* Screen edge shadow (CRT depth) */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,0,0,0.3)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* TV Glow effect on screen */}
            <div
              ref={tvGlowRef}
              className="absolute inset-0 pointer-events-none z-5"
              style={{
                background: "radial-gradient(ellipse at center, rgba(150,170,190,0.05) 0%, transparent 60%)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* Logo overlay — flashes through the static */}
            <div
              ref={logoOverlayRef}
              className="absolute inset-0 z-30 flex items-center justify-center"
              style={{ borderRadius: "9px / 11px" }}
            >
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/bluedge/Logo.svg"
                  alt="BluEdge"
                  width={70}
                  height={70}
                  className="drop-shadow-[0_0_20px_rgba(44,172,226,0.8)]"
                  style={{ filter: "brightness(1.2)" }}
                />
                <span
                  className="text-white text-sm font-bold tracking-[0.25em] uppercase mt-1"
                  style={{
                    textShadow: "0 0 10px rgba(44,172,226,0.6), 0 0 20px rgba(44,172,226,0.3)",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}
                >
                  BluEdge
                </span>
              </div>
            </div>

            {/* Channel number (top right, like old TVs) */}
            <div
              ref={channelNumRef}
              className="absolute top-3 right-4 z-30 font-mono text-[#33ff33] text-xs"
              style={{
                textShadow: "0 0 8px rgba(51,255,51,0.5)",
                fontFamily: "monospace",
              }}
            >
              CH-03
            </div>

            {/* VHS tracking lines at the very top/bottom */}
            <div
              className="absolute top-0 left-0 right-0 h-[6px] z-20"
              style={{
                background: "repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-[6px] z-20"
              style={{
                background: "repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 8px)",
              }}
            />
          </div>

          {/* TV controls — right side (knobs) */}
          <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
            {/* Volume knob */}
            <div
              className="w-[10px] h-[10px] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4a4a4a, #2a2a2a)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.1)",
              }}
            />
            {/* Channel knob */}
            <div
              className="w-[10px] h-[10px] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4a4a4a, #2a2a2a)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.1)",
              }}
            />
          </div>

          {/* Power LED */}
          <div
            className="absolute bottom-[22px] right-[18px] w-[5px] h-[5px] rounded-full"
            style={{
              background: "#ff3333",
              boxShadow: "0 0 6px rgba(255,50,50,0.6), 0 0 12px rgba(255,50,50,0.3)",
            }}
          />
        </div>

        {/* TV Stand / Legs */}
        <div className="flex justify-center gap-[clamp(120px,18vw,200px)] mt-[-2px]">
          <div
            style={{
              width: "8px",
              height: "20px",
              background: "linear-gradient(to bottom, #2a2828, #1a1818)",
              borderRadius: "0 0 3px 3px",
              transform: "perspective(200px) rotateX(-5deg) rotateY(15deg)",
            }}
          />
          <div
            style={{
              width: "8px",
              height: "20px",
              background: "linear-gradient(to bottom, #2a2828, #1a1818)",
              borderRadius: "0 0 3px 3px",
              transform: "perspective(200px) rotateX(-5deg) rotateY(-15deg)",
            }}
          />
        </div>
      </div>

      {/* Bottom text */}
      <p
        className="absolute bottom-6 text-[10px] tracking-[0.35em] text-white/15 uppercase font-mono z-30"
      >
        Signal incoming...
      </p>
    </div>
  );
}
