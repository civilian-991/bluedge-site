"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  maxDisplacement?: number;
  radius?: number;
}

export default function MagneticText({
  children,
  as: Tag = "h2",
  className = "",
  style,
  maxDisplacement = 15,
  radius = 80,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const activeRef = useRef(true);

  const setCharRef = useCallback((el: HTMLSpanElement | null, idx: number) => {
    if (el) charsRef.current[idx] = el;
  }, []);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      // Spring back all characters
      charsRef.current.forEach((char) => {
        if (char) {
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    const animate = () => {
      if (!activeRef.current) return;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      charsRef.current.forEach((char) => {
        if (!char) return;
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius && dist > 1) {
          // Inverse-square falloff
          const force = Math.min(maxDisplacement, (radius - dist) / radius * maxDisplacement);
          const isUpper = char.textContent === char.textContent?.toUpperCase() && char.textContent?.trim();
          const mass = isUpper ? 0.6 : 1; // uppercase = heavier = less displacement

          const pushX = (dx / dist) * force * mass;
          const pushY = (dy / dist) * force * mass;

          gsap.to(char, {
            x: pushX,
            y: pushY,
            duration: 0.15,
            ease: "power2.out",
            overwrite: "auto",
          });

          // Slight brightness boost
          char.style.filter = `brightness(${1 + (force / maxDisplacement) * 0.3})`;
        } else if (mx > -9000) {
          // Spring back when out of range
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
          char.style.filter = "";
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxDisplacement, radius]);

  // Split text into character spans
  const chars = children.split("");

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={{ ...style, cursor: "default" }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => setCharRef(el, i)}
          className="inline-block will-change-transform"
          style={{ transition: "filter 0.15s ease" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
