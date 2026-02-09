"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Region data – each represents a company value
   ───────────────────────────────────────────── */
interface MapRegion {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  /** SVG path with pixel-grid-snapped coords (H/V lines only for blocky look) */
  path: string;
  fill: string;
  fillHover: string;
  /** Position for the label text (cx, cy) */
  labelPos: [number, number];
  /** Tiny pixel-art icon rects [x, y, w, h][] */
  iconRects: [number, number, number, number][];
  iconColor: string;
}

const REGIONS: MapRegion[] = [
  {
    id: "kingdom",
    name: "Kingdom of Creativity",
    subtitle: "Innovation & Creative Thinking",
    description:
      "Where bold ideas are forged and imagination reigns supreme. Every great project begins in these halls.",
    // Top-left castle region
    path: "M64,64 H384 V96 H416 V160 H400 V224 H384 V288 H320 V320 H256 V288 H192 V304 H128 V256 H80 V192 H64 Z",
    fill: "rgba(139,105,20,0.25)",
    fillHover: "rgba(218,165,32,0.45)",
    labelPos: [224, 176],
    // Castle turrets
    iconRects: [
      [176, 96, 8, 24],
      [192, 88, 8, 32],
      [208, 96, 8, 24],
      [240, 96, 8, 24],
      [256, 88, 8, 32],
      [272, 96, 8, 24],
      [192, 120, 96, 8],
      [200, 128, 80, 16],
      [216, 144, 48, 8],
    ],
    iconColor: "rgba(218,165,32,0.5)",
  },
  {
    id: "forest",
    name: "Forest of Strategy",
    subtitle: "Strategic Planning & Research",
    description:
      "Dense with knowledge and foresight. Every path is mapped, every move is calculated.",
    // Left-center forest region
    path: "M64,192 H80 V256 H128 V304 H192 V288 H256 V320 H320 V288 H384 V320 H336 V352 H288 V384 H224 V400 H160 V416 H96 V384 H48 V320 H32 V256 H48 V224 H64 Z",
    fill: "rgba(26,92,42,0.3)",
    fillHover: "rgba(34,139,34,0.45)",
    labelPos: [192, 344],
    // Pixel trees
    iconRects: [
      // Tree 1
      [104, 304, 8, 8],
      [96, 312, 24, 8],
      [88, 320, 40, 8],
      [104, 328, 8, 16],
      // Tree 2
      [168, 320, 8, 8],
      [160, 328, 24, 8],
      [152, 336, 40, 8],
      [168, 344, 8, 16],
      // Tree 3
      [248, 296, 8, 8],
      [240, 304, 24, 8],
      [232, 312, 40, 8],
      [248, 320, 8, 16],
    ],
    iconColor: "rgba(34,139,34,0.5)",
  },
  {
    id: "mountains",
    name: "Mountains of Excellence",
    subtitle: "Quality & Craftsmanship",
    description:
      "The highest peaks demand the finest work. Only precision and mastery reach the summit.",
    // Top-right mountain range
    path: "M384,64 H416 V96 H448 V64 H544 V48 H608 V64 H672 V48 H736 V64 H800 V96 H832 V128 H864 V192 H848 V256 H816 V288 H768 V304 H704 V288 H640 V256 H576 V272 H512 V240 H464 V208 H416 V160 H400 V224 H384 V288 H384 V160 H400 V96 H384 Z",
    fill: "rgba(90,74,58,0.3)",
    fillHover: "rgba(139,119,101,0.45)",
    labelPos: [624, 160],
    // Mountain peaks
    iconRects: [
      // Peak 1
      [544, 80, 8, 8],
      [536, 88, 24, 8],
      [528, 96, 40, 8],
      [520, 104, 56, 8],
      // Peak 2
      [672, 72, 8, 8],
      [664, 80, 24, 8],
      [656, 88, 40, 8],
      [648, 96, 56, 8],
      // Snow caps
      [544, 80, 8, 8],
      [672, 72, 8, 8],
    ],
    iconColor: "rgba(160,140,120,0.5)",
  },
  {
    id: "sea",
    name: "Sea of Collaboration",
    subtitle: "Teamwork & Partnership",
    description:
      "Vast and connected, the sea binds all regions together. No journey succeeds alone.",
    // Central-bottom sea/bay area
    path: "M224,400 H160 V416 H96 V384 H48 V320 H32 V384 H16 V448 H32 V496 H64 V528 H128 V544 H224 V560 H384 V576 H576 V560 H704 V544 H784 V512 H832 V464 H864 V400 H880 V336 H896 V304 H880 V336 H848 V368 H816 V400 H768 V416 H704 V432 H640 V416 H576 V400 H512 V384 H448 V400 H384 V416 H320 V400 H288 V384 H224 Z",
    fill: "rgba(26,58,92,0.35)",
    fillHover: "rgba(44,172,226,0.35)",
    labelPos: [448, 496],
    // Wave patterns
    iconRects: [
      [320, 480, 24, 4],
      [360, 476, 16, 4],
      [400, 480, 24, 4],
      [448, 476, 16, 4],
      [488, 480, 24, 4],
      [536, 476, 16, 4],
      [320, 504, 16, 4],
      [360, 508, 24, 4],
      [416, 504, 16, 4],
      [464, 508, 24, 4],
      [520, 504, 16, 4],
    ],
    iconColor: "rgba(44,172,226,0.4)",
  },
  {
    id: "city",
    name: "City of Impact",
    subtitle: "Results & Measurable Outcomes",
    description:
      "A thriving metropolis built on proven results. Every structure stands as evidence of success.",
    // Right-center city area
    path: "M640,256 H576 V272 H512 V240 H464 V272 H448 V320 H464 V352 H512 V384 H448 V400 H576 V416 H640 V432 H704 V416 H768 V400 H816 V368 H848 V336 H880 V304 H896 V272 H880 V256 H848 V240 H816 V288 H768 V304 H704 V288 H640 Z",
    fill: "rgba(122,58,26,0.3)",
    fillHover: "rgba(205,92,42,0.4)",
    labelPos: [672, 344],
    // Building silhouettes
    iconRects: [
      // Building 1
      [624, 288, 16, 32],
      [628, 280, 8, 8],
      // Building 2
      [656, 296, 16, 24],
      // Building 3
      [688, 280, 12, 40],
      [692, 272, 4, 8],
      // Building 4
      [720, 292, 16, 28],
      // Windows (light dots)
      [628, 296, 4, 4],
      [636, 296, 4, 4],
      [628, 304, 4, 4],
      [636, 304, 4, 4],
      [660, 304, 4, 4],
      [668, 304, 4, 4],
      [692, 288, 4, 4],
      [692, 296, 4, 4],
    ],
    iconColor: "rgba(205,133,63,0.5)",
  },
  {
    id: "desert",
    name: "Desert of Resilience",
    subtitle: "Adaptability & Perseverance",
    description:
      "Harsh and unforgiving, only the persistent survive. Every challenge is met with unwavering resolve.",
    // Bottom-right desert
    path: "M704,432 H640 V416 H576 V400 H512 V384 H448 V400 H384 V416 H320 V400 H288 V416 H320 V432 H384 V464 H448 V480 H512 V496 H576 V528 H640 V544 H704 V560 H784 V528 H832 V480 H864 V432 H848 V384 H848 V368 H816 V400 H768 V416 H704 Z",
    fill: "rgba(138,122,58,0.25)",
    fillHover: "rgba(210,180,80,0.4)",
    labelPos: [624, 464],
    // Cactus & dunes
    iconRects: [
      // Cactus 1
      [544, 436, 4, 20],
      [536, 440, 4, 8],
      [552, 440, 4, 8],
      [536, 440, 8, 4],
      [548, 440, 8, 4],
      // Cactus 2
      [680, 448, 4, 16],
      [672, 452, 4, 8],
      [688, 452, 4, 8],
      [672, 452, 8, 4],
      [684, 452, 8, 4],
      // Sand dune lines
      [480, 472, 32, 4],
      [592, 476, 24, 4],
      [720, 480, 32, 4],
    ],
    iconColor: "rgba(210,180,80,0.4)",
  },
];

