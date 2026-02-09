"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { blogCategories } from "@/data/blogCategories";
import { useRetroSound } from "@/hooks/useRetroSound";
import VUMeter from "./VUMeter";
import CassetteTape from "./CassetteTape";

export default function BoomboxBlogHub() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { playSound } = useRetroSound();

  const featured = blogPosts.find((p) => p.featured);
  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const getCategoryColor = (slug: string) =>
    blogCategories.find((c) => c.slug === slug)?.tapeColor || "#2CACE2";

  return (
    <div className="pt-32 pb-20 min-h-screen" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Boombox Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Boombox frame */}
          <div className="max-w-3xl mx-auto bg-[#2a2520] border-2 border-amber-900/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Speaker grilles + VU Meters */}
            <div className="flex items-center justify-between gap-6 mb-6">
              {/* Left speaker */}
              <div className="hidden md:flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-2 border-amber-800/30 bg-[#1a1510] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-amber-800/20 bg-[#0f0d08]" />
                </div>
                <VUMeter bars={8} />
              </div>

              {/* Center — display */}
              <div className="flex-1 text-center">
                <div className="bg-[#0a0804] border border-amber-900/30 rounded-lg p-4 mb-3">
                  <div className="text-amber-400/40 text-[10px] font-mono tracking-[0.3em] uppercase mb-1">
                    BluEdge FM
                  </div>
                  <h1
                    className="text-3xl md:text-4xl font-bold text-amber-200"
                    style={{ textShadow: "0 0 20px rgba(255,200,100,0.2)" }}
                  >
                    Blog & Insights
                  </h1>
                  <div className="text-amber-400/30 text-xs font-mono mt-1">
                    {blogPosts.length} TRACKS LOADED
                  </div>
                </div>

                {/* VU Meters (mobile) */}
                <div className="flex justify-center gap-4 md:hidden">
                  <VUMeter bars={8} />
                  <VUMeter bars={8} />
                </div>
              </div>

              {/* Right speaker */}
              <div className="hidden md:flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-2 border-amber-800/30 bg-[#1a1510] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-amber-800/20 bg-[#0f0d08]" />
                </div>
                <VUMeter bars={8} />
              </div>
            </div>

            {/* Transport controls */}
            <div className="flex items-center justify-center gap-3">
              {[
                { icon: "⏮", label: "Previous track" },
                { icon: "⏪", label: "Rewind" },
                { icon: "▶", label: "Play" },
                { icon: "⏩", label: "Fast forward" },
                { icon: "⏭", label: "Next track" },
              ].map((btn, i) => (
                <motion.button
                  key={i}
                  aria-label={btn.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 rounded-full bg-[#1a1510] border border-amber-900/30 flex items-center justify-center text-amber-400/60 hover:text-amber-300 transition-colors text-sm"
                >
                  {btn.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* NOW PLAYING — Featured Article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-center mb-4">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs font-mono tracking-[0.3em] text-red-400 uppercase"
              >
                ● Now Playing
              </motion.span>
            </div>

            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="max-w-3xl mx-auto bg-[#1a1510] border border-amber-900/20 rounded-xl overflow-hidden flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div
                    className="text-[10px] font-mono tracking-wider uppercase mb-2"
                    style={{ color: getCategoryColor(featured.category) }}
                  >
                    {featured.category.replace("-", " ")}
                  </div>
                  <h2 className="text-xl font-bold text-amber-100 group-hover:text-accent transition-colors mb-2">
                    {featured.title}
                  </h2>
                  <p className="text-amber-100/50 text-sm line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-[10px] font-mono text-amber-400/30">
                    <span>{featured.author}</span>
                    <span>&middot;</span>
                    <span>{featured.readTime} min read</span>
                    <span>&middot;</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Category Filters as Cassette Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => {
              setActiveCategory("all");
              playSound("cassetteRewind");
            }}
            className={`px-4 py-2 text-xs font-mono tracking-wider border rounded transition-all ${
              activeCategory === "all"
                ? "border-accent bg-accent/10 text-accent"
                : "border-white/10 text-white/40 hover:border-accent/30"
            }`}
          >
            ALL TAPES
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                playSound("cassetteInsert");
              }}
              className={`px-4 py-2 text-xs font-mono tracking-wider border rounded transition-all flex items-center gap-2 ${
                activeCategory === cat.slug
                  ? "bg-opacity-10 text-opacity-100"
                  : "text-white/40 hover:text-white/60"
              }`}
              style={{
                borderColor:
                  activeCategory === cat.slug ? cat.tapeColor : "rgba(255,255,255,0.1)",
                color: activeCategory === cat.slug ? cat.tapeColor : undefined,
                backgroundColor:
                  activeCategory === cat.slug ? `${cat.tapeColor}15` : undefined,
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Cassette Tape Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <CassetteTape
                key={post.slug}
                post={post}
                tapeColor={getCategoryColor(post.category)}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-amber-400/30 font-mono text-sm">
            No tapes found in this category. Try another genre.
          </div>
        )}
      </div>
    </div>
  );
}
