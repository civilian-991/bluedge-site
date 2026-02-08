"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const tvBodyRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoOverlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const channelNumRef = useRef<HTMLDivElement>(null);
  const fullscreenStaticRef = useRef<HTMLCanvasElement>(null);
  const blackOverlayRef = useRef<HTMLDivElement>(null);
  const flickerOverlayRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const fullscreenAnimRef = useRef<number>(0);
  const staticIntensityRef = useRef(0);
  const glitchActiveRef = useRef(false);
  const fullscreenStaticActiveRef = useRef(false);

  // Procedural TV static noise
  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const intensity = staticIntensityRef.current;

    if (intensity <= 0) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);
      animFrameRef.current = requestAnimationFrame(drawStatic);
      return;
    }

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255 * intensity;
      data[i] = noise;
      data[i + 1] = noise;
      data[i + 2] = noise;
      data[i + 3] = 255;
    }

    // Horizontal glitch tears
    if (glitchActiveRef.current && Math.random() > 0.5) {
      const tearCount = Math.floor(Math.random() * 3) + 1;
      for (let t = 0; t < tearCount; t++) {
        const tearY = Math.floor(Math.random() * h);
        const tearH = Math.floor(Math.random() * 20) + 3;
        const shift = Math.floor((Math.random() - 0.5) * 60);
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
    }

    // Black dropout bars
    if (Math.random() > 0.8) {
      const barY = Math.floor(Math.random() * h);
      const barH = Math.floor(Math.random() * 12) + 2;
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

    // Rolling scan band
    const time = Date.now() * 0.001;
    const scanY = ((time * 60) % (h + 80)) - 40;
    const gradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, `rgba(255,255,255,${0.08 * intensity})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 40, w, 80);

    animFrameRef.current = requestAnimationFrame(drawStatic);
  }, []);

  // Fullscreen static that breaks out of the TV
  const drawFullscreenStatic = useCallback(() => {
    const canvas = fullscreenStaticRef.current;
    if (!canvas || !fullscreenStaticActiveRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255;
      data[i] = noise;
      data[i + 1] = noise;
      data[i + 2] = noise;
      data[i + 3] = 255;
    }

    // Heavy glitch tears across the full screen
    for (let t = 0; t < 5; t++) {
      const tearY = Math.floor(Math.random() * h);
      const tearH = Math.floor(Math.random() * 15) + 3;
      const shift = Math.floor((Math.random() - 0.5) * 80);
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

    ctx.putImageData(imageData, 0, 0);

    // Scan lines over fullscreen
    const time = Date.now() * 0.001;
    const scanY = ((time * 120) % (h + 100)) - 50;
    const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
    gradient.addColorStop(0, "rgba(255,255,255,0)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 50, w, 100);

    fullscreenAnimRef.current = requestAnimationFrame(drawFullscreenStatic);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 320;
      canvas.height = 240;
    }

    const fsCanvas = fullscreenStaticRef.current;
    if (fsCanvas) {
      fsCanvas.width = 240;
      fsCanvas.height = 160;
    }

    // Start TV static loop
    animFrameRef.current = requestAnimationFrame(drawStatic);

    const tl = gsap.timeline({
      onComplete: () => {
        cancelAnimationFrame(animFrameRef.current);
        cancelAnimationFrame(fullscreenAnimRef.current);
        fullscreenStaticActiveRef.current = false;
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    document.body.style.overflow = "hidden";

    // ============================
    // INITIAL STATE — Everything hidden
    // ============================
    gsap.set(tvRef.current, { opacity: 0 });
    gsap.set(tvBodyRef.current, { opacity: 0 });
    gsap.set(logoOverlayRef.current, { opacity: 0 });
    gsap.set(channelNumRef.current, { opacity: 0 });
    gsap.set(ambientGlowRef.current, { opacity: 0 });
    gsap.set(screenRef.current, { filter: "brightness(0)" });
    gsap.set(fullscreenStaticRef.current, { opacity: 0 });
    gsap.set(blackOverlayRef.current, { opacity: 0 });
    gsap.set(flickerOverlayRef.current, { opacity: 0 });

    // ============================
    // PHASE 1: THE DARK — Nothing but dread (0s - 1.5s)
    // ============================

    // Long beat of pure darkness... then a power surge flicker
    // Just a faint rectangle of light — the screen turning on before you see the TV

    // First power surge — screen barely flickers on
    tl.to(tvRef.current, { opacity: 1, duration: 0 }, 0.8);

    tl.to(screenRef.current, {
      filter: "brightness(0.3)",
      duration: 0.04,
    }, 0.8);
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.03,
    }, 0.84);

    // Static intensity surges briefly
    tl.call(() => { staticIntensityRef.current = 0.4; }, [], 0.8);
    tl.call(() => { staticIntensityRef.current = 0; }, [], 0.84);

    // Second flicker — slightly longer
    tl.to(screenRef.current, {
      filter: "brightness(0.5)",
      duration: 0.06,
    }, 1.1);
    tl.call(() => { staticIntensityRef.current = 0.6; }, [], 1.1);

    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.04,
    }, 1.16);
    tl.call(() => { staticIntensityRef.current = 0; }, [], 1.16);

    // Flicker overlay flash synced with screen
    tl.to(flickerOverlayRef.current, { opacity: 0.15, duration: 0.04 }, 0.8);
    tl.to(flickerOverlayRef.current, { opacity: 0, duration: 0.03 }, 0.84);
    tl.to(flickerOverlayRef.current, { opacity: 0.2, duration: 0.06 }, 1.1);
    tl.to(flickerOverlayRef.current, { opacity: 0, duration: 0.04 }, 1.16);

    // ============================
    // PHASE 2: TV COMES ALIVE — Screen powers on, TV body revealed (1.5s - 2.5s)
    // ============================

    // Screen powers on for real — static floods in
    tl.to(screenRef.current, {
      filter: "brightness(0.8)",
      duration: 0.08,
    }, 1.5);
    tl.call(() => {
      staticIntensityRef.current = 1;
      glitchActiveRef.current = true;
    }, [], 1.5);

    // Ambient glow slowly seeps out from the TV
    tl.to(ambientGlowRef.current, {
      opacity: 0.5,
      duration: 1.5,
      ease: "power1.in",
    }, 1.5);

    // TV body slowly becomes visible — illuminated by its own screen
    tl.to(tvBodyRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: "power1.in",
    }, 1.6);

    // Screen reaches full brightness
    tl.to(screenRef.current, {
      filter: "brightness(1)",
      duration: 0.8,
      ease: "power1.inOut",
    }, 1.8);

    // Channel number flickers on
    tl.to(channelNumRef.current, { opacity: 1, duration: 0.03 }, 2.0);
    tl.to(channelNumRef.current, { opacity: 0, duration: 0.03 }, 2.03);
    tl.to(channelNumRef.current, { opacity: 1, duration: 0.03 }, 2.1);
    tl.to(channelNumRef.current, { opacity: 0, duration: 0.02 }, 2.13);
    tl.to(channelNumRef.current, { opacity: 0.8, duration: 0.05 }, 2.2);

    // ============================
    // PHASE 3: TENSION — Static builds, disturbing glitches (2.5s - 3.8s)
    // ============================

    // Sudden blackout
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.03,
    }, 2.6);
    tl.to(screenRef.current, {
      filter: "brightness(1)",
      duration: 0.05,
    }, 2.68);

    // Tracking error — horizontal jitter
    tl.to(canvasRef.current, { x: -20, duration: 0.04 }, 2.9);
    tl.to(canvasRef.current, { x: 12, duration: 0.03 }, 2.94);
    tl.to(canvasRef.current, { x: -6, duration: 0.03 }, 2.97);
    tl.to(canvasRef.current, { x: 0, duration: 0.05 }, 3.0);

    // Another longer blackout — unsettling
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.02,
    }, 3.2);
    // Hold the darkness just a beat too long
    tl.to(screenRef.current, {
      filter: "brightness(1.2)",
      duration: 0.04,
    }, 3.35);
    tl.to(screenRef.current, {
      filter: "brightness(1)",
      duration: 0.1,
    }, 3.39);

    // Screen rolls vertically (VHS tracking loss)
    tl.to(canvasRef.current, { y: -30, duration: 0.15, ease: "none" }, 3.5);
    tl.to(canvasRef.current, { y: 0, duration: 0.08, ease: "power2.out" }, 3.65);

    // ============================
    // PHASE 4: SUBLIMINAL LOGO FLASHES (3.8s - 5.0s)
    // ============================

    // First flash — subliminal, 2-3 frames, you barely see it
    tl.to(logoOverlayRef.current, { opacity: 0.3, duration: 0.04 }, 3.9);
    tl.to(logoOverlayRef.current, { opacity: 0, duration: 0.02 }, 3.94);
    // Screen brightness spike on flash
    tl.to(screenRef.current, {
      filter: "brightness(1.6) contrast(1.4)",
      duration: 0.04,
    }, 3.9);
    tl.to(screenRef.current, {
      filter: "brightness(1) contrast(1)",
      duration: 0.06,
    }, 3.94);

    // Beat of static...

    // Second flash — slightly longer, inverted/distorted feel
    tl.to(logoOverlayRef.current, {
      opacity: 0.6,
      duration: 0.06,
    }, 4.2);
    // Chromatic split
    tl.set(logoOverlayRef.current, {
      filter: "blur(1px)",
      css: { "--chromatic": "1" },
    }, 4.2);
    tl.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.04,
    }, 4.26);
    tl.set(logoOverlayRef.current, { filter: "blur(0px)" }, 4.3);

    // Screen distortion on second flash
    tl.to(screenRef.current, {
      filter: "brightness(2) contrast(2) hue-rotate(20deg)",
      duration: 0.04,
    }, 4.2);
    tl.to(screenRef.current, {
      filter: "brightness(0.2)",
      duration: 0.06,
    }, 4.26);
    tl.to(screenRef.current, {
      filter: "brightness(1) contrast(1) hue-rotate(0deg)",
      duration: 0.15,
    }, 4.32);

    // Screen shake
    tl.to(tvRef.current, { x: -4, duration: 0.03 }, 4.2);
    tl.to(tvRef.current, { x: 5, duration: 0.03 }, 4.23);
    tl.to(tvRef.current, { x: -2, duration: 0.02 }, 4.26);
    tl.to(tvRef.current, { x: 0, duration: 0.04 }, 4.28);

    // Third flash — logo HOLDS, eerie stillness
    tl.to(staticIntensityRef, {
      current: 0.4,
      duration: 0.2,
      ease: "power2.in",
    }, 4.5);

    tl.to(logoOverlayRef.current, {
      opacity: 1,
      duration: 0.08,
    }, 4.55);

    // Static dies down, logo glows alone on dark screen
    tl.to(staticIntensityRef, {
      current: 0.08,
      duration: 0.6,
      ease: "power2.in",
    }, 4.6);

    // Eerie beat — logo just sits there
    tl.to(channelNumRef.current, { opacity: 0, duration: 0.05 }, 4.6);

    // ============================
    // PHASE 5: THE HORROR TRANSITION (5.2s - 6.4s)
    // ============================

    // Screen flickers violently
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.03,
    }, 5.2);
    tl.to(screenRef.current, {
      filter: "brightness(2)",
      duration: 0.03,
    }, 5.23);
    tl.to(screenRef.current, {
      filter: "brightness(0)",
      duration: 0.03,
    }, 5.26);
    tl.to(screenRef.current, {
      filter: "brightness(1.5)",
      duration: 0.03,
    }, 5.29);

    // Logo vanishes
    tl.to(logoOverlayRef.current, { opacity: 0, duration: 0.03 }, 5.2);

    // Static ERUPTS — maxes out
    tl.call(() => {
      staticIntensityRef.current = 1;
      glitchActiveRef.current = true;
    }, [], 5.29);

    // TV shakes violently
    tl.to(tvRef.current, { x: -8, y: 3, rotation: -0.5, duration: 0.03 }, 5.3);
    tl.to(tvRef.current, { x: 10, y: -4, rotation: 0.7, duration: 0.03 }, 5.33);
    tl.to(tvRef.current, { x: -6, y: 5, rotation: -0.3, duration: 0.03 }, 5.36);
    tl.to(tvRef.current, { x: 7, y: -2, rotation: 0.5, duration: 0.03 }, 5.39);
    tl.to(tvRef.current, { x: -10, y: 3, rotation: -0.8, duration: 0.03 }, 5.42);
    tl.to(tvRef.current, { x: 5, y: -5, rotation: 0.4, duration: 0.03 }, 5.45);
    tl.to(tvRef.current, { x: 0, y: 0, rotation: 0, duration: 0.05 }, 5.48);

    // THE STATIC BREAKS OUT — fills the entire viewport
    tl.call(() => {
      fullscreenStaticActiveRef.current = true;
      fullscreenAnimRef.current = requestAnimationFrame(drawFullscreenStatic);
    }, [], 5.5);

    // TV fades out as fullscreen static takes over
    tl.to(tvRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.15,
      ease: "power2.in",
    }, 5.5);

    tl.to(ambientGlowRef.current, { opacity: 0, duration: 0.1 }, 5.5);

    // Fullscreen static ramps up
    tl.to(fullscreenStaticRef.current, {
      opacity: 1,
      duration: 0.08,
    }, 5.5);

    // Rapid strobe flickers over the static
    tl.to(flickerOverlayRef.current, { opacity: 0.6, duration: 0.03 }, 5.55);
    tl.to(flickerOverlayRef.current, { opacity: 0, duration: 0.03 }, 5.58);
    tl.to(flickerOverlayRef.current, { opacity: 0.4, duration: 0.03 }, 5.65);
    tl.to(flickerOverlayRef.current, { opacity: 0, duration: 0.03 }, 5.68);
    tl.to(flickerOverlayRef.current, { opacity: 0.8, duration: 0.02 }, 5.75);
    tl.to(flickerOverlayRef.current, { opacity: 0, duration: 0.04 }, 5.77);

    // Screen shake on the whole preloader
    tl.to(preloaderRef.current, { x: -5, duration: 0.03 }, 5.55);
    tl.to(preloaderRef.current, { x: 6, duration: 0.03 }, 5.58);
    tl.to(preloaderRef.current, { x: -3, duration: 0.03 }, 5.61);
    tl.to(preloaderRef.current, { x: 0, duration: 0.03 }, 5.64);

    // HARD CUT TO BLACK
    tl.to(blackOverlayRef.current, {
      opacity: 1,
      duration: 0.03,
    }, 5.85);

    // Kill the fullscreen static
    tl.call(() => {
      fullscreenStaticActiveRef.current = false;
      cancelAnimationFrame(fullscreenAnimRef.current);
    }, [], 5.88);

    tl.to(fullscreenStaticRef.current, { opacity: 0, duration: 0 }, 5.88);

    // Hold black — a beat of nothing (this is the horror pause)
    // ...silence...

    // Site fades up from the darkness
    tl.to(blackOverlayRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, 6.2);

    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    }, 6.5);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      cancelAnimationFrame(fullscreenAnimRef.current);
      document.body.style.overflow = "auto";
    };
  }, [drawStatic, drawFullscreenStatic]);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "#000000" }}
    >
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[60] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Heavy vignette — dark corners */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none z-[55]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.98) 100%)",
        }}
      />

      {/* Flicker overlay — white flash for power surges */}
      <div
        ref={flickerOverlayRef}
        className="absolute inset-0 pointer-events-none z-[58] bg-white"
      />

      {/* Ambient glow bleeding from TV */}
      <div
        ref={ambientGlowRef}
        className="absolute pointer-events-none z-0"
        style={{
          width: "700px",
          height: "500px",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at 50% 40%, rgba(130,150,170,0.1) 0%, rgba(80,100,120,0.04) 40%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* ==================== THE TV ==================== */}
      <div
        ref={tvRef}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Antennas */}
        <div className="relative w-[340px] md:w-[420px] h-[60px] flex items-end justify-center mb-[-2px]">
          <div
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
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{ background: "#6a6a6a" }}
            />
          </div>
          <div
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

        {/* TV Body — fades in separately from screen */}
        <div
          ref={tvBodyRef}
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
            style={{ color: "rgba(255,255,255,0.06)" }}
          >
            BluEdge
          </div>

          {/* Wood grain strip at bottom */}
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
                0 0 1px rgba(140,160,180,0.1)
              `,
              border: "3px solid #0a0a0a",
            }}
          >
            {/* Canvas for static noise */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{
                imageRendering: "pixelated",
                borderRadius: "9px / 11px",
              }}
            />

            {/* CRT scan lines */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* CRT curvature highlight */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* Screen edge shadow */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.7), inset 0 0 80px rgba(0,0,0,0.4)",
                borderRadius: "9px / 11px",
              }}
            />

            {/* Logo overlay — subliminal flashes */}
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
                  style={{ filter: "brightness(1.3)" }}
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

            {/* Channel number */}
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

            {/* VHS tracking artifacts */}
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

          {/* TV knobs */}
          <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
            <div
              className="w-[10px] h-[10px] rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4a4a4a, #2a2a2a)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.1)",
              }}
            />
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

        {/* TV Legs */}
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

      {/* ==================== FULLSCREEN STATIC ==================== */}
      {/* This breaks out of the TV and fills the viewport */}
      <canvas
        ref={fullscreenStaticRef}
        className="absolute inset-0 w-full h-full z-[65] pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Scan lines over fullscreen static */}
      <div
        className="absolute inset-0 pointer-events-none z-[66]"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Black overlay for the hard cut */}
      <div
        ref={blackOverlayRef}
        className="absolute inset-0 z-[70] bg-black pointer-events-none"
      />
    </div>
  );
}
