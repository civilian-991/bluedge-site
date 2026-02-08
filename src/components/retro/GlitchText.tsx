"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type GlitchIntensity = "subtle" | "medium" | "intense";

interface GlitchTextProps {
  children: string;
  intensity?: GlitchIntensity;
  as?: "h2" | "h3" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({
  children,
  intensity = "medium",
  as: Tag = "span",
  className = "",
  style,
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [persistentGlitch, setPersistentGlitch] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Listen for 'g' key to toggle persistent glitch
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        setPersistentGlitch((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const active = isHovered || persistentGlitch;

  const intensityClass =
    intensity === "subtle"
      ? "glitch-text-subtle"
      : intensity === "intense"
        ? "glitch-text-intense"
        : "glitch-text-medium";

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={`glitch-text-wrapper ${active ? intensityClass : ""} ${className}`}
      style={style}
      data-text={children}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Tag>
  );
}
