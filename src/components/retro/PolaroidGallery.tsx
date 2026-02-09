"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data";
import { caseStudies } from "@/data/caseStudies";
import { Layers, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stickyNotes = [
  { text: "Client loved this!", color: "#38BDF8", rotation: -8 },
  { text: "Award winner ★", color: "#0EA5E9", rotation: 5 },
  { text: "Featured work!", color: "#7DD3FC", rotation: -3 },
];

function PushPin({ color = "#0EA5E9" }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 drop-shadow-lg">
      <circle cx="10" cy="8" r="6" fill={color} />
      <circle cx="10" cy="8" r="3" fill="white" opacity="0.3" />
      <line x1="10" y1="14" x2="10" y2="20" stroke="#666" strokeWidth="1.5" />
    </svg>
  );
}

function PolaroidCard({
  project,
  index,
  constraintsRef,
}: {
  project: (typeof projects)[0];
  index: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [flipped, setFlipped] = useState(false);
  const rotation = (Math.random() - 0.5) * 10; // -5° to 5°

  return (
    <motion.div
      className="polaroid-card relative cursor-grab active:cursor-grabbing"
      style={{
        perspective: "1000px",
        width: "280px",
        height: "360px",
      }}
      initial={{ opacity: 0, y: 40, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      whileHover={{ y: -8, scale: 1.03, zIndex: 20 }}
      whileTap={{ scale: 1.02, zIndex: 30 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            backfaceVisibility: "hidden",
            background: "#f5f0e5",
            padding: "12px 12px 50px 12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
            transform: `rotate(${rotation}deg)`,
          }}
          onClick={() => setFlipped(true)}
        >
          <PushPin color={project.color} />

          {/* Photo */}
          <div className="relative w-full" style={{ height: "calc(100% - 40px)" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="280px"
            />
            {/* Slight faded edges for photo look */}
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.15)]" />
          </div>

          {/* Caption in handwritten style */}
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <p
              className="text-sm text-gray-700 truncate"
              style={{
                fontFamily: "'Bangers', cursive",
                letterSpacing: "0.05em",
              }}
            >
              {project.title}
            </p>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-sm p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: `rotateY(180deg) rotate(${rotation}deg)`,
            background: "#f5f0e5",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
          onClick={() => setFlipped(false)}
        >
          <PushPin color={project.color} />

          <div
            className="w-10 h-1 rounded-full mb-4"
            style={{ background: project.color }}
          />

          <h4
            className="text-lg font-bold text-gray-800 mb-2"
            style={{ fontFamily: "'Bangers', cursive", letterSpacing: "0.05em" }}
          >
            {project.title}
          </h4>

          <p
            className="text-xs text-gray-500 uppercase tracking-wider mb-3"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            {project.category}
          </p>

          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 rounded-full border text-gray-500"
                style={{ borderColor: `${project.color}60` }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p
              className="text-[10px] text-gray-400"
              style={{ fontFamily: "'Special Elite', monospace" }}
            >
              {project.year}
            </p>
            {(() => {
              const cs = caseStudies.find(
                (c) => c.title.toLowerCase() === project.title.toLowerCase()
              );
              return cs ? (
                <Link
                  href={`/work/${cs.slug}`}
                  className="text-[9px] text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  View Case Study <ArrowUpRight className="w-2.5 h-2.5" />
                </Link>
              ) : null;
            })()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PolaroidGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-ambient="section-polaroid"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Cork board background */}
      <div className="absolute inset-0 cork-board opacity-[0.07]" />
      <div className="absolute inset-0 bg-[#050508]/95" />

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Layers className="w-6 h-6 text-accent" />
            </motion.div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-accent uppercase tracking-[0.3em] font-medium">
                Portfolio
              </span>
              <motion.span
                className="h-px bg-gradient-to-r from-accent to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
          </motion.div>

          <div
            ref={titleRef}
            className="section-title overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-8"
            style={{ perspective: "1000px" }}
          >
            {["Selected", "Works"].map((word, i) => (
              <span
                key={i}
                className="word inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word === "Works" ? (
                  <span className="text-gradient">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="body-text max-w-2xl text-lg md:text-xl"
          >
            Drag, rearrange, and flip our work — each piece tells a story.{" "}
            <span className="text-accent">Crafted with care</span>.
          </motion.p>
        </div>

        {/* Polaroid board */}
        <div
          ref={boardRef}
          className="relative min-h-[500px] rounded-2xl p-8 md:p-12"
          style={{
            background: "rgba(44, 172, 226, 0.03)",
            border: "2px solid rgba(44, 172, 226, 0.08)",
          }}
        >
          {/* Grid layout for polaroids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {projects.map((project, index) => (
              <PolaroidCard
                key={project.title}
                project={project}
                index={index}
                constraintsRef={boardRef}
              />
            ))}
          </div>

          {/* Scattered sticky notes */}
          {stickyNotes.map((note, i) => (
            <motion.div
              key={i}
              className="hidden lg:block absolute text-xs font-bold p-3 rounded-sm shadow-md"
              style={{
                background: note.color,
                color: "#333",
                fontFamily: "'Bangers', cursive",
                transform: `rotate(${note.rotation}deg)`,
                right: `${5 + i * 12}%`,
                top: `${10 + i * 30}%`,
                zIndex: 5,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.8, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.2, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 0 }}
            >
              {note.text}
            </motion.div>
          ))}
        </div>

        {/* End CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            className="btn-primary btn-shine inline-flex items-center gap-4 text-lg px-10 py-5"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(44,172,226,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
