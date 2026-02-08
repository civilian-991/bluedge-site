"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface Collectible {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const COLLECTIBLES: Collectible[] = [
  { id: "golden-star", name: "Golden Star", emoji: "⭐", description: "Hidden behind the logo" },
  { id: "power-mushroom", name: "Power Mushroom", emoji: "🍄", description: "Channel 99 secret" },
  { id: "blue-gem", name: "Blue Gem", emoji: "💎", description: "Newspaper Vol. XX" },
  { id: "lightning-bolt", name: "Lightning Bolt", emoji: "⚡", description: "Speed assembler" },
  { id: "trophy", name: "Trophy", emoji: "🏆", description: "Crafted with love" },
];

const STORAGE_KEY = "bluedge-collectibles";

function loadCollected(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveCollected(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

const listeners = new Set<() => void>();
let globalCollected = loadCollected();

export function useCollectibles() {
  const [collected, setCollected] = useState<Set<string>>(globalCollected);
  const [justFound, setJustFound] = useState<string | null>(null);
  const [allFound, setAllFound] = useState(false);

  useEffect(() => {
    const handler = () => setCollected(new Set(globalCollected));
    listeners.add(handler);
    // Sync on mount
    setCollected(new Set(globalCollected));
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const collect = useCallback((id: string) => {
    if (globalCollected.has(id)) return;
    globalCollected.add(id);
    saveCollected(globalCollected);
    listeners.forEach((fn) => fn());
    setJustFound(id);
    setTimeout(() => setJustFound(null), 3000);

    if (globalCollected.size === COLLECTIBLES.length) {
      setAllFound(true);
    }
  }, []);

  const resetAll = useCallback(() => {
    globalCollected = new Set();
    saveCollected(globalCollected);
    setAllFound(false);
    listeners.forEach((fn) => fn());
  }, []);

  return {
    collected,
    count: collected.size,
    total: COLLECTIBLES.length,
    collect,
    justFound,
    allFound,
    setAllFound,
    resetAll,
  };
}
