"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Smooth cursor following with GSAP
    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Animation loop for smooth following
    gsap.ticker.add(() => {
      // Smooth interpolation
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      cursorX += (mouseX - cursorX) * dt;
      cursorY += (mouseY - cursorY) * dt;

      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(cursorDot, { x: mouseX, y: mouseY });
    });

    // Hover handlers for interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);

      // Check for custom cursor text
      const text = target.dataset.cursorText;
      if (text) {
        setCursorText(text);
        gsap.to(cursor, {
          scale: 3,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => setIsHidden(true);
    const handleMouseEnterWindow = () => setIsHidden(false);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select, .project-card, .service-card"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
      return interactiveElements;
    };

    // Initial setup
    let interactiveElements = addHoverListeners();

    // Re-add listeners when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      interactiveElements = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "50px",
          height: "50px",
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-300 ${
            isHovering
              ? "border-[#00AEEF] bg-[#00AEEF]/10"
              : "border-white/30 bg-transparent"
          }`}
          style={{
            mixBlendMode: "difference",
          }}
        />

        {/* Gradient border on hover */}
        {isHovering && (
          <div
            className="absolute inset-[-1px] rounded-full animate-spin"
            style={{
              animationDuration: "3s",
              background:
                "conic-gradient(from 0deg, #00AEEF, #0077B6, #00AEEF)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        )}

        {/* Cursor text */}
        {cursorText && (
          <span
            ref={cursorTextRef}
            className="text-[8px] font-bold uppercase tracking-widest text-white text-center px-1"
            style={{ mixBlendMode: "difference" }}
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] transition-all duration-200 ${
          isHovering ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } ${isHidden ? "opacity-0" : ""}`}
        style={{
          width: "8px",
          height: "8px",
          background: "linear-gradient(135deg, #00AEEF, #0077B6)",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(0, 174, 239, 0.5)",
        }}
      />

      {/* Trail effect (multiple fading dots) */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-opacity duration-300 ${
            isHidden ? "opacity-0" : ""
          }`}
          style={{
            width: `${4 - i}px`,
            height: `${4 - i}px`,
            background: `rgba(0, 174, 239, ${0.3 - i * 0.1})`,
            transform: "translate(-50%, -50%)",
            opacity: isHovering ? 0 : 0.5 - i * 0.15,
          }}
        />
      ))}
    </>
  );
}
