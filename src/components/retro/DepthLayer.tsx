"use client";

import { ReactNode } from "react";

interface DepthLayerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper that marks a section as a parallax container.
 * Child elements with data-depth="1|2|3" will respond to mouse movement.
 * The container itself gets a subtle tilt effect.
 */
export default function DepthLayer({ children, className = "" }: DepthLayerProps) {
  return (
    <div
      data-parallax-container
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform", transition: "transform 0.1s ease-out" }}
    >
      {children}
    </div>
  );
}
