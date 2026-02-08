"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface IdleState {
  isIdle: boolean;
  isDeepIdle: boolean;
}

export function useIdleDetection(
  idleThreshold = 15000,
  deepIdleThreshold = 30000
): IdleState {
  const [isIdle, setIsIdle] = useState(false);
  const [isDeepIdle, setIsDeepIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deepIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimers = useCallback(() => {
    setIsIdle(false);
    setIsDeepIdle(false);

    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (deepIdleTimer.current) clearTimeout(deepIdleTimer.current);

    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
    }, idleThreshold);

    deepIdleTimer.current = setTimeout(() => {
      setIsDeepIdle(true);
    }, deepIdleThreshold);
  }, [idleThreshold, deepIdleThreshold]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];

    events.forEach((event) => window.addEventListener(event, resetTimers));
    resetTimers();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimers));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (deepIdleTimer.current) clearTimeout(deepIdleTimer.current);
    };
  }, [resetTimers]);

  return { isIdle, isDeepIdle };
}
