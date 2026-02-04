"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Zap, Sparkles } from "lucide-react";
import { contactInfo, socialLinks, officeHours, services } from "@/data";

const serviceOptions = services.map(s => s.title);

// Explosive energy particles
function EnergyParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main particles */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            background: i % 3 === 0 ? "#2CACE2" : i % 3 === 1 ? "#0077B6" : "#00AEEF",
            boxShadow: `0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor`,
          }}
          animate={{
            y: [0, -300, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Lightning streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute h-[2px] rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + Math.random() * 60}%`,
            width: `${80 + Math.random() * 120}px`,
            background: "linear-gradient(90deg, transparent, #2CACE2, #00AEEF, transparent)",
            boxShadow: "0 0 10px #2CACE2, 0 0 20px #00AEEF",
            transform: `rotate(${-30 + Math.random() * 60}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            delay: Math.random() * 5,
            repeatDelay: 3 + Math.random() * 4,
          }}
        />
      ))}
      {/* Pulsing energy rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2 border-[#00AEEF]/30"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            width: "200px",
            height: "200px",
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, service: selectedService });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Explosive Background elements */}
      <div className="absolute inset-0">
        <div className="blob morph-blob absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00AEEF] opacity-8" />
        <div className="blob morph-blob absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0077B6] opacity-8" />
        <div className="grid-bg absolute inset-0 opacity-20" />
        <EnergyParticles />
        {/* Shockwave rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-[#00AEEF]/10"
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#2CACE2]/15"
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section header with explosive entrance */}
        <div className="text-center mb-20">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 40, scale: 0.5, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-[#00AEEF]" />
            </motion.div>
            <span className="text-sm text-white/50 uppercase tracking-[0.2em]">
              Get in Touch
            </span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="w-5 h-5 text-[#00AEEF]" />
            </motion.div>
          </motion.span>

          {/* Title with explosive animation */}
          <motion.h2
            initial={{ opacity: 0, y: 80, scale: 0.6, rotateX: -45, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.1 }}
            className="section-title mb-6"
            style={{ perspective: "1000px" }}
          >
            Let&apos;s create something{" "}
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
              extraordinary
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="body-text max-w-2xl mx-auto text-lg"
          >
            Ready to transform your digital presence? We&apos;d love to hear about
            your project. Fill out the form below and we&apos;ll get back to you
            within 24 hours.
          </motion.p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact info with explosive entrance */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="lg:col-span-2 space-y-8"
            style={{ perspective: "1000px" }}
          >
            {/* Contact details */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -80, scale: 0.7, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring", stiffness: 150 }}
                  whileHover={{
                    x: 10,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center group-hover:border-[#00AEEF]/50 group-hover:bg-[#00AEEF]/20 transition-all duration-300 relative overflow-hidden"
                    whileHover={{
                      boxShadow: "0 0 30px rgba(0,174,239,0.5), 0 0 60px rgba(0,174,239,0.3)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/0 via-[#00AEEF]/30 to-[#00AEEF]/0"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <item.icon className="w-6 h-6 text-[#00AEEF] relative z-10" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium text-lg group-hover:text-[#00AEEF] transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social links with explosive hover */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-8 border-t border-white/10"
            >
              <div className="text-sm text-white/40 uppercase tracking-wider mb-4">Follow us</div>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      boxShadow: "0 0 30px rgba(0,174,239,0.6)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full border border-[#00AEEF]/20 flex items-center justify-center hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#00AEEF]/20"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon className="w-5 h-5 text-white/50 group-hover:text-[#00AEEF] transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick response badge with pulsing energy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#00AEEF]/5 border border-[#00AEEF]/20 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/0 via-[#00AEEF]/10 to-[#00AEEF]/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-400 relative z-10"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: ["0 0 0 0 rgba(74,222,128,0.7)", "0 0 0 10px rgba(74,222,128,0)", "0 0 0 0 rgba(74,222,128,0)"],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-white/60 relative z-10">
                Typically responds within 24 hours
              </span>
            </motion.div>

            {/* Office hours with glow effect */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(0,174,239,0.2)",
              }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h4 className="font-semibold mb-3 relative z-10">Office Hours</h4>
              <div className="space-y-2 text-sm text-white/50 relative z-10">
                <p>{officeHours.weekdays}</p>
                <p>{officeHours.saturday}</p>
                <p>{officeHours.sunday}</p>
                <p className="text-white/30 mt-4">Timezone: {officeHours.timezone}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact form with explosive entrance */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 30, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="lg:col-span-3"
            style={{ perspective: "1000px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service selection with explosive buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm text-white/40 uppercase tracking-wider mb-3">
                  What service are you interested in?
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service, i) => (
                    <motion.button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 200 }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(0,174,239,0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2.5 rounded-full text-sm border transition-all duration-300 relative overflow-hidden ${
                        selectedService === service
                          ? "border-[#00AEEF] bg-[#00AEEF]/20 text-white"
                          : "border-white/10 text-white/60 hover:border-[#00AEEF]/30 hover:bg-white/5"
                      }`}
                    >
                      {selectedService === service && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/0 via-[#00AEEF]/30 to-[#00AEEF]/0"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                      <span className="relative z-10">{service}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Name and Email row */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </motion.div>

              {/* Company and Budget row */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-300"
                    placeholder="Your company"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                    Budget range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#050508]">
                      Select budget
                    </option>
                    <option value="5k-10k" className="bg-[#050508]">
                      $5,000 - $10,000
                    </option>
                    <option value="10k-25k" className="bg-[#050508]">
                      $10,000 - $25,000
                    </option>
                    <option value="25k-50k" className="bg-[#050508]">
                      $25,000 - $50,000
                    </option>
                    <option value="50k+" className="bg-[#050508]">
                      $50,000+
                    </option>
                  </select>
                </motion.div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                whileHover={{ scale: 1.01 }}
              >
                <label className="block text-sm text-white/40 uppercase tracking-wider mb-2">
                  Tell us about your project *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#00AEEF] focus:outline-none focus:ring-1 focus:ring-[#00AEEF] focus:shadow-[0_0_30px_rgba(0,174,239,0.3)] transition-all duration-300 resize-none"
                  placeholder="Describe your project, goals, and timeline..."
                />
              </motion.div>

              {/* Submit button with explosive hover */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(0,174,239,0.5), 0 0 80px rgba(0,174,239,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary btn-shine w-full md:w-auto relative overflow-hidden group"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00AEEF]/0 via-white/20 to-[#00AEEF]/0"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  {/* Rocket flame effect on hover */}
                  <motion.div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-[#00AEEF] via-[#2CACE2] to-transparent blur-md" />
                  </motion.div>
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
