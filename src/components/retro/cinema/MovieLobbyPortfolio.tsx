"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { caseStudies, caseStudyGenres } from "@/data/caseStudies";
import { useRetroSound } from "@/hooks/useRetroSound";

export default function MovieLobbyPortfolio() {
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const { playSound } = useRetroSound();

  const genres = useMemo(() => ["All", ...caseStudyGenres], []);

  const filtered = useMemo(
    () =>
      activeGenre === "All"
        ? caseStudies
        : caseStudies.filter((cs) => cs.genre === activeGenre),
    [activeGenre]
  );

  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div className="max-w-[1800px] mx-auto">
        {/* Cinema Marquee Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Marquee frame */}
          <div className="relative inline-block">
            {/* Chase lights top */}
            <div className="flex justify-center gap-3 mb-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{
                    backgroundColor: [
                      "rgba(44,172,226,0.2)",
                      "rgba(44,172,226,1)",
                      "rgba(44,172,226,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.08,
                  }}
                />
              ))}
            </div>

            <div className="border-2 border-sky-400/30 px-12 py-8 bg-[#06080f]/80">
              <motion.div
                className="text-sky-400/40 text-xs font-mono tracking-[0.4em] uppercase mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                BluEdge Pictures Presents
              </motion.div>
              <h1
                className="text-5xl md:text-7xl font-bold text-sky-100 font-serif"
                style={{ textShadow: "0 0 40px rgba(44,172,226,0.3)" }}
              >
                Our Work
              </h1>
              <motion.div
                className="text-sky-400/50 text-sm mt-3 font-mono tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {caseStudies.length} Productions &middot; Est. 2004
              </motion.div>
            </div>

            {/* Chase lights bottom */}
            <div className="flex justify-center gap-3 mt-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{
                    backgroundColor: [
                      "rgba(44,172,226,0.2)",
                      "rgba(44,172,226,1)",
                      "rgba(44,172,226,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: (14 - i) * 0.08,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Genre Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => {
                setActiveGenre(genre);
                playSound("filmProjector");
              }}
              className={`px-5 py-2 text-sm font-mono tracking-wider border transition-all duration-300 ${
                activeGenre === genre
                  ? "border-sky-400 bg-sky-400/10 text-sky-200"
                  : "border-sky-400/20 text-sky-400/40 hover:border-sky-400/50 hover:text-sky-400/70"
              }`}
            >
              {genre}
            </button>
          ))}
        </motion.div>

        {/* Movie Poster Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((cs, i) => (
              <motion.div
                key={cs.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/work/${cs.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative bg-[#0a0e1a] border border-sky-900/20 rounded-sm overflow-hidden shadow-xl shadow-black/30"
                  >
                    {/* Poster image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/30 to-transparent" />

                      {/* Genre badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-sky-400/20 border border-sky-400/30 text-sky-200 text-[10px] font-mono tracking-wider uppercase backdrop-blur-sm">
                        {cs.genre}
                      </div>

                      {/* Year */}
                      <div className="absolute top-3 left-3 text-sky-400/40 text-[10px] font-mono">
                        {cs.year}
                      </div>
                    </div>

                    {/* Poster info */}
                    <div className="p-5">
                      <h3
                        className="text-lg font-serif font-bold text-sky-100 group-hover:text-sky-300 transition-colors leading-tight"
                        style={{ textShadow: "0 0 10px rgba(44,172,226,0.1)" }}
                      >
                        {cs.title}
                      </h3>
                      <div className="text-sky-400/40 text-xs font-mono mt-1 tracking-wider">
                        {cs.category}
                      </div>

                      {/* Tags as genre badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cs.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-[9px] px-2 py-0.5 border border-sky-900/30 text-sky-400/50 font-mono uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* "Now showing" bar */}
                      <motion.div
                        className="mt-4 h-0.5 bg-gradient-to-r from-sky-400/0 via-sky-400/40 to-sky-400/0"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.8 }}
                      />
                      <div className="text-center mt-2 text-[10px] sm:text-[9px] font-mono text-sky-400/30 tracking-[0.3em] uppercase group-hover:text-sky-400/60 transition-colors">
                        View Premiere →
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Film reel divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-20 text-sky-400/20"
        >
          <div className="h-px flex-1 bg-sky-400/10" />
          <span className="text-2xl">🎬</span>
          <span className="font-mono text-xs tracking-[0.3em] uppercase">End of Reel</span>
          <span className="text-2xl">🎬</span>
          <div className="h-px flex-1 bg-sky-400/10" />
        </motion.div>
      </div>
    </div>
  );
}
