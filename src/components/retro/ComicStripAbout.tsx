"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { comicPanels } from "@/data";
import HalftoneOverlay from "./shared/HalftoneOverlay";

gsap.registerPlugin(ScrollTrigger);

function ComicPanelCard({
  panel,
  index,
}: {
  panel: (typeof comicPanels)[0];
  index: number;
}) {
  const isAction = panel.type === "action";
  const isShout = panel.type === "shout";

  return (
    <div
      className="relative flex-shrink-0 w-[320px] md:w-[400px] h-[350px] md:h-[420px] comic-panel"
      style={{
        background: panel.bgColor || "#1a1a2e",
        borderWidth: isAction ? "5px" : "4px",
      }}
    >
      {/* Halftone overlay */}
      <HalftoneOverlay opacity={0.08} dotSize={1.2} spacing={5} className="text-white" />

      {/* Panel number */}
      <div
        className="absolute top-2 left-3 text-white/20 font-bold text-xs"
        style={{ fontFamily: "'Bangers', cursive" }}
      >
        {index + 1}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-6 md:p-8 text-center">
        {/* Speech bubble for dialogue */}
        {(panel.type === "dialogue" || panel.type === "shout") && (
          <div className="mb-4">
            <div
              className={`speech-bubble ${isShout ? "border-4" : ""}`}
              style={{
                maxWidth: "280px",
                transform: isShout ? "rotate(-1deg)" : "none",
              }}
            >
              <p
                className="text-base md:text-lg leading-snug"
                style={{
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "0.5px",
                  fontSize: isShout ? "1.2rem" : "1rem",
                }}
              >
                {panel.text}
              </p>
            </div>
            {panel.speaker && (
              <div
                className="mt-6 text-white/60 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                — {panel.speaker}
              </div>
            )}
          </div>
        )}

        {/* Narration boxes */}
        {panel.type === "narration" && (
          <div
            className="bg-[#F5D547] text-black px-5 py-4 max-w-[280px]"
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              lineHeight: 1.4,
              clipPath: "polygon(2% 0%, 100% 1%, 98% 100%, 0% 99%)",
            }}
          >
            {panel.text}
          </div>
        )}

        {/* Action panels */}
        {panel.type === "action" && (
          <div className="relative">
            {/* Starburst behind */}
            <div className="absolute inset-0 starburst opacity-20 scale-150" />
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p
                className="text-xl md:text-2xl font-bold text-white text-center leading-tight relative z-10"
                style={{
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "1px",
                  textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                }}
              >
                {panel.text}
              </p>
            </motion.div>
          </div>
        )}

        {/* Thought bubble */}
        {panel.type === "thought" && (
          <div className="relative">
            <div className="bg-white/90 rounded-[50%] px-6 py-5 max-w-[260px] border-2 border-black">
              <p
                className="text-black text-center text-sm"
                style={{ fontFamily: "'Bangers', cursive" }}
              >
                {panel.text}
              </p>
            </div>
            {/* Thought bubbles trailing */}
            <div className="absolute -bottom-4 left-8 w-4 h-4 bg-white rounded-full border-2 border-black" />
            <div className="absolute -bottom-8 left-4 w-2.5 h-2.5 bg-white rounded-full border-2 border-black" />
          </div>
        )}
      </div>

      {/* Panel border glow on last panel */}
      {index === comicPanels.length - 1 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 20px rgba(44,172,226,0.2)",
              "inset 0 0 40px rgba(44,172,226,0.4)",
              "inset 0 0 20px rgba(44,172,226,0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}

export default function ComicStripAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth - containerRef.current!.clientWidth;

      gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="mb-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase mb-4 block"
          style={{
            fontFamily: "'Bangers', cursive",
            color: "#F5D547",
            letterSpacing: "3px",
            fontSize: "0.9rem",
          }}
        >
          The Origin Story
        </span>
        <h3
          className="text-3xl md:text-5xl font-bold"
          style={{
            fontFamily: "'Bangers', cursive",
            color: "white",
            textShadow: "3px 3px 0 #2CACE2, -1px -1px 0 #000",
            letterSpacing: "2px",
          }}
        >
          HOW BLUEDGE WAS BORN
        </h3>
      </motion.div>

      {/* Horizontal scroll comic strip */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 pl-[5%]"
          style={{ width: "fit-content" }}
        >
          {comicPanels.map((panel, i) => (
            <ComicPanelCard key={panel.id} panel={panel} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
