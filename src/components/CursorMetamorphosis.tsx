"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

type SectionId =
  | "hero"
  | "matrix-pill"
  | "services"
  | "work"
  | "process"
  | "about"
  | "partnerships"
  | "testimonials"
  | "contact"
  | "default";

interface CursorConfig {
  color: string;
  size: number;
  shape: "ring" | "reticle" | "remote" | "grab" | "crosshair" | "pencil" | "quill" | "joystick" | "telegraph";
  trail: boolean;
  label?: string;
}

const sectionConfigs: Record<SectionId, CursorConfig> = {
  hero: { color: "#2CACE2", size: 40, shape: "ring", trail: true },
  "matrix-pill": { color: "#00ff41", size: 36, shape: "reticle", trail: true },
  services: { color: "#38BDF8", size: 36, shape: "remote", trail: false },
  work: { color: "#38BDF8", size: 40, shape: "grab", trail: false },
  process: { color: "#2CACE2", size: 36, shape: "crosshair", trail: false },
  about: { color: "#0EA5E9", size: 36, shape: "pencil", trail: true },
  partnerships: { color: "#2CACE2", size: 36, shape: "ring", trail: false },
  testimonials: { color: "#0077B6", size: 36, shape: "quill", trail: true },
  contact: { color: "#2CACE2", size: 36, shape: "telegraph", trail: false },
  default: { color: "#2CACE2", size: 40, shape: "ring", trail: true },
};

const sectionOrder: SectionId[] = [
  "hero",
  "matrix-pill",
  "services",
  "work",
  "process",
  "about",
  "partnerships",
  "testimonials",
  "contact",
];

// Map section ids to the element ids used in the DOM
function getSectionIdMap(): Record<string, SectionId> {
  return {
    hero: "hero",
    "matrix-pill": "matrix-pill",
    services: "services",
    work: "work",
    process: "process",
    about: "about",
    partnerships: "partnerships",
    testimonials: "testimonials",
    contact: "contact",
  };
}

function CursorSVG({ config, isHovering }: { config: CursorConfig; isHovering: boolean }) {
  const s = config.size;
  const c = config.color;
  const half = s / 2;

  switch (config.shape) {
    case "reticle":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} className="transition-transform duration-200">
          <circle cx={half} cy={half} r={half - 4} fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="4 4" opacity={0.8} />
          <line x1={half} y1="4" x2={half} y2={half - 6} stroke={c} strokeWidth="1" opacity={0.6} />
          <line x1={half} y1={half + 6} x2={half} y2={s - 4} stroke={c} strokeWidth="1" opacity={0.6} />
          <line x1="4" y1={half} x2={half - 6} y2={half} stroke={c} strokeWidth="1" opacity={0.6} />
          <line x1={half + 6} y1={half} x2={s - 4} y2={half} stroke={c} strokeWidth="1" opacity={0.6} />
          <circle cx={half} cy={half} r="3" fill={c} opacity={0.7} />
        </svg>
      );
    case "remote":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <rect x={half - 8} y={half - 12} width="16" height="24" rx="4" fill="none" stroke={c} strokeWidth="1.5" opacity={0.8} />
          <circle cx={half} cy={half - 5} r="2.5" fill={c} opacity={0.6} />
          <rect x={half - 4} y={half + 2} width="8" height="3" rx="1" fill={c} opacity={0.4} />
          <rect x={half - 4} y={half + 7} width="8" height="3" rx="1" fill={c} opacity={0.4} />
          {/* Antenna */}
          <line x1={half} y1={half - 12} x2={half + 4} y2={half - 18} stroke={c} strokeWidth="1.5" opacity={0.7} />
          <circle cx={half + 4} cy={half - 18} r="1.5" fill={c} opacity={0.6} />
        </svg>
      );
    case "grab":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path
            d={`M${half - 6} ${half + 4} Q${half - 6} ${half - 8} ${half} ${half - 10} Q${half + 6} ${half - 8} ${half + 6} ${half + 4} L${half + 6} ${half + 8} Q${half + 6} ${half + 12} ${half} ${half + 12} Q${half - 6} ${half + 12} ${half - 6} ${half + 8} Z`}
            fill="none"
            stroke={c}
            strokeWidth="1.5"
            opacity={0.8}
          />
          {/* Push pin */}
          <circle cx={half} cy={half - 12} r="3" fill={c} opacity={0.7} />
          <line x1={half} y1={half - 9} x2={half} y2={half - 5} stroke={c} strokeWidth="1.5" opacity={0.6} />
        </svg>
      );
    case "crosshair":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle cx={half} cy={half} r={half - 6} fill="none" stroke={c} strokeWidth="1.5" opacity={0.6} />
          <circle cx={half} cy={half} r={half - 12} fill="none" stroke={c} strokeWidth="1" opacity={0.4} />
          <line x1={half} y1="2" x2={half} y2={s - 2} stroke={c} strokeWidth="1" opacity={0.5} />
          <line x1="2" y1={half} x2={s - 2} y2={half} stroke={c} strokeWidth="1" opacity={0.5} />
          <circle cx={half} cy={half} r="2" fill={c} opacity={0.8} />
        </svg>
      );
    case "pencil":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path
            d={`M${half + 8} ${half - 10} L${half + 2} ${half + 10} L${half - 2} ${half + 12} L${half} ${half + 8} L${half + 6} ${half - 10} Z`}
            fill="none"
            stroke={c}
            strokeWidth="1.5"
            opacity={0.8}
          />
          <line x1={half - 2} y1={half + 12} x2={half - 4} y2={half + 14} stroke={c} strokeWidth="1" opacity={0.6} />
        </svg>
      );
    case "quill":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <path
            d={`M${half + 10} ${half - 12} C${half + 6} ${half - 6} ${half + 2} ${half + 2} ${half - 4} ${half + 12} L${half - 2} ${half + 10} C${half + 4} ${half} ${half + 8} ${half - 8} ${half + 10} ${half - 12}`}
            fill="none"
            stroke={c}
            strokeWidth="1.5"
            opacity={0.8}
          />
          <circle cx={half - 4} cy={half + 14} r="1.5" fill={c} opacity={0.5} />
        </svg>
      );
    case "joystick":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <rect x={half - 10} y={half + 4} width="20" height="8" rx="2" fill="none" stroke={c} strokeWidth="1.5" opacity={0.7} />
          <line x1={half} y1={half + 4} x2={half} y2={half - 8} stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity={0.8} />
          <circle cx={half} cy={half - 10} r="4" fill="none" stroke={c} strokeWidth="1.5" opacity={0.8} />
          <circle cx={half} cy={half - 10} r="1.5" fill={c} opacity={0.6} />
        </svg>
      );
    case "telegraph":
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <rect x={half - 12} y={half + 2} width="24" height="6" rx="2" fill="none" stroke={c} strokeWidth="1.5" opacity={0.7} />
          <rect x={half - 6} y={half - 4} width="12" height="8" rx="2" fill="none" stroke={c} strokeWidth="1.5" opacity={0.8} />
          <circle cx={half} cy={half} r="2" fill={c} opacity={0.6} />
          <line x1={half - 12} y1={half + 8} x2={half - 14} y2={half + 12} stroke={c} strokeWidth="1" opacity={0.5} />
          <line x1={half + 12} y1={half + 8} x2={half + 14} y2={half + 12} stroke={c} strokeWidth="1" opacity={0.5} />
        </svg>
      );
    case "ring":
    default:
      return (
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          <circle
            cx={half}
            cy={half}
            r={half - 3}
            fill={isHovering ? `${c}15` : "none"}
            stroke={isHovering ? c : `${c}80`}
            strokeWidth={isHovering ? "2" : "1.5"}
          />
        </svg>
      );
  }
}

