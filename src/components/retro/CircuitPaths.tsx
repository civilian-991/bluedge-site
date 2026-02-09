"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Node shapes at section boundaries
function CircuitNode({ cx, cy, type, idx }: { cx: number; cy: number; type: "circle" | "square" | "diamond"; idx: number }) {
  const common = {
    className: "circuit-node",
    fill: "none",
    stroke: "#2CACE2",
    strokeWidth: 1.5,
    opacity: 0.4,
    "data-node-idx": idx,
  };

  switch (type) {
    case "circle":
      return <circle {...common} cx={cx} cy={cy} r={6} />;
    case "square":
      return <rect {...common} x={cx - 5} y={cy - 5} width={10} height={10} />;
    case "diamond":
      return (
        <rect
          {...common}
          x={cx - 5}
          y={cy - 5}
          width={10}
          height={10}
          transform={`rotate(45 ${cx} ${cy})`}
        />
      );
  }
}

export default function CircuitPaths() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pageHeight, setPageHeight] = useState(5000);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      setPageHeight(document.documentElement.scrollHeight);
      setIsMobile(window.innerWidth < 768);
    };
    updateHeight();

    // Wait for full layout then recalculate
    const timeout = setTimeout(updateHeight, 2000);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ctx = gsap.context(() => {
      // Animate main paths via stroke-dashoffset
      const paths = svg.querySelectorAll<SVGPathElement>(".circuit-main-path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });

      // Animate branch paths
      const branches = svg.querySelectorAll<SVGPathElement>(".circuit-branch");
      branches.forEach((branch) => {
        const length = branch.getTotalLength();
        gsap.set(branch, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const sectionIdx = parseInt(branch.dataset.section || "0", 10);
        const sectionProgress = sectionIdx / 9;

        gsap.to(branch, {
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: document.body,
            start: `${Math.max(0, sectionProgress - 0.05) * 100}% top`,
            end: `${(sectionProgress + 0.05) * 100}% top`,
            scrub: true,
          },
        });
      });

      // Pulse nodes when their section scrolls into view
      const nodes = svg.querySelectorAll<SVGElement>(".circuit-node");
      nodes.forEach((node) => {
        const nodeIdx = parseInt(node.dataset.nodeIdx || "0", 10);
        const nodeProgress = nodeIdx / 9;

        ScrollTrigger.create({
          trigger: document.body,
          start: `${nodeProgress * 100}% top`,
          end: `${(nodeProgress + 0.1) * 100}% top`,
          onEnter: () => {
            gsap.to(node, {
              opacity: 1,
              strokeWidth: 3,
              duration: 0.3,
              yoyo: true,
              repeat: 2,
              ease: "power2.inOut",
            });
          },
          onLeaveBack: () => {
            gsap.to(node, { opacity: 0.4, strokeWidth: 1.5, duration: 0.3 });
          },
        });
      });

      // Data packet dots traveling along completed paths
      const packets = svg.querySelectorAll<SVGCircleElement>(".data-packet");
      packets.forEach((packet, i) => {
        const pathEl = paths[i % paths.length];
        if (!pathEl) return;

        const motionPath = {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
        };

        gsap.to(packet, {
          motionPath,
          duration: 8 + i * 2,
          repeat: -1,
          ease: "none",
          delay: i * 3,
        });
      });
    }, svg);

    return () => ctx.revert();
  }, [pageHeight, isMobile]);

  // Section boundary Y positions (approximate percentages of page height)
  const sections = [0.05, 0.15, 0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82, 0.92];
  const nodeTypes: ("circle" | "square" | "diamond")[] = [
    "circle", "diamond", "square", "circle", "diamond",
    "square", "circle", "diamond", "square", "circle",
  ];

  const margin = isMobile ? 20 : 50;
  const rightMargin = isMobile ? 20 : 50;

  if (isMobile) {
    // Mobile: single center line
    const centerX = 20;
    const pathD = `M ${centerX} 0 L ${centerX} ${pageHeight}`;

    return (
      <svg
        ref={svgRef}
        className="fixed top-0 left-0 w-full pointer-events-none z-[2]"
        style={{ height: "100vh" }}
        viewBox={`0 0 ${40} ${pageHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="circuitGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          className="circuit-main-path"
          d={pathD}
          fill="none"
          stroke="#2CACE2"
          strokeWidth={1}
          opacity={0.3}
          filter="url(#circuitGlow)"
        />
        {sections.map((pct, i) => (
          <CircuitNode
            key={i}
            cx={centerX}
            cy={pct * pageHeight}
            type={nodeTypes[i]}
            idx={i}
          />
        ))}
      </svg>
    );
  }

  // Desktop: left and right paths with branches
  const leftPath = sections.reduce((d, pct, i) => {
    const y = pct * pageHeight;
    if (i === 0) return `M ${margin} 0 L ${margin} ${y}`;
    const prevY = sections[i - 1] * pageHeight;
    // Add small jogs
    const midY = prevY + (y - prevY) * 0.5;
    return `${d} L ${margin} ${midY} L ${margin + 8} ${midY + 20} L ${margin} ${y}`;
  }, "");
  const leftFull = `${leftPath} L ${margin} ${pageHeight}`;

  const svgWidth = 100;
  const rX = svgWidth - rightMargin;
  const rightPath = sections.reduce((d, pct, i) => {
    const y = pct * pageHeight;
    if (i === 0) return `M ${rX} 0 L ${rX} ${y}`;
    const prevY = sections[i - 1] * pageHeight;
    const midY = prevY + (y - prevY) * 0.5;
    return `${d} L ${rX} ${midY} L ${rX - 8} ${midY + 20} L ${rX} ${y}`;
  }, "");
  const rightFull = `${rightPath} L ${rX} ${pageHeight}`;

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-[2]"
      style={{ height: "100vh" }}
      viewBox={`0 0 ${svgWidth} ${pageHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="circuitGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Left main path */}
      <path
        className="circuit-main-path"
        d={leftFull}
        fill="none"
        stroke="#2CACE2"
        strokeWidth={1}
        opacity={0.3}
        filter="url(#circuitGlow)"
      />

      {/* Right main path */}
      <path
        className="circuit-main-path"
        d={rightFull}
        fill="none"
        stroke="#2CACE2"
        strokeWidth={1}
        opacity={0.3}
        filter="url(#circuitGlow)"
      />

      {/* Horizontal branches at section boundaries */}
      {sections.map((pct, i) => {
        const y = pct * pageHeight;
        return (
          <g key={`branch-${i}`}>
            {/* Left branch going right */}
            <path
              className="circuit-branch"
              data-section={i}
              d={`M ${margin} ${y} L ${margin + 25} ${y}`}
              fill="none"
              stroke="#2CACE2"
              strokeWidth={0.8}
              opacity={0.25}
              filter="url(#circuitGlow)"
            />
            {/* Right branch going left */}
            <path
              className="circuit-branch"
              data-section={i}
              d={`M ${rX} ${y} L ${rX - 25} ${y}`}
              fill="none"
              stroke="#2CACE2"
              strokeWidth={0.8}
              opacity={0.25}
              filter="url(#circuitGlow)"
            />
            {/* Nodes */}
            <CircuitNode cx={margin} cy={y} type={nodeTypes[i]} idx={i} />
            <CircuitNode cx={rX} cy={y} type={nodeTypes[(i + 3) % nodeTypes.length]} idx={i} />
          </g>
        );
      })}

      {/* Data packet dots */}
      {[0, 1].map((i) => (
        <circle
          key={`packet-${i}`}
          className="data-packet"
          r={2}
          fill="#2CACE2"
          opacity={0.8}
          filter="url(#circuitGlow)"
        />
      ))}
    </svg>
  );
}
