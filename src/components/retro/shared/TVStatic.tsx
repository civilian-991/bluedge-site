"use client";

import { useEffect, useRef, useCallback } from "react";

interface TVStaticProps {
  active?: boolean;
  intensity?: number;
  className?: string;
  glitch?: boolean;
}

export default function TVStatic({
  active = true,
  intensity = 1,
  className = "",
  glitch = false,
}: TVStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
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
    if (glitch && Math.random() > 0.5) {
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
  }, [active, intensity, glitch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = Math.min(canvas.clientWidth, 640);
      canvas.height = Math.min(canvas.clientHeight, 480);
    };
    resize();

    if (active) {
      animFrameRef.current = requestAnimationFrame(drawStatic);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, drawStatic]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