export default function CursorMetamorphosis() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [activeSection, setActiveSection] = useState<SectionId>("default");
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  const config = sectionConfigs[activeSection];

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // IntersectionObserver to detect active section
  useEffect(() => {
    if (isMobile) return;

    const observers: IntersectionObserver[] = [];
    const idMap = getSectionIdMap();

    // Find sections by various methods
    const findSections = () => {
      const found: { el: Element; id: SectionId }[] = [];

      // Try by id attribute first
      Object.entries(idMap).forEach(([domId, sectionId]) => {
        const el = document.getElementById(domId);
        if (el) found.push({ el, id: sectionId });
      });

      // For hero — look for the first <section> if not found by id
      if (!found.find((f) => f.id === "hero")) {
        const firstSection = document.querySelector("main > section:first-child, section:first-of-type");
        if (firstSection) found.push({ el: firstSection, id: "hero" });
      }

      return found;
    };

    // Delay setup to ensure DOM is ready after preloader
    const timeout = setTimeout(() => {
      const sections = findSections();

      sections.forEach(({ el, id }) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                setActiveSection(id);
              }
            });
          },
          { threshold: [0.3, 0.5] }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }, 3500);

    return () => {
      clearTimeout(timeout);
      observers.forEach((o) => o.disconnect());
    };
  }, [isMobile]);

  // Mouse tracking + smooth animation
  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      const dt = 1 - Math.pow(1 - 0.15, gsap.ticker.deltaRatio());
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * dt;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * dt;

      gsap.set(cursor, { x: cursorPos.current.x, y: cursorPos.current.y });
      gsap.set(dot, { x: mousePos.current.x, y: mousePos.current.y });

      // Update trail positions
      trailsRef.current.forEach((trail, i) => {
        if (!trail) return;
        const lag = 1 - Math.pow(1 - (0.08 - i * 0.02), gsap.ticker.deltaRatio());
        const tx = parseFloat(trail.dataset.tx || "0");
        const ty = parseFloat(trail.dataset.ty || "0");
        const nx = tx + (mousePos.current.x - tx) * lag;
        const ny = ty + (mousePos.current.y - ty) * lag;
        trail.dataset.tx = String(nx);
        trail.dataset.ty = String(ny);
        gsap.set(trail, { x: nx, y: ny });
      });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMove);

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Hover detection for interactive elements
    const handleEnter = () => {
      setIsHovering(true);
      gsap.to(cursor, { scale: 1.8, duration: 0.3, ease: "power2.out" });
    };
    const handleLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    };

    const addListeners = () => {
      const els = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select, .project-card, .service-card, .polaroid-card"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
      return els;
    };

    let interactives = addListeners();
    const observer = new MutationObserver(() => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
      interactives = addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      observer.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor with section-specific SVG shape */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ width: config.size, height: config.size, mixBlendMode: "difference" }}
      >
        <CursorSVG config={config} isHovering={isHovering} />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] transition-all duration-200 ${
          isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } ${isHidden ? "opacity-0" : ""}`}
        style={{
          width: 6,
          height: 6,
          background: config.color,
          borderRadius: "50%",
          boxShadow: `0 0 8px ${config.color}`,
        }}
      />

      {/* Trailing particles (only when config.trail is true) */}
      {config.trail &&
        [0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) trailsRef.current[i] = el;
            }}
            className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-opacity duration-300 ${
              isHidden || isHovering ? "opacity-0" : ""
            }`}
            style={{
              width: 4 - i,
              height: 4 - i,
              background: config.color,
              opacity: 0.4 - i * 0.12,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </>
  );
}
