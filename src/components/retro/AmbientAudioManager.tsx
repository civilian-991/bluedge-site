"use client";

import { useEffect, useRef } from "react";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

// Maps section element IDs or data-attributes to ambient section IDs
const SECTION_MAP: Record<string, "hero" | "matrix" | "retrotv" | "polaroid" | "grendizer" | "about" | "newspaper" | "telegram"> = {
  "section-hero": "hero",
  "section-matrix": "matrix",
  "section-retrotv": "retrotv",
  "section-polaroid": "polaroid",
  "section-grendizer": "grendizer",
  "section-about": "about",
  "section-newspaper": "newspaper",
  "section-telegram": "telegram",
};

export default function AmbientAudioManager() {
  const { crossfadeTo, initialize } = useAmbientAudio();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Initialize on first user interaction (AudioContext requires user gesture)
    const handleInteraction = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;
      initialize();
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    // Set up IntersectionObserver for section detection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxRatio = 0;
        let activeSection: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeSection = entry.target.getAttribute("data-ambient");
          }
        });

        if (activeSection && SECTION_MAP[activeSection]) {
          crossfadeTo(SECTION_MAP[activeSection]);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    // Observe sections after a short delay (allow DOM to settle)
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll("[data-ambient]");
      sections.forEach((section) => {
        observerRef.current?.observe(section);
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      observerRef.current?.disconnect();
    };
  }, [crossfadeTo, initialize]);

  return null; // No visual output
}
