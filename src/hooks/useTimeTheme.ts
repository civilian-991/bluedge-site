"use client";

import { useCallback, useEffect, useState } from "react";

export type ThemeName = "dawn" | "day" | "dusk" | "night";

interface ThemeConfig {
  name: ThemeName;
  accent: string;
  accentGlow: string;
  bgTint: string;
  glowColor: string;
  label: string;
}

const themes: Record<ThemeName, ThemeConfig> = {
  dawn: {
    name: "dawn",
    accent: "#F5A623",
    accentGlow: "rgba(245,166,35,0.6)",
    bgTint: "rgba(120,60,20,0.06)",
    glowColor: "#FFD700",
    label: "Dawn",
  },
  day: {
    name: "day",
    accent: "#2CACE2",
    accentGlow: "rgba(44,172,226,0.6)",
    bgTint: "rgba(0,0,0,0)",
    glowColor: "#2CACE2",
    label: "Day",
  },
  dusk: {
    name: "dusk",
    accent: "#A855F7",
    accentGlow: "rgba(168,85,247,0.6)",
    bgTint: "rgba(80,20,120,0.06)",
    glowColor: "#E040FB",
    label: "Dusk",
  },
  night: {
    name: "night",
    accent: "#FF6B9D",
    accentGlow: "rgba(255,107,157,0.6)",
    bgTint: "rgba(10,10,60,0.08)",
    glowColor: "#FF6B9D",
    label: "Night",
  },
};

const themeOrder: ThemeName[] = ["dawn", "day", "dusk", "night"];

function getAutoTheme(): ThemeName {
  const h = new Date().getHours();
  if (h >= 6 && h < 10) return "dawn";
  if (h >= 10 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

function getStoredOverride(): ThemeName | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("time-theme-override");
    if (!raw) return null;
    const { theme, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem("time-theme-override");
      return null;
    }
    return theme as ThemeName;
  } catch {
    return null;
  }
}

function applyTheme(config: ThemeConfig) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--theme-accent", config.accent);
  root.style.setProperty("--theme-accent-glow", config.accentGlow);
  root.style.setProperty("--theme-bg-tint", config.bgTint);
  root.style.setProperty("--theme-glow-color", config.glowColor);
  root.style.setProperty("--theme-name", `"${config.name}"`);
}

export function useTimeTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("day");
  const [isOverride, setIsOverride] = useState(false);

  // Resolve theme on mount and every minute
  useEffect(() => {
    function resolve() {
      const override = getStoredOverride();
      if (override) {
        setIsOverride(true);
        setCurrentTheme(override);
        applyTheme(themes[override]);
      } else {
        setIsOverride(false);
        const auto = getAutoTheme();
        setCurrentTheme(auto);
        applyTheme(themes[auto]);
      }
    }
    resolve();
    const interval = setInterval(resolve, 60_000);
    return () => clearInterval(interval);
  }, []);

  const cycleTheme = useCallback(() => {
    const idx = themeOrder.indexOf(currentTheme);
    const next = themeOrder[(idx + 1) % themeOrder.length];
    setCurrentTheme(next);
    setIsOverride(true);
    applyTheme(themes[next]);
    localStorage.setItem(
      "time-theme-override",
      JSON.stringify({ theme: next, expiry: Date.now() + 24 * 60 * 60 * 1000 })
    );
  }, [currentTheme]);

  const clearOverride = useCallback(() => {
    localStorage.removeItem("time-theme-override");
    setIsOverride(false);
    const auto = getAutoTheme();
    setCurrentTheme(auto);
    applyTheme(themes[auto]);
  }, []);

  return {
    theme: currentTheme,
    config: themes[currentTheme],
    isOverride,
    cycleTheme,
    clearOverride,
    themes,
  };
}
