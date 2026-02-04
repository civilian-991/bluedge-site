"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Sparkles } from "lucide-react";
import { partnerships } from "@/data";

export default function Partnerships() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#030306]"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Enhanced background with energy effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/20 to-transparent" />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: "#2CACE2",
              boxShadow: "0 0 10px #2CACE2",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        {/* Pulsing rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00AEEF]/10"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header with explosive entrance */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-5 h-5 text-[#00AEEF]" />
            </motion.div>
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Certified Partners
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-[#00AEEF]" />
            </motion.div>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ perspective: "1000px" }}
          >
            Trusted by the{" "}
            <motion.span
              className="text-gradient inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,174,239,0.5)",
                  "0 0 40px rgba(0,174,239,0.8)",
                  "0 0 20px rgba(0,174,239,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Industry Leaders
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-text max-w-2xl mx-auto"
          >
            We&apos;re proud to be recognized partners of the world&apos;s leading digital platforms,
            ensuring our clients receive best-in-class service and expertise.
          </motion.p>
        </motion.div>

        {/* Partners grid with explosive card entrances */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partnerships.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 80, scale: 0.6, rotateY: -20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 150 }}
              whileHover={{
                y: -15,
                scale: 1.08,
                rotateY: 5,
                boxShadow: "0 20px 50px rgba(0,174,239,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#00AEEF]/50 hover:bg-[#00AEEF]/10 transition-all duration-500 flex flex-col items-center justify-center min-h-[160px] overflow-hidden"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />

              {/* Partner logo */}
              <div className="relative w-full h-16 flex items-center justify-center mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  onError={(e) => {
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
              <span className="text-xs text-white/40 text-center group-hover:text-[#00AEEF] transition-colors relative z-10">
                {partner.name}
              </span>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-[#00AEEF]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10" />

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00AEEF] to-[#0077B6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
