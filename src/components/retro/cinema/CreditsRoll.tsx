"use client";

import { motion } from "framer-motion";

interface Credit {
  role: string;
  name: string;
}

interface CreditsRollProps {
  projectTitle: string;
  client: string;
  year: string;
  credits?: Credit[];
}

const defaultCredits: Credit[] = [
  { role: "Creative Direction", name: "BluEdge Creative Team" },
  { role: "Strategy", name: "The Strategist Grendizer" },
  { role: "Design", name: "The Design Senseis" },
  { role: "Development", name: "BluEdge Tech Division" },
  { role: "Copywriting", name: "The Grammar Freaks" },
  { role: "Project Management", name: "BluEdge Operations" },
  { role: "Quality Assurance", name: "The Research Masters" },
  { role: "SEO & Analytics", name: "The SEO Experts" },
];

export default function CreditsRoll({
  projectTitle,
  client,
  year,
  credits = defaultCredits,
}: CreditsRollProps) {
  return (
    <div className="relative py-16 overflow-hidden bg-[#06080f]">
      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-2xl mx-auto text-center space-y-12 px-6">
        {/* Title card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-sky-400/40 text-xs font-mono tracking-[0.3em] uppercase mb-4">
            A BluEdge Production
          </div>
          <h3
            className="text-3xl md:text-4xl font-bold text-sky-100 font-serif italic"
            style={{ textShadow: "0 0 30px rgba(44,172,226,0.2)" }}
          >
            {projectTitle}
          </h3>
          <div className="text-sky-400/50 text-sm mt-2 font-mono">
            For {client} &middot; {year}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-sky-400/20" />
          <span className="text-sky-400/30 text-lg">★</span>
          <div className="h-px w-16 bg-sky-400/20" />
        </div>

        {/* Credits list */}
        <div className="space-y-6">
          {credits.map((credit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="space-y-1"
            >
              <div className="text-sky-400/40 text-xs tracking-[0.2em] uppercase font-mono">
                {credit.role}
              </div>
              <div className="text-sky-100/80 text-lg">{credit.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-sky-400/20" />
          <span className="text-sky-400/30 text-lg">★</span>
          <div className="h-px w-16 bg-sky-400/20" />
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sky-400/30 text-xs font-mono tracking-[0.3em] uppercase"
        >
          Copyright &copy; {year} BluEdge Agency &middot; All Rights Reserved
          <br />
          No brands were harmed in the making of this project.
        </motion.div>
      </div>
    </div>
  );
}
