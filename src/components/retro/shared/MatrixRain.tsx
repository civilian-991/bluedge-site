"use client";

import { useEffect, useRef, useCallback } from "react";

interface MatrixRainProps {
  active?: boolean;
  className?: string;
  fadeOut?: boolean;
  color?: string;
}

export default function MatrixRain({
  active = true,
  className = "",
  fadeOut = false,
  color = "#00ff41",
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const columnsRef = useRef<number[]>([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const fontSize = 14;
    const columns = Math.floor(w / fontSize);

    if (columnsRef.current.length !== columns) {
      columnsRef.current = Array(columns).fill(0).map(() => Math.random() * h);
    }

    // Semi-transparent black to create trail effect
    ctx.fillStyle = fadeOut ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = color;
    ctx.font = `${fontSize}px monospace`;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

    for (let i = 0; i < columns; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = columnsRef.current[i];

      // Brighter leading character
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(char, x, y);

      // Trail characters in green
      ctx.fillStyle = color;
      const prevChar = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(prevChar, x, y - fontSize);

      columnsRef.current[i] += fontSize;

      if (columnsRef.current[i] > h && Math.random() > 0.975) {
        columnsRef.current[i] = 0;
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [active, fadeOut, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (active) {
      animFrameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, draw]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  );
}
