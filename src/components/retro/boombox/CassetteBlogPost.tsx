"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { blogPosts } from "@/data/blog";
import { blogCategories } from "@/data/blogCategories";
import { useRetroSound } from "@/hooks/useRetroSound";
import VUMeter from "./VUMeter";

interface CassetteBlogPostProps {
  post: BlogPost;
}

export default function CassetteBlogPost({ post }: CassetteBlogPostProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inserted, setInserted] = useState(false);
  const { playSound } = useRetroSound();
  const tapeColor = blogCategories.find((c) => c.slug === post.category)?.tapeColor || "#2CACE2";

  // Cassette insert animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setInserted(true);
      playSound("cassetteInsert");
    }, 300);
    return () => clearTimeout(timer);
  }, [playSound]);

  // Track scroll progress for tape reel rotation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSideB = scrollProgress > 0.5;

  // Related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // Adjacent posts
  const currentIdx = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;

  // Split content at midpoint for Side A / Side B
  const words = post.content.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const sideA = words.slice(0, midpoint).join(" ");
  const sideB = words.slice(midpoint).join(" ");

  return (
    <div className="pt-32 pb-0 min-h-screen" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div className="max-w-3xl mx-auto">
        {/* Tape deck player at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inserted ? 1 : 0.3, y: inserted ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0f1420] border border-sky-900/30 rounded-xl p-4 mb-10 sticky top-20 z-[80]"
        >
          <div className="flex items-center gap-4">
            {/* Left reel */}
            <motion.div
              animate={{ rotate: scrollProgress * 720 }}
              className="w-8 h-8 rounded-full border-2 border-sky-800/30 flex items-center justify-center shrink-0"
            >
              <div className="w-3 h-3 rounded-full bg-sky-900/40" />
            </motion.div>

            {/* Info + progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-sky-400/60 truncate">
                  {post.title}
                </div>
                <div className="text-[9px] font-mono text-sky-400/30 shrink-0">
                  {isSideB ? "SIDE B" : "SIDE A"}
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1 bg-sky-900/20 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${scrollProgress * 100}%`,
                    backgroundColor: tapeColor,
                  }}
                />
              </div>
            </div>

            {/* Right reel */}
            <motion.div
              animate={{ rotate: scrollProgress * -720 }}
              className="w-8 h-8 rounded-full border-2 border-sky-800/30 flex items-center justify-center shrink-0"
            >
              <div className="w-3 h-3 rounded-full bg-sky-900/40" />
            </motion.div>

            {/* VU meter */}
            <div className="hidden sm:block shrink-0">
              <VUMeter bars={6} active={true} />
            </div>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-video rounded-lg overflow-hidden border border-sky-900/20 mb-8"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080f]/60 to-transparent" />
        </motion.div>

        {/* Title & meta */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <div
            className="text-xs font-mono tracking-wider uppercase mb-3"
            style={{ color: tapeColor }}
          >
            {post.category.replace("-", " ")}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/40">
            <span>By {post.author}</span>
            <span className="text-white/20">&middot;</span>
            <span>{post.date}</span>
            <span className="text-white/20">&middot;</span>
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 border border-white/10 text-white/30 font-mono rounded uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Article Content — Side A */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="prose prose-invert prose-sm max-w-none mb-8"
        >
          <div className="text-sky-400/30 text-[10px] font-mono tracking-[0.3em] uppercase mb-4">
            ── SIDE A ──
          </div>
          <p className="text-white/70 text-base leading-relaxed whitespace-pre-line">{sideA}</p>
        </motion.article>

        {/* Flip to Side B marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 py-8 my-8"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent" style={{ borderColor: tapeColor }} />
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="px-4 py-2 border rounded-full text-xs font-mono tracking-wider"
            style={{ borderColor: `${tapeColor}40`, color: `${tapeColor}80` }}
          >
            📼 FLIP TO SIDE B
          </motion.div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent" style={{ borderColor: tapeColor }} />
        </motion.div>

        {/* Article Content — Side B */}
        <motion.article
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-invert prose-sm max-w-none mb-12"
        >
          <div className="text-sky-400/30 text-[10px] font-mono tracking-[0.3em] uppercase mb-4">
            ── SIDE B ──
          </div>
          <p className="text-white/70 text-base leading-relaxed whitespace-pre-line">{sideB}</p>
        </motion.article>

        {/* Controls: REWIND / EJECT / NEXT */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="px-5 py-2 border border-white/10 text-white/40 hover:border-accent/30 hover:text-accent font-mono text-xs tracking-wider rounded transition-colors"
            >
              ⏪ REWIND
            </Link>
          )}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href });
              }
            }}
            className="px-5 py-2 border border-white/10 text-white/40 hover:border-accent/30 hover:text-accent font-mono text-xs tracking-wider rounded transition-colors"
          >
            ⏏ EJECT
          </button>
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="px-5 py-2 border border-white/10 text-white/40 hover:border-accent/30 hover:text-accent font-mono text-xs tracking-wider rounded transition-colors"
            >
              NEXT ⏩
            </Link>
          )}
        </div>

        {/* Related Posts as Mini Tapes */}
        {relatedPosts.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xs font-mono tracking-wider text-white/30 uppercase text-center mb-6">
              More in this genre
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rp, i) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group p-4 bg-[#0a0e1a] border border-sky-900/20 rounded-lg hover:border-accent/30 transition-colors"
                >
                  <div
                    className="text-[9px] font-mono tracking-wider uppercase mb-1"
                    style={{ color: `${tapeColor}80` }}
                  >
                    {rp.category.replace("-", " ")}
                  </div>
                  <h4 className="text-sm text-white/70 group-hover:text-accent transition-colors line-clamp-2">
                    {rp.title}
                  </h4>
                  <div className="text-[9px] font-mono text-white/20 mt-2">{rp.readTime} min</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="text-center pb-16">
          <Link
            href="/blog"
            className="text-accent/50 hover:text-accent font-mono text-xs tracking-wider transition-colors"
          >
            ← Back to All Tapes
          </Link>
        </div>
      </div>
    </div>
  );
}
