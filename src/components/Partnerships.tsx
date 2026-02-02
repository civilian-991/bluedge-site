"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award } from "lucide-react";
import { partnerships } from "@/data";

export default function Partnerships() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#030306]"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#00AEEF]" />
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Certified Partners
            </span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by the <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            We&apos;re proud to be recognized partners of the world&apos;s leading digital platforms,
            ensuring our clients receive best-in-class service and expertise.
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partnerships.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#00AEEF]/30 hover:bg-[#00AEEF]/5 transition-all duration-500 flex flex-col items-center justify-center min-h-[160px]"
            >
              {/* Partner logo placeholder - using text until real logos are added */}
              <div className="relative w-full h-16 flex items-center justify-center mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement("span");
                      fallback.className = "text-white/40 text-sm font-medium text-center";
                      fallback.textContent = partner.name;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <span className="text-xs text-white/40 text-center group-hover:text-white/60 transition-colors">
                {partner.name}
              </span>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-[#00AEEF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
