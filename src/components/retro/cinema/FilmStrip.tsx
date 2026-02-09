"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FilmStripProps {
  images: string[];
}

export default function FilmStrip({ images }: FilmStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (images.length === 0) return null;

  return (
    <div className="relative py-8">
      {/* Sprocket holes top */}
      <div className="flex justify-start gap-[72px] ml-8 mb-2">
        {Array.from({ length: Math.max(images.length * 3, 12) }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="w-3 h-3 rounded-full bg-[#1a1208] border border-amber-900/30 shrink-0"
          />
        ))}
      </div>

      {/* Film strip container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
          className="flex gap-1 px-8 py-4 bg-[#111] border-y-2 border-amber-900/40"
          style={{ width: "max-content" }}
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="relative shrink-0 w-[200px] h-[140px] sm:w-[280px] sm:h-[200px] rounded-sm overflow-hidden border border-amber-900/20"
              whileHover={!isDragging ? { scale: 1.05, y: -5 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={src}
                alt={`Frame ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 200px, 280px"
                draggable={false}
              />
              {/* Film frame overlay */}
              <div className="absolute inset-0 border-2 border-black/20 pointer-events-none" />
              <div className="absolute bottom-1 right-2 text-[8px] font-mono text-amber-400/40">
                FR:{String(i + 1).padStart(3, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Sprocket holes bottom */}
      <div className="flex justify-start gap-[72px] ml-8 mt-2">
        {Array.from({ length: Math.max(images.length * 3, 12) }).map((_, i) => (
          <div
            key={`bot-${i}`}
            className="w-3 h-3 rounded-full bg-[#1a1208] border border-amber-900/30 shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
