"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

interface KonamiState {
  isActivated: boolean;
  reset: () => void;
}

export function useKonamiCode(): KonamiState {
  const [isActivated, setIsActivated] = useState(false);
  const sequenceIndex = useRef(0);

  const reset = useCallback(() => {
    setIsActivated(false);
    sequenceIndex.current = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActivated) return;

      const expected = KONAMI_SEQUENCE[sequenceIndex.current];
      const pressed = e.code;

      if (pressed === expected) {
        sequenceIndex.current += 1;
        if (sequenceIndex.current === KONAMI_SEQUENCE.length) {
          setIsActivated(true);
          sequenceIndex.current = 0;
        }
      } else {
        sequenceIndex.current = 0;
        // Check if the wrong key is actually the start of the sequence
        if (pressed === KONAMI_SEQUENCE[0]) {
          sequenceIndex.current = 1;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActivated]);

  return { isActivated, reset };
}