/* ─────────────────────────────────────────────
   Decorative elements – compass, border, grid
   ───────────────────────────────────────────── */

/** Pixel-art compass rose at bottom-left */
function Compass() {
  return (
    <g opacity={0.25}>
      {/* Center */}
      <rect x={72} y={536} width={8} height={8} fill="#2CACE2" />
      {/* N */}
      <rect x={72} y={520} width={8} height={16} fill="#2CACE2" />
      <rect x={68} y={524} width={4} height={8} fill="#2CACE2" />
      <rect x={80} y={524} width={4} height={8} fill="#2CACE2" />
      {/* S */}
      <rect x={72} y={544} width={8} height={16} fill="#2CACE2" />
      {/* E */}
      <rect x={80} y={536} width={16} height={8} fill="#2CACE2" />
      {/* W */}
      <rect x={56} y={536} width={16} height={8} fill="#2CACE2" />
      {/* N label */}
      <text
        x={76}
        y={516}
        textAnchor="middle"
        fill="#2CACE2"
        fontSize={9}
        fontFamily="monospace"
      >
        N
      </text>
    </g>
  );
}

/** Dashed pixel border around the map */
function MapBorder() {
  const rects: { x: number; y: number }[] = [];
  // Top and bottom edges
  for (let x = 0; x <= 944; x += 16) {
    rects.push({ x, y: 0 });
    rects.push({ x, y: 584 });
  }
  // Left and right edges
  for (let y = 16; y < 584; y += 16) {
    rects.push({ x: 0, y });
    rects.push({ x: 944, y });
  }
  return (
    <g opacity={0.08}>
      {rects.map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={12}
          height={12}
          rx={1}
          fill="#2CACE2"
        />
      ))}
    </g>
  );
}

