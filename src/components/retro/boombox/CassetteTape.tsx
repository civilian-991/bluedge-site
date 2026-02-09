"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types";

interface CassetteTapeProps {
  post: BlogPost;
  tapeColor?: string;
  index: number;
}

export default function CassetteTape({ post, tapeColor = "#2CACE2", index }: CassetteTapeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative bg-[#0f1420] border border-sky-900/20 rounded-lg overflow-hidden shadow-lg"
        >
          {/* Cassette body */}
          <div className="p-5">
            {/* Top section with screw holes */}
            <div className="flex justify-between items-start mb-3">
              <div className="w-2 h-2 rounded-full border border-sky-800/40" />
              <div className="text-[10px] sm:text-[9px] font-mono text-sky-400/30 tracking-wider uppercase">
                SIDE A &middot; {post.readTime}min
              </div>
              <div className="w-2 h-2 rounded-full border border-sky-800/40" />
            </div>

            {/* Label area */}
            <div
              className="rounded p-4 mb-3"
              style={{
                background: `linear-gradient(135deg, ${tapeColor}15, ${tapeColor}08)`,
                border: `1px solid ${tapeColor}30`,
              }}
            >
              <div
                className="text-[10px] font-mono tracking-wider uppercase mb-1"
                style={{ color: `${tapeColor}99` }}
              >
                {post.category}
              </div>
              <h3 className="text-sm font-bold text-white/90 group-hover:text-accent transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-[11px] text-white/40 mt-1.5 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Tape window - dual spool */}
            <div className="flex items-center justify-center gap-6 py-3 bg-[#0a0e1a] rounded border border-sky-900/20">
              {/* Left spool */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-sky-800/30 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-sky-900/40" />
              </motion.div>

              {/* Tape */}
              <div className="flex-1 h-0.5 bg-sky-900/40 rounded" />

              {/* Right spool */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-sky-800/30 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-sky-900/40" />
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="flex justify-between items-center mt-3 text-[10px] sm:text-[9px] font-mono text-sky-400/30">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
