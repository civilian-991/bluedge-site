"use client";

import { useParallaxDepth } from "@/hooks/useParallaxDepth";

/**
 * Invisible component that initializes the 3D parallax depth engine.
 * Sections using DepthLayer wrapper will respond to mouse movement.
 */
export default function ParallaxInit() {
  useParallaxDepth();
  return null;
}
