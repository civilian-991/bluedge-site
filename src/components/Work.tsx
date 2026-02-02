"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, ArrowRight } from "lucide-react";
import { projects } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current?.querySelectorAll(".word") || [],
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Horizontal scroll animation
      const horizontalSection = horizontalRef.current;
      if (horizontalSection) {
        const cards = horizontalSection.querySelectorAll(".project-card");
        const totalWidth = horizontalSection.scrollWidth - window.innerWidth;

        // Main horizontal scroll
        const horizontalTween = gsap.to(horizontalSection, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Update progress bar
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                });
              }
            },
          },
        });

        // Parallax effect on images inside cards
        cards.forEach((card) => {
          const image = card.querySelector(".card-image");
          if (image) {
            gsap.fromTo(
              image,
              { x: -50 },
              {
                x: 50,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          }

          // Card reveal animation
          gsap.fromTo(
            card,
            {
              opacity: 0.3,
              scale: 0.9,
              rotateY: -5,
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 80%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ["Selected", "Works"];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[#030306] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="blob morph-blob absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#00AEEF] opacity-5" />
      </div>

      {/* Section header - outside pinned area */}
      <div
        className="relative z-10 py-32"
        style={{ paddingLeft: "5%", paddingRight: "5%" }}
      >
        <div className="max-w-[1800px] mx-auto">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Layers className="w-5 h-5 text-[#00AEEF]" />
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Portfolio
            </span>
          </motion.span>

          {/* Title with 3D animation */}
          <div
            ref={titleRef}
            className="section-title overflow-hidden flex flex-wrap gap-x-4 md:gap-x-6 mb-6"
            style={{ perspective: "1000px" }}
          >
            {titleWords.map((word, i) => (
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-text max-w-2xl"
          >
            A showcase of our finest work across branding, digital, and marketing
            projects for clients across Lebanon and the GCC region.
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mt-10 text-[#00AEEF]"
          >
            <span className="text-sm uppercase tracking-wider">
              Scroll to explore
            </span>
            <ArrowRight className="w-5 h-5 animate-pulse" />
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll trigger area */}
      <div ref={triggerRef} className="relative">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#00AEEF] to-[#0077B6] origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={horizontalRef}
          className="flex gap-8 pl-[5%] pr-[20%]"
          style={{ width: "fit-content" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-[80vh] relative group"
              style={{ perspective: "1000px" }}
            >
              <div className="relative h-full rounded-3xl overflow-hidden cursor-pointer transform-gpu transition-transform duration-700 group-hover:scale-[0.98]">
                {/* Image with parallax */}
                <div className="card-image absolute inset-[-20%] bg-cover bg-center transition-transform duration-700 group-hover:scale-110">
                  <div
                    className="w-full h-full"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Color accent line */}
                <div
                  className="absolute bottom-0 left-0 w-full h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{ background: project.color }}
                />

                {/* Floating number */}
                <div
                  className="absolute top-8 left-8 text-[150px] font-bold leading-none opacity-10 transition-all duration-500 group-hover:opacity-20 group-hover:translate-x-4"
                  style={{ color: project.color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  {/* Year badge */}
                  <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-sm font-medium">{project.year}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 rounded-full text-xs border border-white/20 bg-white/5 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Category */}
                  <span
                    className="text-sm font-medium uppercase tracking-wider mb-3 transition-all duration-500"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-4xl md:text-6xl font-bold mb-4 transform group-hover:-translate-y-2 transition-transform duration-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-lg max-w-md opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    {project.description}
                  </p>

                  {/* View project button */}
                  <div className="mt-8 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <button
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-300"
                      style={{ borderColor: `${project.color}50` }}
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ArrowUpRight
                        className="w-4 h-4"
                        style={{ color: project.color }}
                      />
                    </button>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 50%, ${project.color}20 50%)`,
                  }}
                />
              </div>
            </div>
          ))}

          {/* End card - CTA */}
          <div className="project-card flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-[80vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-8xl font-bold text-gradient mb-6">150+</div>
                <h3 className="text-3xl font-bold mb-4">Projects Completed</h3>
                <p className="text-white/50 mb-8">
                  Ready to be our next success story?
                </p>
                <a
                  href="#contact"
                  className="btn-primary btn-shine inline-flex items-center gap-3"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-32" />
    </section>
  );
}
