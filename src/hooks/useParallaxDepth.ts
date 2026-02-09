"use client";

import { useEffect, useRef } from "react";

const DEPTH_SCALES: Record<number, number> = { 1: 5, 2: 12, 3: 20 };
const MAX_TILT = 1.5;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function useParallaxDepth() {
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1 from viewport center
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const animate = () => {
      if (!active) return;

      // Smooth interpolation
      currentRef.current.x = lerp(currentRef.current.x, mouseRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, mouseRef.current.y, 0.08);

      const { x, y } = currentRef.current;

      // Apply to all depth-layer containers in view
      const containers = document.querySelectorAll<HTMLElement>("[data-parallax-container]");
      containers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const inView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!inView) return;

        // Apply subtle tilt to container
        container.style.transform = `perspective(1200px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;

        // Apply depth-based translate to children
        const depthElements = container.querySelectorAll<HTMLElement>("[data-depth]");
        depthElements.forEach((el) => {
          const depth = parseInt(el.dataset.depth || "1", 10);
          const scale = DEPTH_SCALES[depth] || 5;
          el.style.transform = `translate3d(${x * scale}px, ${y * scale}px, 0)`;
        });
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