/** Subtle grid dots to reinforce pixel-art grid */
function GridDots() {
  const dots: { x: number; y: number }[] = [];
  for (let x = 32; x <= 928; x += 32) {
    for (let y = 32; y <= 568; y += 32) {
      dots.push({ x, y });
    }
  }
  return (
    <g opacity={0.04}>
      {dots.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width={2} height={2} fill="#fff" />
      ))}
    </g>
  );
}

/* ─────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────── */
export default function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const hoveredRegion = REGIONS.find((r) => r.id === hovered) ?? null;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Section title */}
      <h2 className="text-xs font-mono tracking-wider text-accent/60 uppercase mb-6 text-center">
        ─── The Realm of BluEdge ───
      </h2>

      {/* Map container */}
      <div className="relative w-full max-w-5xl mx-auto border-2 border-accent/10 rounded-lg bg-[#060612]/80 overflow-hidden">
        {/* Parchment-style inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(44,172,226,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Title cartouche */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-[#060612]/90 border border-accent/15 rounded">
          <span className="text-[10px] font-mono tracking-[0.3em] text-accent/50 uppercase">
            World Map
          </span>
        </div>

        {/* SVG Map */}
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHovered(null)}
          role="img"
          aria-label="BluEdge World Map showing six company value regions"
        >
          {/* Background */}
          <rect width={960} height={600} fill="#060612" />

          {/* Grid dots */}
          <GridDots />

          {/* Border decoration */}
          <MapBorder />

          {/* Regions */}
          {REGIONS.map((region) => {
            const isHovered = hovered === region.id;
            return (
              <g
                key={region.id}
                onPointerEnter={() => setHovered(region.id)}
                onPointerLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Region shape */}
                <path
                  d={region.path}
                  fill={isHovered ? region.fillHover : region.fill}
                  stroke={
                    isHovered
                      ? "rgba(44,172,226,0.5)"
                      : "rgba(255,255,255,0.08)"
                  }
                  strokeWidth={isHovered ? 2 : 1}
                  style={{
                    transition:
                      "fill 0.3s ease, stroke 0.3s ease, stroke-width 0.2s ease",
                    filter: isHovered
                      ? "drop-shadow(0 0 12px rgba(44,172,226,0.2))"
                      : "none",
                  }}
                />

                {/* Pixel-art icon decorations */}
                <g
                  opacity={isHovered ? 0.9 : 0.5}
                  style={{ transition: "opacity 0.3s ease" }}
                >
                  {region.iconRects.map((r, i) => (
                    <rect
                      key={i}
                      x={r[0]}
                      y={r[1]}
                      width={r[2]}
                      height={r[3]}
                      fill={region.iconColor}
                    />
                  ))}
                </g>

                {/* Region label */}
                <text
                  x={region.labelPos[0]}
                  y={region.labelPos[1] - 8}
                  textAnchor="middle"
                  fill={isHovered ? "#fff" : "rgba(255,255,255,0.35)"}
                  fontSize={isHovered ? 11 : 10}
                  fontFamily="monospace"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                  style={{ transition: "fill 0.3s ease, font-size 0.2s ease" }}
                >
                  {region.name}
                </text>
                <text
                  x={region.labelPos[0]}
                  y={region.labelPos[1] + 8}
                  textAnchor="middle"
                  fill={isHovered ? "rgba(44,172,226,0.8)" : "rgba(44,172,226,0.3)"}
                  fontSize={7}
                  fontFamily="monospace"
                  letterSpacing="0.1em"
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {region.subtitle.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Compass rose */}
          <Compass />

          {/* Coordinate markers along edges */}
          {[128, 256, 384, 512, 640, 768].map((x) => (
            <text
              key={`cx-${x}`}
              x={x}
              y={592}
              textAnchor="middle"
              fill="rgba(44,172,226,0.12)"
              fontSize={7}
              fontFamily="monospace"
            >
              {x}
            </text>
          ))}
          {[128, 256, 384, 512].map((y) => (
            <text
              key={`cy-${y}`}
              x={8}
              y={y}
              fill="rgba(44,172,226,0.12)"
              fontSize={7}
              fontFamily="monospace"
            >
              {y}
            </text>
          ))}
        </svg>

        {/* Hover tooltip overlay */}
        <AnimatePresence>
          {hoveredRegion && (
            <motion.div
              key={hoveredRegion.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 pointer-events-none"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y - 8,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="bg-[#0a0a20]/95 border border-accent/25 rounded-lg px-4 py-3 backdrop-blur-sm shadow-[0_0_20px_rgba(44,172,226,0.1)] max-w-[260px]">
                <div className="text-accent text-xs font-mono font-bold tracking-wider uppercase mb-1">
                  {hoveredRegion.name}
                </div>
                <div className="text-white/40 text-[9px] font-mono tracking-wider uppercase mb-2">
                  {hoveredRegion.subtitle}
                </div>
                <p className="text-white/60 text-[10px] leading-relaxed">
                  {hoveredRegion.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="px-4 py-3 border-t border-accent/10 flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              className={`flex items-center gap-1.5 text-[9px] font-mono tracking-wider transition-colors ${
                hovered === region.id
                  ? "text-accent"
                  : "text-white/30 hover:text-white/50"
              }`}
              onPointerEnter={() => setHovered(region.id)}
              onPointerLeave={() => setHovered(null)}
            >
              <span
                className="block w-2 h-2 rounded-sm"
                style={{
                  backgroundColor:
                    hovered === region.id ? region.fillHover : region.fill,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />
              {region.name}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
