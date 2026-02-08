"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo, socialLinks, officeHours, services } from "@/data";
import { useRetroSound } from "@/hooks/useRetroSound";

const serviceOptions = services.map((s) => s.title);

// Decorative rivet
function Rivet({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-3 h-3 rounded-full ${className}`}
      style={{
        background: "radial-gradient(circle at 35% 35%, #CD7F32, #5C3A0A)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.4)",
      }}
    />
  );
}

// Gear decoration
function Gear({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="#CD7F32" strokeWidth="1" opacity="0.4" />
        <circle cx="12" cy="12" r="8" stroke="#CD7F32" strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={12 + Math.cos(rad) * 7}
              y1={12 + Math.sin(rad) * 7}
              x2={12 + Math.cos(rad) * 10}
              y2={12 + Math.sin(rad) * 10}
              stroke="#CD7F32"
              strokeWidth="2"
              opacity="0.3"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

// Morse code dots animation
function MorseDots({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="flex items-center gap-1 h-4">
      {[0, 1, 2, 0, 1, 0, 1, 2].map((type, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-[#CD7F32]"
          style={{
            width: type === 2 ? 12 : 4,
            height: 4,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.3,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  );
}

// Telegraph-style input that reveals chars one-by-one
function TelegraphInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  playSound,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  playSound: (t: "telegraphKey") => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > value.length) {
      playSound("telegraphKey");
    }
    onChange(e.target.value);
  };

  return (
    <div>
      <label
        className="block text-[10px] uppercase tracking-[0.2em] mb-2 opacity-50"
        style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="telegram-input w-full px-4 py-3 rounded-md text-sm"
        style={{ fontFamily: "'Special Elite', monospace" }}
      />
    </div>
  );
}

export default function TelegramContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { playSound } = useRetroSound();
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    playSound("telegraphKey");

    // Simulate send with tape feed animation
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    }, 2500);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > formData.message.length) {
      playSound("telegraphKey");
    }
    setFormData({ ...formData, message: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ paddingLeft: "5%", paddingRight: "5%" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050508]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(205,127,50,0.1) 50px, rgba(205,127,50,0.1) 51px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="text-xs tracking-[0.3em] uppercase opacity-50"
              style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
            >
              ─── Incoming Transmission ───
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Send a{" "}
            <span className="text-gradient">Telegram</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-text max-w-xl mx-auto"
          >
            Type your message and we&apos;ll receive it faster than Morse code.
          </motion.p>
        </div>

        {/* Machine frame */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="telegram-machine rounded-2xl p-8 md:p-12 relative"
        >
          {/* Rivets */}
          <Rivet className="absolute top-4 left-4" />
          <Rivet className="absolute top-4 right-4" />
          <Rivet className="absolute bottom-4 left-4" />
          <Rivet className="absolute bottom-4 right-4" />

          {/* Gears */}
          <Gear size={32} className="absolute top-6 left-1/4 opacity-30" />
          <Gear size={24} className="absolute bottom-6 right-1/4 opacity-20" />

          {/* Morse code display */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#CD7F32]/10">
            <MorseDots active={sending} />
            <span
              className="text-[10px] tracking-[0.2em] uppercase opacity-30"
              style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
            >
              BLUEDGE TELEGRAPH CO.
            </span>
            <MorseDots active={sending} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#CD7F32]/20 group-hover:border-[#CD7F32]/50 transition-colors">
                    <item.icon className="w-5 h-5" style={{ color: "#CD7F32" }} />
                  </div>
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-wider opacity-40"
                      style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm text-white/70 group-hover:text-white transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Social */}
              <div className="pt-4 border-t border-[#CD7F32]/10">
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
                      whileHover={{ scale: 1.15 }}
                      className="w-9 h-9 rounded-full border border-[#CD7F32]/20 flex items-center justify-center hover:border-[#CD7F32]/50 transition-colors"
                    >
                      <social.icon className="w-4 h-4 text-white/40 hover:text-[#CD7F32] transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Office hours */}
              <div className="p-4 rounded-lg border border-[#CD7F32]/10 bg-[#CD7F32]/[0.02]">
                <h4
                  className="text-[10px] uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32", opacity: 0.6 }}
                >
                  Office Hours
                </h4>
                <div className="space-y-1 text-xs text-white/40">
                  <p>{officeHours.weekdays}</p>
                  <p>{officeHours.saturday}</p>
                  <p>{officeHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service switches */}
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-[0.2em] mb-3 opacity-50"
                    style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
                  >
                    Service Request
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          setSelectedService(service);
                          playSound("telegraphKey");
                        }}
                        className={`px-3 py-1.5 rounded text-[11px] border transition-all ${
                          selectedService === service
                            ? "border-[#CD7F32]/60 bg-[#CD7F32]/15 text-[#CD7F32]"
                            : "border-[#CD7F32]/15 text-white/40 hover:border-[#CD7F32]/30"
                        }`}
                        style={{ fontFamily: "'Special Elite', monospace" }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TelegraphInput
                    label="Your Name *"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                    placeholder="John Doe"
                    required
                    playSound={playSound}
                  />
                  <TelegraphInput
                    label="Email *"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    placeholder="john@example.com"
                    type="email"
                    required
                    playSound={playSound}
                  />
                </div>

                {/* Company & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TelegraphInput
                    label="Company"
                    value={formData.company}
                    onChange={(v) => setFormData({ ...formData, company: v })}
                    placeholder="Your company"
                    playSound={playSound}
                  />
                  <div>
                    <label
                      className="block text-[10px] uppercase tracking-[0.2em] mb-2 opacity-50"
                      style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
                    >
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => {
                        setFormData({ ...formData, budget: e.target.value });
                        playSound("telegraphKey");
                      }}
                      className="telegram-input w-full px-4 py-3 rounded-md text-sm appearance-none cursor-pointer"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      <option value="" className="bg-[#1A0E08]">Select budget</option>
                      <option value="5k-10k" className="bg-[#1A0E08]">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-[#1A0E08]">$10,000 - $25,000</option>
                      <option value="25k-50k" className="bg-[#1A0E08]">$25,000 - $50,000</option>
                      <option value="50k+" className="bg-[#1A0E08]">$50,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-[10px] uppercase tracking-[0.2em] mb-2 opacity-50"
                    style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleTextareaChange}
                    placeholder="Describe your project..."
                    className="telegram-input w-full px-4 py-3 rounded-md text-sm resize-none"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  />
                </div>

                {/* Submit — brass telegraph key */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 3 }}
                  className="brass-button w-full md:w-auto px-12 py-4 rounded-lg text-sm relative overflow-hidden disabled:opacity-50"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  {sending ? "TRANSMITTING..." : "SEND TELEGRAM"}
                </motion.button>
              </form>

              {/* Sent confirmation — tape feed */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 rounded-lg border border-[#CD7F32]/20 bg-[#CD7F32]/[0.03] overflow-hidden"
                  >
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      transition={{ duration: 1, ease: "linear" }}
                    >
                      <p
                        className="text-xs leading-relaxed"
                        style={{ fontFamily: "'Special Elite', monospace", color: "#CD7F32" }}
                      >
                        ═══════════════════════════
                        <br />
                        MESSAGE RECEIVED — STOP
                        <br />
                        BLUEDGE TEAM NOTIFIED — STOP
                        <br />
                        EXPECT REPLY WITHIN 24 HOURS — STOP
                        <br />
                        THANK YOU FOR YOUR TRANSMISSION — STOP
                        <br />
                        ═══════════════════════════
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Paper tape spool decoration */}
          <div className="absolute -right-3 top-1/3 hidden lg:block opacity-20">
            <div
              className="w-6 h-32 rounded-full"
              style={{
                background: "linear-gradient(180deg, #CD7F32, #8B6914, #CD7F32, #8B6914, #CD7F32)",
                border: "1px solid #5C3A0A",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
